(function () {
    'use strict';


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
                    $location.path('#/Login');
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

})();