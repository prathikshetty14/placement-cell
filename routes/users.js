const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users');

router.get('/login', passport.restrictAccess, userController.login);

router.get('/register', passport.restrictAccess, userController.register);

router.post('/register', userController.createUser);

router.post('/create-session', passport.authenticate('local', 
{
    failureRedirect: '/user/login'
}), userController.createSession);

router.get('/logout', userController.destroySession);

module.exports = router;