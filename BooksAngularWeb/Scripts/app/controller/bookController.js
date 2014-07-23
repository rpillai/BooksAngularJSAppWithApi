(function () {
    'use strict';

    var BookController = BooksApp.controller('BookController', ['$scope', 'BookService','ReviewService',
            '$scope', function ($scope, BookService, ReviewService) {

            var onGetBookSuccess = function (response) {
                    $scope.Books = response.data;
                };

                var onGetBookError = function (error) {
                    $scope.messages = error.message;
                };

                var LoadBookData = function () {
                    BookService.GetBooks().then(onGetBookSuccess, onGetBookError);
                };

                $scope.$on('$viewContentLoaded', function () {
                    LoadBookData();
                });

                $scope.GetBookDetails = function (id) {
                    BookService.GetBookByID(id).then(function (response) {
                        $scope.Book = response.data;
                    });
                };

                $scope.WriteReview = function () {
                    ReviewService.SaveReview($scope.comment,$scope.Book.id).then(function (response) {
                        $scope.Book.reviews.push({
                            comment: response.data.comment,
                            userName: response.data.user.userName
                        });
                        $scope.comment = null;
                    }, function(error) {

                    });
                };
            }
    ]);

})();
