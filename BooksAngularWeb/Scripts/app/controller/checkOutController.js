(function() {
    'use strict';

    var CheckOutController = BooksApp.controller('CheckOutController', ['$scope', 'CartService', 'OrderService', function ($scope, CartService, OrderService) {
            
            $scope.SubmitOrder = function(shipping) {
                if (shipping) {
                    OrderService.PlaceOrder(shipping).then(function(response) {
                        
                    }, function(error) {
                        $scope.message = error.data;
                    });
                }
            }
        }
    ]);
})();