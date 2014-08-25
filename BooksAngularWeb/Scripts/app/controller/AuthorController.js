(function() {
    'use strict';
    var AuthorController = BooksApp.controller('AuthorController', [
        '$scope', '$http', 'AuthorService', function ($scope, $http, AuthorService) {
            $scope.SearchAuthor = function() {
                $http.get('http://api.angularbookapp.com.au:57212/api/authors/SearchByName?searchString=' + $scope.searchstring).
                    then(function (response) {
                        $scope.Authors = response.data;
                });
            }

            $scope.AddAuthor = function() {
                if (angular.isDefined($scope.AuthorName)) {
                    AuthorService.AddAuthor($scope.AuthorName).then(function(response) {

                    });
                }
            }
        }
    ]);
})();