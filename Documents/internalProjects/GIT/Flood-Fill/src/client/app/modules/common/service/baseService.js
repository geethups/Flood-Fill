(function () {
    'use strict';
    angular.module('admin.common').factory('baseService', baseService);
    baseService.$inject = ['$http', '$q'];

    function baseService($http, $q) {
        return {
            postData: function (url, data) {
                var deferred = $q.defer(),
                    requestUrl = getUrl(url, data);
                $http({
                    method: 'POST',
                    url: requestUrl,
                    data: data.dataParam,
                    params: data.queryParam
                }).then(function (response) {
                    if (isError(response)) {
                        deferred.reject(response);
                    } else {
                        deferred.resolve(response);
                    }
                }, function (error) {
                    onError(error);
                    deferred.reject(error);
                })
                return deferred.promise;
            },
            getData: function (url, data) {
                var deferred = $q.defer(),
                    requestUrl = getUrl(url, data);
                $http({
                    method: 'GET',
                    url: requestUrl,
                    params: data.dataParam
                }).then(function (response) {
                    if (isError(response)) {
                        deferred.reject(response);
                    } else {
                        deferred.resolve(response);
                    }
                }, function (error) {
                    onError(error);
                    deferred.reject(error);
                })
                return deferred.promise;
            },
            deleteData: function (url, data) {
                var deferred = $q.defer(),
                    requestUrl = getUrl(url, data);
                $http({
                    method: 'DELETE',
                    url: requestUrl,
                    params: data.dataParam
                }).then(function (response) {
                    if (isError(response)) {
                        deferred.reject(response);
                    } else {
                        deferred.resolve(response);
                    }
                }, function (error) {
                    onError(error);
                    deferred.reject(error);
                })
                return deferred.promise;
            }
        };

        function getUrl(url, data) {
            var path = url,
                key;
            if (data && data.pathParam) {
                for (key in data.pathParam) {
                    if (data.pathParam.hasOwnProperty(key)) {
                        path = path + '/' + data.pathParam[key];
                    }
                }
            }
            return path;
        }

        function isError(response) {
            var errorStatus = false;
            if (response.status === 200) {
                if (response.data.status === 'ok') {
                    errorStatus = false;
                } else {
                    errorStatus = true;
                    if (response.data.hasOwnProperty('message')) {
                        if (response.data.message.code === 'ER_DUP_ENTRY') {
                            response.data.message = 'Duplicate entry.'
                        } else if (response.data.message.code === 'ER_EMPTY_QUERY' ||
                            response.data.message.code === 'ER_PARSE_ERROR' ||
                            response.data.message.code === 'ER_WRONG_VALUE_COUNT_ON_ROW' ||
                            response.data.message.code === 'ER_BAD_FIELD_ERROR') {
                            response.data.message = 'Query failed.'
                        }
                    } else if (response.data.errno === 'ECONNREFUSED' || response.data.errno === 'EAI_AGAIN') {
                        response.data.message = 'The API server can’t be reached.';
                    }
                }
            } else {
                errorStatus = true;
            }
            return errorStatus;
        }

        function onError(error) {
            if (error.status === -1) {
                error.data = {
                    error: {
                        code: -1,
                        message: 'Unable to communicate with API.',
                    }
                };
            }
        }
    }
})();
