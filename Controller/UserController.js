
const User = require('../Models/UsersModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


/* res.render is sent with 2 props 1. authpage and 2. profilepage
  this props are gone used in footer.ejs to identify the current page
  and add the script according that	
*/ 

const LoginView = async(req, res) =>{
	try{
		res.render('LoginView.ejs', {authpage:'authpage', profilePage:''});
	}
	catch(error){
		console.log(error)
	}
}

const LoginForm = async(req, res) =>{
	try{
		const {email, password} = req.body;
		if(!email || !password) return res.status(400).json({success:false, message:'All fields required'})

		// check User Email first
		const availUser = await User.findOne({email});
		// if email not found sending response back to ajax API
		if(!availUser) {
			res.status(401).json({success:false, message:'Email Not found'});
			return
		} 
		// match password written in user modal /Models/UserModel.js
		const PassMatch = await availUser.Matchpass(password);

		//  if password not match sending response back to ajax API
		if(!PassMatch){
			res.status(401).json({success:false, message:'Password not Match'});
			return
		}
		// Send token function to handle all success response of authentication
		sendToken(availUser, 200, res)
	}	
	catch(err){
		// catching the internal errors to stop the breaking of code
		console.log(err);
		res.status(500).json({success:false, message:err});
	}
}



const RegisterView = async(req, res)=>{
	try{
		res.render('Register.ejs', {authpage:'authpage', profilePage:''});
	}catch(err){
		console.log(err);
		res.status(500).json({success:false, message:err});
	}
	
}

const RegisterForm = async(req, res)=>{
	try{
		const {username, email, password, confPass} = req.body;

		if(!username || !email || !password || !confPass) return res.status(400).json({success:false, message:'All fields required'})

		if(password !== confPass) return res.status(400).json({success:false, message:'Password not match'})

		// checking is that email is already exist in Db
		preUser = await User.findOne({email});
		if (preUser){
			res.status(401).json({success:false, message:'Email already exists'});
			return
		}
		/* if email is not exist then storing to DB,
		   hashing password by using the bcrypt npm package, this process is done in the 
		   /Models/UserModel.js page, by using the Mongo presave method
		*/
		const newUser = await User.create({username, email, password})

		sendToken(newUser, 200, res);
	}	
	catch(err){
		console.log(err);
		res.status(500).json({success:false, message:err});
	}
}

// initially rendering the Profile page
const verifiedProfile =(req, res) =>{
	res.render('Profile.ejs', {profilePage:'profilePage', authpage:''})
}

/* verifying token of profile page, if success sending him response, 
   verification process done at /Middleware/Privete.js 
*/
const ProfileView = async(req, res) =>{
	const user = req.user;
	sendToken(user, 200, res);
}


const pageNotFound = async(req,res ) =>{
	res.render('404page.ejs', {profilePage:'profilePage', authpage:''});
}

// common function for all sending token in response
const sendToken = (user, status, res) =>{
	/* getting the token by assigning to the Current logged in user id
		user.getSignedToken written in Models/UserModel.js page	
	*/
	const token = user.getSignedToken();
	const sendRes = {
		_id: user._id,
		username : user.username,
		email: user.email,
	};
	res.status(status).json({success:true, user:sendRes, token: token});
}

module.exports = {LoginView, LoginForm, RegisterView, RegisterForm, ProfileView, verifiedProfile, pageNotFound};