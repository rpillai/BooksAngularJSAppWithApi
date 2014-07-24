(function () {
    'use strict';

    var LoginController = BooksApp.controller('LoginController', [
            '$scope', 'AccountService', '$location', 'CartService', function ($scope, AccountService, $location, CartService) {

                $scope.AuthData = AccountService.AuthData;
                $scope.CartItems = CartService.CartItems;

                var OnSuccessLogin = function (response) {
                    if (response.status == 200) {
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
                    AccountService.Login(Login.email, Login.password)
                                .then(OnSuccessLogin, OnError);
                };
            }
    ]);
})();
