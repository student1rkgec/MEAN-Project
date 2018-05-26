// Angular Starter App
var app = angular.module('app', ['ui.router', 'ngRoute','ngRource']);
app.run(function($http, $rootScope){
  
    //defining global veriables
    $rootScope.roles = [{
		  name: "Administrator",
          code: 0
	   }, {
		  name: "Staff",
          code: 1
	   }, {
		  name: "General",
          code: 2
	}];
  
  if(sessionStorage.length > 0){
    $rootScope.current_user = sessionStorage.current_user;
    $rootScope.authenticated = true;
  } else{
    $rootScope.authenticated = false;
    $rootScope.current_user = 'Guest';
  }
  $rootScope.signout = function(){
    $http.get('auth/signout');
    $rootScope.authenticated = false;
    $rootScope.current_user = 'Guest';
    sessionStorage.clear();
  };
});

// Routing Configuration (define routes)

app.config([
  '$stateProvider', '$urlRouterProvider','httpProvider',
  function ($stateProvider , $urlRouterProvider, $rootScope){
    $urlRouterProvider.otherwise('/');
    $stateProvider
     .state('home', {
      url: '/',
      templateUrl : '/Views/Main/home.html',
      caseInsensitiveMatch : true,
      controller : 'homeCtrl'
    })
    .state('contact', {
      url : '/contact',
      templateUrl : '/Views/Main/contact.html',
      caseInsensitiveMatch : true,
      controller : 'contactCtrl'
    })
    .state('about', {
      url : '/about',
      templateUrl : '/Views/Main/about.html',
      caseInsensitiveMatch : true,
      controller : 'aboutCtrl'
    })
    .state('login', {
      url : '/login',
      templateUrl : '/Views/Authentication/login.html',
      caseInsensitiveMatch : true,
      controller : 'authCtrl'
    })
    .state('register', {
      url : '/register',
      templateUrl : '/Views/Authentication/register.html',
      caseInsensitiveMatch : true,
      controller : 'authCtrl'
    })
    .state('unauth', {
      url : '/unauth',
      templateUrl : '/Views/Authentication/unauth.html',
      caseInsensitiveMatch : true
    });
  }
]);










