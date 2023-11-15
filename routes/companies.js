const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company');
const passport = require('passport');

router.get('/home', passport.checkAuthenticatedUser, companyController.viewCompanies);

router.post('/add', passport.checkAuthenticatedUser, companyController.addCompany);

router.get('/deleteCompany/:id', passport.checkAuthenticatedUser, companyController.deleteCompany);

module.exports = router;