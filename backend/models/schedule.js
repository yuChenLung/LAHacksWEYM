const Joi = require('joi');
const mongoose = require('mongoose');
//notes: add auth later
//pw and user will follow format userN passN

//this is the planned schedule
const ScheduleSchema = new mongoose.Schema({
    users: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
    leaveTime: Number, //written in 24 hour format, so 6:00pm would be written as 1800
    startLocation: String,
    destination: String,
});

function validateSchedule(schedule) {
    const schema = Joi.object({
        proposalId: Joi.string(), //objId of the proposed schedule
        leaveTime: Joi.number().min(0).max(2359).required(),
        startLocation: Joi.string().max(255),
        destination: Joi.string().max(255),
    });
    return schema.validate(schedule);
}

const Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = {
    Schedule: Schedule,
    validateSchedule: validateSchedule,
}