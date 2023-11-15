const User = require('../models/user');

// Render the Login Page
module.exports.login = function (req,res){
    res.render('login');
}

// Render the Register Page
module.exports.register = function(req, res){
    res.render('register');
}

// Create a new user
module.exports.createUser = async function(req,res){
    try {
        if(req.body.password !== req.body.confirmPassword){
            console.log('Passwords do not match');
            return res.redirect('back');
        }

        let user = await User.findOne({ email: req.body.email });
        if(!user) {
            await User.create(req.body);
            req.flash('success', 'New user created!')
            return res.redirect('login');
        } else {
            return res.redirect('back');
        }
    } catch (error) {
        req.flash('error', 'Error in creating a user!')
        return res.redirect('back');
    }
}

// Create a session for the user upon logging in
module.exports.createSession = function(req,res){
    req.flash('success', 'User logged in!')
    return res.redirect('/');
}

// Destroy the user's session upon logging out
module.exports.destroySession = function(req,res){
    req.logout(function (error){
        if(error){
            console.log('Error while logging out...', error);
            return res.redirect('back');
        }
        req.flash('error', 'User logged out!')
        return res.redirect('/user/login')
    });
}