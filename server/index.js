const express = require('express');
//Root routes
const root = require('./routes/root/routes')
//Student routes
const studentAuth = require('./routes/student/auth')
const profile = require('./routes/student/profile')
const attendance = require('./routes/student/attendance')
//Teacher routes
const teacherAuth = require('./routes/teacher/auth');
const teacherSubjects = require('./routes/teacher/subjects');
const subjectStudents = require('./routes/teacher/students');
const takeAttendance = require("./routes/teacher/attendance")

const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const cors = require('cors');
const app = express();

//connect to mongodb
const connectToMongo = require('./db/db');
connectToMongo();

app.use(cors())
app.use(express.json())
app.use(cookieSession({
    //set age of cookie to 24 days
    maxAge: 24*24*60*60*1000,
    keys:[keys.session.cookieKey]
}));

app.use('/',root)

app.use('/student',studentAuth)
app.use('/student',profile)
app.use('/student',attendance)

app.use('/teacher',teacherAuth)
app.use('/teacher',teacherSubjects)
app.use('/teacher',subjectStudents)
app.use('/teacher',takeAttendance)

app.listen(5000,()=>{
    console.log("server started at Port : 5000");
})