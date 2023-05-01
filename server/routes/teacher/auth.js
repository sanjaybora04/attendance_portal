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
], (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ alerts: errors.array() });
  }

  OTP.findOne({email:req.body.email},(err,doc)=>{
    if(req.body.otp == doc.otp){
      Teacher.findOne({ email: req.body.email }, async(err, docs)=>{
        if (docs) {
          return res.json({ alert: "A user with this email already exists" })
        }
        else {
          // check teacher's data is present in teacherList
          if(teacherList[req.body.email]){
            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            // Create a new teacher
            Teacher.create({
              email: req.body.email,
              password: secPass,
              subjects: [],
              ...teacherList[req.body.email]
            },(err, teacher)=>{
              if (err) {
                console.log(err)
                res.status(401).json({ error: err })
              }
              else {
                teacher = {
                  _id: teacher._id,
                  usertype: 'teacher'
                }
                const authtoken = jwt.sign(teacher, JWT_SECRET);
                res.json({ authtoken })
              }
            });
          }
          else{
            res.json({alert: req.body.email+" not found in teacher list"})
          }
        }
      });
    }
    else{
      console.log(req.body.otp)
      console.log(req.body.email)
      res.json({alert:"Incorrect Otp!"})
    }
  })

})

router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ alerts: errors.array() });
  }

  Teacher.findOne({ email: req.body.email }, (err, teacher) => {
    if (teacher) {
      bcrypt.compare(req.body.password,teacher.password,(err,match)=>{
        if(match){
          teacher = {
            _id: teacher._id,
            usertype: 'teacher'
          }
          const authtoken = jwt.sign(teacher, JWT_SECRET);
          res.json({ authtoken })
        }
        else{
          res.json({alert:"Incorrect Password"})
        }
      })
    }
    else {
      res.json({ alert: "Email not found!!!" })
    }
  })
})

module.exports = router;