var mongoose=require('mongoose');
var passportlocalmongoose=require('passport-local-mongoose');


var UserSchema= new mongoose.Schema({
	username:String,
	password:String
});
UserSchema.plugin(passportlocalmongoose);
module.exports=mongoose.model('users',UserSchema);