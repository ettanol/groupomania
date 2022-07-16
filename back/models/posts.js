const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    userId: { type: String},
    value: {type: String, required: true},
    timeOfUpload: {type: Number},
    user: {type: String},
    imageUrl: {type: String},
    likes: {type: Number},
    dislikes: {type: Number},
    usersLiked: {type: Array},
    usersDisliked: {type: Array},
})

module.exports = mongoose.model('Post', postSchema)