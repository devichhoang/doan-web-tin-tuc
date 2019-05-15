var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	username: {
		type: String
	},
	password:{
		type:String
	}
})

//authenticate input against database
UserSchema.statics.authenticate =(username,password,callback)=>{
	User.findOne({username:username})
		.exec((err,user)=>{
			if(err){
				return callback(err);
			}else if(!user){
				var err = new Error("User not found");
				err.status = 401;
				return callback(err);
			}
			if(password == user.password){
				return callback(null,user);
			}else{
				return callback();
			}
		});
};

var User = mongoose.model('User',UserSchema,'users');

module.exports = User;