const router = require("express").Router();
const fetchuser = require('../../middleware/fetchuser')

router.post('/getuser',fetchuser,(req, res) => {
  res.json({usertype:req.user.usertype})
})

module.exports = router;