const router = require("express").Router();
const keys = require('../../config/keys')
var jwt = require('jsonwebtoken');

const JWT_SECRET = keys.JWT.secret
const Teacher = require('../../db/models/teachermodel');

router.post('/signup',(req,res)=>{
    Teacher.findOne({ email: req.body.email },function(err,docs){
      if (docs) {
        return res.json({ msg: "A user with this email already exists" })
      }
      else{
        // Create a new teacher
        Teacher.create({
          email: req.body.username,
          password: req.body.password,
          subjects: []
        },function(err,teacher){
          if(err){
            console.log(err)
            res.status(401).json({error:err})
          }
          else{
            const authtoken = jwt.sign(teacher.toJSON(), JWT_SECRET);
            res.json({authtoken})
          }
        });
      }
    });          
})

router.post('/login',(req,res)=>{
  Teacher.findOne({email:req.body.username,password:req.body.password},function(err,teacher){
    if(teacher){
      const authtoken = jwt.sign(teacher.toJSON(), JWT_SECRET);
      res.json({authtoken})
    }
    else{
      res.json({msg:"Incorrect Credentials!"})
    }
  })
})

module.exports = router;