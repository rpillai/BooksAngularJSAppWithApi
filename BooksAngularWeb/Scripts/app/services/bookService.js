(function () {
    'use strict';

    var BookService = BooksApp.factory('BookService', [
        '$http','$rootScope',
        function ($http,$rootScope) {

            var BookDetailData;

            var _getBooks = function () {
                return $http({
                    'method': 'GET',
                    'url': 'http://localhost:57212/api/books/'
                }).then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            };

            var _getBookByID = function (id) {
                return $http({
                    'method': 'GET',
                    'url': 'http://localhost:57212/api/Books/' + id
                }).then(function (response) {
                    BookDetailData = response.data;

                    $rootScope.$broadcast('OnBookDetailGet', BookDetailData);

                    return response;
                }, function (error) {
                    return error;
                });

            };

            var _writeReview = function (comment) {
                return $http({
                    'method': 'POST',
                    'url': 'http://localhost:57212/api/review',
                    'data': comment
                }).then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            }

            return {
                BookDetailData: BookDetailData,
                GetBooks: _getBooks,
                GetBookByID: _getBookByID
                
            }
        }
    ]);
})();