const mongoose = require('mongoose');
const Joi = require('joi');
const { date } = require('joi');

const replySchema = mongoose.Schema({

    text: { type: string, required: true, minlength: 5, maxlength:1000 },
    dateAdded: { type: date, default: Date.now },

})

const Reply = mongoose.model('reply', replySchema);

module.exports = Reply;