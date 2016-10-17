(function () {
    'use strict';
    angular.module('admin.home')
        .factory('homeService', homeService);
    homeService.$inject = ['baseService', '$localStorage'];

    function homeService(baseService, $localStorage) {
        return {
            save: saveQuestion,
            saveAnswer: saveAnswer,
            get: getQuestion,
            getAnswer: getAnswer,
            updateData: updateData,
            addLike: addLike,
            remove: removeQuestion,
            getTech: getTechnolgies,
            addUser: addUser,
            sendMail: sendMail
        }

        function sendMail(signupData) {
            var url = '/flood/v1',
                param = {
                    pathParam: {
                        add: 'send',
                        user: 'mail'
                    },
                    dataParam: {}
                };
            if (signupData) {
                param.dataParam['user'] = signupData.userName;
                param.dataParam['toAddr'] = signupData.email;
            }
            return baseService.postData(url, param);
        }

        function addUser(signupData) {
            var url = '/flood/v1',
                param = {
                    pathParam: {
                        add: 'add',
                        user: 'user'
                    },
                    dataParam: {},
                    queryParam: {
                        tableType: 'user'
                    }
                };
            if (signupData) {
                param.dataParam['userName'] = signupData.userName;
                param.dataParam['userType'] = 'user';
                param.dataParam['skills'] = signupData.skills;
                param.dataParam['phone'] = signupData.phone;
                param.dataParam['email'] = signupData.email;
                param.dataParam['password'] = signupData.password;
            }
            return baseService.postData(url, param);
        }

        function getTechnolgies() {
            var url = '/flood/v1',
                param = {
                    pathParam: {
                        get: 'get',
                        data: 'tech'
                    },
                    dataParam: {}
                };
            param.dataParam['tableType'] = 'tech';
            return baseService.getData(url, param);
        }

        function removeQuestion(data) {
            var url = '/flood/v1',
                param = {
                    pathParam: {
                        remove: 'remove',
                        data: 'data'
                    },
                    dataParam: {}
                };
            if (data) {
                param.dataParam['data'] = JSON.stringify(data);
            }
            param.dataParam['tableType'] = 'ques';
            return baseService.deleteData(url, param);
        }

        function addLike(answerDesc, user) {
            var url = '/flood/v1',
                param = {
                    pathParam: {
                        add: 'add',
                        like: 'like'
                    },
                    dataParam: {}
                };
            if (answerDesc && user) {
                var dataObj = {
                    'answerDesc': answerDesc,
                    'user': user
                }
                param.dataParam['dataObj'] = dataObj;
                var queryArr = [{
                    'col': 'answerDesc',
                    'val': answerDesc
            }, {
                    'col': 'user',
                    'val': user
            }];
                param.dataParam['queryArr'] = queryArr;
            }
            return baseService.postData(url, param);
        }

        function updateData(dataObj, keyField, keyVal) {
            var url = '/flood/v1',
                param = {
                    pathParam: {
                        update: 'update',
                        data: 'data'
                    },
                    dataParam: {},
                    queryParam: {
                        tableType: 'ans'
                    }
                };
            if (dataObj) {
                param.dataParam['updateObj'] = dataObj;
            }
            if (keyField) {
                param.dataParam['keyField'] = keyField;
            }
            if (keyVal) {
                param.dataParam['keyVal'] = keyVal;
            }
            return baseService.postData(url, param);
        }

        function saveQuestion(tag, desc, tech) {
            var url = '/flood/v1',
                param = {
                    pathParam: {
                        save: 'save',
                        data: 'data'
                    },
                    dataParam: {},
                    queryParam: {
                        tableType: 'ques'
                    }
                };
            if (tag) {
                param.dataParam['tag'] = tag;
            }
            if (desc) {
                param.dataParam['desc'] = desc;
            }
            if (tech) {
                param.dataParam['tech'] = tech;
            }
            param.dataParam['techId'] = '';
            if ($localStorage.user && $localStorage.user.name) {
                param.dataParam['user'] = $localStorage.user.name;
            }
            return baseService.postData(url, param);
        }

        function saveAnswer(desc, answer, link) {
            var url = '/flood/v1',
                param = {
                    pathParam: {
                        save: 'save',
                        data: 'data'
                    },
                    dataParam: {},
                    queryParam: {
                        tableType: 'ans'
                    }
                };
            if (answer) {
                param.dataParam['answer'] = answer;
            }
            if (desc) {
                param.dataParam['desc'] = desc;
            }
            param.dataParam['like'] = '0';
            param.dataParam['disLike'] = '0';
            if ($localStorage.user && $localStorage.user.name) {
                param.dataParam['user'] = $localStorage.user.name;
            }
            if (link) {
                param.dataParam['link'] = JSON.stringify(link);
            }
            param.dataParam['editUser'] = '';
            return baseService.postData(url, param);
        }

        function getQuestion(ques) {
            var url = '/flood/v1',
                param = {
                    pathParam: {
                        get: 'get',
                        data: 'data'
                    },
                    dataParam: {}
                };
            if (ques) {
                param.dataParam['ques'] = ques;
            }
            param.dataParam['tableType'] = 'ques';
            return baseService.getData(url, param);
        }

        function getAnswer(ques) {
            var url = '/flood/v1',
                param = {
                    pathParam: {
                        get: 'get',
                        data: 'data'
                    },
                    dataParam: {}
                };
            if (ques) {
                param.dataParam['ques'] = ques;
            }
            param.dataParam['tableType'] = 'ans';
            return baseService.getData(url, param);
        }
    }
})();
