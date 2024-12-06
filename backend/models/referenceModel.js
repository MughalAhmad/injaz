const mongoose = require("mongoose");

const referenceSchema = new mongoose.Schema({
    fullName:{
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
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: null
    },
});

module.exports = new mongoose.model("reference", referenceSchema);