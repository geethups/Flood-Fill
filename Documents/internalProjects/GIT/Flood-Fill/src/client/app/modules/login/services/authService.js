(function () {
    'use strict';
    angular.module('admin.login')
        .factory('authService', authService);
    authService.$inject = ['baseService', '$localStorage', '$q'];

    function authService(baseService, $localStorage, $q) {
        return {
            getAccessToken: getAccessToken
        };

        function getAccessToken(username, password) {
            var deferred = $q.defer(),
                url = '/flood/v1',
                param = {
                    pathParam: {
                        login: 'login'
                    },
                    dataParam: {}
                };
            if (username) {
                param.dataParam['username'] = username;
            }
            if (password) {
                param.dataParam['password'] = password;
            }
            baseService.postData(url, param)
                .then(function (response) {
                    var headerData = response.headers();
                    if (response.data && response.data.resData && response.data.resData[0].userType) {
                        var userType = response.data.resData[0].userType;
                    }
                    if (headerData['access_token']) {
                        $localStorage.user = {
                            name: username,
                            isLogged: true,
                            loggedAs: userType
                        };
                        $localStorage.accessToken = headerData['access_token'];
                        deferred.resolve(response);
                    } else {
                        deferred.reject(response);
                    }
                })
                .catch(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }
    }
})();
