
const User = require('./userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {
  try {
    console.log(req.body)
    const { name, email, password } = req.body
    const checkEmail = await User.findOne({ email: req.body.email })

    if (checkEmail) {

      res.json({ emailUsed: 'Email already used' })

    }
    else {
      console.log("create")
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        isAdmin: false
      })

      await newUser.save()
      res.status(200).json({ message: 'User created successfully' });
    }
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to create user' });
  }
}


const verifyUser = async (req, res) => {
  try {
    const { email, password } = req.body
    
    const userData = await User.findOne({ email: email })
    if (userData && userData.isAdmin===false) {

      const isMatch = await bcrypt.compare(password, userData.password)
      if (isMatch) {
        const token = jwt.sign(req.body, 'mysecretkey');
        res.json({ userId: userData._id, userToken: token })
      }
      else {
        res.json({ passMatch: "Password is incorrect" })
      }
    }
    else {
      res.json({ emailMatch: "Email not found" })
    }

  } catch (error) {
    console.log(error)
  }
}


const fetchUser = async (req, res) => {
  try {
    const userId = req.query.id
    await User.findOne({ _id: userId }, { name: 1, email: 1, _id: 0, image: 1 })
      .then((data) => {
        res.json({ userDetails: data })
      })
  } catch (error) {
    console.log(error)
  }
}

const imageUpload = async (req, res) => {
  try {
    const id = req.query.id
    const image = req.file.filename
    await User.updateOne({ _id: id }, { $set: { image: image } })
    res.json({ message: 'Image added' })
  } catch (error) {
    console.log(error)
  }
}

const verifyAdmin = async(req,res)=>{
  try {
    const { email, password } = req.body
    
    const adminData = await User.findOne({ email: email })
    if (adminData && adminData.isAdmin===true) {
      const isMatch = await bcrypt.compare(password, adminData.password)
      if (isMatch) {
        const token = jwt.sign(req.body, 'mysecretkey');
        res.json({ adminId: adminData._id, adminToken: token })
      }
      else {
        res.json({ passMatch: "Password is incorrect" })
      }
    }
    else {
      res.json({ emailMatch: "Email not found" })
    }
    } catch (error) {
    console.log(error)
  }
}


const fetchAllUsers = async(req,res)=>{

    try {
      const userDatas = await User.find({ isAdmin: false })
      res.json({ users: userDatas })
  } catch (error) {
    console.log(error.message)
    res.json(error)
  }
}

const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body
    await User.findOneAndUpdate({ email: email }, { $set: { name: name, email: email } })
      .then(() => {
        res.json({ message: 'User updated successfully' })
      })
  } catch (error) {
    console.log(error)
  }
}

const deleteUser = async (req, res) => {
  try {
    const userId = req.query.id
    await User.findByIdAndDelete(userId)
      .then(() => {
        res.json({ message: "User Deleted!" })
      })
  } catch (error) {
    console.log(error)
  }
}

const newUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const checkMail = await User.findOne({ email: email })

    if (checkMail) {
      res.json({ emailUsed: 'Email already used' })
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        isAdmin: false
      });

      await newUser.save()
      res.status(200).json({ message: 'User created successfully' });
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to create user' });
  }
}

const imageDelete = async (req, res) => {
  try {
    const id = req.query.id
    await User.updateOne({ _id: id }, { $unset: { image: '' } })
    res.json({ message: 'image removed' })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
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
}