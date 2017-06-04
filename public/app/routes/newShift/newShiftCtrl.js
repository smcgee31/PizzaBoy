angular.module('app').controller('newShiftCtrl', function($scope, $state, newShiftSvc, user) {

  const userId = user.data._id;

  $scope.today = moment().format('dddd, MMMM Do, YYYY');
  $scope.now = moment().format('MMMM DD, YYYY, h:mm a');  // this might oughta be part of the ShiftModel
  $scope.tripCounter = 1;

  $scope.newShift = (miles) => {
    newShiftSvc.newShift(miles, userId)
      .then((response) => {
        if (!response.shifts) {
          alert('Something went wrong,\n your new shift was not started :(');
          $scope.miles = '';
        } else {
          alert('Your new shift has been created!  :-D');
          shiftId = response.shifts.pop();
          console.log('shiftId-1:', shiftId);
          $state.go('addTrips');
        }
      })
      .catch((error) => {
        console.log('error:', error);
      });
  };

  $scope.addTrip = (trip) => {
    trip.tripNumber = $scope.tripCounter;
    console.log('shiftId-2:', shiftId);
    newShiftSvc.addTrip(trip, shiftId)
      .then((response) => {
        if (!response.data) {
          alert('Something went wrong,\n your trip was not recorded :(')
          $scope.trip.tipAmount = '';
        } else {
          alert(`Success!
            $ ${$scope.trip.tipAmount} tip recorded.`);
          console.log('response:', response);
          let tipType = document.getElementsByClassName('tipType');
          for(let i = 0; i < tipType.length; i++) {
            tipType[i].checked = false;
          }

          $scope.trip.tipAmount = '';
          $scope.tripCounter++;
        }
      })
      .catch((error) => {
        console.log('error:', error);
      });
  };

  $scope.refreshShift = (userId) => {
    newShiftSvc.getCurrentShift()
    .then((response) => {
      $scope.shift = response.data.shifts.pop();
    })
  }


  
});
