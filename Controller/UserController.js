const User = require('../Models/UsersModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const LoginView = async(req, res) =>{
	try{
		res.render('LoginView.ejs',{Emailerror:'', PassError:''});
	}
	catch(error){
		console.log(error)
	}
}

const LoginForm = async(req, res) =>{
	try{
		const {email, password} = req.body;
		// check User Email first
		const availUser = await User.findOne({email});
		// if email not available redirect back to login view with error
		if(!availUser) {
			res.status(401).json({success:false, message:'Email Not found'});
			return
		} 
		// match password written in user modal
		const PassMatch = await availUser.Matchpass(password);

		if(!PassMatch){
			res.status(401).json({success:false, message:'Password not Match'});
			return
		}
		// Send token function to handle all success response of authentication
		sendToken(availUser, 200, res)
	}	
	catch(err){
		console.log(err);
		res.status(500).json({success:false, message:err});
	}
}



const RegisterView = async(req, res)=>{
	try{
		res.render('Register.ejs');
	}catch(err){
		console.log(err);
		res.status(500).json({success:false, message:err});
	}
	
}

const RegisterForm = async(req, res)=>{
	try{
		const {username, email, password, confPass} = req.body;

		preUser = await User.findOne({email});
		if (preUser){
			res.status(401).json({success:false, message:'Email already exists'});
			return
		}

		const newUser = await User.create({username, email, password})

		sendToken(newUser, 200, res);
	}	
	catch(err){
		console.log(err);
		res.status(500).json({success:false, message:err});
	}
}

const ProfileView = async(req, res) =>{
	res.render('Profile.ejs');
}


const sendToken = (user, status, res) =>{
	const token = user.getSignedToken();
	const sendRes = {
		_id: user._id,
		username : user.username,
		email: user.email,
	};
	res.status(status).json({success:true, user:sendRes, token: token});
}

module.exports = {LoginView, LoginForm, RegisterView, RegisterForm, ProfileView};