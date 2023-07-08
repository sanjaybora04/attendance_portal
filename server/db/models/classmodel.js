const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    name: String,
    teacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    teacher_name: String,
    students:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]
});

const Class = mongoose.model('class',classSchema);

module.exports = Class;