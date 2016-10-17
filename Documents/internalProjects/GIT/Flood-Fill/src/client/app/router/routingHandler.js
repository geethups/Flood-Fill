(function () {
    angular.module('admin').run(runConfig);
    runConfig.$inject = ['$rootScope', '$state', '$localStorage'];

    function runConfig($rootScope, $state, $localStorage) {

        var stateChange = $rootScope.$on('$stateChangeStart', onStateChangeStart);

        function onStateChangeStart(event, toState, toParams, fromState) {
            var user = $localStorage.user;
            restrictAdminPage(event, toState, fromState, user);
        }

        function restrictAdminPage(event, toState, fromState, user) {
            if (['signup'].indexOf(toState.name) === -1) {
                if (['login', 'logout'].indexOf(toState.name) === -1) {
                    handleLoginPage(event, toState, fromState, user);
                } else if (toState.name === 'logout' && fromState.name === 'login') {
                    event.preventDefault();
                }
            }
        }

        function handleLoginPage(event, toState, fromState, user) {
            if (user && user.hasOwnProperty('isLogged')) {
                if (!user.isLogged) {
                    permissionDenied(event);
                } else if (fromState.name !== '' && toState.name === 'login') {
                    event.preventDefault();
                }
            } else {
                permissionDenied(event);
            }
        }

        function permissionDenied(event) {
            event.preventDefault();
            $state.go('logout');
        }
    }
})();
