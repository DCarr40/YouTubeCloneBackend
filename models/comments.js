const mongoose = require('mongoose');
const Joi = require('joi');
const { date } = require('joi');


const commentSchema = mongoose.Schema({

    text: { type: string, required: true, minlength: 5, maxlength:1000 },
    like: { type: number, required: true, default:0 },
    dislike: { type: number, required: true, default:0 },
    dateAdded: { type: date, default: Date.now },

})

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;