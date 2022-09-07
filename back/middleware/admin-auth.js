const JWT = require('jsonwebtoken')
const dotenv = require('dotenv').config()

module.exports = async (req, res, next) => {
        try {
            const token = req.headers.authorization
            const decodedToken = JWT.verify(token, process.env.JWT_SECRET) //verifies if the token is correct
            const isAdmin = decodedToken.isAdmin
            req.auth = { isAdmin } //creates a params to verify the isAdmin
            if (req.body.isAdmin && isAdmin === true) {
            res.status(403).json({error: new Error("Utilisateur non administrateur")})
            } else {
            next()
            }
        } catch {
            res.status(401).json({ error: new Error('something went wrong') })
        }
}