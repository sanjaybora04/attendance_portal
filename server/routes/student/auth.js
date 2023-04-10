const router = require("express").Router();
const keys = require('../../config/keys')
var jwt = require('jsonwebtoken');

const JWT_SECRET = keys.JWT.secret
const Student = require('../../db/models/studentmodel')

router.post('/signup', (req, res) => {
  Student.findOne({ email: req.body.email },function(err,student){
    if (student) {
      return res.json({ msg: "A user with this email already exists" })
    }
    else{
      // Create a new user
      Student.create({
        password: req.body.password,
        email: req.body.username,
        subjects: []
      },function(err,student){
        if(err){
          console.log(err)
          res.status(401).json({error:err})
        }
        else{
          student = {
            _id:student._id,
            usertype:'student'
          }
          const authtoken = jwt.sign(student, JWT_SECRET);
          res.json({ authtoken })
        }
      });
    }
  });
})

router.post('/login', (req, res) => {
  Student.findOne({ email: req.body.username, password: req.body.password },function(err,student){
    if(student){
      student = {
        _id: student._id,
        usertype: 'student'
    }
      const authtoken = jwt.sign(student, JWT_SECRET);
      res.json({ authtoken })
    }
    else{
      res.json({msg:"Incorrect Credentials!"})
    }
  })
})

module.exports = router;