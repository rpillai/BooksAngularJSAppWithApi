'use strict';

var BooksApp = angular.module('BooksApp', ['ngRoute']);

BooksApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.
        when('/Books', {
            controller: 'bookController',
            templateUrl: 'PartialViews/books.html'
        })
        .when('/Login', {
            controller: 'loginController',
            templateUrl: 'PartialViews/Login.html'
        }).otherwise({
            redirectTo: '/'
        });
}]);


