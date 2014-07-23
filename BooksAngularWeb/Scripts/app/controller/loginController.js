(function () {
    'use strict';

    var LoginController = BooksApp.controller('LoginController', [
            '$scope', 'AccountService', '$location', function ($scope, AccountService, $location) {

                $scope.AuthData = AccountService.AuthData;

                var OnSuccessLogin = function (response) {
                    if (response.status == 200) {
                        
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
