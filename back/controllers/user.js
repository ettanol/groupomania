const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const passwordValidator = require('password-validator')
const { set } = require('../app')
const dotenv = require('dotenv').config()

const User = require('../models/user')

exports.signup = async (req, res, next) => {
    const passwordSchema = new passwordValidator()
    passwordSchema
    .is().min(8, 'le mot de passe doit contenir 8 caractères minimum') // Minimum length 8
    .is().max(100, 'le mot de passe doit contenir 100 caractères maximum') // Maximum length 100
    .has().uppercase(1, 'le mot de passe doit contenir au moins une majuscule') // Must have uppercase letters
    .has().lowercase(1, 'le mot de passe doit contenir au moins une minuscule') // Must have lowercase letters
    .has().digits(2, 'le mot de passe doit contenir au moins deux chiffres') // Must have at least 2 digits
    .has().not().spaces() // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123', 'Motdepasse', '12345678', '123456789']) // Blacklist these values
    if(passwordSchema.validate(req.body.password)){
        await bcrypt.hash(req.body.password, parseInt(process.env.saltRounds)) //creates a hash for the password
        .then(hash => { //get the hash and put it in the user object
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            profession: req.body.profession,
            email: req.body.email,
            isConnected : true,
            password: hash,
            numberOfAttempts: 0,
            numberOfBlocks: 0,
            timeOfBlock: 0,
        })
        user.save() //update to DB
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error : "Utilisateur déjà existant"}))
        })
    } else {
        res.status(403).json(passwordSchema.validate(req.body.password, {details: true})) //returns where the password was unsafe
    }
}

let minutesBlocked = 0
const databaseUpdate = (user, attempts, blocks, timeOfBlock) => {
    user.numberOfAttempts = attempts
    user.numberOfBlocks = blocks
    user.timeOfBlock = timeOfBlock
    user.save() //update to DB
}

exports.login= async (req, res, next) => {
    User.findOne({ email: req.body.email}) //checks if the email given exists in the DB
    .then(user => {
        if(!user) {
            return res.status(401).json({error: 'Utilisateur non trouvé'})
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            let attempts = user.numberOfAttempts
            let blocks = user.numberOfBlocks
            let timeOfBlock = user.timeOfBlock
            switch(blocks) { //define a number of minutes for which the user can't add a password
                case 0 : 
                    minutesBlocked = 0
                    break
                case  1 : 
                    minutesBlocked = 5 * 60 * 1000 //5 minutes
                    break
                case 2 :
                    minutesBlocked = 30 * 60 * 1000 //30 minutes 
                    break
                case 3: 
                    minutesBlocked = 24 * 60 * 60 * 1000 //24 hours (might be updated to infinite)
                    break
            }
            const currentTime = new Date().getTime() //get the time of the request
            if((currentTime - (timeOfBlock + minutesBlocked)) > 0) { //if the user tries after the amount of time provided below
                if(!valid) { //if the password isn't valid
                    attempts++
                    if(attempts > 4) { //if there's too many attempts
                        timeOfBlock = new Date().getTime() //set a time from which the user will be blocked
                        blocks++ //the user is now blocked, and the time of blocking will vary consequently
                        attempts = 0 //allow the user to make 5 attempts again after
                        databaseUpdate(user, attempts, blocks, timeOfBlock)
                        return res.status(403).json({error : "Trop d'essais ont été effectués"})
                    }
                    databaseUpdate(user, attempts, blocks, timeOfBlock)
                    return res.status(401).json({error: 'mot de passe incorrect'})
                } else { //if the password is valid
                    attempts = 0
                    blocks = 0
                    timeOfBlock = 0
                    databaseUpdate(user, attempts, blocks, timeOfBlock)
                    res.status(200).json({ //if the password is correct
                    email : user.email,
                    token: JWT.sign( // create a token which expires every 24h
                    { email: user.email},
                    process.env.JWT_SECRET,
                    { expiresIn: '24h'}
                    )
                    })
                }
            } else {
                return res.status(401).json({error: `Veuillez attendre ${minutesBlocked / 60000} minutes avant un nouvel essai`})
            }
        })
        .catch(error => res.status(500).json({error}))
    })
    .catch(error => res.status(500).json({error}))
}

exports.getAllPosts = async (req, res, next) => { // get all object
    User.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error }))
}

exports.getUserAccount = async (req, res, next) => {//get the specific user from DB
    const token = req.headers.Authorization
    const decodedToken = JWT.verify(token, process.env.JWT_SECRET) //verifies if the token is correct
    const email = req.params.email
    const decodedEmail = JWT.verify(email, process.env.JWT_SECRET)
    if (decodedToken && decodedEmail){
        User.findOne({ email: req.params.email})
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error}))
    }
}

