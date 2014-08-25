(function () {
    'use strict';

    var RegisterExternalController = BooksApp.controller('RegisterExternalController', [
        '$scope', '$routeParams', '$http', '$location', '$window', 'AccountService',
        function ($scope, $routeParams, $http, $location, $window, AccountService) {

            $http.get('http://api.angularbookapp.com.au:57212/api/account/UserInfo').then(function (response) {

                if (response) {
                    $scope.HasRegistered = response.data.hasRegistered;
                    $scope.LoginProvider = response.data.loginProvider;

                    if (angular.isUndefined($scope.HasRegistered) === false && $scope.HasRegistered) {
                        AccountService.SetAuthUserName(response.data.email);
                        $location.path('/Books');
                    }
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