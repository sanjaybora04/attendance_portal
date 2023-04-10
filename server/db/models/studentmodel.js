const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: String,
    email: String,
    class: String,
    image: String,
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject'
    }],
    password: String,
    usertype: {
        type: String,
        default: "student"
    }
});

const Student = mongoose.model('student',studentSchema);

module.exports = Student;