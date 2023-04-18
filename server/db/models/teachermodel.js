const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    name: String,
    email: String,
    password: String,
    image: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
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