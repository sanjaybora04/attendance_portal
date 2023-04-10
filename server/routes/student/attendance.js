const router = require("express").Router();
const fetchuser = require("../../middleware/fetchuser")
const fs = require('fs')
const { Blob } = require('buffer');

const path = require('path')
const multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/home/anonymous/Desktop/Attendance-system/server/uploads/') // remove hard coded string
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})
var upload = multer({ storage: storage });

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

router.post("/markAttendance", fetchuser, upload.single('image'), (req, res) => {
    // Check if attendance session is live
    Attendance.findOne({ subject: req.body.subject_id, expiresAt: { $ne: null }}, function (err, attendance) {
        if (attendance) {
            //Check if student has already marked attendance
            Attendance.findOne({createdAt:attendance.createdAt,student:req.user._id},(err,data)=>{
                if(data){
                    res.json({msg:"Your attendance is already marked"})
                }
                else{
                    //converting image from buffer to blob because flask doesnt read formdata if its buffer
                    const img1=null
                    const img2=null
                    try{
                        const img1_buffer = fs.readFileSync(req.user.image.path);
                        img1 = new Blob([img1_buffer], { type: req.user.image.mimetype });
                    }catch{
                        fs.unlinkSync(req.file.path)
                        return res.json({msg:"Please Set your profile image"})
                    }
                    try{
                        const img2_buffer = fs.readFileSync(req.file.path);
                        img2 = new Blob([img2_buffer], { type: req.user.image.mimetype });
                        fs.unlinkSync(req.file.path)
                    }catch{
                        return res.json({msg:"Cannot retrieve image"})
                    }
                
                    
                    const formData = new FormData()
                    formData.append('img1',img1,{filename:"img1.jpeg"})
                    formData.append('img2',img2,{filename:"img2.jpeg"})
                    
                    fetch('http://localhost:7000/comparefaces', {
                        method: 'POST',
                        body: formData
                    }).then((response) => response.json())
                    .then((data) => {
                        if(data.match==true){
                            Attendance.create({
                                subject: attendance.subject,
                                teacher: attendance.teacher,
                                createdAt: attendance.createdAt,
                                student: req.user._id
                            }, function (err, data) {
                                if (err) {
                                    console.log(err)
                                    res.status(401).json({ error: err })
                                }
                                else {
                                    res.json({ msg: "Attendance marked" })
                                }
                            })
                        }
                    })
                    .catch((err) => {
                        res.json({msg:"Face doesn't match"})
                        console.log(err.message);
                    });
                }
            })
        }
        else {
            res.json({ msg: 'Attendance Session is over' })
        }
    })
})

module.exports = router;