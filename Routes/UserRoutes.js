const express = require('express');

const user = express.Router();

const {LoginView, LoginForm, RegisterView, RegisterForm, ProfileView} = require('../Controller/UserController');

// Login User form and view
user.get('/', LoginView);
user.post('/LoginForm', LoginForm)

// register User Form and View
user.get('/Register', RegisterView);
user.post('/RegisterForm', RegisterForm)

// Profile views

user.get('/profile', ProfileView)

module.exports = user;