(function () {
    'use strict';

    var CartController = BooksApp.controller(
          'CartController', ['$scope', 'AccountService','CartService', function ($scope, AccountService, CartService) {

              $scope.CartItems = CartService.CartItems;
              $scope.count = $scope.CartItems.length;
             
              $scope.CalculateGrandTotal = function () {
                  calculateTotal();
              };

              var calculateTotal = function () {
                  $scope.GrandTotal = 0;
                  angular.forEach($scope.CartItems, function (value, index) {
                      $scope.GrandTotal += (value.Qty * value.Price);
                  });
              }

              $scope.RemoveItem = function (id) {
                  CartService.RemoveItem(id);
                  calculateTotal();
              }

              $scope.ClearCart = function () {
                  CartService.ClearCart();
              }

              $scope.$on('CartChanged', function(event, data) {
                  $scope.CartItems = data;
                  $scope.count = data.length;
              });

              $scope.$on('$viewContentLoaded', function () {
                  calculateTotal();
              });


          }
          ]);
})();