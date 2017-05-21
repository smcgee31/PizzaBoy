angular.module('app').controller('registerCtrl', function($scope, authService, $state) {

  $scope.register = (user) => {
    authService.registerUser(user)
    .then((response) => {
      if (!response.data) {
        alert('Unable to create user');
      } else {
        alert('User Created');
        $scope.newUser = {};
        $state.go('login');
      }
    }).catch((err) => {
      alert('Unable to create user');
    });
  };




});
