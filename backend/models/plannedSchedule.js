const Joi = require('joi');
const mongoose = require('mongoose');
//notes: add auth later
//pw and user will follow format userN passN

//this is the planned schedule
const PlannedScheduleSchema = new mongoose.Schema({
    user: { type : mongoose.Schema.Types.ObjectId, ref: 'User' },
    startTime: Number, //written in minutes, so 18:00 = 18*60 = 1080
    endTime: Number,
    day: Number,
    startLocation: String,
    destination: String,
    sLatitude: Number,
    sLongitude: Number,
    dLatitude: Number,
    dLongitude: Number,
});

function validatePlannedScheduleReq(schedule) {
    const schema = Joi.object({
        user: Joi.string().max(255).required(),
        startTime: Joi.number().min(0).max(1440).required(),
        endTime: Joi.number().min(0).max(1440).required(),
        day: Joi.number().min(0).max(1234567).required(),
        startLocation: Joi.string().max(255).required(),
        destination: Joi.string().max(255).required(),
        sLatitude: Joi.number().min(-90).max(90),
        sLongitude: Joi.number().min(-180).max(180),
        dLatitude: Joi.number().min(-90).max(90),
        dLongitude: Joi.number().min(-180).max(180),
    });
    return schema.validate(schedule);
}

const PlannedSchedule = mongoose.model('PlannedSchedule', PlannedScheduleSchema);

module.exports = {
    PlannedSchedule: PlannedSchedule,
    validatePlannedScheduleReq: validatePlannedScheduleReq,
}