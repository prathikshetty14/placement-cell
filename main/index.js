// Import necessary modules

const express = require('express');
const app = express();
const port = 8000;

// Middleware and configurations

const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const flash = require('connect-flash');
const customMware = require('./config/notymiddleware');

const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');

// Serve static assets from the "assets" directory

app.use(express.static('./assets'));

// Use EJS layouts for rendering views

app.use(expressLayouts);

// Enable URL-encoded request bodies (for form data)

app.use(express.urlencoded({ extended: true }));

// Set the view engine to EJS and specify the views directory

app.set('view engine', 'ejs');
app.set('views', './views');

// Extract CSS and JS from EJS layouts

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Use cookie parser middleware to handle cookies

app.use(cookieParser());

// Configure session middleware with custom settings

app.use(session({
    name: 'placement_cell',
    secret: 'SECRET',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 100
    }
}));

// Initialize Passport authentication

app.use(passport.initialize());

// Use Passport session middleware

app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// Include routes defined in './routes/index'

app.use('/', require('./routes/index'));

// Start the server and listen on the specified port

app.listen(port, function(error){
    if(error){
        console.log(`Error in running the server. Error is ${error}`);
    }
    console.log(`Server is up and running on port: ${port}`);
})