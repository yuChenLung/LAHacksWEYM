const Joi = require('joi');
const mongoose = require('mongoose');
//notes: add auth later
//pw and user will follow format userN passN

//this is the planned schedule
const ScheduleSchema = new mongoose.Schema({
    users: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
    startTime: Number, //written in 24 hour format, so 6:00pm would be written as 1800
    endTime: Number,
    startLocation: String,
    destination: String,
});

function validateSchedule(schedule) {
    const schema = Joi.object({
        scheduleId: Joi.string().max(255).required(),
        userId: Joi.string().max(255).required() //the user that accepted this schedule
    });
    return schema.validate(schedule);
}

function validateScheduleUpdate(potentialUpdates) {
    const schema = Joi.object({
        Id: Joi.string().max(80).required(),
        startTime: Joi.number().min(0).max(1440).required(),
        endTime: Joi.number().min(0).max(1440).required(),
        day: Joi.number().min(1).max(7).required(),
        startLocation: Joi.string().max(255).required(),
        destination: Joi.string().max(255).required()
    });
    return schema.validate(potentialUpdates);
}

const Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = {
    Schedule: Schedule,
    validateSchedule: validateSchedule,
    validateScheduleUpdate: validateScheduleUpdate
}