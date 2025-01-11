const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true,
    },
    userId:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        default:'user'
    },
    nationality:{
        type: String,
        required: true,
    },
    sixDigitCode:{
        type: Number,
        default:null
    },
    phoneCode:{
        type: String,
        required: false,
    },
 mobileCode:{
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: null
    },
});

module.exports = new mongoose.model("user", userSchema);