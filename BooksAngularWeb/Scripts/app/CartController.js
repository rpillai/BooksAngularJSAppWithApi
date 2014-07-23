(function () {
    'use strict';

    var CartController = BooksApp.controller(
          'CartController',['$scope', 'CartService', function ($scope, CartService) {
            $scope.count = CartService.CartItems.length;

            $scope.CartItems = CartService.CartItems;

            $scope.$on('CartChanged', function(event, data) {
                $scope.count = data.length;
                $scope.CartItems = CartService.CartItems;
            });

        }
    ]);
})();