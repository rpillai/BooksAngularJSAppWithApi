(function () {
    'use strict';

    var BookController = BooksApp.controller('BookController', ['$scope', 'BookService', 'CartService', function ($scope, BookService, CartService) {

        var onGetBookSuccess = function (response) {
            $scope.Books = response.data;
        };

        var onGetBookError = function (error) {
            $scope.messages = error.message;
        };

        var LoadBookData = function () {
            BookService.GetBooks().then(onGetBookSuccess, onGetBookError);
        };

        $scope.GetBookDetails = function (id) {
            BookService.GetBookByID(id).then(function (response) {

            });
        };

        $scope.AddToCart = function(book) {
            CartService.AddItem(book.id,book.title,1, book.price);
        };

        $scope.$on('$viewContentLoaded', function () {
            LoadBookData();
        });
    }]);

    var BookDetailController = BooksApp.controller('BookDetailController', [
        '$scope', 'BookService', 'ReviewService',

         function ($scope, BookService, ReviewService) {

             $scope.Book = BookService.BookDetailData;

             $scope.WriteReview = function () {
                 ReviewService.SaveReview($scope.comment, $scope.Book.id).then(function (response) {
                     $scope.Book.reviews.push({
                         comment: response.data.comment,
                         userName: response.data.user.userName
                     });
                     $scope.comment = null;
                 }, function (error) {

                 });
             };

             $scope.$on('OnBookDetailGet', function (event, data) {
                 $scope.Book = data;
             });
         }
    ]);

})();
