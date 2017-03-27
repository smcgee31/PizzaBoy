var app = angular.module('app', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
        url: "/"
      , templateUrl: "./app/routes/home/homeTmpl.html"
      , controller: 'homeCtrl'
    })
    .state('login', {
        url: '/login'
      , templateUrl: './app/routes/login/loginTmpl.html'
      , controller: 'loginCtrl'
    })
    .state('register', {
        url: '/register'
      , templateUrl: './app/routes/register/registerTmpl.html'
      , controller: 'registerCtrl'
    })
    .state('newDay', {
        url: '/newDay'
      , templateUrl: './app/routes/newDay/newDayTmpl.html'
      , controller: 'newDayCtrl'
    })
    .state('yesterday', {
        url: '/yesterday'
      , templateUrl: './app/routes/yesterday/yesterdayTmpl.html'
      , controller: 'yesterdayCtrl'
    })
    .state('dateRange', {
        url: '/dateRange'
      , templateUrl: './app/routes/dateRange/dateRangeTmpl.html'
      , controller: 'dateRangeCtrl'
    })
    .state('editProfile', {
        url: '/editProfile'
      , templateUrl: './app/routes/editProfile/editProfileTmpl.html'
      , controller: 'editProfileCtrl'
    })
    .state('profile', {
        url: '/profile'
      , templateUrl: './app/routes/profile/profileTmpl.html'
      , controller: 'profileCtrl'
      , resolve: {
        user: function(authService, $state) {
          return authService.getCurrentUser().then(function(response) {
            if (!response.data)
              $state.go('login');
            return response.data;
          }).catch(function(err) {
            $state.go('login');
          });
        }
      }
    });

});
