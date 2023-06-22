const express = require('express')
const {
    createUser,
    verifyUser,
    fetchUser,
    imageUpload,
    verifyAdmin,
    fetchAllUsers,
    updateUser,
    deleteUser,
    newUser,
    imageDelete
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
router.post('/admin/login',verifyAdmin)
router.get('/fetchUsers',fetchAllUsers),
router.patch('/update',updateUser)
router.delete('/deleteUser',deleteUser)
router.post('/create',newUser)
router.route('/imageDelete').delete(imageDelete)

module.exports = router 