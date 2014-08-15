(function () {
    'use strict';

    var GetTokenController = BooksApp.controller('RegisterExternalController', [
        '$scope', '$routeParams', '$http', '$window', 'AccountService', function ($scope, $routeParams, $http, $window, AccountService) {

            $http.get('http://api.angularbookapp.com.au:57212/api/account/UserInfo').then(function (response) {
                if (response) {
                    $scope.HasRegistered = response.data.hasRegistered;
                    $scope.LoginProvider = response.data.loginProvider;
                    AccountService.AuthData.userName = response.data.email;
                }
            }, function (error) {
                console.log(error);
            });

            $scope.signup = function (email) {
                $http.post('http://api.angularbookapp.com.au:57212/api/account/RegisterExternal',
                {
                    'Email': email
                },
                {
                    'withCredentials': true
                }).then(function (response) {
                    if (response.status === 200) {
                        $window.location.href = 'http://api.angularbookapp.com.au:57212/api/account/Externallogin?Provider=' + $scope.LoginProvider + '&response_type=token&client_id=self&redirect_uri=' + encodeURIComponent('http://www.angularbookapp.com.au/ConfirmRegister');
                    }
                }, function (error) {
                    console.log(error.data);
                });
            }
        }]);

})();