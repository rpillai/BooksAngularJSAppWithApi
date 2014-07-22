'use strict';

var BooksApp = angular.module('BooksApp', ['ngRoute', 'ngCookies','ui.bootstrap']);

BooksApp.config(['$routeProvider', function ($routeProvider) {
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
            conroller: 'RegisterController',
            templateUrl : 'PartialViews/Register.html'
        }).otherwise({
            redirectTo: '/'
        });
}]);


BooksApp.config([
    '$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptorService');
    }
]);


