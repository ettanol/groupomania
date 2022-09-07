const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    user: {type: String},
    userId: {type: String},
    value: {type: String, required: true},
    timeOfUpload: {type: String},
    imageUrl: {type: String},
    likes: {type: Number},
    dislikes: {type: Number},
    usersLiked: {type: Array},
    usersDisliked: {type: Array},
})

module.exports = mongoose.model('Post', postSchema)