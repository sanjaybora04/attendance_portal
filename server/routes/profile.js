const router = require("express").Router();
const authCheck = require('../middleware/auth-check')
const User = require('../db/models/usermodel')
const Class = require('../db/models/classmodel');
const Attendance = require("../db/models/attendancemodel");

// update profile
router.post('/updateProfile', authCheck, async (req, res) => {
    try {

        await User.findByIdAndUpdate(req.user._id, {
            name: req.body.name,
            profilePicture: req.body.image,
        })
        res.json({ success: "Profile updated" })

    } catch (err) {
        console.log(err)
        res.json({ error: "Internal Server Error" })
    }
})

// returns user profile
router.post('/getProfile', authCheck, async(req, res) => {
    const user = await User.findById(req.user._id)
    res.json(user)
})

// returns the list of classes and the list of class _ids with live attendance
router.post('/getClasses', authCheck, async (req, res) => {
    try {

        const subjects = await Class.find({ _id: { $in: req.user.subjects } })
        const docs = await Attendance.find({ subject: { $in: req.user.subjects }, expiresAt: { $ne: null } })

        let live = []
        docs.forEach((doc) => {
            live = [...live, doc.subject]
        })
        res.json({ subjects, live })
    } catch (err) {
        console.log(err)
        res.json({ error: "Internal Server Error" })
    }
})

// get My Classes
router.post('/getMyClasses', authCheck, async (req, res) => {
    try {

        const docs = await Class.find({ teacher: req.user._id })
        res.json(docs)

    } catch (err) {
        console.log(err)
        res.json({ error: "Internal Server Error" })
    }
})

// Create new Class
router.post('/addClass', authCheck, async (req, res) => {
    try {

        await Class.create({
            name: req.body.name,
            teacher: req.user._id,
            teacher_name: req.user.name,
            students: []
        })
        res.json({ success: "New Class Created" })

    } catch (err) {
        console.log(err)
        res.json({ error: "Internal Server Error" })
    }
})

// Delete a Class
// Todo: set timer of some days to delete and hide from the user dashboard, so that it can be recovered if needed
router.post('/deleteClass', async (req, res) => {
    try {

        await Class.findByIdAndDelete(req.body.class_id)
        res.json({ success: "Class Deleted!!!" });

    } catch (err) {
        console.log(err)
        res.json({ error: "Internal Server Error" })
    }
})

module.exports = router;