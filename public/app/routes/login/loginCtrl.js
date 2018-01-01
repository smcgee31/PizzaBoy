angular.module('app').controller('loginCtrl', function($scope, AuthService, $state) {
  $scope.login = function(user) {
    AuthService.login(user)
      .then((response) => {
        if (!response.data) {
          $scope.user.password = '';

          const error = new Error();

          error.message = 'User not found, unable to login';

          throw error;
        }
        $state.go('profile');
      }).catch((err) => {
        console.log('Error:\n', err);
        alert(err.message);
      });
  };
});
