// Angular Starter App
var app = angular.module('app', ['ui.router', 'ngRoute','ngRource']);
app.run(function($http, $rootScope){
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
      templateUrl : 'index.html',
      caseInsensitiveMatch : true,
      controller : 'homeCtrl'
    })
    .state('contact', {
      url : '/contact',
      templateUrl : 'contact.html',
      caseInsensitiveMatch : true,
      controller : 'contactCtrl'
    })
    .state('about', {
      url : '/about',
      templateUrl : 'about.html',
      caseInsensitiveMatch : true,
      controller : 'aboutCtrl'
    })
    .state('login', {
      url : '/login',
      templateUrl : 'login.html',
      caseInsensitiveMatch : true,
      controller : 'authCtrl'
    })
    .state('register', {
      url : '/register',
      templateUrl : 'register.html',
      caseInsensitiveMatch : true,
      controller : 'authCtrl'
    })
    .state('unauth', {
      url : '/unauth',
      templateUrl : 'unauth.html',
      caseInsensitiveMatch : true
    });
  }
]);










