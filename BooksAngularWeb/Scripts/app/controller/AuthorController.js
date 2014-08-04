(function() {
    'use strict';
    var AuthorController = BooksApp.controller('AuthorController', [
        '$scope','$http', function($scope,$http) {
            $scope.SearchAuthor = function() {
                $http.get('http://localhost:57212/api/authors/searchauthors?searchString=' + $scope.searchstring).
                    then(function (response) {
                        $scope.Authors = response.data;
                });
            }

        }
    ]);
})();