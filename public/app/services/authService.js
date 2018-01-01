angular.module('app').service('AuthService', function($http) {
  this.login = function(user) {
    // this first endpoint passes to server/services/passport.js and checks for
    // usernameField: 'email',    <-- unless modified from 'email' to 'username' then it checks for username instead
    // passwordField: 'password'
    return $http({
      method: 'post',
      url: '/login',
      data: user,
    })
      .then(function(response) {
        return response;
      });
  };

  this.logout = function() {
    return $http({
      method: 'get',
      url: '/logout',
    })
      .then(function(response) {
        return response;
      });
  };

  this.getCurrentUser = function() {
    return $http({
      method: 'GET',
      url: '/me',
    })
      .then(function(response) {
        return response;
      });
  };

  this.registerUser = function(user) {
    return $http({
      method: 'POST',
      url: '/register',
      data: user,
    })
      .then(function(response) {
        return response;
      });
  };

  this.editUser = function(id, user) {
    return $http({
      method: 'PUT',
      url: `/user/${ id }`,
      data: user,
    })
      .then(function(response) {
        return response;
      });
  };
});
