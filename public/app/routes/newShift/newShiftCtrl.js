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
        if (response.data.status > 299) { // TODO: I'm not sure this is the correct way
          const error = new Error();

          $scope.trip.tipAmount = '';
          error.message = 'Something went wrong.\n Your trip was not recorded';

          throw error;
        }

        const tipType = document.getElementsByClassName('tipType');

        alert(`Success!\n$${ $scope.trip.tipAmount } tip recorded.`);

        for (let i = 0; i < tipType.length; i++) {
          tipType[i].checked = false;
        }

        $scope.trip.tipAmount = '';
        $scope.tripCounter++;
      })
      .catch((error) => {
        alert(error.message || 'Bad JooJoo!!'); // TODO: I think 'Bad JooJoo!' shows up because the error is created wrong or used wrong above (and throughout the app)
        console.log('AddTrip Error:', error);
      });
  };
});
