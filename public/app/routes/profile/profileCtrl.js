angular.module('app').controller('profileCtrl', function($scope, user) {
  $scope.username = user.username;
});
