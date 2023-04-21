const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student'
    },
    teacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher'
    },
    subject:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'subject'
    },
    class: String,
    createdAt : Date,
    expiresAt: {
        type: Date,
        expires: '5m'
    }
});

const Attendance = mongoose.model('Attendance',attendanceSchema);

module.exports = Attendance;