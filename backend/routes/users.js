const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;
const { User, validateLogin, validateRegister} = require("../models/user.js");
const { Schedule, validateSchedule} = require("../models/schedule.js");
const { PlannedSchedule, validatePlannedScheduleReq} = require("../models/plannedSchedule.js");
//GET REQUESTS

// to get the people near you
router.get("/matches", async (req, res) => {
    //put username inside body here
    //should return the information of a similar schedule and user
    var myPSched = await PlannedSchedule.findOne({ObjectId: req.params.schedule});
    /* for await (const pSched of PlanneSchedule.find() ){
    	if (pSched.ObjectId == myPSched.ObjectId)
    		continue;
    	var sDistance = smthnsmthn(pSched.sLatitude, pSched.sLongitude, myPSched.sLatitude, myPSched.sLongitude);
		var dDistance = smthnsmthn(pSched.dLatitude, pSched.dLongitude, myPSched.dLatitude, myPSched.dLongitude);
		var compatability = sDistance*dDistance*(myPSched.leaveTime-pSched.leaveTime);
    } */
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
    });
    user.save();
    return res.status(200).send("User registered successfully.");
});

router.post("/makepschedule", async (req, res) => {
	console.log("making a pSchedule!")
    // validate the request body first
    const { error } = validatePlannedScheduleReq(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    var day = req.body.day;
    while (day>0){
    	plannedSchedule = new PlannedSchedule({
	    	user: req.body.userID,
	    	startTime: req.body.startTime,
	    	endTime: req.body.endTime,
	    	day: day%10,
	    	startLocation: req.body.startLocation,
	    	destination: req.body.destination,
	    });
	    plannedSchedule.save();
	    day/=10;
	    day=~~day; //rounds to integer
    }
   
    return res.status(200).send("Made the planned schedule!");
});

module.exports = router