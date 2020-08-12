var Campground = require("../models/campground");
var Comment = require("../models/comments");
var middlewareobj={};
//middleware for loggin check
middlewareobj.IsLoggedin=function (req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	else{//Flashing the error
		req.flash('error','You need to be LoggedIn ');
		res.redirect('/login');
	}
	
}
//campgroundownership check
middlewareobj.checkownership=function(req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,foundcampground){
		if(err){
			req.flash('error','Something went Wrong')
			res.redirect('back');
		}
		else{
			if(foundcampground.author.id.equals(req.user._id)){
				next();
			}
			else{
				req.flash('error','Permission Denied');
				res.redirect('back');
			}
		}
		
		});
	}
	else{
		req.flash('error','You need to be LoggedIn');
		res.redirect('/login');
	}	
}
//find comment by id and comparing ownership using middleware
middlewareobj.checkcommentownership=function (req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,foundcomment){
		if(err){
			req.flash('error','Something went Wrong');
			res.redirect('back');
		}
		else{
			
			if(foundcomment.author.id.equals(req.user._id)){
				next();
			}
			else{
				req.flash('error','Permission Denied')
				res.redirect('back');
			}
		}
		
		});
	}
	else{
		req.flash('error','You need to be LoggedIn');
		res.redirect('back');
	}	
}
module.exports=middlewareobj;