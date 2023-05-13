const router = require("express").Router();
const fetchuser = require('../../middleware/fetchuser')
const Student = require('../../db/models/studentmodel')
const Subject = require('../../db/models/subjectmodel');
const Attendance = require("../../db/models/attendancemodel");

// updates student profile
router.post('/updateProfile', fetchuser, async (req, res) => {
    try {

        await Student.findByIdAndUpdate(req.user._id, {
            name: req.body.name,
            image: req.body.image,
        })
        res.json({ msg: "Profile updated" })

    } catch (err) {
        console.log(err)
        res.json({ error: "Internal Server Error" })
    }
})

// returns student user profile
router.post('/getProfile', fetchuser, (req, res) => {
    res.json(req.user)
})

// returns the list of subjects and the list of subject_ids with live attendance
router.post('/getSubjects', fetchuser, async (req, res) => {
    try {

        const subjects = await Subject.find({ _id: { $in: req.user.subjects } })
        const docs = await Attendance.find({ subject: { $in: req.user.subjects }, expiresAt: { $ne: null } })

        let live = []
        docs.forEach((doc) => {
            live = [...live, doc.subject]
        })
        res.json({ subjects, live })
    } catch (err) {
        console.log(err)
        res.json({ error: "Internal Server Error"})
    }
})

module.exports = router;