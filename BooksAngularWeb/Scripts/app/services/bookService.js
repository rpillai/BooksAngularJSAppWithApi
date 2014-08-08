(function () {
    'use strict';

    var BookService = BooksApp.factory('BookService', [
        '$http','$rootScope',
        function ($http,$rootScope) {

            var BookDetailData, baseUrl;

            baseUrl = 'http://api.angularbookapp.com.au:57212/api/books/';

            var _getBooks = function () {
                return $http({
                    'method': 'GET',
                    'url': baseUrl
                }).then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            };

            var _getBookByID = function (id) {
                return $http({
                    'method': 'GET',
                    'url': 'http://api.angularbookapp.com.au:57212/api/Books/' + id
                }).then(function (response) {

                    BookDetailData = response.data;
                    $rootScope.$broadcast('OnBookDetailGet', BookDetailData);
                    return response;
                }, function (error) {
                    return error;
                });
            };

            var _addBook = function(book) {
                return $http({
                    'url': baseUrl,
                    'method': 'POST',
                    'data': book
                }).then(function(response) {
                    return response;
                }, function(error) {
                    return error;
                });
            }

            return {
                BookDetailData: BookDetailData,
                GetBooks: _getBooks,
                GetBookByID: _getBookByID,
                AddBook : _addBook
            }
        }
    ]);
})();