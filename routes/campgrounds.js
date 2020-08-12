var express=require('express');
var router=express.Router();
var Campground=require('../models/campground');
var Comment=require('../models/comments')
var middleware=require('../middlewares/middleware');

//ROUTES

router.get('/campgrounds',function(req,res){
	//Fetcging campgrounds from DB
	Campground.find({},function(err,AllCampground){
		if(err){console.log("ERROR");}
		else{
			res.render('campgrounds/campgrounds',{campgrounds:AllCampground});
		}
	})
	
});
router.post('/campgrounds',middleware.IsLoggedin,function(req,res){
	var Name=req.body.name;
	var price=req.body.price;
	var img=req.body.image;
	var desc=req.body.description;
	var author={id:req.user._id, username:req.user.username};
	var newcampground={name:Name ,image:img,price:price,description:desc,author:author};
	
	//adding to database
	Campground.create(newcampground,function(err,Campground){
		if(err){console.log('ERROR');}
		else{
			//redirecting to campgrounds page
			req.flash('success','Campground Added Successfully');
			res.redirect('/campgrounds');
		}
	})
	
});
router.get('/campgrounds/new',middleware.IsLoggedin,function(req,res){
	res.render('campgrounds/new');
});

//shows more abt one campground
router.get('/campgrounds/:id',function(req,res){
	//finding campground id 
	Campground.findById(req.params.id).populate('comments').exec(function(err,foundcampground){
		if(err){console.log(err);}
		else{
			console.log(foundcampground);
			res.render('campgrounds/show',{campground:foundcampground});
		}
	})
	
});
//EDIT CAMPgorund
router.get('/campgrounds/:id/edit',middleware.checkownership,function(req,res){
	Campground.findById(req.params.id,function(err,foundcampground){
		res.render('campgrounds/edit',{campground:foundcampground});
	});
});
//UPDate Campground
router.put('/campgrounds/:id',middleware.checkownership,function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedcamp){
		if(err){console.log(err);
			   res.redirect('/campgrounds');}
		else{
			req.flash('success','Updated Campground Successfully');
			res.redirect('/campgrounds/'+req.params.id);
		}
	})
});
router.delete('/campgrounds/:id',middleware.checkownership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect('/campgrounds');
		}
		else{
			req.flash('success','Deleted Campground Successfully');
			res.redirect('/campgrounds');
		}
	});
});
//About Router
router.get('/about',function(req,res){
	res.render('campgrounds/about');
})

module.exports=router;