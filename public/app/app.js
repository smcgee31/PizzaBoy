/* eslint-disable object-shorthand */
// If object-shorthand is not disabled then gulp creates a bad version of bundle.js
// specifically around the resolve user methods

angular.module('app', [ 'ui.router', 'ngStorage' ])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: './app/routes/home/homeTmpl.html',
        controller: 'homeCtrl',
      })
      .state('login', {
        url: '/login',
        templateUrl: './app/routes/login/loginTmpl.html',
        controller: 'loginCtrl',
      })
      .state('register', {
        url: '/register',
        templateUrl: './app/routes/register/registerTmpl.html',
        controller: 'registerCtrl',
      })
      .state('newShift', {
        url: '/newShift',
        templateUrl: './app/routes/newShift/newShiftTmpl.html',
        controller: 'newShiftCtrl',
        resolve: {
          user: function(AuthService) {
            return AuthService.getCurrentUser();
          },
        },
      })
      .state('addTrips', {
        url: '/addTrips',
        templateUrl: './app/routes/newShift/addTripsTmpl.html',
        controller: 'newShiftCtrl',
        resolve: {
          user: function(AuthService) {
            return AuthService.getCurrentUser();
          },
        },
      })
      .state('yesterday', {
        url: '/yesterday',
        templateUrl: './app/routes/yesterday/yesterdayTmpl.html',
        controller: 'yesterdayCtrl',
      })
      .state('dateRange', {
        url: '/dateRange',
        templateUrl: './app/routes/dateRange/dateRangeTmpl.html',
        controller: 'dateRangeCtrl',
      })
      .state('editProfile', {
        url: '/editProfile',
        templateUrl: './app/routes/editProfile/editProfileTmpl.html',
        controller: 'editProfileCtrl',
      })
      .state('profile', {
        url: '/profile',
        templateUrl: './app/routes/profile/profileTmpl.html',
        controller: 'profileCtrl',
        resolve: {
          user: function(AuthService, $state) {
            return AuthService.getCurrentUser()
              .then(function(response) {
                if (!response.data) {
                  $state.go('login');
                }

                return response.data;
              }).catch(function(err) {
                console.log('Auth Error:\n', err);
                $state.go('login');
              });
          },
        },
      });
  });
