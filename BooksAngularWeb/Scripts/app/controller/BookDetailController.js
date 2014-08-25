(function() {
    var BookDetailController = BooksApp.controller('BookDetailController', [
           '$scope','$routeParams','BookService', 'ReviewService','CartService',

            function ($scope,$routeParams, BookService, ReviewService, CartService) {

                $scope.Book = BookService.BookDetailData;
                $scope.BookId = $routeParams.BookId;

                BookService.GetBookByID($scope.BookId).then(function(response) {
                        $scope.Book = response.data;
                    }
                );

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

                $scope.AddToCart = function () {
                    if ($scope.Book) {
                        CartService.AddItem($scope.Book.id, $scope.Book.title, 1, $scope.Book.price);
                    }
                }
            }
    ]);
})();
