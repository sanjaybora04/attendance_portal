const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const otpSchema = new Schema({
    otp: String,
    email: String,
    expiresAt: {
        type: Date,
        default: new Date(Date.now() + 5*60*1000), //after 5 minutes
        expires: '5m'
    }
});

const OTP = mongoose.model('otp',otpSchema);
module.exports = OTP;