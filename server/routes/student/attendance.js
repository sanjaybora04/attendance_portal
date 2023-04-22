const router = require("express").Router();
const fetchuser = require("../../middleware/fetchuser")
const location = require('../../config/keys').location

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


const compareLocations=(loc)=>{
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (loc.latitude * Math.PI) / 180; // latitude 1 in radians
    const φ2 = (location.latitude * Math.PI) / 180; // latitude 2 in radians
    const Δφ = ((location.latitude - loc.latitude) * Math.PI) / 180; // latitude difference in radians
    const Δλ = ((location.longitude - loc.longitude) * Math.PI) / 180; // longitude difference in radians

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) *
        Math.cos(φ2) *
        Math.sin(Δλ / 2) *
        Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // distance between the two locations in meters

    return d < 2000;
}

router.post("/markAttendance", fetchuser, (req, res) => {
    // Check if attendance session is live
    Attendance.findOne({ subject: req.body.subject_id, expiresAt: { $ne: null } }, function (err, attendance) {
        if (attendance) {
            //Check if student has already marked attendance
            Attendance.findOne({ createdAt: attendance.createdAt, student: req.user._id }, (err, data) => {
                if (data) {
                    res.json({ alert: "Your attendance is already marked" })
                }
                else {
                    //verify location
                    if(compareLocations(req.body.location)){
                        // verify face                    
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
                                if (data.match == true) {
                                    // Mark Attendance
                                    Attendance.create({
                                        subject: attendance.subject,
                                        teacher: attendance.teacher,
                                        createdAt: attendance.createdAt,
                                        student: req.user._id
                                    }, (err, data) => {
                                        if (err) {
                                            console.log(err)
                                            res.status(401).json({ error: err })
                                        }
                                        else {
                                            res.json({ alert: "Attendance marked" })
                                        }
                                    })
                                }
                                else {
                                    res.json({ alert: "Couldn't Match face!\nPlease update your profile image or try again" })
                                }
                            })
                            .catch((err) => {
                                console.log("Error fetching from flask app")
                                res.json({ alert: "Internal Server Error!!!" })
                            });
                    }
                    else{
                        res.json({alert: "You can only mark your attendance, if you are attending college"})
                    }
                }
            })
        }
        else {
            res.json({ alert: 'Attendance Session is not live!!!' })
        }
    })
})

module.exports = router;