var express=require('express');
var router=express.Router();
var Campground=require('../models/campground');
var Comment=require('../models/comments');
var middleware=require('../middlewares/middleware');


///Comment Routes

router.get('/campgrounds/:id/comments/new',middleware.IsLoggedin,function(req,res){
	Campground.findById(req.params.id,function(err,foundcampground){
		if(err){console.log(err);}
		else{
			res.render('comments/new',{campground:foundcampground});
		}
	});
});
router.post('/campgrounds/:id/comments',middleware.IsLoggedin,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){console.log(err);}
		else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){console.log(err);res.redirect('/campgrounds');}
				else{
					comment.author.id=req.user._id;
					comment.author.username=req.user.username;
					comment.save();
					//campground is founded one ,comments is name of array and comment is just we created
					campground.comments.push(comment);
					campground.save();
					req.flash('success','Comment Added successfully');
					res.redirect('/campgrounds/'+campground._id);
				}
				
			})
		}
	});
});


//EDit comment
router.get('/campgrounds/:id/comments/:comment_id/edit',middleware.checkcommentownership,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundcomment){
		if(err){res.redirect('back');}
		else{
			res.render('comments/edit',{campground_id:req.params.id, comment:foundcomment});
		}
	})
});
//Update comment
router.put('/campgrounds/:id/comments/:comment_id/edit',middleware.checkcommentownership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedcomment){
		if(err){res.redirect('back');}
		else{
			req.flash('success','Comment Updated Successfully');
			res.redirect('/campgrounds/'+req.params.id);
		}
	})
})
//Delete Comment
router.delete('/campgrounds/:id/comments/:comment_id',middleware.checkcommentownership,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){res.redirect('back');}
		else{
			req.flash('success','Comment Deleted Successfully');
			res.redirect('/campgrounds/'+req.params.id);
		}
	});
});

module.exports=router;