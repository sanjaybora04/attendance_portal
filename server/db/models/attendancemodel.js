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
    created_at    : { type: Date, default: Date.now() },
    expiresAt: {
        type: Date
    }
});

const Attendance = mongoose.model('Attendance',attendanceSchema);

module.exports = Attendance;