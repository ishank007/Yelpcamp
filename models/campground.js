var mongoose=require('mongoose');

var Schema=mongoose.Schema;
var campgroundSchema=new Schema({
	name:String,
	price:String,
	image:String,
	description:String,
	author:{
			id: {  type:mongoose.Schema.Types.ObjectId,
					ref:'User'
				},username:String
	},
	comments:[
				{
					type:mongoose.Schema.Types.ObjectId,
					ref:'Comments'
				}
			]
});
module.exports=mongoose.model('Campground',campgroundSchema);