const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: String,
    email: String,
    enrollment_number: String,
    image: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    course: {
        name: String,
        semester: String,
        section: String
    },
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