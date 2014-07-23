(function () {

    var IndexController = BooksApp.controller('IndexController', ['$scope', 'AccountService', function ($scope, AccountService) {

        $scope.AuthData = AccountService.AuthData;

        $scope.$on('OnSuccessLogin', function (event, data) {
            $scope.AuthData = data;
        });

        $scope.Logout = function () {
            AccountService.Logout();
        };
    }]);

})();