const dotenv = require('dotenv');
dotenv.config({path: "./config.env"})

const express = require('express');
const cors = require('cors');
// helmet used to hide the code from hacker
const helmet = require('helmet');

/* morgan is popular package which gives the track of 
   all files rendered at client side with there status code and error
*/
const morgan = require('morgan');

/* path and http are core packages of Node  no need of npm install for this*/
const http = require('http');
const path = require('path');

// getting Mongo connection from Database/
const database = require('./Database/database');

// routes passed that express can listen and give response
const userRouter = require('./Routes/UserRoutes'); 


const PORT = process.env.PORT || 5000;

const app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// static folder (css, js, images);
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());


app.use('/auth/users', userRouter);


const server = http.createServer(app);

server.listen(PORT, () =>{
	database();
	console.log(`serving on ${PORT}`);
})



