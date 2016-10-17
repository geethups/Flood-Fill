(function () {
    'use strict';
    angular.module('meenu').config(routeConfig);
    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouteProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'client/views/home.html'
            })
            .state('about', {
                url: '/',
                templateUrl: 'client/views/about.html'
            })
            .state('gallery', {
                url: '/gallery',
                templateUrl: 'client/views/gallery.html',
                controller: 'galleryController'
            })
            .state('blog', {
                url: '/blog',
                templateUrl: 'client/views/blog.html',
                controller: 'blogController'
            });
        $urlRouteProvider.otherwise('/');
    }
})();
