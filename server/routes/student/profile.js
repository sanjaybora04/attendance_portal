const router = require("express").Router();
const fetchuser = require('../../middleware/fetchuser')
const Student = require('../../db/models/studentmodel')

const path = require('path')
const multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/home/anonymous/Desktop/Attendance-system/server/uploads/') // remove hard coded string
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})
var upload = multer({ storage: storage });


router.post('/updateProfile', fetchuser, upload.single('image'), (req, res) => {
    Student.findByIdAndUpdate(req.user._id, {
        class: req.body.class,
        image: {
            path: req.file.path,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype
        }
    }, function (err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            res.json({ msg: "successfully updated" })
        }
    })
})

module.exports = router;