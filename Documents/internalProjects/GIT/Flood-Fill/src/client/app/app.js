(function () {
    'use strict';
    angular.module('admin', ['ui.router',
    'admin.login',
    'admin.logout',
    'admin.common',
    'admin.home',
    'admin.questionHome',
    'admin.questionList',
    'admin.signup',
    'ncy-angular-breadcrumb',
    'ngStorage',
    'ngAnimate',
    'ui.bootstrap',
    'ui.bootstrap.datetimepicker'
  ]);

    angular.module('admin').config(httpConfig);

    function httpConfig($httpProvider) {
        //Enable cross domain calls
        $httpProvider.defaults.useXDomain = true;
        //disable caching of HTTP GET requests
        $httpProvider.defaults.cache = false;
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }
        $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
    }

})();
