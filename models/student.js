const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    college: {
        type: String,
        required: true
    },
    DSAscores: {
        type: Number,
        required: true
    },
    WEBDscores: {
        type: Number,
        required: true
    },
    REACTscores: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    FINALresult: {
        type: String,
        required: true
    },
    interviewDetails: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Interview'
        }
    ],
    companyDetails: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        }
    ]
},{
    timestamps: true,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;