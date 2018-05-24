//server.js
//adding opensource modules to application
var express = require('express');
var path = require('path');// for refering physical files here
var looger = require('morgen');
var cookieParser = require('cookie-parser')// for maintain sessions
var bodyParser = require('body-parser')// for parsing JSON
var bCrypt = require('bcrypt-nodejs');
var passport = require('passport');// Using Passportjs for authentication
var localStrategy =  require('passport-local').Strategy; //using passport strategy
var session = require('express-session'); //for maintaining sessions
var mongoose = require('mongoose'); //for mongodb, database
var models_user = require('./App/js/Models/user.js'); // refering models in server.js

