// Auth controller 
angular.module('app').controller('authCtrl', function ($scope, $http, $rootScope, $location){
  $scope.user = {username : '', password : ''};
  $scope.error_message = '';
  //Login call to webapi (node implemented service)
  $scope.login = function(){
    $http.post('/auth/login', $scope.user)
    .success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $rootScope.sess = data.user;
        sessionStorage.setItem('current_user', $rootScope.sess.username);
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
        $rootScope.sess = null;
      }
    });
  };
  // Login call to webapi (node implemented services)
  $scope.register = function(){
    console.log($scope.user);
    $http.post('/auth/signup', $scope.user)
    .success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/');
      }else { 
        $scope.error_message = data.message;
      }
    });
  };
});








