const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
    TimelineEmiratesId: {
        type: String,
        required: true
    },
    TimelineMedical: {
        type: String,
        required: true
    },
    clientEmail: {
        type: String,
        required: false
    },
    clientName: {
        type: String,
        required: true
    },
    clientPhone: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    emiratesId: {
        type: String,
        required: false
    },
    emiratesIdIN: {
        type: String,
        required: false
    },
    emiratesIdTimeline: {
        type: String,
        required: true
    },
    flag: {
        type: String,
        required: true
    },
    freeVisa: {
        type: String,
        required: false
    },
    gtAmount: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    isEmail: {
        type: String,
        required: false
    },
    letterHeadPad: {
        type: Number,
        required: true
    },
    medical: {
        type: String,
        required: false
    },
    medicalIN: {
        type: String,
        required: false
    },
    medicalTimeline: {
        type: String,
        required: true
    },
    packageIncludingVisa: {
        type: String,
        required: false
    },
    pdfLenght: {
        type: String,
        required: false
    },
    preRemarks: {
        type: String,
        required: true
    },
    preTimeline: {
        type: String,
        required: true
    },
    pro: {
        type: Number,
        required: true
    },
    quotationDate: {
        type: String,
        required: true
    },
    reference: {
        type: String,
        required: true
    },
    refMail:{
        type: String,
        required: true
    },
     refId:{
    type: String,
    required: true
     },
     refDesignation:{
    type: String,
    required: true
},
    selectCompany: {
        type: String,
        required: true
    },
    stateValue: {
        type: String,
        required: false
    },
    step1Remarks: {
        type: String,
        required: true
    },
    step1Timeline: {
        type: String,
        required: true
    },
    step1value: {
        type: Number,
        required: true
    },
    step2ApprovalFee: {
        type: String,
        required: false
    },
    step2Establishment: {
        type: Number,
        required: true
    },
    step2EstablishmentIN: {
        type: Number,
        required: true
    },
    step2EstablishmentRemark: {
        type: String,
        required: true
    },
    step2EstablishmentTimeline: {
        type: String,
        required: true
    },
    step2ImmigrationFee: {
        type: String,
        required: false
    },
    step2Remark: {
        type: String,
        required: true
    },
    step2Timeline: {
        type: String,
        required: true
    },
    step2value1: {
        type: String,
        required: false
    },
    step2value1IN: {
        type: String,
        required: false
    },
    step2value2: {
        type: Number,
        required: true
    },
    step2value2IN: {
        type: Number,
        required: true
    },
    step2value2a: {
        type: Number,
        required: true
    },
    step2value2aIN: {
        type: Number,
        required: true
    },
    step2value3: {
        type: String,
        required: true
    },
    step2value3IN: {
        type: String,
        required: true
    },
    step3EmiratesId: {
        type: String,
        required: false
    },
    step3Medical: {
        type: String,
        required: false
    },
    step3Renewable: {
        type: String,
        required: true
    },
    step3RenewableEmployment: {
        type: String,
        required: true
    },
    step3StatusChange: {
        type: String,
        required: true
    },
    step3Timeline: {
        type: String,
        required: true
    },
    step3TimelineEmployment: {
        type: String,
        required: true
    },
    step3TimelineStatusChange: {
        type: String,
        required: true
    },
    tAmount: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    visitingCard: {
        type: Number,
        required: true
    },
    word: {
        type: String,
        required: true
    },
    checkBoxData:{},
    stateArray:{},
    notify: {
        type: String,
        default:"null"
    },
    pdfStatus:{
        type: String,
        required: true,
        default:'pending',
    },
    reminderAt: {
        type: Date,
        default: Date.now
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

{
    
}