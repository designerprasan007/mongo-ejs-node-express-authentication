const jwt = require('jsonwebtoken');
const User = require('../Models/UsersModel');


exports.getPrivateData = async(req, res, next) =>{
	let token;
		// checking the client has proper headers or no if has spliting the string and getting token
		if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
			token = req.headers.authorization.split(" ")[1];
		}
		// if text not has token sending response forbidden
		if(!token) return res.status(403).json({success:false, message:'Entry Forbidden'})

		try{
			// verifying the jwt token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			// fetching the data of user by Id
			const user = await User.findById(decoded.id);

			// if no user found sending unauthorized
			if(!user) return res.status(401).json({success:false, message:'Not Authorized'}) 
		
			// assigning the current user to req
			req.user = user;
			// further process done at Controller/UserController/ function -> ProfileView
			next();
		}	
		catch(err){
			console.log(err);
			res.status(500).json({success:false, message:err});
		}
}