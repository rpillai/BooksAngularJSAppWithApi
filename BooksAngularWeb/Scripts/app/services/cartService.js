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
                var itemIndex = -1;
                angular.forEach(cartItems, function (value, index) {
                    if (value.Id === id) {
                        itemIndex = index;
                    }
                });

                if (itemIndex > -1) {
                    cartItems.splice(itemIndex, 1);
                }

                broadCastChanges(cartItems);
            }

            var _clearCart = function () {
                cartItems = [];

                broadCastChanges(cartItems);
            }

            function broadCastChanges(items) {
                $rootScope.$broadcast('CartChanged', items);
            }

            return {
                AddItem: _addItemToCart,
                RemoveItem: _removeItem,
                ClearCart : _clearCart,
                CartItems : cartItems
            }
        }
    ]);
})();