const mongoose = require('mongoose');
const Joi = require('joi');
const { date } = require('joi');

const replySchema = mongoose.Schema({

    text: { type: String, required: true, minlength: 5, maxlength:1000 },
    dateAdded: { type: Date, default: Date.now },

})

const Reply = mongoose.model('reply', replySchema);
function validateReply(reply) {
    const Schema = Joi.object({
        text: Joi.String().min(5).max(1000).required(),
    });
    return Schema.validate(reply);
}


module.exports = {
    Reply: Reply,
    validateReply: validateReply
}
