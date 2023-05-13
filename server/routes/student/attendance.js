const router = require("express").Router();
const fetchuser = require("../../middleware/fetchuser")
const location = require('../../config/keys').location

const Subject = require('../../db/models/subjectmodel')
const Attendance = require("../../db/models/attendancemodel")


router.post('/getLiveClasses', fetchuser, async (req, res) => {
    try {

        const data = await Attendance.find({ subject: { $in: req.user.subjects }, expiresAt: { $ne: null } })
        const subjects = await Subject.find({ _id: { $in: data.map(data => data.subject) } })
        res.json(subjects)

    } catch (err) {
        console.log(err)
        res.json({ error: "Internal Server Error" })
    }
})


const compareLocations = (loc) => {
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

router.post("/markAttendance", fetchuser, async (req, res) => {
    try {

        // Check if attendance session is live
        const attendance = await Attendance.findOne({ subject: req.body.subject_id, expiresAt: { $ne: null } })
        if (attendance) {
            let data = await Attendance.findOne({ createdAt: attendance.createdAt, student: req.user._id })
            if (data) {
                res.json({ alert: "Your attendance is already marked" })
            }
            else {
                //verify location
                if (compareLocations(req.body.location)) {
                    // verify face                    
                    fetch('http://127.0.0.1:7000/comparefaces', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            img1: req.user.image,
                            img2: req.body.image
                        })
                    }).then((response) => response.json())
                        .then(async(data) => {
                            if (data.match == true) {
                                // Mark Attendance
                                data = await Attendance.create({
                                    subject: attendance.subject,
                                    teacher: attendance.teacher,
                                    createdAt: attendance.createdAt,
                                    student: req.user._id
                                })
                                res.json({ alert: "Attendance marked" })
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
                else {
                    res.json({ alert: "You can only mark your attendance, if you are inside college campus" })
                }
            }
        }
        else {
            res.json({ alert: 'Attendance Session is not live!!!' })
        }

    } catch (err) {
        console.log(err)
        res.json({ error: "Internal Server Error" })
    }
})

module.exports = router;