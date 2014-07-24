(function () {
    'use strict';

    var CartService = BooksApp.factory('CartService', [
        '$rootScope', 'CookieService', 'CARTKEY',
    function ($rootScope, CookieService, CARTKEY) {

        var _cartItems = [];

        var _addItemToCart = function (bookId, title, qty, price) {

            if (_cartItems === undefined) {
                _cartItems = [];
            }

            var idx = findIndex(_cartItems, bookId);
            
            if (idx !== -1) {
                var item = _cartItems[idx];
                item.Qty = item.Qty + qty;
            } else {
                _cartItems.push({
                    Id: bookId,
                    Title: title,
                    Qty: qty,
                    Price: price
                });
            }

            broadCastChanges(_cartItems);
        }

        var _removeItem = function (id) {

            var itemIndex = findIndex(_cartItems, id);

            if (itemIndex > -1) {
                _cartItems.splice(itemIndex, 1);
            }

            broadCastChanges(_cartItems);
        }

        var _clearCart = function () {
            _cartItems = [];

            broadCastChanges(_cartItems);
        }

        function broadCastChanges(items) {
            CookieService.SetCookie(CARTKEY, items);
            $rootScope.$broadcast('CartChanged', items);
        }

        var _fillCartData = function() {

            var items = CookieService.GetCookie(CARTKEY);

            if (items) {
                angular.forEach(items, function (value, index) {
                    _cartItems.push(value);
                });
            }
        }

        var findIndex = function (items, id) {
            var itemIndex = -1;

            angular.forEach(_cartItems, function (value, index) {
                if (value.Id === id) {
                    itemIndex = index;
                }
            });
           
            return itemIndex;
        }

        return {
            AddItem: _addItemToCart,
            RemoveItem: _removeItem,
            ClearCart: _clearCart,
            FillCartData: _fillCartData,
            CartItems: _cartItems
        }
    }
    ]);
})();