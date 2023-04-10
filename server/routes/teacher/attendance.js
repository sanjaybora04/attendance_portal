const router = require("express").Router();
const Attendance = require('../../db/models/attendancemodel');
const fetchuser = require('../../middleware/fetchuser')


router.post('/takeAttendance',fetchuser,(req,res)=>{
  Attendance.create({
    teacher:req.user._id,
    subject:req.body.subject_id,
    expiresAt:new Date(Date.now() + 5*60*1000) // 5 minutes from now
  },function(err,docs){
    if(err){
        console.log(err)
        res.status(401).json({error:err})
    }
    else{
        res.json({msg:"Attendance Started"})
    }
  })
})

module.exports = router;