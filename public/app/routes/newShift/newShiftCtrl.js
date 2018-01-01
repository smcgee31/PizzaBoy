angular.module('app').controller('newShiftCtrl', function($scope, $localStorage, $sessionStorage, $state, ShiftService, user) {
  const userId = user.data._id; // eslint-disable-line no-underscore-dangle

  $scope.$storage = $localStorage;

  $scope.today = moment().format('dddd, MMMM Do, YYYY');
  $scope.tripCounter = 1;

  $scope.newShift = (miles) => {
    $scope.$storage.beginMiles = miles;
    $localStorage.currShiftId = moment().unix();
    ShiftService.newShift(miles, userId, $localStorage.currShiftId)
      .then((response) => {
        if (!response.shifts) {
          $scope.miles = '';
          const error = new Error();

          error.message = 'Something went wrong.\n Your new shift was not started.';
        }
        alert('Your new shift has been created!  :-D');
        $state.go('addTrips');
      })
      .catch((error) => {
        console.log('NewShift Error:', error);
        alert(error.message);
      });
  };

  $scope.addTrip = (trip) => {
    trip.tripNumber = $scope.tripCounter;
    ShiftService.addTrip(trip, $localStorage.currShiftId)
      .then((response) => {
        if (response.data.status > 299) {
          $scope.trip.tipAmount = '';
          const error = new Error();

          error.message = 'Something went wrong.\n Your trip was not recorded';
          throw error;
        }
        alert(`Success!\n$${ $scope.trip.tipAmount } tip recorded.`);
        const tipType = document.getElementsByClassName('tipType');

        for (let i = 0; i < tipType.length; i++) {
          tipType[i].checked = false;
        }

        $scope.trip.tipAmount = '';
        $scope.tripCounter++;
      })
      .catch((error) => {
        alert(error.message || 'Bad JooJoo!!'); // TODO: I think this indicates that the error is created or used wrong above and throughout the app
        console.log('AddTrip Error:', error);
      });
  };
});
