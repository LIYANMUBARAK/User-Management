const express = require('express')
const {
    createUser,
    verifyUser,
    fetchUser,
    imageUpload
} = require('../user/userController')
const router = express.Router()

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage });



//routes
router.post('/register',createUser)
router.post('/login',verifyUser)
router.get('/profile',fetchUser)
router.post('/image',upload.single('image'), imageUpload)
module.exports = router 