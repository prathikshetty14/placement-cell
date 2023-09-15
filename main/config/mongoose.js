// Import the mongoose library for MongoDB connection

const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/placement_cell`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to the db... '));

db.once('open', function(){
    console.log('Successfully connected to the Database!');
});

module.exports = db;