const router = require("express").Router();
const Subject = require('../../db/models/subjectmodel');
const fetchuser = require('../../middleware/fetchuser')


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
    class: req.body.class,
    teacher: req.user._id
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


router.post('/deleteSubject',async(req,res)=>{
  Subject.findByIdAndDelete(req.body.subject_id, function (err, docs) {
    if (err){
        console.log(err)
        res.status(401).json({error:err})
    }
    else{
        res.json({msg: "Deleted subject"});
    }
});
})

module.exports = router;