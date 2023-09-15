const { findById } = require('../models/user');
const User = require('../models/user');


// Controller to render the home page

module.exports.home = async function(req, res){
    try {

        const user = await User.findById(req.user.id);

        res.render('home', {
            user: user,
            currentPage: '/'
        })
    } catch (error) {
        console.log('Error in home: ', error)
    }
}