const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');
const passport = require('passport');

router.get('/', passport.checkAuthenticatedUser, homeController.home);

router.use('/user', require('./users'));

router.use('/students', require('./students'));

router.use('/companies', require('./companies'));

router.use('/interviews', require('./interviews'));

router.use('/csv', require('./csvRoutes'));

module.exports = router;