// dotenv is package use to collect data from env files
const dotenv = require('dotenv');
// setting env file to project
dotenv.config({path: "./config.env"})

const express = require('express');

// cors used to handle cross origin resource sharing
const cors = require('cors');

// Helmet helps you secure your Express apps by setting various HTTP headers
const helmet = require('helmet');

/* morgan is popular package which gives the track of 
   all files rendered at client side with there status code and error or success
*/
const morgan = require('morgan');

/* path and http are core packages of Node  no need of npm install for this*/
const http = require('http');
const path = require('path');

// getting Mongo connection from Database/
const database = require('./Database/database');

// routes passed that express can listen and give response
const userRouter = require('./Routes/UserRoutes'); 

const SocketUsers = require('./Utils/SocketUsers');

const PORT = process.env.PORT || 5000;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// static folder (css, js, images);
app.use(express.static(path.join(__dirname, 'public')));


// using all packages with express to enable them

// accepting and sending back the json response from form field
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

// setting default route after the port number
app.use('/auth/users', userRouter);

// creating HTTP server to serve
const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server);


// socket function called from Utils/socketuser.js 
SocketUsers(io);


// starting up the server
server.listen(PORT, () =>{
	// calling database function when server up
	database();
	console.log(`serving on ${PORT}`);
})



