(function() {
    'use strict';
    var AuthorController = BooksApp.controller('AuthorController', [
        '$scope','$http', function($scope,$http) {
            $scope.SearchAuthor = function() {
                $http.get('http://api.angularbookapp.com.au:57212/api/authors/SearchByName?searchString=' + $scope.searchstring).
                    then(function (response) {
                        $scope.Authors = response.data;
                });
            }

        }
    ]);
})();