const router = require("express").Router();
const Subject = require('../../db/models/subjectmodel');
const Student = require('../../db/models/studentmodel')
const fetchuser = require('../../middleware/fetchuser')

// Get Students studying that subject
router.post('/getAddedStudents', fetchuser, async (req, res) => {
  Subject.findById(req.body.subject_id, function (err, data) {
    if (err) {
      console.log(err)
      res.status(401).json({ error: err })
    }
    else {
      Student.find({ _id: { $in: data.students } }, function (err, data) {
        if (err) {
          console.log(err)
          res.status(401).json({ error: err })
        }
        else {
          res.json(data)
        }
      })
    }
  });
})

// Get All the students in the class
router.post('/getClassStudents', fetchuser, async (req, res) => {
  Student.find({ class: req.body.class }, function (err, data) {
    if (err) {
      console.log(err)
      res.status(401).json({ error: err })
    }
    else {
      res.json(data)
    }
  })
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