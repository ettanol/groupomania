const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    profession: {
        type: String,
    },
    email : {
        type: String,
        required : true,
        unique : true, //users can't add the same adress to the server
    }, 
    isAdmin: {
        type: Boolean,
    },
    profileImageUrl : {
        type: String,
    },
    isConnected : {
        type: Boolean,
    },
    password : {
        type: String,
        required : true,
    },
    numberOfAttempts: {
        type: Number,
    },
    numberOfBlocks: {
        type: Number,
    },
    timeOfBlock: {
        type: Number,
    }
})

userSchema.plugin(uniqueValidator) 

module.exports = mongoose.model('User', userSchema)