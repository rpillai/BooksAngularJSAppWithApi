'use strict';

var BooksApp = angular.module('BooksApp', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ngSanitize']);

BooksApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
        when('/Books', {
            controller: 'BookController',
            templateUrl: 'PartialViews/books.html'
        })
        .when('/Authors', {
            controller: 'AuthorController',
            templateUrl: 'PartialViews/Author.html'
        })
        .when('/Books/:BookId', {
            controller: 'BookDetailController',
            templateUrl: 'PartialViews/bookdetail.html'
        })
        .when('/BookAdd', {
            controller: 'BookAddController',
            templateUrl: 'PartialViews/bookadd.html'
        })
        .when('/ConfirmRegister', {
            controller: 'ConfirmRegisterController',
            templateUrl: 'PartialViews/ConfirmRegister.html'
        })
        .when('/RegisterExternal', {
            controller: 'RegisterExternalController',
            templateUrl: 'PartialViews/RegisterExternal.html'
        })
        .when('/Login', {
            controller: 'LoginController',
            templateUrl: 'PartialViews/Login.html'
        })
        .when('/Register', {
            controller: 'RegisterController',
            templateUrl: 'PartialViews/Register.html'
        })
        .when('/ForgotPassword', {
            controller: 'ForgotPasswordController',
            templateUrl: 'PartialViews/ForgotPassword.html'
        })
        .when('/Profile', {
            controller: 'ProfileController',
            templateUrl: 'PartialViews/Profile.html'
        })
        .when('/ViewCart', {
            controller: 'CartController',
            templateUrl: 'PartialViews/ViewCart.html'
        }).when('/CheckOut', {
            controller: 'CheckOutController',
            templateUrl: 'PartialViews/Checkout.html'
        }).when('/', {
            templateUrl: 'PartialViews/Home.html'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
}]);

BooksApp.run(['AccountService', function (accountService) {
    accountService.FillAuthData();
}]);

BooksApp.run(['CartService', function (cartService) {
    cartService.FillCartData();
}]);

BooksApp.config([
    '$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptorService');
    }
]);

BooksApp.constant('AUTHKEY', 'AuthorisationData');
BooksApp.constant('CARTKEY', 'CartKey');


