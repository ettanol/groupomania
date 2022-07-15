const JWT = require('jsonwebtoken')
const dotenv = require('dotenv').config()

module.exports = async (req, res, next) => {
        try {
            const token = req.headers.authorization
            const decodedToken = JWT.verify(token, process.env.JWT_SECRET) //verifies if the token is correct
            const email = decodedToken.email
            req.auth = { email } //creates a params to verify the email
            if (req.body.email && req.body.email !== email) {
            res.status(403).json({error: new Error("Email utilisateur invalide")})
            } else {
            next()
            }
        } catch {
            res.status(401).json({ error: new Error('something went wrong') })
        }
}