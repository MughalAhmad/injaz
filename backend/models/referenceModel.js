const mongoose = require("mongoose");

const referenceSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
    },
    fbId: {
        type: String,
        required: true
    },
    metaId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    companyEmail: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    phone:{
        type: Number,
        required: true,
    },
    company:{
        type: String,
        required: true,
    },
    refCode:{
        type: String,
        required: true,
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