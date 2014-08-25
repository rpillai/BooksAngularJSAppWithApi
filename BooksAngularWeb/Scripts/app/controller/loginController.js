(function () {
    'use strict';

    var LoginController = BooksApp.controller('LoginController', [
            '$scope', 'AccountService', '$location', 'CartService', function ($scope, AccountService, $location, CartService) {

                $scope.AuthData = AccountService.AuthData;
                $scope.CartItems = CartService.CartItems;

                var OnSuccessLogin = function (response) {
                    if (response.status === 200) {
                        $location.path('/');
                    } else {
                        if (response.data.error) {
                            $scope.message = response.data.error.error_description;
                        }
                    }
                };

                var OnError = function (error) {
                    $scope.error = error;
                };

                $scope.Login = function (Login) {

                    $scope.$broadcast('show-errors-check-validity');

                    if ($scope.loginForm.$valid) {
                        AccountService.Login(Login.email, Login.password)
                            .then(OnSuccessLogin, OnError);
                    }
                }

                $scope.Reset = function() {
                    $scope.$broadcast('show-errors-reset');
                }
            }
    ]);

    var ExternalLoginProviders = BooksApp.controller('ExternalLoginProviders', [
        '$scope', '$location', '$http', '$window', 'AccountService', function ($scope, $location, $http, $window, AccountService) {

            AccountService.GetExternalProviders().then(function (response) {
                $scope.Providers = response.data;
            });

            $scope.GotoUrl = function (url) {
                $window.location.href = 'http://api.angularbookapp.com.au:57212/' + url;
            }
        }
    ]);
})();
