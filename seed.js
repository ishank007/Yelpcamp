var mongoose=require('mongoose');
var Campground=require('./models/campground')
var Comment=require('./models/comments')


var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor s"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim "
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad m"
    }
]


function seedDB(){
	//removing campgrounds
	Campground.deleteMany({},function(err){
		if(err){console.log('error');}
		else{console.log('Campground Removed');}
	});
	//adding campgrounds from data
	data.forEach(function(seed){
		Campground.create(seed,function(err,campground){
			if(err){console.log('error');}
			else{
				console.log('added campground');
				//adding comments
				Comment.create({
					text:'this is a text',
					author:'homer'
				},function(err,comment){
					if(err){console.log('error');}
					else{
					campground.comments.push(comment);
					campground.save();
					console.log('Comment created');}
					
					
				})
			}
		})
	});
	
	
}
module.exports=seedDB;
		