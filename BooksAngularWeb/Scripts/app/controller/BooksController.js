(function () {
    'use strict';

    var BookController = BooksApp.controller('BookController', ['$scope', '$window', 'BookResService', 'CartService', function ($scope, $window, BookResService, CartService) {

        $scope.max = 5;
        $scope.currentIndex = 0;
        $scope.localBooks = [];

        //var onGetBookSuccess = function (response) {
        //    $scope.Books = response.data;
        //    $scope.localBooks = $scope.Books.slice(0, 4);
        //};

        var LoadBookData = function () {
            //BookService.GetBooks().then(onGetBookSuccess);
            $scope.localBooks = BookResService.query();
        };

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

            if (startIndex < $scope.localBooks.length) {
                $scope.localBooks = $scope.localBooks.slice(startIndex, startIndex + 4);
            } else {
                $scope.currentIndex -= 1;
            }

        }

        $scope.AddToCart = function (book) {
            CartService.AddItem(book.id, book.title, 1, book.price);
        };

        $scope.SearchByTitle = function () {

            if (angular.isDefined($scope.Title) === true &&
                $scope.Title !== null) {
                var searchedBooks = BookResService.GetByTitle({ title: $scope.Title }, function (data) {
                    $scope.localBooks = [];
                    angular.copy(data, $scope.localBooks);
                    //$scope.localBooks = data;
                });

                

            }
        }

        $scope.$on('$routeChangeSuccess', function () {
            LoadBookData();
        });

    }]);
})();
