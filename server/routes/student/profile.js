const router = require("express").Router();
const fetchuser = require('../../middleware/fetchuser')
const Student = require('../../db/models/studentmodel')
const Subject = require('../../db/models/subjectmodel');
const Attendance = require("../../db/models/attendancemodel");

// updates student profile
router.post('/updateProfile', fetchuser, (req, res) => {
    Student.findByIdAndUpdate(req.user._id, {
        name: req.body.name,
        image: req.body.image,
    }, function (err, docs) {
        if (err) {
            console.log(err)
            res.status(401).json({error:"Error!!!"})
        }
        else {
            res.json({ msg: "Profile updated" })
        }
    })
})

// returns student user profile
router.post('/getProfile', fetchuser, (req, res) => {
    res.json(req.user)
})

// returns the list of subjects and the list of subject_ids with live attendance
router.post('/getSubjects', fetchuser, (req, res) => {
    Subject.find({_id:{$in:req.user.subjects}},(err,subjects)=>{
        if(err){
            console.log(err)
            res.status(401).json({error:err})
        }
        else{
            Attendance.find({subject:{$in:req.user.subjects},expiresAt:{$ne:null}},(err,docs)=>{
                if(err){
                    console.log(err)
                    res.status(401).json({error:err})
                }
                else{
                    let live = []
                    docs.forEach((doc)=>{
                        live = [...live,doc.subject]
                    })
                    res.json({subjects,live})
                }
            })
        }
    })
})

module.exports = router;