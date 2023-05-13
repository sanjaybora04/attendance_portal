const router = require("express").Router();
const keys = require('../../config/keys')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = keys.JWT.secret
const Teacher = require('../../db/models/teachermodel');
const OTP = require('../../db/models/otpmodel')
const teacherList = require('../../config/teacherlist')

router.post('/signup', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ alerts: errors.array() });
  }

  try {

    const doc = await OTP.findOne({ email: req.body.email })
    if (req.body.otp == doc.otp) {
      const docs = await Teacher.findOne({ email: req.body.email })
      if (docs) {
        res.json({ alert: "A user with this email already exists" })
      }
      else {
        // check teacher's data is present in teacherList
        if (teacherList[req.body.email]) {
          // Encrypt password
          const salt = await bcrypt.genSalt(10);
          const secPass = await bcrypt.hash(req.body.password, salt);
          // Create a new teacher
          let teacher = await Teacher.create({
            email: req.body.email,
            password: secPass,
            subjects: [],
            ...teacherList[req.body.email]
          })
          teacher = {
            _id: teacher._id,
            usertype: 'teacher'
          }
          const authtoken = jwt.sign(teacher, JWT_SECRET);
          res.json({ authtoken })
        }
        else {
          res.json({ alert: req.body.email + " not found in teacher list" })
        }
      }
    }
    else {
      console.log(req.body.otp)
      console.log(req.body.email)
      res.json({ alert: "Incorrect Otp!" })
    }

  } catch (err) {
    console.log(err)
    res.json({ error: "Internal Server Error" })
  }
})

router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ alerts: errors.array() });
  }

  try {

    let teacher = await Teacher.findOne({ email: req.body.email })
    if (teacher) {
      const match = await bcrypt.compare(req.body.password, teacher.password)
      if (match) {
        teacher = {
          _id: teacher._id,
          usertype: 'teacher'
        }
        const authtoken = jwt.sign(teacher, JWT_SECRET);
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