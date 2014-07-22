(function () {
    'use strict';

   var ReviewService =  BooksApp.factory('ReviewService', [
            '$http', function ($http) {

                var baseUrl = 'http://localhost:57212/api/reviews';

                var _saveReview = function (comment, bookid) {

                    return $http({
                        'method': 'POST',
                        'url': baseUrl,
                        'data': {
                            BookId : bookid,
                            comment : comment
                        }
                            
                    }).then(function (response) {
                        return response;
                    }, function (error) {
                        return error;
                    });
                };

                return {
                    SaveReview: _saveReview
                }
            }
    ]);
})();