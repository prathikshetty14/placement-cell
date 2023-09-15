const express = require('express');
const router = express.Router();
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const path = require('path'); // Import the 'path' module
const Student = require('../models/student'); // Import your Student model
const Interview = require('../models/interview'); // Import your Interview model
const Company = require('../models/company'); // Import your Company model

// Define a route for downloading the CSV file
router.get('/downloadCSV', async (req, res) => {
  try {
    // Fetch all students with their associated interviews
    const students = await Student.find().populate({
      path: 'interviewDetails',
      select: 'interviewDate companyDetails status',
      populate: {
        path: 'companyDetails',
        select: 'name', // Fetch the company name
      },
    });


    // Define the full path to the CSV file
    const csvFilePath = path.join(__dirname, '..', 'assets', 'csv', 'students.csv');

    // Create a CSV writer
    const csvWriter = createCsvWriter({
      path: csvFilePath, // Specify the full file path where the CSV will be saved
      header: [
        { id: 'id', title: 'Student id' },
        { id: 'name', title: 'Student name' },
        { id: 'college', title: 'Student college' },
        { id: 'status', title: 'Student status' },
        { id: 'DSAFinalScore', title: 'DSA Final Score' },
        { id: 'WebDFinalScore', title: 'WebD Final Score' },
        { id: 'ReactFinalScore', title: 'React Final Score' },
        { id: 'interviewDate', title: 'Interview date' },
        { id: 'interviewCompany', title: 'Interview company' },
        { id: 'interviewResult', title: 'Interview student result' },
      ],
    });

    // Prepare the data for CSV
    const csvData = [];
    for (const student of students) {
      for (const interview of student.interviewDetails) {
        const interviewCompany = interview.companyDetails[0]
          ? interview.companyDetails[0].name
          : 'N/A';

        csvData.push({
          id: student._id,
          name: student.name,
          college: student.college,
          status: student.status,
          DSAFinalScore: student.DSAscores,
          WebDFinalScore: student.WEBDscores,
          ReactFinalScore: student.REACTscores,
          interviewDate: interview.interviewDate,
          interviewCompany: interviewCompany,
          interviewResult: interview.status,
        });
      }
    }

    // Write data to the CSV file
    await csvWriter.writeRecords(csvData);

    // Stream the CSV file as a download
    res.setHeader('Content-disposition', 'attachment; filename=students.csv');
    res.set('Content-Type', 'text/csv');
    fs.createReadStream(csvFilePath).pipe(res);
  } catch (error) {
    console.error('Error generating CSV:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
