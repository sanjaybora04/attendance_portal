const router = require("express").Router();
const Attendance = require('../../db/models/attendancemodel');
const Subject = require('../../db/models/subjectmodel')
const fetchuser = require('../../middleware/fetchuser')


router.post('/takeAttendance',fetchuser,(req,res)=>{
  Attendance.create({
    teacher:req.user._id,
    subject:req.body.subject_id,
    createdAt: Date.now(),
    expiresAt: Date.now()
  },(err,docs)=>{
    if(err){
        console.log(err)
        res.status(401).json({error:err})
    }
    else{
          res.json({alert:"Attendance Started"})
        }
    })
})

module.exports = router;