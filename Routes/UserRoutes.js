const express = require('express');

const user = express.Router();

const {LoginView, LoginForm, RegisterView, RegisterForm, ProfileView, verifiedProfile, pageNotFound, LandingPage} = require('../Controller/UserController');

const {getPrivateData} = require('../Middleware/Private');
// Login User form and view
user.get('/', LoginView);
user.post('/LoginForm', LoginForm)

// register User Form and View
user.get('/Register', RegisterView);
user.post('/RegisterForm', RegisterForm)

// Profile views
// checking User has valid JWT token
user.get('/mainProfile', getPrivateData, ProfileView)
// rendering the profile.ejs page if user has proper token
user.get('/profile', verifiedProfile)

// landing page
user.get('/landingpage', LandingPage)

// 404 page resposne
user.get('*', pageNotFound);

module.exports = user;