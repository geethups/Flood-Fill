(function () {
    'use strict';
    angular.module('admin.questionHome')
        .controller('questionHomeController', questionHomeController);
    questionHomeController.$inject = ['$scope', '$state', 'homeService', '$localStorage', '$timeout'];

    function questionHomeController($scope, $state, homeService, $localStorage, $timeout) {
        var vm = $scope;
        vm.postAnswer = postAnswer;
        vm.clearData = clearData;
        vm.editAnswer = editAnswer;
        vm.postEditAnswer = postEditAnswer;
        vm.incrementCount = incrementCount;

        function callUpdateService(data, keyField, keyVal) {
            homeService.updateData(data, keyField, keyVal)
                .then(function (response) {
                    constructor();
                }, function (error) {
                    console.log('Update error', error);
                });
        }

        function postEditAnswer(updateObj) {
            if (vm.answerDesc) {
                var answerLinkArr = JSON.stringify(vm.answerLink.split('\n'));
                var user = '';
                if ($localStorage.user && $localStorage.user.name) {
                    user = $localStorage.user.name;
                }
                var data = [{
                        "updateField": "answerDesc",
                        "updateVal": vm.answerDesc
                },
                    {
                        "updateField": "answerLink",
                        "updateVal": answerLinkArr
                },
                    {
                        "updateField": "editUser",
                        "updateVal": user
                }];

                homeService.updateData(data, 'answerDesc', $localStorage.prevAnsDesc)
                    .then(function (response) {
                        vm.alertClr = 'greenAlert';
                        vm.alertRes = 'Your answer has been posted successfully.';
                        $timeout(function () {
                            angular.element('#ansModalClose').click();
                        }, 1000);
                    }, function (error) {
                        vm.alertClr = 'redAlert';
                        vm.alertRes = 'Failed to add your post, ' + error.data.message;
                    });
            } else {
                vm.alertClr = 'redAlert';
                vm.alertRes = 'Please provide the answer description';
            }
        }

        function editAnswer(ansObj) {
            vm.postAnsBtn = false;
            vm.ansModalTitle = 'Edit Answer';
            $localStorage.prevAnsDesc = vm.answerDesc = ansObj.answerDesc;
            vm.answerLink = ansObj.answerLink.toString().split(',').join('\n');
        }

        function incrementCount(ansObj, field) {
            var loggedInUser = '';
            if ($localStorage.user && $localStorage.user.name) {
                loggedInUser = $localStorage.user.name;
            }
            var increment;
            if (field === 'likeCount') {
                increment = ansObj.likeCount + 1;
                if (loggedInUser) {
                    $localStorage.like = {
                        user: loggedInUser,
                        ansKey: ansObj.answerDesc
                    }
                }
            } else if (field === 'dislikeCount') {
                increment = ansObj.dislikeCount + 1;
            }

            homeService.addLike(ansObj.answerDesc, loggedInUser)
                .then(function (res) {
                    return res;
                }).then(function (res) {
                    if (res.data && res.data.status === 'ok') {
                        var data = [{
                            "updateField": field,
                            "updateVal": increment
                          }];
                        callUpdateService(data, 'answerDesc', ansObj.answerDesc);
                    }
                }).catch(function (error) {
                    //Not allowed to like
                });
        }

        function clearData() {
            vm.postAnsBtn = true;
            vm.answerDesc = '';
            vm.answerLink = '';
            vm.alertClr = '';
        }

        function postAnswer() {
            var answerLinkArr = vm.answerLink.split('\n');
            //validate and post content
            if (vm.answerDesc) {
                homeService.saveAnswer(vm.quesDes, vm.answerDesc, answerLinkArr)
                    .then(function (response) {
                        vm.alertClr = 'greenAlert';
                        vm.alertRes = 'Your answer has been posted successfully.';
                        $timeout(function () {
                            angular.element('#ansModalClose').click();
                        }, 1000);
                    }, function (error) {
                        vm.alertClr = 'redAlert';
                        vm.alertRes = 'Failed to add your post, ' + error.data.message;
                    });
            }
        }

        function constructor() {
            vm.alertRes = '';
            vm.ansModalTitle = 'Post Answer';
            vm.postAnsBtn = true;
            vm.quesDes = $state.params.data;
            //get question content
            homeService.get(vm.quesDes)
                .then(function (response) {
                    if (response.data && response.data.resData) {
                        vm.quesArr = angular.copy(response.data.resData[0]);
                    }
                }, function (error) {
                    console.log('error', error);
                }).then(function () {
                        homeService.getAnswer(vm.quesDes)
                            .then(function (response) {
                                vm.ansArr = angular.copy(response.data.resData);
                                vm.ansArr.forEach(function (element, index, arr) {
                                    if (element.answerLink) {
                                        vm.ansArr[index].answerLink = JSON.parse(element.answerLink);
                                    }
                                });
                            });
                    },
                    function (error) {
                        console.log('error', error);
                    });
        }

        $('#postAns').on('hidden.bs.modal', function () {
            constructor();
        });
        constructor();
    }
})();
