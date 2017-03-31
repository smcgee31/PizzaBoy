angular.module('app').service('newDaySvc', function ($http) {

  this.addTip = function (newTip) {
    return $http({
      method: 'POST',
      url: '/newDay',
      data: newTip
    }).then(function (response) {
      return response;
    })
  };

}); 