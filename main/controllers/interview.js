const Interview = require('../models/interview');
const Student = require('../models/student');
const Company = require('../models/company');

// Controller to view all interviews

module.exports.viewInterviews = async(req,res) => {
    try {
        const interviews = await Interview.find().populate({
            path: 'companyDetails studentDetails',
            select: 'name intervewDate status'
        });

        const students = await Student.find();

        const companies = await Company.find();

        res.render('interview',{
            interviews,
            students,
            companies,
        });
    } catch (error) {
        console.log('Error in viewInterviews: ', error);
    }
}

// Controller to assign a new interview

module.exports.assignInterview = async (req,res) => {
    try {
        const { studentId, companyId, interviewDateTime, status } = req.body;
    
        // Find the student by their ID
        const student = await Student.findById(studentId);
    
        if (!student) {
            return res.status(404).send('Student not found');
        }
    
        // Find the company by their ID
        const company = await Company.findById(companyId);
    
        if (!company) {
            return res.status(404).send('Company not found');
        }
        
        const interviewDate = new Date(interviewDateTime);

        // Create a new interview
        const interview = new Interview({
            companyDetails: company._id,
            interviewDate,
            studentDetails: student._id,
            status
        });
    
        // Update the student's status, company name, and interview date
        student.status = status;
        student.interviewDetails.push(interview._id);
    
        // Update the company's interviewDetails
        company.interviewDetails.push(interview._id);
    
        // Save the interview, student, and company details to the database
        await interview.save();
        await student.save();
        await company.save();

        req.flash('success', 'Interview assigned!')
        res.redirect('/interviews/home');
} catch (error) {
    req.flash('error', 'Interview not assigned!')
    }
}

// Controller to update an interview's status

module.exports.updateInterview = async (req,res) => {
    try {
        const interviewId = req.params.id;
        const updatedInterview = {
            status: req.body.status
        };

        const interview = await Interview.findById(interviewId);

        interview.status = updatedInterview.status;

        interview.save();

        req.flash('success', 'Interview status updated!');

        return res.redirect('back');
    } catch (error) {
        console.log('Error in updateInterview: ', error);
        return res.redirect('back');
    }
}

// Controller to delete an interview by its ID

module.exports.deleteInterview = async (req,res) => {
    try {
        const interviewId = req.params.id;
        const interview = await Interview.findById(interviewId);

        if(!interview){
            console.log('Interview does not exist');
            return res.redirect('back');
        }

        const student = await Student.findById(interview.studentDetails);
        const company = await Company.findById(interview.companyDetails);

        if(!student || !company){
            return res.status(404).send('Related student or company not found');
        }

        student.interviewDetails = student.interviewDetails.filter(
            (id) => id.toString() !== interviewId
        );

        company.interviewDetails = company.interviewDetails.filter(
            (id) => id.toString() !== interviewId
        )

        await interview.deleteOne();
        await student.save();
        await company.save();

        req.flash('error', 'Interview deleted!');
        
        res.redirect('/interviews/home');
    } catch (error) {
        console.log('Error in deleteInterview: ', this.deleteInterview);
    }
}