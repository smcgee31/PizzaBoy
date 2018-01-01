angular.module('app').controller('registerCtrl', function($scope, AuthService, $state) {
  $scope.register = (user) => {
    AuthService.registerUser(user)
      .then((response) => {
        if (!response.data) {
          const error = new Error();

          error.message = 'Unable to create user';
          throw error;
        }

        alert('User Created');

        $scope.newUser = {};
        $state.go('login');
      })
      .catch((err) => {
        console.log('RegisterUser Error:\n', err);
        alert(err.message);
      });
  };
});
