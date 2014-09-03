(function () {
    var BookAddController = BooksApp.controller('BookAddController', [
           '$scope','$filter', 'BookResService', 'AuthorService',

            function ($scope, $filter, BookResService, AuthorService) {

                var orderBy = $filter('orderBy');

                AuthorService.GetAuthors().then(function (response) {
                    if (response)
                        if (response.status === 200) {
                            $scope.Authors = orderBy(response.data, 'name', false);
                        }
                        
                });

                $scope.SaveBook = function (Book) {
                    BookResService.save(Book, function (data) {

                    }, function(error) {
                        console.log(error);
                    });

                    //BookService.AddBook(Book).then(
                    //    function (response) {
                    //        if (response.status === 201) {
                    //            $scope.Message = 'Book added successfully.';
                    //        }
                    //}, function(error) {

                    //});
                }
            }
    ]);
})();
