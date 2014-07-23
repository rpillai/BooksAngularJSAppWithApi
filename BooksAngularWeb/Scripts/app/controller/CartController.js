(function () {
    'use strict';

    var CartController = BooksApp.controller(
          'CartController',['$scope', 'CartService', function ($scope, CartService) {
            
            $scope.GrandTotal = 0;
            $scope.CartItems = CartService.CartItems;
            $scope.count = CartService.CartItems.length;


            $scope.CalculateGrandTotal = function () {
                calculateTotal();
            };

            $scope.$on('$viewContentLoaded', function () {
                calculateTotal();
            });

            var calculateTotal = function () {
                $scope.GrandTotal = 0;
                angular.forEach($scope.CartItems, function (value, index) {
                    $scope.GrandTotal += (value.Qty * value.Price);
                });
            }

            $scope.RemoveItem = function (id) {
                CartService.RemoveItem(id);
            }

            $scope.ClearCart = function () {
                CartService.ClearCart();
            }

            $scope.$on('CartChanged', function(event, data) {
                $scope.count = data.length;
                $scope.CartItems = data;
            });

        }
    ]);
})();