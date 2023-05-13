const router = require("express").Router();
const Attendance = require('../../db/models/attendancemodel');
const Subject = require('../../db/models/subjectmodel')
const fetchuser = require('../../middleware/fetchuser')


router.post('/takeAttendance', fetchuser, async (req, res) => {
  try {

    await Attendance.create({
      teacher: req.user._id,
      subject: req.body.subject_id,
      createdAt: Date.now(),
      expiresAt: Date.now()
    })
    res.json({ alert: "Attendance Started" })

  } catch (err) {
    console.log(err)
    res.json({ error: "Internal Server Error" })
  }
})

module.exports = router;