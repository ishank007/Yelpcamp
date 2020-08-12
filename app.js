//INITIALISATION
var express=require('express');
var app=express();
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var passport=require('passport');
var methodoverride=require('method-override');
var LocalStrategy=require('passport-local');
var Campground=require('./models/campground');
var Comment=require('./models/comments')
var User=require('./models/user');
var flash=require('connect-flash');
var seedDB=require('./seed');

//ROUTES
var campgroundRoutes=require('./routes/campgrounds');
var commentsRoutes=require('./routes/comments');
var AuthRoutes=require('./routes/Auth');

//APP CONFIG
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/yelpcamp_v6',{ useNewUrlParser: true,useUnifiedTopology: true });
app.use(express.static(__dirname + '/public'));
app.use(methodoverride('_method'));
app.use(flash());
//Temporary Seed file
// seedDB();

//PASSPORT CONFIG
app.use(require('express-session')({
	secret:'Rusty is a doggy',
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Middleware for inserting this info to every route
app.use(function(req,res,next){
	res.locals.currentuser=req.user;
	res.locals.error=req.flash('error');
	res.locals.success=req.flash('success');
	next();
});

//ROutes CONFIG
app.use(AuthRoutes);
app.use(campgroundRoutes);
app.use(commentsRoutes);


//SERVER
app.listen(process.env.PORT || 4000,function(req,res){
	console.log("Server started at port 4000");
});