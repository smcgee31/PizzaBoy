angular.module('app').service('newShiftSvc', function ($http) {

  this.newShift = (startMileage, userId) => {
    return $http({
        method: 'POST'
      , url: '/newShift/' + userId
      , data: { startMileage }
    })
    .then((response) => {
      return response.data;
    });
  };

  this.addTrip = (tripInfo, shiftId) => {
    return $http({
        method: 'PUT'
      , url: '/addTrips/' + shiftId
      , data: tripInfo
    })
    .then((response) => {
      return response;
    });
  };

  this.getCurrentShift = (userId) => {
    return $http({
        method: 'GET'
      , url: 'addTrips/getShift/' + userId
    })
    .then((response) => {
      return response;
    });
  };

}); 