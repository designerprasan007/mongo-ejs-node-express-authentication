const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');

const {ObjectId} = mongoose.Schema.Types


const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	email : String,
})


UserSchema.methods.getSignedToken = function () {
	return jwt.sign({id:this._id}, process.env.JWT_SECRET)
}

UserSchema.pre('save', async function(next){
	if(!this.isModified('password')){
		next();
	}
	const salt = await bcryptjs.genSalt(10);
	this.password = await bcryptjs.hash(this.password, salt)
	next();
})

UserSchema.methods.Matchpass = async function(password){
	return await bcryptjs.compare(password, this.password);
}

const User = mongoose.model('user', UserSchema);

module.exports = User;