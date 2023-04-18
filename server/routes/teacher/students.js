const router = require("express").Router();
const Subject = require('../../db/models/subjectmodel');
const Student = require('../../db/models/studentmodel')
const fetchuser = require('../../middleware/fetchuser')

router.post('/getStudents', fetchuser, async (req, res) => {
  Subject.findById(req.body.subject_id, function (err, subject) {
    if (err) {
      console.log(err)
      res.status(401).json({ error: err })
    }
    else {
      // get added students
      Student.find({ _id: { $in: subject.students } }, function (err, addedStudents) {
        if (err) {
          console.log(err)
          res.status(401).json({ error: err })
        }
        else {
          // get all students in course
          Student.find({ course: subject.course }, function (err, allStudents) {
            if (err) {
              console.log(err)
              res.status(401).json({ error: err })
            }
            else {
              res.json({subject,addedStudents,allStudents})
            }
          })
        }
      })
    }
  });
})

// Add Students to a subject
router.post('/updateStudents', fetchuser, (req, res) => {
  Subject.findByIdAndUpdate(req.body.subject_id, {
    students: req.body.students
  },function(err,docs){
    if (err){
      console.log(err)
      res.status(401).json({error:err})
    }
    else{
      Student.updateMany({ _id: { $in: req.body.students } }, {
        $push: { subjects: req.body.subject_id }
      },function(err,docs){
        if (err){
          console.log(err)
          res.status(401).json({error:err})
        }
        else{
          res.json({msg:"students updated"})
        }
      })
    }
  });
})

module.exports = router;