const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;
const { User, validateLogin, validateRegister} = require("../models/user.js");
const { Schedule, validateSchedule} = require("../models/schedule.js");
const { PlannedSchedule, validatePlannedScheduleReq, validatePlannedScheduleUpdate} = require("../models/plannedSchedule.js");

router.post("/schedule", async (req, res) => {
	//all schedules must first come from a planned schedule that can then be confirmed into
		//then we should take in a pschedule object
	console.log("making a Schedule!");
    // validate the request body first
    const { error } = validateSchedule(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //we add to 
    return res.status(201).send("Made the planned schedule!");
});

module.exports = router