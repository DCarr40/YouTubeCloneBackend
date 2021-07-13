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
function validateComment(comment) {
    const Schema = Joi.object({
        text: Joi.String().min(5).max(1000).required(),
        // reply: Joi.String().required(),
        videoId: Joi.String().required(),
    });
    return Schema.validate(comment);
}
module.exports = Comment;
module.exports = validateComment;