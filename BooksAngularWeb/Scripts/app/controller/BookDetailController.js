(function() {
    var BookDetailController = BooksApp.controller('BookDetailController', [
           '$scope','$routeParams','BookService', 'ReviewService',

            function ($scope,$routeParams, BookService, ReviewService) {

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

                //$scope.$on('OnBookDetailGet', function (event, data) {
                    
                //});
            }
    ]);
})();
