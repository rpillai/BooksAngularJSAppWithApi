'use strict';

var LoginController = BooksApp.controller('LoginController', [
    '$scope', 'AccountService', function ($scope, AccountService) {

        var OnSuccessLogin = function (response) {
            if (response.status == 200) {
                $scope.message = response.data.access_token;
                //$cookieStore.put('AuthorisedToken', response.data.access_token);
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
            console.log(Login.email);
            console.log(Login.password);

            AccountService.Login(Login.email, Login.password)
                            .then(OnSuccessLogin, OnError);
        };
    }
]);



var RegisterController = BooksApp.controller('RegisterController', [
    '$scope', 'AccountService', function ($scope, AccountService) {

        $scope.message = [];

        var OnRegister = function (response) {

            if (response.status != 200) {
                angular.forEach(response.data.modelState, function (error, index) {
                    $scope.message.push(error);
                });
            }

            if (response.status == 200) {
                $scope.successmessage = "Registered Successfully";
            }
        }

        var OnError = function (error) {
            console.log(error);
        }

        $scope.RegisterClick = function (registerForm) {

            if (registerForm.$valid) {
                console.log($scope.register.email);
                console.log($scope.register.password);
                console.log($scope.register.confirmpassword);

                $scope.message = [];
                AccountService.Register($scope.register.email, $scope.register.password).
                    then(OnRegister, OnError);

            };
        };
    }
]);