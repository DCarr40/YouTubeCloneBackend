const mongoose = require('mongoose');
const Joi = require('joi');
const { date } = require('joi');
const {replySchema} = require('./reply');


const commentSchema = mongoose.Schema({

    text: { type: String, required: true, minlength: 5, maxlength:1000 },
    like: { type: Number, required: true, default:0 },
    dislike: { type: Number, required: true, default:0 },
    reply: { type: [replySchema] },
    videoId: { type: String, required: true},
    dateAdded: { type: Date, default: Date.now },

})

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;