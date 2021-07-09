const Comment = require('../models/comments');
const Reply = require('../models/reply');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        return res.send(comments);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.post('/', async (req, res) => {
    try {
        const comment = new Comment({
            text: req.body.text,
            likes: req.body.likes,
            dislikes: req.body.dislikes,
            videoId: req.body.videoId,
        });

        await comment.save();

        return res.send(comment);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
})

router.post('/:commentId/reply', async (req, res) => {
    try{
        const comment = await Comment.findById(req.params.commentId);
        if(!comment) return res.status(400).send(`The comment with id "${req.params.commentId} does not exit.`);

        const reply = new Reply({
            text: req.body.text,
        })

        await reply.save();

        comment.reply.push(reply);

        await comment.save();
        return res.send(comment.reply);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
})












module.exports = router;