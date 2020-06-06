const express = require('express');
const router = express.Router();
const auth = require('../middlewere/auth');
const { user } = require('../models/user');
router.post("/register", (req, res) => {

    const userDetail = new user(req.body);
    const email = req.body.email;
    user.find({ email: email }, (err, data) => {
        if (data)
            return res.json({
                success: false,
                messege: "Already signed up"
            })
        userDetail.save((err, doc) => {
            if (err) {
                console.log(err)
                return res.json({ success: false, err })
            }
            return res.status(200).json({
                success: true
            })
        })
    })
})
router.post("/login", (req, res) => {
    console.log(req.body)
    user.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Authentication failed, email is not found"
            })
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({
                    loginSuccess: false,
                    message: "You Entered Wrong Password"
                })
            user.generateToken((err, user) => {
                if (err)
                    return res.status(400).send(err);
                res
                    .status(200)
                    .json({
                        loginSuccess: true,
                        userId: user._id
                    });
            });
        });
    });
});

router.get("/logout/:id", auth, (req, res) => {
    user.findByIdAndUpdate({ _id: req.params.id },
        { token: "" }, (err, doc) => {
            if (err)
                return res.json({ success: false, err })

            return res.status(200).send({
                success: true
            });
        })
})
module.exports = router;