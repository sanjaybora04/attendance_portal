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
], (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ alerts: errors.array() });
  }

  OTP.findOne({email:req.body.email,otp:req.body.otp},(err,doc)=>{
    if(doc){
      Student.findOne({ email: req.body.email }, async (err, student) => {
        if (student) {
          return res.json({ alert: "A user with this email already exists" })
        }
        else {
          // check if student data is present in studentlist
          if(studentList[req.body.email]){
            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            // Create a new user
            Student.create({
              email: req.body.email,
              password: secPass,
              subjects: [],
              ...studentList[req.body.email]
            }, function (err, student) {
              if (err) {
                console.log(err)
                res.status(401).json({ error: err })
              }
              else {
                student = {
                  _id: student._id,
                  usertype: 'student'
                }
                const authtoken = jwt.sign(student, JWT_SECRET);
                res.json({ authtoken })
              }
            });
          }
          else{
            res.json({alert: req.body.email+" not found in student list"})
          }
        }
      });
    }
    else{
      res.json({alert:"Incorrect Otp!"})
    }
  })
})


// Student login
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ alerts: errors.array() });
  }

  Student.findOne({ email: req.body.email}, (err, student) => {
    if (student) {
      bcrypt.compare(req.body.password, student.password, (err, match) => {
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
      })
    }
    else {
      res.json({ alert: "Email not found!!!" })
    }
  })
})

module.exports = router;