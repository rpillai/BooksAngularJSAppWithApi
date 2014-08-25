(function () {
    'use strict';

    var ConfirmRegisterController = BooksApp.controller('ConfirmRegisterController', [
        '$location', '$scope','AccountService', 'UtilityService', function ($location, $scope,AccountService, UtilityService) {

            var tokens = UtilityService.GetTokensFromUrl($location.hash());

            $scope.access_token = tokens.access_token;
            $scope.token_type = tokens.token_type;
            $scope.expires_in = tokens.expires_in;

            if ($scope.access_token && $scope.token_type) {
                AccountService.GetUserInfo().then(function(response) {
                    AccountService.SetAuthData($scope.access_token, response.data.email);
                    $location.path('/Books');
                });
            }
        }
    ]);
})();