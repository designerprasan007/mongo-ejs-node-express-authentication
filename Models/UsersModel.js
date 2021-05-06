const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');


// used to store the data in DB by respected Key name
const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	email : String,
})


/* assiging token to currently logged in User
	this method is called from the Controller/UserController.js page
    sendtoken function
*/
UserSchema.methods.getSignedToken = function () {
	return jwt.sign({id:this._id}, process.env.JWT_SECRET)
}

/*Mongo preSave method used for hashing the password before saving to the database */
UserSchema.pre('save', async function(next){
	// checking weather password is modified or same as took from User
	if(!this.isModified('password')){
		next();
	}
	// creating salt of password
	const salt = await bcryptjs.genSalt(10);
	// generating the Hash of password and setting that back to the password var
	this.password = await bcryptjs.hash(this.password, salt)
	next();
})

// comparing the User password when Login this is called in Login function at Usercontroller
UserSchema.methods.Matchpass = async function(password){
	return await bcryptjs.compare(password, this.password);
}

const User = mongoose.model('user', UserSchema);

module.exports = User;