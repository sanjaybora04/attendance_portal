const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    name: String,
    course: {
        name:String,
        semester:String
    },
    teacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher'
    },
    teacher_name: String,
    students:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student'
    }]
});

const Subject = mongoose.model('subject',subjectSchema);

module.exports = Subject;