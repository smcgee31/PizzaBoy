angular.module('app').service('ShiftService', function($http) {
  this.newShift = (startMileage, userId, shiftId) => {
    return $http({
      method: 'POST',
      url: `/newShift/${ userId }`,
      data: { startMileage, shiftId },
    })
      .then((response) => {
        return response.data;
      });
  };

  this.addTrip = (tripInfo, shiftId) => {
    return $http({
      method: 'PUT',
      url: `/addTrips/${ shiftId }`,
      data: tripInfo,
    })
      .then((response) => {
        return response;
      });
  };

  this.getCurrentShift = (userId) => {
    return $http({
      method: 'GET',
      url: `addTrips/getShifts/${ userId }`,
    })
      .then((response) => {
        const shiftId = response.shifts.sort().slice(-1)[0];

        return shiftId;
      });
  };
});
