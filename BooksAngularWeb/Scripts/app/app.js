'use strict';

var BooksApp = angular.module('BooksApp', ['ngRoute']);

BooksApp.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

    $routeProvider.
        when('/Books', {
            controller: 'bookController',
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

    //$httpProvider.interceptors.push('');
    //$httpProvider.interceptors.push('httpInterceptorService');
}]);


