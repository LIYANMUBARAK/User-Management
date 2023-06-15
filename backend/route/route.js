const express = require('express')
const {
    createUser,
    verifyUser
} = require('../user/userController')
const router = express.Router()


//routes
router.post('/register',createUser)
router.post('/login',verifyUser)


module.exports = router 