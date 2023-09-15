const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    interviewDetails: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Interview' 
        }
    ],
    studentDetails: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    ],
}, {
    timestamps: true
})

const Company = mongoose.model('Company', companySchema);
module.exports = Company;