angular.module('app').service('newShiftSvc', function ($http) {

  this.addTrip = (tripInfo) => {
    return $http({
      method: 'POST',
      url: '/newShift',
      data: tripInfo
    }).then((response) => {
      return response;
    })
  };

}); 