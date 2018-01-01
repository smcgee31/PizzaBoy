angular.module('app').service('UserService', function($http) {
  this.getUsers = () => {
    return $http({
      method: 'GET',
      url: '/user',
    })
      .then((response) => {
        return response;
      });
  };

  this.getUser = (id) => {
    return $http({
      method: 'GET',
      url: `/user?_id=${ id }`,
    })
      .then((response) => {
        return response;
      });
  };

  this.deleteUser = (id) => {
    return $http({
      method: 'DELETE',
      url: `/user/${ id }`,
    })
      .then((response) => {
        return response;
      });
  };
});
