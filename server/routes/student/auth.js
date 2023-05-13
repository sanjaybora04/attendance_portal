const router = require("express").Router();
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys')

const JWT_SECRET = keys.JWT.secret
const Student = require('../../db/models/studentmodel')
const studentList = require("../../config/studentlist")
const OTP = require('../../db/models/otpmodel')


// Student Signup
router.post('/signup', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ alerts: errors.array() });
  }

  try {
    const doc = await OTP.findOne({ email: req.body.email, otp: req.body.otp })
    if (req.body.otp == doc.otp) {
      const student = await Student.findOne({ email: req.body.email })
      if (student) {
        return res.json({ alert: "A user with this email already exists" })
      }
      else {
        // check if student data is present in studentlist
        if (studentList[req.body.email]) {
          // Encrypt password
          const salt = await bcrypt.genSalt(10);
          const secPass = await bcrypt.hash(req.body.password, salt);
          // Create a new user
          let student = await Student.create({
            email: req.body.email,
            password: secPass,
            subjects: [],
            ...studentList[req.body.email]
          })
          student = {
            _id: student._id,
            usertype: 'student'
          }
          const authtoken = jwt.sign(student, JWT_SECRET);
          res.json({ authtoken })
        }
        else {
          res.json({ alert: req.body.email + " not found in student list" })
        }
      }
    }
    else {
      res.json({ alert: "Incorrect Otp!" })
    }

  } catch (err) {
    console.log(err)
    res.json({ error: "Internal Server Error" })
  }
})


// Student login
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ alerts: errors.array() });
  }

  try {

    let student = await Student.findOne({ email: req.body.email })
    if (student) {
      const match = await bcrypt.compare(req.body.password, student.password)
      if (match) {
        student = {
          _id: student._id,
          usertype: 'student'
        }
        const authtoken = jwt.sign(student, JWT_SECRET);
        res.json({ authtoken })
      }
      else {
        res.json({ alert: "Incorrect Password" })
      }
    }
    else {
      res.json({ alert: "Email not found!!!" })
    }
    
  }catch(err){
    console.log(err)
    res.json({error:"Internal Server Error"})
  }
})

module.exports = router;