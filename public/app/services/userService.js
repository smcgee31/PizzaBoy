angular.module('app').service('UserService', function($http) {

  this.getUsers = function() {
    return $http({
      method: 'GET',
      url: '/user'
    }).then(function(response) {
      return response;
    });
  };

  this.getUser = function(id) {
    return $http({
      method: 'GET',
      url: `/user?_id=${ id }`
    }).then(function(response) {
      return response;
    });
  };

  this.deleteUser = function(id) {
    return $http({
      method: 'DELETE',
      url: `/user/${ id }`
    }).then(function(response) {
      return response;
    });
  };
});
