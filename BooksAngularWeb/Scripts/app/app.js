'use strict';

var BooksApp = angular.module('BooksApp', ['ngRoute', 'ngCookies','ui.bootstrap']);

BooksApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
        when('/Books', {
            controller: 'BookController',
            templateUrl: 'PartialViews/books.html'
        })
        .when('/Login', {
            controller: 'LoginController',
            templateUrl: 'PartialViews/Login.html'
        })
        .when('/Register', {
            controller: 'RegisterController',
            templateUrl : 'PartialViews/Register.html'
        })
        .when('/Profile', {
            controller: 'ProfileController',
            templateUrl : 'PartialViews/Profile.html'
        })
        .when('/ViewCart', {
            conroller: 'RegisterController',
            templateUrl: 'PartialViews/ViewCart.html'
        })
        .otherwise({
            redirectTo: '/'
        });

    //$locationProvider.html5Mode(true);
}]);

BooksApp.run(['AccountService', function (AccountService) {
    AccountService.FillAuthData();
}]);

BooksApp.config([
    '$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptorService');
    }
]);


