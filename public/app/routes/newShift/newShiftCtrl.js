angular.module('app').controller('newShiftCtrl', function($scope, newShiftSvc, user) {
  
  $scope.today = moment().format('dddd, MMMM Do, YYYY');

  $scope.tripCounter = 1;

  $scope.submitTrip = (tripInfo) => {
    console.log('tripInfo:', tripInfo);

    newShiftSvc.addTrip(tripInfo, user._id)
      .then((response) => {
        console.log('response:', response);
        // alert(`Success!
        //   $ ${$scope.tipAmount} tip recorded.`);
        let tipType = document.getElementsByClassName('tipType');
        for(let i = 0; i < tipType.length; i++) {
          tipType[i].checked = false;
        }

        $scope.trip.tipAmount = '';
        $scope.tripCounter++;
      })
      .catch((error) => {
        console.log('error:', error);
      });
  };


  
});
