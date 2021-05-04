const dotenv = require('dotenv');
dotenv.config({path: "./config.env"})

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const http = require('http');
const path = require('path');

const database = require('./Database/database');
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



