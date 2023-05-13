const router = require("express").Router();
const fetchuser = require('../../middleware/fetchuser')
const Teacher = require('../../db/models/teachermodel')
const Subject = require('../../db/models/subjectmodel')

// Update profile Data
router.post('/updateProfile', fetchuser, async(req, res) => {
  try{

  let docs = await Teacher.findByIdAndUpdate(req.user._id, {
        name: req.body.name,
        image: req.body.image,
    })
  res.json({ msg: "Profile updated" })
  
  }catch(err){
    console.log(err)
    res.json({error:"Internal Server error"})
  }
})

router.post('/getProfile', fetchuser, (req, res) => {
    res.json(req.user)
})

// get subjects
router.post('/getSubjects',fetchuser,async(req,res)=>{
  try{
  
  const docs = await Subject.find({teacher:req.user._id})
  res.json(docs)
  
  }catch(err){
    console.log(err)
    res.json({error:"Internal Server Error"})
  }
  })

// Add new subject
router.post('/addSubject',fetchuser,async(req,res)=>{
    try{

    await Subject.create({
      name: req.body.name,
      course: req.body.course,
      teacher: req.user._id,
      teacher_name: req.user.name,
      students: []
    })
    res.json({msg:"Subject added"})
    
  }catch(err){
    console.log(err)
    res.json({error:"Internal Server Error"})
  }
 })
  
// TODO: delete from student and teacher document
router.post('/deleteSubject',async(req,res)=>{
    try{

    await Subject.findByIdAndDelete(req.body.subject_id)
    res.json({msg: "Subject Deleted!!!"});
    
    }catch(err){
      console.log(err)
      res.json({error:"Internal Server Error"})
    }
})

module.exports = router;