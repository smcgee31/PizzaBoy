'use strict';

angular.module('app').controller('newShiftCtrl', function($scope) {
  
  $scope.today = moment().format('dddd, MMMM Do, YYYY');

  $scope.tripCounter = 0;

});
