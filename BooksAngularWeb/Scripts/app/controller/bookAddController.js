(function () {
    var BookAddController = BooksApp.controller('BookAddController', [
           '$scope','$filter', 'BookService', 'AuthorService',

            function ($scope,$filter, BookService, AuthorService) {
                var orderBy = $filter('orderBy');

                AuthorService.GetAuthors().then(function (response) {
                    if (response)
                        if (response.status === 200) {
                            $scope.Authors = orderBy(response.data, 'name', false);
                        }
                        
                });

                $scope.SaveBook = function(Book) {
                    BookService.AddBook(Book).then(function (response) {

                    }, function(error) {

                    });
                }
            }
    ]);
})();
