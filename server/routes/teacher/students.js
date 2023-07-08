const router = require("express").Router();
const Subject = require('../../db/models/classmodel');
const Student = require('../../db/models/studentmodel')
const Attendance = require('../../db/models/attendancemodel')
const fetchuser = require('../../middleware/auth-check')
const { createObjectCsvStringifier } = require('csv-writer');

// get attendance of a student
const getAttendance = async (student, subjects) => {
  const all = await Attendance.find({ subject: { $in: subjects } }).distinct('createdAt')
  const attended = await Attendance.find({ subject: { $in: subjects }, student }).distinct('createdAt',)

  const attendance = ((attended.length / all.length) * 100).toFixed(0)

  return attendance
}

//get attendancelist of subject
router.post("/attendancelist", fetchuser, async (req, res) => {
  try {

    const subject = await Subject.findOne({ _id: req.body.subject_id })
    const students = await Student.find({ _id: { $in: subject.students } })

    const data = await Promise.all(students.map(async (student) => {
      const attendance = await getAttendance(student._id, [subject._id])
      return { name: student.name, attendance: attendance }
    }));

    // Create a CSV stringifier
    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: 'name', title: 'Name' },
        { id: 'attendance', title: 'Attendance' }
      ],
    });

    // Convert data to CSV format
    const csvData = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(data);

    // Set headers for file download
    res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    res.set('Content-Type', 'text/csv');
    res.send(csvData);

  } catch (err) {
    console.log(err)
    res.json({ error: "Internal Server Error" })
  }
})

router.post('/getStudents', fetchuser, async (req, res) => {
  try {

    const subject = await Subject.findById(req.body.subject_id)
    // get added students
    const addedStudents = await Student.find({ _id: { $in: subject.students } })
    // get all students in course
    const allStudents = await Student.find({ course: subject.course })
    res.json({ subject, addedStudents, allStudents })

  } catch (err) {
    console.log(err)
    res.json({ error: "Internal server error" })
  }
})

// Add Students to a subject
router.post('/updateStudents', fetchuser, async (req, res) => {
  try {

    let docs = await Subject.findByIdAndUpdate(req.body.subject_id, {
      students: req.body.students
    })
    docs = await Student.updateMany({ _id: { $in: req.body.students } }, {
      $push: { subjects: req.body.subject_id }
    })
    res.json({ msg: "students updated" })

  } catch (err) {
    console.log(err)
    res.json({ error: "Internal server error" })
  }

})

module.exports = router;