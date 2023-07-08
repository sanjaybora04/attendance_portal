const router = require("express").Router();
const fetchuser = require('../../middleware/auth-check')


router.get('/', (req, res) => {
  res.send('hello')
})


router.post('/getuser', fetchuser, (req, res) => {
  res.json({ usertype: req.user.usertype })
})

module.exports = router;