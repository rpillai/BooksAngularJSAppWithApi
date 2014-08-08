(function () {

    var IndexController = BooksApp.controller('IndexController', ['$scope','$location', 'AccountService', function ($scope,$location, AccountService) {

        $scope.AuthData = AccountService.AuthData;

        $scope.$on('OnSuccessLogin', function (event, data) {
            $scope.AuthData = data;
        });

        $scope.Logout = function () {
            AccountService.Logout();
            $location.path('/');
        };
    }]);

})();