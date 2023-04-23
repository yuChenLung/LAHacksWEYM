const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;
const { User, validateLogin, validateRegister} = require("../models/user.js");
const { Schedule, validateSchedule, validateScheduleUpdate} = require("../models/schedule.js");
const { PlannedSchedule, validatePlannedScheduleReq, validatePlannedScheduleUpdate} = require("../models/plannedSchedule.js");

router.get("/schedule/:scheduleId", async (req, res) => {
    console.log(req.params);
    var schedule = await Schedule.findById(req.params.scheduleId);
    if (!schedule) return res.status(400).send("Schedule doesn't exist.");
    return res.status(200).send(schedule);
});

router.post("/schedule", async (req, res) => {
	//all schedules must first come from a planned schedule that can then be confirmed into
		//then we should take in a pschedule object
	const { error } = validateSchedule(req.body);
    if (error) return res.status(400).send(error.details[0].message);

	var plannedSchedule = await PlannedSchedule.findById(req.body.scheduleId);
    if (!plannedSchedule) return res.status(400).send("PSchedule doesn't exist.");
	console.log("Creating a Schedule!")
    // validate the request body first
    
    schedule = new Schedule({
    	users: [plannedSchedule.user, req.body.userId], //objId of user
    	startTime: plannedSchedule.startTime,
    	endTime: plannedSchedule.endTime,
    	day: plannedSchedule.day,
    	startLocation: plannedSchedule.startLocation,
    	destination: plannedSchedule.destination,
    });
    schedule.save();
    User.findOneAndUpdate({_id: req.body.userId}, {$push: {schedules: schedule}},
		function (error, success) {
		    if (error) {
		        console.log(error);
		       	res.status(400).send();
		    } else {
		        console.log(success);
		    }
		});
    User.findOneAndUpdate({_id: plannedSchedule.user}, {$push: {schedules: schedule}, $pull: {plannedSchedules: req.body.scheduleId}},
		function (error, success) {
		    if (error) {
		        console.log(error);
		       	res.status(400).send();
		    } else {
		        console.log(success);
		    }
		});
	console.log("deleting probl idk");
	PlannedSchedule.findByIdAndDelete(req.body.scheduleId, function (err) {
	  if (err) {
	    console.log(err);
	    return res.status(400).send("You failed.");
	  } else {
	    console.log('Schedule entry deleted');
	  }
	});
	return res.status(200).send("standin status!");
});

router.patch("/schedule", async (req, res) => {
	const { error } = validateScheduleUpdate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	console.log("updating a Schedule!")
    // validate the request body first
    const id = req.body.Id;
    const update = {
    	startTime: req.body.startTime, 
    	endTime: req.body.endTime, 
		day: req.body.day, 
		startLocation: req.body.startLocation, 
		destination: req.body.destination
    }

	Schedule.findByIdAndUpdate(id, update, (err, updatedDoc) => {
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

router.delete("/schedule", async (req, res) => {
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
    console.log(id);
    Schedule.findById("6444b5afe1afdc13cb9d7e83", function (err, schedule) {
		console.log(schedule);
	});
	Schedule.findById(id, function (err, schedule) {
		if (err){
			return res.status(400).send(err.details[0].message);
		}

		console.log(schedule);
		console.log("Found it! Btw here's our user: %s", schedule.users);
		// You can now access foundDoc outside of the findOne() function
		User.findOneAndUpdate({_id: schedule.users[0]}, {$pull: {schedules: req.body.Id}},
			function (error, success) {
			    if (error) {
			        console.log(error);
			       	res.status(400).send(error.details[0].message);
			    } else {
			        console.log(success);
			    }
		});
		User.findOneAndUpdate({_id: schedule.users[1]}, {$pull: {schedules: req.body.Id}},
			function (error, success) {
			    if (error) {
			        console.log(error);
			       	res.status(400).send(error.details[0].message);
			    } else {
			        console.log(success);
			    }
		});
		console.log("deleting probl idk");
		Schedule.findByIdAndDelete(req.body.Id, function (err) {
		  if (err) {
		    console.log(err);
		    return res.status(400).send("You failed.");
		  } else {
		    console.log('Schedule entry deleted');
		  }
		});
		return res.status(200).send("Schedule entry deleted");
	});
	

});

module.exports = router