const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    post: {
        type: String,
    },
    comment: [{
        name: {
            type: String
        },
        comment: {
            type: String
        },

    }]



})

const post = mongoose.model('post', postSchema)

module.exports = { post };




