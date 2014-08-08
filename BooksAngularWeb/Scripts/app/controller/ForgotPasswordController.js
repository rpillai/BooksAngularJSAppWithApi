(function() {
    'use strict';
    var ForgotPasswordController = BooksApp.controller('ForgotPasswordController', [
        '$scope', 'AccountService', function ($scope, AccountService) {
            $scope.ResetPassword = function() {
                AccountService.ForgotPassword($scope.email).then(function(response) {
                    console.log(response.data);
                });
            }
        }
    ]);
})();