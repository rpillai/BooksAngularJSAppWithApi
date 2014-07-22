'use strict';

(function () {
    var BooksApp = angular.module('BooksApp', ['ngRoute']);

    BooksApp.config(['$routeProvider', function ($routeProvider) {

        $routeProvider.
            when('/Home', {
                controller: 'homeController',
                templateUrl: '../Views/Home/index.cshtml'
            })
            .when('/Books', {
                controller: 'booksController',
                templateUrl: './Views/books.html'
            })
            .when('/Login', {
                controller: 'loginController',
                templateUrl: './Views/Login.html'
            }).when('/', {
                controller: 'homeController',
                templateUrl: './Views/index.cshtml'
            }).otherwise(
        {
            redirectTo: '/'
        });
    }]);
})();

