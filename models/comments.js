var mongoose=require('mongoose');

var Schema=mongoose.Schema;
var commentSchema=new Schema({
	text:String,
	author:{id:{
				type:mongoose.Schema.Types.ObjectId,
				ref:'User'		
				},
			username:String
		
		}
});
module.exports=mongoose.model('Comments',commentSchema);