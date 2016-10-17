(function () {
    'use strict';
    angular.module('admin.questionList')
        .controller('questionListController', questionListController);
    questionListController.$inject = ['$scope', '$state', 'homeService', '$localStorage', '$timeout'];

    function questionListController($scope, $state, homeService, $localStorage, $timeout) {
        var vm = $scope,
            mode;
        vm.gotoQuestion = gotoQuestion;
        vm.getAllQuestions = getAllQuestions;
        vm.removeQuestion = removeQuestion;

        function removeAlertMsg() {
            vm.alert = {
                type: '',
                msg: ''
            };
        }

        function removeQuestion(ques) {
            removeAlertMsg();
            var data = {
                'col': 'questionDesc',
                'val': ques.questionDesc
            };
            homeService.remove(data)
                .then(function (response) {
                    if (response.data && response.data.status === 'ok') {
                        $timeout(function () {
                            vm.alert = {
                                type: 'success',
                                msg: 'Question has been removed successfully.'
                            };
                        }, 1000);
                        constructor();
                    }
                }, function (error) {
                    vm.alert = {
                        type: 'danger',
                        msg: 'Unable to remove the question.'
                    };
                });
        }

        function gotoQuestion(quesDes) {
            $state.go('home.questionHome', {
                data: quesDes,
                mode: mode
            }, {
                reload: 'home.questionHome'
            });
        }

        function getAllQuestions() {
            //get content
            homeService.get()
                .then(function (response) {
                    if (response.data && response.data.resData) {
                        vm.allQuesArr = response.data.resData;
                    }
                }, function (error) {
                    console.log('error', error);
                });
        }

        function checkMode() {
            if ($localStorage.userType == 'admin') {
                mode = 2;
            } else {
                mode = 1;
            }
        }

        function constructor() {
            checkMode();
            getAllQuestions();
            if ($localStorage.user && $localStorage.user.loggedAs) {
                vm.userType = $localStorage.user.loggedAs;
            }
        }
        constructor();
    }
})();
