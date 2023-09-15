// Import required modules for passport authentication

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user')

// Define and configure the local strategy for authentication

passport.use(new localStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done) {

        User.findOne({email: email}).then(function(user){
            if(!user || user.password != password){
                req.flash('error', 'Invalid username/password')
                console.log('Invalid username/password')
                return done(null, false);
            }
            return done(null, user);
        }).catch(function(error){
            console.log('Error in finding the user');
            return done(error);
        });
    }
));

// Serialize the user to store in the session

passport.serializeUser(function(user,done){
    done(null, user.id);
});

// Deserialize the user from the session

passport.deserializeUser(function(id, done){
    User.findById(id).then(function(user){
        return done(null, user);
    }).catch(function(error){
        console.log('Error in finding the user: deserializeUser');
        return done(error);
    });
});

// Middleware to check if the user is authenticated

passport.checkAuthenticatedUser = function (req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/user/login');
}

// Middleware to set the authenticated user in response locals

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

// Middleware to restrict access to routes based on user permissions

passport.restrictAccess = function (req,res,next) {
    if(req.isAuthenticated()&&req.user.permission!='admin'){
        return res.redirect('back');
    }

    next();
}

// Middleware to provide access to admin-only routes

passport.provideAccess = function (req, res, next) {
    if (req.isAuthenticated()&&req.user.permission=='admin') {
        next()
    }
    else{
        return res.redirect('back');
    }
}

module.export = passport;
