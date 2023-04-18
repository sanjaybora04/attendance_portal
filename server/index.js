const express = require('express');
const fs = require('fs')

//Root routes
const root = require('./routes/root/routes')
//Student routes
const studentAuth = require('./routes/student/auth')
const studentProfile = require('./routes/student/profile')
const attendance = require('./routes/student/attendance')
//Teacher routes
const teacherAuth = require('./routes/teacher/auth');
const teacherProfile = require('./routes/teacher/profile')
const subjectStudents = require('./routes/teacher/students');
const takeAttendance = require("./routes/teacher/attendance")

const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const cors = require('cors');
const https = require('https')

const app = express();

//connect to mongodb
const connectToMongo = require('./db/db');
connectToMongo();

app.use(cors());

// app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: '5mb' }))
app.use(cookieSession({
    //set age of cookie to 24 days
    maxAge: 24 * 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

app.use('/', root)

app.use('/student', studentAuth)
app.use('/student', studentProfile)
app.use('/student', attendance)

app.use('/teacher', teacherAuth)
app.use('/teacher', teacherProfile)
app.use('/teacher', subjectStudents)
app.use('/teacher', takeAttendance)

const options = {
    key: fs.readFileSync('cert/key.pem'),
    cert: fs.readFileSync('cert/cert.pem')
};

https.createServer(options, app)
    .listen(5000, () => {
        console.log("Server started at port 5000");
    });