const express = require('express');
const router = express.Router();
const { post } = require('../models/post');
const { user } = require('../models/user')
const auth = require('../middlewere/auth');
router.get("/view-post/:id", auth, (req, res) => {
    post.find({}, function (err, result) {
        res.json(result)
    })

})


router.post("/add-post/:id", auth, (req, res) => {
    var userId = req.body.id;
    console.log(req.body)
    user.findById({ _id: userId }, (err, result) => {
        if (err)
            throw err
        console.log(result)
        var postDetail = {
            name: result.name,
            post: req.body.post,
        }
        const data = new post(postDetail);
        data.save((err, doc) => {
            if (err)
                throw err;
            res.json("Posted Succefully")
        })
    })
})
router.get("/fetch-post/:postid/:id", auth, (req, res) => {
    console.log(req.params.postid)
    post.findById({ _id: req.params.postid }, (err, result) => {
        console.log(result)
        res.json(result)
    })
})
router.post("/add-comment/:id", auth, (req, res) => {

    var postId = req.body.id;
    var myId = req.body.myId
    var postComment = req.body.comment;
    user.findById({ _id: myId }, (err, result) => {

        var name = result.name;
        post.findById({ _id: postId }, (err, result) => {
            dataToSave = {
                name: name,
                comment: postComment
            }
            console.log(dataToSave)
            var commentArray = new Array()
            commentArray = result.comment;
            commentArray.push(dataToSave);
            result.comment = commentArray;
            result.save((err, doc) => {
                if (err)
                    throw err;
                res.json("You Have commented Succefully")
            })
        })
    })
})


module.exports = router;