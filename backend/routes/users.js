const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;
const { User, validateLogin, validateRegister } = require("../models/user.js");
const { Schedule, validateSchedule } = require("../models/schedule.js");
const { PlannedSchedule, validatePlannedScheduleReq } = require("../models/plannedSchedule.js");
// const {getLatLng} = require("../../weym/src/Geocoding/getlatlng.js");
//GET REQUESTS

function getDist(la1, lon1, la2, lon2) {
    return Math.acos(Math.sin(la1) * Math.sin(la2) + Math.cos(la1) * Math.cos(la2) * Math.cos(lon2 - lon1)) * 6731;
}

// to get the people near you
router.get("/matches/:schedId", async (req, res) => {
    //put username inside body here
    //should return the information of a similar schedule and user
    let matches = [];
    var baseSched = await PlannedSchedule.findOne({ _id: req.params.schedId });
    /* for await (const pSched of PlanneSchedule.find() ){
    	if (pSched.ObjectId == myPSched.ObjectId)
    		continue;
    	var sDistance = smthnsmthn(pSched.sLatitude, pSched.sLongitude, myPSched.sLatitude, myPSched.sLongitude);
		var dDistance = smthnsmthn(pSched.dLatitude, pSched.dLongitude, myPSched.dLatitude, myPSched.dLongitude);
		var compatability = sDistance*dDistance*(myPSched.leaveTime-pSched.leaveTime);
    } */

    for await (const pSched of PlannedSchedule.find({ day: baseSched.day })) {
        if (pSched.user == req.params.user) //check if self
            continue;
        //make sure time interval overlaps
        if (!((baseSched.startTime <= pSched.endTime) && (baseSched.endTime >= pSched.startTime)))
            continue;
        if (!pSched.sLat)
            continue;
        var sDistance = getDist(pSched.sLat, pSched.sLong, baseSched.sLat, baseSched.sLong);
        var dDistance = getDist(pSched.dLat, pSched.dLong, baseSched.dLat, baseSched.dLong);
        if (sDistance > 300 || dDistance > 300)
            continue;
        var compatability = sDistance * dDistance;
        matches.push([pSched, compatability]);
        console.log(pSched)
    }
    matches.sort((a, b) => b[1] - a[1]);
    if (matches.length < 5)
        res.json(matches);
    else
        res.json({ "matches": matches.slice(0, 5) });
    return res.status(200).send("Please try again.");
});

// to get user profile
router.get("/:userId", async (req, res) => {
    console.log(req.params);
    var user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send("User doesn't exist.");
    return res.status(200).send(user);
});

router.get("/user/:userId/:day", async (req, res) => {
    console.log(req.params);
    var user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send("User doesn't exist.");
    let results = []
    for await (const pSched of PlannedSchedule.find({ user: req.params.userId, day: req.params.day })) {
        results.push(pSched);
    }
    for await (const pSched of Schedule.find({ user: req.params.userId, day: req.params.day })) {
        results.push(pSched);
    }
    res.json(results);
    return res.status(200).send();
});


router.post("/login", async (req, res) => {
    console.log("logging in!")
    // validate the request body first
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //find an existing user
    var user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Please try again.");
    if (user.validatePassword(req.body.password)) {
        res.json({ userId: user._id })
        return res.status(200).send();
    }
    else return res.status(400).send("Please try again.");
});


//POST REQUESTS
router.post("/register", async (req, res) => {
    const { error } = validateRegister(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("email already taken.");
    //create new user
    user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        organization: req.body.organization,
    });
    user.save();
    return res.status(200).send("User registered successfully.");
});

module.exports = router