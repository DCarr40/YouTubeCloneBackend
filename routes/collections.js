const { Comment, validateComment } = require('../models/comments');
const { Reply, validateReply } = require('../models/reply');
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

router.get('/:videoId', async (req, res) => {
    try {
        const comments = await Comment.find();
        return res.send(comments);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});



router.post('/', async (req, res) => {
    try {
        const { error } = validateComment(req.body);
        if (error)
            return res.status(400).send(error);
        //TODO: Validation!
        const comment = new Comment({
            text: req.body.text,
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
        const { error } = validateReply(req.body);
        if (error)
            return res.status(400).send(error);
        //TODO: Validation!
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

router.put('/like/:commentId', async (req,res) => {
    try{
        const comment = await Comment.findById(req.params.commentId)
        comment.like = comment.like + 1
        await comment.save()
        return res.status(200).send(comment)

    } catch(err){
        return res.status(500).send(`Internal Server Error: ${err}`);
    }

})


router.put('/dislike/:commentId', async (req,res) => {
    try{
        const comment = await Comment.findById(req.params.commentId)
        comment.dislike = comment.dislike + 1
        await comment.save()
        return res.status(200).send(comment)

    } catch(err){
        return res.status(500).send(`Internal Server Error: ${err}`);
    }

})








module.exports = router;