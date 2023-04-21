const router = require("express").Router();
const fetchuser = require('../../middleware/fetchuser')
const Attendance = require("../../db/models/attendancemodel");

// get overall attendance
router.post('/stats', fetchuser, (req, res) => {
    Attendance.find({ subject: { $in: req.user.subjects } }).find(req.body).distinct('createdAt', (err, all) => {
        if (all) {
            Attendance.find({ subject: { $in: req.user.subjects }, student: req.user._id }).find(req.body).distinct('createdAt', (err, attended) => {
                if (attended) {
                    const attendance = ((attended.length/all.length)*100).toFixed(0)
                    console.log(attendance)
                    res.json({attendance})
                }
                else {
                    console.log(err)
                    res.status(401).json({ alert: "Internal server error" })
                }
            })
        }
        else {
            console.log(err)
            res.status(401).json({ alert: "Internal server error" })
        }
    })
})

module.exports = router;