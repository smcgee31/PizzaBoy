angular.module('app').controller('loginCtrl', function($scope, authService, $state) {

  $scope.login = function(user) {
    authService.login(user).then(function(response) {
      if (!response.data) {
        alert('User does not exist');
        $scope.user.password = '';
      } else {
        $state.go('profile');
      }
    }).catch(function(err) {
      alert('Unable to login');
    });
  };

});
