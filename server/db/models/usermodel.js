const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    profilePicture: String,
    classes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject'
    }],
    myClasses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject'
    }],
});

const User = mongoose.model('user',userSchema);

module.exports = User;