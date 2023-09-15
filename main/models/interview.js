const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    companyDetails: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
            required: true
        },
    ],
    interviewDate: {
        type: Date,
        required: true
    },
    studentDetails: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: true
        }
    ],
    status: {
        type: String,
        required: true,
    }
},{
    timestamps: true,
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;