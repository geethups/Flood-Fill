(function () {
    'use strict';
    angular.module('admin.home')
        .controller('homeController', homeController);
    homeController.$inject = ['$scope', '$rootScope', '$state', 'homeService', '$timeout'];

    function homeController($scope, $rootScope, $state, homeService, $timeout) {
        var vm = $scope;
        vm.addQuestion = addQuestion;
        vm.clearData = clearData;

        function clearData() {
            vm.questionTag = '';
            vm.questionDesc = '';
            vm.technology = '';
            vm.alertRes = '';
        }

        function addQuestion() {
            //validate and post content
            if (vm.questionTag && vm.questionDesc && vm.technology && vm.technology.techName) {
                homeService.save(vm.questionTag, vm.questionDesc, vm.technology.techName)
                    .then(function (response) {
                        vm.alertClr = 'greenAlert';
                        vm.alertRes = 'Your question has been posted successfully.';
                        if (vm.$$childTail && vm.$$childTail.getAllQuestions) {
                            vm.$$childTail.getAllQuestions();
                        }
                        $timeout(function () {
                            angular.element('#modalClose').click();
                        }, 1000);
                    }, function (error) {
                        if (error && error.data && error.data.message) {
                            vm.alertClr = 'redAlert';
                            vm.alertRes = 'Failed to add your post, ' + error.data.message;
                        }
                    });
            } else {
                vm.alertClr = 'redAlert';
                vm.alertRes = 'Failed to add your post, Incomplete data.';
            }
        }

        function getTechs() {
            //get technology list
            homeService.getTech()
                .then(function (response) {
                    if (response.data && response.data.resData) {
                        vm.dropdown = {
                            techs: angular.copy(response.data.resData)
                        };
                    }
                }, function (error) {
                    vm.dropdown = {
                        techs: ''
                    };
                });
        }

        function constructor() {
            getTechs();
            vm.alertRes = '';
            $state.go('home.questionList', {
                reload: 'home.questionList'
            });
        }
        constructor();

        var stateChange = $rootScope.$on('$stateChangeSuccess',
            function (event, toState) {
                if (toState.name === 'home') {
                    constructor();
                }
            });
        vm.$on('$destroy', stateChange);
    }
})();
