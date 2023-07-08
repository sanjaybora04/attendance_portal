const router = require("express").Router();
const axios = require('axios')
const jwt = require('jsonwebtoken')
const keys = require("../config/keys")
const User = require('../db/models/usermodel')

router.post('/signin', async (req, res) => {

  axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { "Authorization": `Bearer ${req.body.token}`}
    })
    .then(async response => {
      const firstName = response.data.given_name;
      const lastName = response.data.family_name;
      const email = response.data.email;
      const picture = response.data.picture;

      const existingUser = await User.findOne({ email })

      if (existingUser){
        token = jwt.sign({
          _id: existingUser._id
        },keys.jwt.secret, { expiresIn: "24d" })

        return res.json({token})
      }

      await User.create({ email, firstName, lastName, profilePicture: picture })
      .then(response=>{
        const token = jwt.sign({
          _id: response._id
        }, keys.jwt.secret, { expiresIn: "24d" })
        
        return res.json({token})
      })
    })
    .catch(err => {
      res
        .status(400)
        .json({ message: "Invalid access token!" })
    })
})

module.exports = router;