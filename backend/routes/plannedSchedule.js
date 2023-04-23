const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;
const { User, validateLogin, validateRegister} = require("../models/user.js");
const { Schedule, validateSchedule} = require("../models/schedule.js");
const { PlannedSchedule, validatePlannedScheduleReq, validatePlannedScheduleUpdate, validateProposal} = require("../models/plannedSchedule.js");


router.get("/pschedule/:scheduleId", async (req, res) => {
    console.log(req.params);
    var plannedSchedule = await PlannedSchedule.findById(req.params.scheduleId);
    if (!plannedSchedule) return res.status(400).send("PSchedule doesn't exist.");
    return res.status(200).send(plannedSchedule);
});

router.post("/propose", async (req, res) => {
	const { error } = validateProposal(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    var receiver = await User.findById(req.body.receiverId);
    if (!receiver) return res.status(400).send("User doesn't exist.");

	var proposal = await PlannedSchedule.findById(req.body.proposalId);
    if (!proposal) return res.status(400).send("PSchedule doesn't exist.");

    User.findOneAndUpdate({_id: req.body.receiverId}, {$push: {proposedSchedules: proposal}},
		function (error, success) {
		    if (error) {
		        console.log(error);
		       	res.status(400).send();
		    } else {
		        console.log(success);
		    }
	});
    return res.status(200).send("Made the proposal.");
});

router.post("/reject", async (req, res) => {
	const { error } = validateProposal(req.body);
	//will take in a receiverId to delete from, and proposal
    if (error) return res.status(400).send(error.details[0].message);

    var receiver = await User.findById(req.body.receiverId);
    if (!receiver) return res.status(400).send("User doesn't exist.");

	var proposal = await PlannedSchedule.findById(req.body.proposalId);
    if (!proposal) return res.status(400).send("PSchedule doesn't exist.");

    console.log(receiver);
    User.findOneAndUpdate({_id: req.body.receiverId}, {$pull: {proposedSchedules: req.body.proposalId}},
		function (error, success) {
		    if (error) {
		        console.log(error);
		       	res.status(400).send();
		    } else {
		        console.log(success);
		    }
	});
    return res.status(200).send("Rejected proposal.");
});


router.post("/pschedule", async (req, res) => {
	console.log("making a pSchedule!")
    // validate the request body first
    const { error } = validatePlannedScheduleReq(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    var day = req.body.day;
    var user = User.findById(req.body.user);

    if (!user) return res.status(400).send("Invalid user!");
    while (day>0){
    	plannedSchedule = new PlannedSchedule({
	    	user: req.body.user, //objId of user
	    	startTime: req.body.startTime,
	    	endTime: req.body.endTime,
	    	day: day%10,
	    	startLocation: req.body.startLocation,
	    	destination: req.body.destination,
	    	sLat: req.body.sLat,
	        sLong: req.body.sLong,
	        dLat: req.body.dLat,
	        dLong: req.body.dLong,
	    });
	    plannedSchedule.save();
	    User.findOneAndUpdate({_id: req.body.user}, {$push: {plannedSchedules: plannedSchedule}},
			function (error, success) {
			    if (error) {
			        console.log(error);
			       	res.status(400).send();
			    } else {
			        console.log(success);
			    }
			});
	    day/=10;
	    day=~~day; //rounds to integer
    }
    return res.status(200).send("Made the planned schedule!");
});


router.patch("/pschedule", async (req, res) => {
	const { error } = validatePlannedScheduleUpdate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	console.log("updating a pSchedule!")
    // validate the request body first
    const id = req.body.Id;
    const update = {
    	startTime: req.body.startTime, 
    	endTime: req.body.endTime, 
		day: req.body.day, 
		startLocation: req.body.startLocation, 
		destination: req.body.destination
    }

	PlannedSchedule.findByIdAndUpdate(id, update, (err, updatedDoc) => {
		if(err){
			console.log("Not another error!");
			console.log(err);
			return res.status(400).send("Try again!");
		}
		else{
			console.log("No way it worked");
			return res.status(200).send("Yay!");
		}

	});
});

router.delete("/pschedule", async (req, res) => {
    const id = req.body.Id;
//     User.findOneAndUpdate({_id: "6443cd3b66d2a4511b0d3837"}, {$pull: {plannedSchedules: "644481e109eed4af8214be07"}},
// 			function (error, success) {
// 			    if (error) {
// 			        console.log(error);
// 			       	res.status(400).send(error.details[0].message);
// 			    } else {
// 			        console.log(success);
// 			        return res.status(200).send("standin status!");
// 			    }
// 
// 		});
	PlannedSchedule.findById(req.body.Id, function (err, plannedSchedule) {
		if (err){
			return res.status(400).send(err.details[0].message);
		}
		console.log(plannedSchedule);
		console.log("Found it! Btw here's our user: %s", plannedSchedule.user);
		// You can now access foundDoc outside of the findOne() function
		User.findOneAndUpdate({_id: plannedSchedule.user}, {$pull: {plannedSchedules: req.body.Id}},
			function (error, success) {
			    if (error) {
			        console.log(error);
			       	res.status(400).send(error.details[0].message);
			    } else {
			        console.log(success);
			    }
		});
		console.log("deleting probl idk");
		PlannedSchedule.findByIdAndDelete(req.body.Id, function (err) {
		  if (err) {
		    console.log(err);
		    return res.status(400).send("You failed.");
		  } else {
		    console.log('Schedule entry deleted');
		  }
		});
		return res.status(200).send("standin status!");
	});
	

});

module.exports = router