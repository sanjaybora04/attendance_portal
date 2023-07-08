const express = require('express');
const cors = require('cors');



//Root routes
const root = require('./routes/root/routes')
const auth = require('./routes/auth');
const profile = require('./routes/profile')
//Student routes
const attendance = require('./routes/student/attendance')
const studentStats = require('./routes/student/stats')
//Teacher routes
// const subjectStudents = require('./routes/teacher/students');
const takeAttendance = require("./routes/teacher/attendance")



const app = express();


app.use(cors());
app.use(express.json({ limit: '5mb' }))

//connect to mongodb
const connectToMongo = require('./db/db');
connectToMongo();


// Routes
app.use('/', root)
app.use('/',auth)
app.use('/',profile)

app.use('/student', attendance)
app.use('/student', studentStats)

// app.use('/teacher', subjectStudents)
app.use('/teacher', takeAttendance)


app.listen(5000,()=>{
    console.log("server started at Port : 5000");
})