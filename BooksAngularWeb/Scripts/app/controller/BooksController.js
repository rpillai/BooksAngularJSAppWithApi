(function () {
    'use strict';

    var BookController = BooksApp.controller('BookController', ['$scope', 'BookService', 'CartService', function ($scope, BookService, CartService) {

        var onGetBookSuccess = function (response) {
            $scope.Books = response.data;
        };

        var LoadBookData = function () {
            BookService.GetBooks().then(onGetBookSuccess);
        };

        $scope.GetBookDetails = function (id) {
            BookService.GetBookByID(id).then(function (response) {

            });
        };

        $scope.AddToCart = function(book) {
            CartService.AddItem(book.id,book.title,1, book.price);
        };

        $scope.$on('$viewContentLoaded', function () {
           
        });

        $scope.$on('$routeChangeSuccess', function () {
            LoadBookData();
        });

    }]);
})();
