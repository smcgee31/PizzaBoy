angular.module('app').controller('loginCtrl', function($scope, authService, $state) {

  $scope.login = function(user) {
    authService.login(user)
      .then((response) => {
        if (!response.data) {
          alert('User does not exist');
          $scope.user.password = '';
        } else {
          $state.go('profile');
        }
      }).catch((err) => {
        alert('Unable to login');
      });
  };

});
