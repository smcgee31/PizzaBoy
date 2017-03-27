angular.module('app').controller('registerCtrl', function($scope, authService, $state) {

  $scope.register = function(user) {
    authService.registerUser(user)
    .then(function(response) {
      if (!response.data) {
        alert('Unable to create user');
      } else {
        alert('User Created');
        $scope.newUser = {};
        $state.go('login');
      }
    }).catch(function(err) {
      alert('Unable to create user');
    });
  };




});
