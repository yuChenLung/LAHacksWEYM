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
    sLat: Number,
    sLong: Number,
    dLat: Number,
    dLong: Number,
});

function validatePlannedScheduleReq(schedule) {
    const schema = Joi.object({
        user: Joi.string().max(255).required(),
        startTime: Joi.number().min(0).max(1440).required(),
        endTime: Joi.number().min(0).max(1440).required(),
        day: Joi.number().min(0).max(1234567).required(),
        startLocation: Joi.string().max(255).required(),
        destination: Joi.string().max(255).required(),
        sLat: Joi.number().min(-90).max(90).required(),
        sLong: Joi.number().min(-180).max(180).required(),
        dLat: Joi.number().min(-90).max(90).required(),
        dLong: Joi.number().min(-180).max(180).required(),
    });
    return schema.validate(schedule);
}

function validateProposal(proposal) {
    const schema = Joi.object({
        receiverId: Joi.string().max(255).required(),
        proposalId: Joi.string().max(255).required() //id of the proposed schedule
    });
    return schema.validate(proposal);
}

function validatePlannedScheduleUpdate(potentialUpdates) {
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

const PlannedSchedule = mongoose.model('PlannedSchedule', PlannedScheduleSchema);

module.exports = {
    PlannedSchedule: PlannedSchedule,
    validatePlannedScheduleReq: validatePlannedScheduleReq,
    validatePlannedScheduleUpdate: validatePlannedScheduleUpdate,
    validateProposal: validateProposal
}