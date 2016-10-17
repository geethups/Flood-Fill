angular.module('admin').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    'use strict';
    $stateProvider
        .state('login', {
            url: '/',
            templateUrl: 'client/app/modules/login/templates/login.html',
            controller: 'loginController'
        })
        .state('logout', {
            url: '/',
            controller: 'logoutController'
        })
        .state('status', {
            url: '/status.html'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'client/app/modules/home/templates/home.html',
            controller: 'homeController',
            controllerAs: 'vm',
            ncyBreadcrumb: {
                label: 'Home'
            }
        })
        .state('home.questionList', {
            url: '/list',
            templateUrl: 'client/app/modules/questionList/templates/questionList.html',
            controller: 'questionListController',
            controllerAs: 'vm',
            ncyBreadcrumb: {
                label: 'Question List'
            },
            params: {
                data: null
            }
        })
        .state('home.questionHome', {
            url: '/question',
            templateUrl: 'client/app/modules/questionHome/templates/questionHome.html',
            controller: 'questionHomeController',
            controllerAs: 'vm',
            ncyBreadcrumb: {
                label: 'Question'
            },
            params: {
                data: null
            }
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'client/app/modules/signup/templates/signup.html',
            controller: 'signupController',
            controllerAs: 'vm',
            ncyBreadcrumb: {
                label: 'Signup'
            }
        });

    $urlRouterProvider.otherwise('/');
  }]);
