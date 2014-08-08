(function() {
    'use strict';

    var orderService = BooksApp.service('OrderService', [
        '$http','CartService', function($http, CartService) {

            var baseOrderUrl = 'http://api.angularbookapp.com.au:57212/api/orders/';

            var _placeOrder = function(shipping) {
                var order = {};

                order = shipping;
                order.OrderDate = new Date();
                order.orderDetails = [];
                order.orderDetails = CartService.CartItems.slice(0);

                return $http({
                    method: 'POST',
                    url: baseOrderUrl,
                    data: order
                }).then(function (response) {

                    if (response.status === 201)
                        CartService.ClearCart();

                    return response;
                }, function(error) {
                    return error;
                });
            };

            var _getOrdersForUser = function(username) {
                return $http({
                    method: 'GET',
                    url: baseOrderUrl + 'OrdersForUser?username=' + username
                }).then(function(response) {
                    return response;
                });
            }

            var _getOrderDetailsByOrderId = function(id) {
                return $http({
                    method: 'GET',
                    url: 'http://api.angularbookapp.com.au:57212/api/orderdetails/GetOrderDetailsByOrder?id=' + id
                }).then(function (response) {
                    return response;
                });
            }

            return {
                PlaceOrder: _placeOrder,
                GetOrdersForUser: _getOrdersForUser,
                GetOrderDetailsByOrder: _getOrderDetailsByOrderId
            };
        }
    ]);
})();