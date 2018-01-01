angular.module('app').controller('navCtrl', function($scope, AuthService, $state) {
  $scope.logout = () => {
    AuthService.logout()
      .then(() => {
        $state.go('login');
      })
      .catch((err) => {
        console.log('Error:\n', err);
      });
  };
});
