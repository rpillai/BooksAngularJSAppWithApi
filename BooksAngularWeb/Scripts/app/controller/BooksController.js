(function () {
    'use strict';

    var BookController = BooksApp.controller('BookController', ['$scope','$window', 'BookService', 'CartService', function ($scope,$window, BookService, CartService) {

        $scope.max = 5;
        $scope.currentIndex = 0;

        $scope.localBooks = [];

        var onGetBookSuccess = function (response) {
            $scope.Books = response.data;
            $scope.localBooks = $scope.Books.slice(0, 4);
        };

        var LoadBookData = function () {
            BookService.GetBooks().then(onGetBookSuccess);
        };

        //$scope.GetBookDetails = function (id) {
        //    BookService.GetBookByID(id).then(function (response) {

        //    });
        //};

        $scope.GetNextBooks = function (next) {

            var startIndex = 0;

            if (next === 'N') {
                $scope.currentIndex += 1;
            } else {
                $scope.currentIndex -= 1;
                if ($scope.currentIndex <= 0) {
                    $scope.currentIndex = 0;
                }
            }

            startIndex = $scope.currentIndex * 4;

            if (startIndex < $scope.Books.length) {
                $scope.localBooks = $scope.Books.slice(startIndex, startIndex + 4);
            } else {
                $scope.currentIndex -= 1;
            }
            
        }

        $scope.AddToCart = function(book) {
            CartService.AddItem(book.id,book.title,1, book.price);
        };

        $scope.$on('$routeChangeSuccess', function () {
            LoadBookData();
        });

    }]);
})();
