const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    name: String,
    email: String,
    password: String,
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject'
    }],
    usertype: {
        type: String,
        default: 'teacher'
    }
});

const Teacher = mongoose.model('teacher',teacherSchema);

module.exports = Teacher;