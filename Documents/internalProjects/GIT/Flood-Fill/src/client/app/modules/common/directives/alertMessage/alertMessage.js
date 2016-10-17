(function () {
    'use strict';
    angular.module('admin.common').directive('alertMessage', alertMessage);

    function alertMessage() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                alert: '='
            },
            templateUrl: 'client/app/modules/common/directives/alertMessage/templates/alertMessage.html',
            controller: function ($scope) {
                $scope.close = function () {
                    $scope.alert = {
                        msg: '',
                        type: ''
                    };
                };
            }
        };
    }
})();
