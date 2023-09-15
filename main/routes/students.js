const express = require('express');
const router = express.Router();
const studentController = require('../controllers/students');
const passport = require('passport');


router.get('/home', passport.checkAuthenticatedUser, studentController.viewStudents);

router.post('/add', passport.checkAuthenticatedUser, studentController.addStudent);

router.get('/deleteStudent/:id', passport.checkAuthenticatedUser, studentController.deleteStudent);

router.post('/updateStudent/:id', passport.checkAuthenticatedUser, studentController.updateStudent);

router.get('/:studentId/interviews', passport.checkAuthenticatedUser, studentController.viewInterviews);

module.exports = router;
