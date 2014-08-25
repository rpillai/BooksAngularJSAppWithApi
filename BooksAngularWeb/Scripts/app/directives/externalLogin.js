(function () {
    var externalLogin = BooksApp.directive('externalLogin', function () {
            return {
                restrict: 'AE',

                templateUrl: '/PartialViews/ExternalLogin.html',

                controller: ['$scope', '$window', 'AccountService', function ($scope, $window, AccountService) {

                    AccountService.GetExternalProviders().then(function (response) {

                        $scope.Providers = response.data;

                        angular.forEach($scope.Providers, function (value, index) {
                            if (value.name === 'Google') {
                                value['iconname'] = 'fa fa-google';
                            }
                            else if (value.name === 'Twitter') {
                                value['iconname'] = 'fa fa-twitter';
                            }
                            else if (value.name === 'Microsoft') {
                                value['iconname'] = 'fa fa-windows';
                            }
                        });

                    });

                    $scope.GotoUrl = function (url) {
                        $window.location.href = 'http://api.angularbookapp.com.au:57212/' + url;
                    }
                }]
            };
        });
})();