const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')
const auth = require('../middleware/auth')

router.post('/signup', userController.signup )
router.post('/login', userController.login)
router.post('/logout', auth, userController.logout)
router.put('/user/:email', auth, userController.updateProfile)
router.get('/user', auth, userController.getAllUsers)
router.get('/user/:email', auth, userController.getUserAccount)

module.exports = router