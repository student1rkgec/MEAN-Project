var express = require('express');
var router = express.Router();
module.exports = function(passport){
  //Send successful Login state back to view(angular)
  router.get('/success', function(req, res){
    res.send({state: 'success', user:req.user ? req.user: null});
  });
  // Send failure login state back to view(angular)
  router.get('/failure', function(req, res){
    res.send({ state : 'failure', user: null, message: "Invalid username or password"});
    
  });
  //Login request
  router.post('/login', passport.authenticate('login',{
    successRedirect : '/auth/success',
    failureRedirect : '/auth/failure'
  }));
  //signup request
  router.post('/signup', passport.authenticate('signup', {
    successRedirect : '/auth/success',
    failureRedirect : '/auth/failure'
  }));
  
  //Logout request
  router.get('/signout', function(req, res){
    req.session.user = null;
    req.logout();
    res.redirect('/');
  });
  return router;
}















