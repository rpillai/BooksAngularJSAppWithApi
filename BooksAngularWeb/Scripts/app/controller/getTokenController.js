(function () {
    'use strict';

    var GetTokenController = BooksApp.controller('GetTokenController', [
        '$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

            $scope.signup = function (email) {
                $http({
                    'method': 'POST',
                    'url': 'http://api.angularbookapp.com.au/api/account/RegisterExternal',
                    'data': {
                        email: email
                    },
                    'headers': {
                        'Access-Control-Allow-Methods': ['POST', 'OPTIONS'],
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Credentials': 'true',
                        'content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function (response) {
                    console.log(response.data);
                });
            }
        }]);

})();