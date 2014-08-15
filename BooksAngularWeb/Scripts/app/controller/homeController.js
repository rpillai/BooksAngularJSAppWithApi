( function() {
    var HomeController = BooksApp.controller('HomeController', [
        '$scope', '$location', '$window', 'AccountService','UtilityService', function ($scope, $location, $window, AccountService, UtilityService) {

            var tokens = UtilityService.GetTokensFromUrl($location.path());

            $scope.access_token = tokens.access_token;
            $scope.token_type = tokens.token_type;
            $scope.expires_in = tokens.expires_in;

            if ($scope.access_token && $scope.token_type) {
                AccountService.SetAuthData($scope.access_token);
                $location.path('/RegisterExternal');
            }
        }
    ]);
})();