(function () {
    var BookAddController = BooksApp.controller('BookAddController', [
           '$scope', 'BookService', 'AuthorService',

            function ($scope, BookService, AuthorService) {

                AuthorService.GetAuthors().then(function (response) {
                    if (response)
                        if (response.status === 200) {
                            $scope.Authors = response.data;
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
