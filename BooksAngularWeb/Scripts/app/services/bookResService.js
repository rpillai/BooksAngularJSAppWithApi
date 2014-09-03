(function () {
    'use strict';

    var BookResService = BooksApp.factory('BookResService', [
        '$resource', function ($resource) {
            var BooksUrl = 'http://api.angularbookapp.com.au:57212/api/books/:bookId';
            return $resource(BooksUrl, null, {
                'GetByTitle': { method: 'GET', params: { title: '@title' }, url: 'http://api.angularbookapp.com.au:57212/api/books/Title/:title', isArray: true }
            });
        }
    ]);
})();