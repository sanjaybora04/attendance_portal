const router = require("express").Router();
const fetchuser = require("../../middleware/fetchuser")
const {Blob} = require('buffer')

const Subject = require('../../db/models/subjectmodel')
const Attendance = require("../../db/models/attendancemodel")


router.post('/getLiveClasses', fetchuser, (req, res) => {
    Attendance.find({ subject: { $in: req.user.subjects }, expiresAt: { $ne: null } }, function (err, data) {
        if (err) {
            console.log(err)
            res.status(401).json({ error: err })
        }
        else {
            Subject.find({ _id: { $in: data.map(data => data.subject) } }, function (err, subjects) {
                if (err) {
                    console.log(err)
                    res.status(401).json({ error: err })
                }
                else {
                    res.json(subjects)
                }
            })
        }
    })
})

router.post("/markAttendance", fetchuser, (req, res) => {
    // Check if attendance session is live
    Attendance.findOne({ subject: req.body.subject_id, expiresAt: { $ne: null }}, function (err, attendance) {
        if (attendance) {
            //Check if student has already marked attendance
            Attendance.findOne({createdAt:attendance.createdAt,student:req.user._id},(err,data)=>{
                if(data){
                    res.json({alert:"Your attendance is already marked"})
                }
                else{                    
                    fetch('http://localhost:7000/comparefaces', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                          },
                        body: JSON.stringify({
                            img1: req.user.image,
                            img2: req.body.image
                        })
                    }).then((response) => response.json())
                    .then((data) => {
                        if(data.match==true){
                            Attendance.create({
                                subject: attendance.subject,
                                teacher: attendance.teacher,
                                createdAt: attendance.createdAt,
                                student: req.user._id
                            },(err, data)=>{
                                if (err) {
                                    console.log(err)
                                    res.status(401).json({ error: err })
                                }
                                else {
                                    res.json({ alert: "Attendance marked" })
                                }
                            })
                        }
                        else{
                            res.json({alert:"Couldn't Match face!\nPlease update your profile image or try again"})
                        }
                    })
                    .catch((err) => {
                        console.log("Error fetching from flask app")
                        res.json({alert:"Internal Server Error!!!"})
                    });
                }
            })
        }
        else {
            res.json({ alert: 'Attendance Session is not live!!!' })
        }
    })
})

module.exports = router;