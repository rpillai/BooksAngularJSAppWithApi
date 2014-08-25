(function () {
    'use strict';

    var AuthorService = BooksApp.factory('AuthorService', [
        '$http', '$rootScope',
        function($http, $rootScope) {

            var baseUrl = 'http://api.angularbookapp.com.au:57212/api/Authors';

            var _getAuthors = function() {
                return $http({
                    url: baseUrl,
                    method: 'GET'
                }).then(function(response) {
                    return response;
                }, function(error) {

                });
            }

            var _searchByAuthorName = function(searchString) {
                
            }

            var _addAuthor = function(authorName) {
                return $http.post(
                    baseUrl,
                    {Name : authorName}
                ).then(function(response) {
                    if (response.status === 201) {
                        return response.data;
                    }
                }, function(error) {
                    return error;
                });
        }

            return {
        GetAuthors: _getAuthors,
        SearchByName: _searchByAuthorName,
        AddAuthor: _addAuthor
}
}
]);
})();