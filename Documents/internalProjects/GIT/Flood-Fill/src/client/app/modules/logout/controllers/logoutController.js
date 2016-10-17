angular.module('admin.logout')
  .controller('logoutController', ['$localStorage', '$state', function ($localStorage, $state) {
    'use strict';
    $localStorage.$reset();
    $state.go('login');
  }]);
