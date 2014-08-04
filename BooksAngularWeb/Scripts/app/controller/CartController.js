(function () {
    //'use strict';

    var CartController = BooksApp.controller(
        'CartController', [
            '$scope', '$location', '$modal', 'AccountService', 'CartService', function ($scope, $location, $modal, AccountService, CartService) {

                $scope.CartItems = CartService.CartItems;
                $scope.count = $scope.CartItems.length;

                $scope.CalculateGrandTotal = function () {
                    calculateTotal();
                };

                var calculateTotal = function () {
                    $scope.GrandTotal = 0;
                    angular.forEach($scope.CartItems, function (value, index) {
                        $scope.GrandTotal += (value.Qty * value.UnitPrice);
                    });
                }

                $scope.RemoveItem = function (id) {
                    CartService.RemoveItem(id);
                    calculateTotal();
                }

                $scope.ClearCart = function () {
                    CartService.ClearCart();
                }

                $scope.GoCheckOut = function () {
                    if (AccountService.AuthData.isAuth)
                        $location.path('/CheckOut');
                    else {
                        var modalInstance = $modal.open({
                            templateUrl: 'PartialViews/LoginModal.html',
                            controller: 'ModalInstanceCtrl',
                            size: 'sm'
                        });
                    }

                    modalInstance.result.then(function (reason) {
                        if (reason === 'Guest') {
                            $location.path('/CheckOut');
                        }
                        else if (reason === 'Login') {
                            $location.path('/Login');
                        }
                    });
                }
                

                $scope.$on('CartChanged', function (event, data) {
                    $scope.CartItems = data;
                    $scope.count = data.length;
                });

                $scope.$on('$viewContentLoaded', function () {
                    calculateTotal();
                });

                $scope.items = ['item1', 'item2', 'item3'];

            }]);

})();