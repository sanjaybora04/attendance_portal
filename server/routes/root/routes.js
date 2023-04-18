const router = require("express").Router();
const { body, validationResult } = require('express-validator');
const otpGenerator = require('otp-generator')
const nodemailer = require('nodemailer')
const OTP = require('../../db/models/otpmodel')
const fetchuser = require('../../middleware/fetchuser')
const keys = require('../../config/keys')

var transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  port: 587, // port for secure SMTP
  secureConnection: true,
  auth: {
    user: keys.mail.email,
    pass: keys.mail.password
  }
});

router.post('/getotp',[
  body('email',"Enter a valid email").isEmail()
],(req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ alerts: errors.array() });
  }

  OTP.findOne({email:req.body.email},(err,doc)=>{
    if(doc){
      res.json({alert:'Wait till previous otp expires(5 minutes)'})
    }
    else{
      const otp = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
      
      transporter.sendMail({
        from: keys.mail.email, // sender email address
        to: req.body.email, // receiver email address
        subject: 'OTP Verification', // email subject
        text: `Your OTP is: ${otp}` // email body with the generated OTP
      }, (err, info) => {
        if (err) {
          console.error('Error sending OTP via email:', err);
        } else {
          OTP.create({
            email:req.body.email,
            otp: otp,
          },(err,data)=>{
            if(err){
              console.log(err)
            }
            else{
              res.json({alert:"Otp Sent!"})
            }
          })
        }
      })

    }
  })
})


router.get('/',(req, res) => {
  res.send('hello')
})


router.post('/getuser',fetchuser,(req, res) => {
  res.json({usertype:req.user.usertype})
})

module.exports = router;