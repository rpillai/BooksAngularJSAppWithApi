(function () {
    'use strict';

    var AuthorService = BooksApp.factory('AuthorService', [
        '$http', '$rootScope',
        function($http, $rootScope) {

            var baseUrl = 'http://localhost:57212/api/Authors';

            var _getAuthors = function() {
                return $http({
                    url: baseUrl,
                    method: 'GET'
                }).then(function(response) {
                    return response;
                }, function(error) {

                });
            }

            return {
                GetAuthors: _getAuthors
            }
        }
    ]);
})();