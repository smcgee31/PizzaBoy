'use strict';

angular.module('app').controller('newDayCtrl', function($scope) {
  
  $scope.today = moment().format('dddd, MMMM Do, YYYY');

  $scope.tripCounter = 0;

});
