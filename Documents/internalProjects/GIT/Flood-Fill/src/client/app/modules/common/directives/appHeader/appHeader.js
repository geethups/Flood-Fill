(function () {
    'use strict';
    angular.module('admin.common').directive('appHeader', appHeader);

    function appHeader() {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'client/app/modules/common/directives/appHeader/templates/appHeader.html',
            controller: function ($rootScope, $scope, $state, $localStorage) {
                $scope.floodTitle = 'Flood Fill';
                $rootScope.$on('$stateChangeSuccess', function (event, toState, fromState) {
                    if (toState.name !== 'login') {
                        var user = $localStorage.user;
                        if (user && user.hasOwnProperty('name')) {
                            $scope.loggedUserName = $localStorage.user.name;
                        }
                    }
                    $scope.isLogin = (toState.name !== 'login' && toState.name !== 'signup') ? true : false;
                });
                $scope.logout = function () {
                    $state.go('logout');
                };
            }
        };
    }
})();
