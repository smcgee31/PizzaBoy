angular.module('app').service('newShiftSvc', function ($http) {

  this.addTip = function (newTip) {
    return $http({
      method: 'POST',
      url: '/newShift',
      data: newTip
    }).then(function (response) {
      return response;
    })
  };

}); 