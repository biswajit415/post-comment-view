const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minglength: 5
    },

    token: {
        type: String,
    },

})
userSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.hash(user.password, 10, function (err, hash) {
            if (err)
                return next(err);
            user.password = hash;
            next()
        })
    } else {
        next()
    }
});

userSchema.methods.comparePassword = function (plainpassword, cb) {
    bcrypt.compare(plainpassword, this.password, (err, isMatch) => {
        if (err)
            return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function (cb) {
    var user = this;
    var token = jwt.sign({ data: user._id },
        'secret');
    user.token = token;

    user.save((err, user) => {
        if (err)
            return cb(err)
        cb(null, user)
    })
}


const user = mongoose.model('user', userSchema)

module.exports = { user };



