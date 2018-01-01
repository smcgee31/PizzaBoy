angular.module('app').service('AuthService', function($http) {
  this.login = (user) => {
    // this first endpoint passes to server/services/passport.js and checks for
    // usernameField: 'email',    <-- unless modified from 'email' to 'username' then it checks for username instead
    // passwordField: 'password'
    return $http({
      method: 'post',
      url: '/login',
      data: user,
    })
      .then((response) => {
        return response;
      });
  };

  this.logout = () => {
    return $http({
      method: 'get',
      url: '/logout',
    })
      .then((response) => {
        return response;
      });
  };

  this.getCurrentUser = () => {
    return $http({
      method: 'GET',
      url: '/me',
    })
      .then((response) => {
        return response;
      });
  };

  this.registerUser = (user) => {
    return $http({
      method: 'POST',
      url: '/register',
      data: user,
    })
      .then((response) => {
        return response;
      });
  };

  this.editUser = (id, user) => {
    return $http({
      method: 'PUT',
      url: `/user/${ id }`,
      data: user,
    })
      .then((response) => {
        return response;
      });
  };
});
