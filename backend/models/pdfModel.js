const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true
    },
    clientEmail: {
        type: String,
        required: true
    },
    clientPhone: {
        type: String,
        required: true
    },
    reference: {
        type: String,
        required: true
    },
    selectCompany:{
        type: String,
        required: true
    },
    stateValue:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = new mongoose.model("pdf", pdfSchema);