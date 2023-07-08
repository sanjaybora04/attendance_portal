const router = require("express").Router();
const fetchuser = require('../../middleware/auth-check')
const Attendance = require("../../db/models/attendancemodel");

// get attendance percentage
router.post('/stats', fetchuser, async (req, res) => {
    try {

        const all = await Attendance.find({ subject: { $in: req.user.subjects } }).find(req.body).distinct('createdAt')
        const attended = await Attendance.find({ subject: { $in: req.user.subjects }, student: req.user._id }).find(req.body).distinct('createdAt')

        const attendance = ((attended.length / all.length) * 100).toFixed(0)
        res.json({ attendance })

    } catch (err) {
        console.log(err)
        res.json({ error: "Internal Server Error" })
    }
})

module.exports = router;