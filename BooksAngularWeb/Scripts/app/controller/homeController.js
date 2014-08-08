(function() {
    var HomeController = BooksApp.controller('HomeController', [
        '$scope','$location', '$routeParams', function($scope,$location,$routeParams) {
            var tokens = $location.path().split('&');

            $scope.access_token = tokens[0].slice(14);
            $scope.token_type = tokens[1];
            $scope.expires_in = tokens[2];

            if ($scope.access_token && $scope.token_type) {
                $location.path('/#/GetToken');
                $scope.$apply();
            }
        }
    ]);
})();