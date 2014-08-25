(function() {
    'use strict';

    var CheckOutController = BooksApp.controller('CheckOutController', ['$scope', '$location', 'CartService', 'OrderService',
        function ($scope, $location, CartService, OrderService) {
            
            $scope.SubmitOrder = function(shipping) {
                if (shipping) {
                    OrderService.PlaceOrder(shipping).then(function(response) {
                        if (response.status === 201) {
                            $location.path('/');
                        }
                    }, function(error) {
                        $scope.message = error.data;
                    });
                }
            }
        }
    ]);
})();