(function () {
    'use strict';
    angular.module('admin.signup')
        .controller('signupController', signupController);
    signupController.$inject = ['$scope', '$rootScope', '$state', 'homeService', '$timeout'];

    function signupController($scope, $rootScope, $state, homeService, $timeout) {
        var vm = $scope;
        vm.addUser = addUser;

        function sendMail(signupData) {
            homeService.sendMail(signupData)
                .then(function () {
                    //                    console.log('success');
                })
                .catch(function (error) {
                    //                    console.log('error', error);
                });
        }

        function clearAlert() {
            vm.alertClr = '';
            vm.alertUserName = '';
            vm.alertSkills = '';
            vm.alertPhone = '';
            vm.alertEmail = '';
            vm.alertPassword = '';
            vm.alertCnfPassword = '';
        }

        function validateForm(formData) {
            var valid = true;
            clearAlert();
            if (formData.$invalid) {
                valid = false;
                vm.alertClr = 'redAlert';
                if (formData.userName.$invalid) {
                    vm.alertUserName = 'Please provide a valid user name.';
                    if (formData.userName.$error.pattern) {
                        vm.alertUserName = 'User name should have a min length 3 and max length 15. No space allowed.';
                    }
                }
                if (formData.skills.$invalid) {
                    vm.alertSkills = 'Please provide valid skill set.';
                }
                if (formData.phone.$invalid) {
                    vm.alertPhone = 'Please provide a valid phone number.';
                }
                if (formData.email.$invalid) {
                    vm.alertEmail = 'Please provide a valid email id.';
                }
                if (formData.password.$invalid) {
                    vm.alertPassword = 'Please provide a valid password.';
                    if (formData.password.$error.pattern) {
                        vm.alertPassword = 'Password should have at least one number, one lowercase and one uppercase letter and at least six characters.';
                    }
                }
            }
            if (vm.signupData.cnfPassword !== vm.signupData.password) {
                valid = false;
                vm.alertCnfPassword = 'Please enter the same password as above.';
            }
            return valid;
        }

        function addUser(formData) {
            if (validateForm(formData)) {
                homeService.addUser(vm.signupData)
                    .then(function () {
                        sendMail(vm.signupData);
                        vm.alertClr = 'greenAlert';
                        vm.alertRes = 'You have been added as a user';
                        clearData();
                        if (formData) {
                            formData.$setPristine();
                            formData.$setUntouched();
                        }
                    })
                    .catch(function (error) {
                        if (error.data && error.data.status === 'nok' && error.data.message) {
                            vm.alertClr = 'redAlert';
                            vm.alertRes = 'Failed to add you, ' + error.data.message;
                        }
                    });
            }
        }

        function clearData() {
            vm.signupData = {};
        }

        function constructor() {
            clearData();
        }
        constructor();
    }
})();
