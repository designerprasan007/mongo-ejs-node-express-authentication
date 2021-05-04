const mongoose = require('mongoose');


const database = async() =>{
		try{
			mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:true});
			console.log('mongoose connected');
		}
		catch(error){
			console.log(error);
		}
}


module.exports = database;