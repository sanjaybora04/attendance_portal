const router = require("express").Router();
const fetchuser = require('../../middleware/fetchuser')
const Student = require('../../db/models/studentmodel')

router.post('/updateProfile', fetchuser, (req, res) => {
    Student.findByIdAndUpdate(req.user._id, {
        class: req.body.class,
        image: req.body.image
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