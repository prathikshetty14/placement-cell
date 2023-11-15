const Student = require('../models/student');
const Interview = require('../models/interview');

// Controller to view all students

module.exports.viewStudents = async(req,res) => {
    try {
        const students = await Student.find({});
        return res.render('students', {
            students: students,
        })
    } catch (error) {
        console.log(error);
    }
}

// Controller to add a new student

module.exports.addStudent = async (req, res) => {
    try {
      const {
        name,
        email,
        college,
        DSAscores,
        WEBDscores,
        REACTscores,
        status,
        FINALresult
      } = req.body;
  
      // Check if a student with the same email already exists
      const existingStudent = await Student.findOne({ email });
  
      if (existingStudent) {
        return res.status(409).send('Student with the same email already exists');
      }
  
      // Create a new student
      const newStudent = new Student({
        name,
        email,
        college,
        DSAscores,
        WEBDscores,
        REACTscores,
        status,
        FINALresult
      });
  
      // Save the new student to the database
      await newStudent.save();
      
      req.flash('success', 'Student added!');

      res.redirect('/students/home');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };


// Controller to update a student's details

module.exports.updateStudent = async(req,res) => {
  try {

    const studentId = req.params.id;
    const updatedStudent = {
      name: req.body.name,
      email: req.body.email,
      college: req.body.college,
      DSAscores: req.body.DSAscores,
      WEBDscores: req.body.WEBDscores,
      REACTscores: req.body.REACTscores,
      status: req.body.status,
      FINALresult: req.body.FINALresult
    };

    const student = await Student.findById(studentId);

    if(
      student.name === updatedStudent.name &&
      student.email === updatedStudent.email &&
      student.college === updatedStudent.college &&
      student.DSAscores === updatedStudent.DSAscores &&
      student.REACTscores === updatedStudent.REACTscores &&
      student.WEBDscores === updatedStudent.WEBDscores &&
      student.status === updatedStudent.status &&
      student.FINALresult === updatedStudent.FINALresult
    ) {
      req.flash('success', 'No values were updated');
      return res.redirect('back');
    }

    student.name = updatedStudent.name;
    student.email = updatedStudent.email;
    student.college = updatedStudent.college;
    student.DSAscores = updatedStudent.DSAscores;
    student.REACTscores = updatedStudent.REACTscores;
    student.WEBDscores = updatedStudent.WEBDscores;
    student.status = updatedStudent.status;
    student.FINALresult = updatedStudent.FINALresult;

    student.save();

    req.flash('success', 'Student details updated!');

    return res.redirect('back');

  } catch (error) {

    console.log('Error in updateStudent: ', error);
    return res.redirect('back');

  }
}


// Controller to delete a student by its ID

module.exports.deleteStudent = async function(req,res){
    try {
        const student = await Student.findById(req.params.id);

        if(!student){
            return res.redirect('back');
        }

        await student.deleteOne({_id: req.params.id});

        req.flash('error', 'Student deleted!');
        return res.redirect('back')
    } catch (error) {
        console.log('Error in deleting Student...', error);
    }
}


// Controller to view interviews of a specific student

module.exports.viewInterviews = async(req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findById(studentId);

    if(!student){
      return res.status(404).send('Student not found');
    }

    const interviews = await Interview.find({ studentDetails: studentId })
    .populate('companyDetails')
    .exec();

    res.render('studentInterviews', { student, interviews });
  } catch (error) {
    console.log('Error in viewInterviews: ', error);
    res.status(500).send('Internal Server Error');
  }
}