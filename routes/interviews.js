const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interview');
const passport = require('passport');

router.get('/home', passport.checkAuthenticatedUser, interviewController.viewInterviews);

router.post('/assign', passport.checkAuthenticatedUser, interviewController.assignInterview);

router.post('/updateInterview/:id', passport.checkAuthenticatedUser, interviewController.updateInterview);

router.get('/deleteInterview/:id', passport.checkAuthenticatedUser, interviewController.deleteInterview);

module.exports = router;