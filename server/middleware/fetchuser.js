var jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const JWT_SECRET = keys.JWT.secret;
const Teacher = require('../db/models/teachermodel')
const Student = require('../db/models/studentmodel')

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('authtoken');
    if (!token) {
        res.status(401).send({ error: "Token not found" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        if(data.usertype=='student'){
            Student.findById(data._id,(err,student)=>{
                req.user = student
                next()
            })
        }
        else{
            Teacher.findById(data._id,(err,teacher)=>{
                req.user = teacher
                next()
            })
        }
    } catch (error) {
        res.status(401).send({ error: "Invalid token" })
    }
}


module.exports = fetchuser;