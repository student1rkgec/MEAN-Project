//server.js
//adding opensource modules to application
var express = require('express');
var path = require('path');// for refering physical files here
var logger = require('morgan');
var cookieParser = require('cookie-parser')// for maintain sessions
var bodyParser = require('body-parser')// for parsing JSON
var bCrypt = require('bcrypt-nodejs');
var passport = require('passport');// Using Passportjs for authentication
var localStrategy =  require('passport-local').Strategy; //using passport strategy
var session = require('express-session'); //for maintaining sessions
var mongoose = require('mongoose'); //for mongodb, database
var models_user = require('./app/js/Models/user.js'); // refering models in server.js

// connection database
mongoose.connect('mongodb://mean:diyswim12#@ds133920.mlab.com:33920/mean_app');

 
//import the routers
var router = require('./Routes/router');
var authenticate = require('./Routes/authentication')(passport);

//for using express throughout this application
var app = express();

// Tell node that My Application will use ejs engine for rendering, view engine setup


app.set('views', path.join(__dirname,'./app/Views'));
app.set('view engine', 'ejs'); 


// Tell node the global configuration about parser, logger and passport
app.use(cookieParser());
app.use(logger('dev'));
app.use(session({
  secret: 'keyboard cat'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(passport.initialize()); // initializing passport
app.use(passport.session()); // initializing passport session

// tell node about these directories that application may get resourses from
app.use('/', router);
app.use('/auth', authenticate);
app.use(express.static(__dirname + '/app'));
app.set('views', __dirname + '/app');
app.engine('html', require('ejs').renderFile);

app.all('/*', function(req, res, next){
  res.render('index.html', {root: __dirname });
});
/*
app.use(express.static(path.join(__dirname, 'scripts')));
app.use(express.static(path.join(__dirname, 'Content')));
app.use(express.static(path.join(__dirname, 'App')));
app.use(express.static(path.join(__dirname, 'App/Views')));
app.use(express.static(path.join(__dirname, 'App/Views/Main')));
app.use(express.static(path.join(__dirname, 'App/Views/Authentication')));
*/
//Providing auth-api to passport so that it can use it.
var initPassport = require('./Passport/passport-init');
initPassport(passport);
//running server on node
var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:$s', host, port);
});
// exporting this application as a module
module.exports = app;


















