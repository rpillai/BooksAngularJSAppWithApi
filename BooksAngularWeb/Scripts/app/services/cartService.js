(function () {
    'use strict';

    var CartService = BooksApp.factory('CartService', [
        '$rootScope',
        function ($rootScope) {
            var cartItems = [];

            var _addItemToCart = function (bookId, title, qty, price) {
                cartItems.push({
                    Id: bookId,
                    Title: title,
                    Qty: qty,
                    Price: price
                });

                broadCastChanges(cartItems);
            }

            var _removeItem = function (id) {
                angular.forEach(cartItems, function (value, key) {

                });
                broadCastChanges(cartItems);
            }

            function broadCastChanges(items) {
                $rootScope.$broadcast('CartChanged', items);
            }

            return {
                AddItem: _addItemToCart,
                RemoveItem: _removeItem,
                CartItems : cartItems
            }
        }
    ]);
})();