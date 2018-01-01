angular.module('app').controller('loginCtrl', function($scope, AuthService, $state) {
  $scope.login = function(user) {
    AuthService.login(user)
      .then((response) => {
        if (!response.data) {
          const error = new Error();

          $scope.user.password = '';
          error.message = 'User not found, unable to login';

          throw error;
        }

        $state.go('profile');
      })
      .catch((err) => {
        console.log('Error:\n', err);
        alert(err.message);
      });
  };
});
