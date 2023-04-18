const router = require("express").Router();
const fetchuser = require('../../middleware/fetchuser')
const Teacher = require('../../db/models/teachermodel')
const Subject = require('../../db/models/subjectmodel')

router.post('/updateProfile', fetchuser, (req, res) => {
    Teacher.findByIdAndUpdate(req.user._id, {
        name: req.body.name,
        image: req.body.image,
    }, function (err, docs) {
        if (err) {
            console.log(err)
            res.status(401).json({error:"Error!!!"})
        }
        else {
          res.json({ msg: "Profile updated" })
        }
    })
})

router.post('/getProfile', fetchuser, (req, res) => {
    res.json(req.user)
})

// Subjects

router.post('/getSubjects',fetchuser,(req,res)=>{
    Subject.find({teacher:req.user._id},function(err,docs){
      if (err){
        console.log(err)
        res.status(401).json({error:err})
      }
      else{
        res.json(docs)
      }
    })
  })
  
  router.post('/addSubject',fetchuser,async(req,res)=>{
    Subject.create({
      name: req.body.name,
      course: req.body.course,
      teacher: req.user._id,
      teacher_name: req.user.name,
      students: []
    },function(err,docs){
      if(err){
        console.log(err)
        res.status(401).json({error:err})
      }
      else{
        res.json({msg:"Subject added"})
      }
    })       
  })
  
  // TODO: delete from student and teacher document
  router.post('/deleteSubject',async(req,res)=>{
    Subject.findByIdAndDelete(req.body.subject_id, function (err, docs) {
      if (err){
          console.log(err)
          res.status(401).json({error:err})
      }
      else{
          res.json({msg: "Subject Deleted!!!"});
      }
  });
  })

module.exports = router;