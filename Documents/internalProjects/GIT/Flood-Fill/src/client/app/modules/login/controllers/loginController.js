(function () {
    'use strict';
    angular.module('admin.login')
        .controller('loginController', loginController);
    loginController.$inject = ['$scope', '$state', '$localStorage', '$rootScope', 'authService', '$timeout'];

    function loginController($scope, $state, $localStorage, $rootScope, authService, $timeout) {

        var vm = $scope;
        vm.valid = true;
        vm.password = '';
        vm.userName = '';
        vm.login = login;
        vm.goSignup = goSignup;
        constructor();

        function goSignup() {
            $state.go('signup');
        }

        function login() {
            if (!(vm.password || vm.userName)) {
                vm.errorMessage = 'All feilds are required';
                vm.valid = false;
            } else if (!vm.password) {
                vm.errorMessage = 'Password Required';
                vm.valid = false;
            } else if (!vm.userName) {
                vm.errorMessage = 'Username Required';
                vm.valid = false;
            } else {
                vm.valid = true;
                vm.password = vm.password.trim();
                vm.userName = vm.userName.trim();
                authService.getAccessToken(vm.userName, vm.password)
                    .then(function () {
                        vm.hideLogo = false;
                        $timeout(function () {
                            $state.go('home');
                        }, 1000);
                    })
                    .catch(function (error) {
                        if (error.data && error.data.status === 'nok') {
                            vm.errorMessage = 'Username or Password is invalid.';
                            vm.valid = false;
                        }
                    });
            }
        }

        function constructor() {
            vm.hideLogo = true;
            var user = $localStorage.user;
            if (user && user.hasOwnProperty('isLogged')) {
                if (user.isLogged) {
                    $state.go('home');
                }
            }
        }
    }
})();
