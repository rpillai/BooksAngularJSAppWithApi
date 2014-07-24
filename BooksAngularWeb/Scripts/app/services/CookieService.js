(function () {
    'use strict';

    var CookieService = BooksApp.factory('CookieService', [
        '$cookieStore', 'AUTHKEY', 'CARTKEY', function ($cookieStore, AUTHKEY, CARTKEY) {

            var _setCookie = function (key, value) {
                $cookieStore.put(key, value);
            };

            var _getCookie = function (key) {
                return $cookieStore.get(key);
            };

            var _clearCookie = function () {
                $cookieStore.remove(AUTHKEY);
                $cookieStore.remove(CARTKEY);
            }

            var _removeCookie = function (key) {
                $cookieStore.remove(key);
            }


            return {
                SetCookie: _setCookie,
                GetCookie: _getCookie,
                RemoveCookie: _removeCookie,
                ClearCookie: _clearCookie,
            }
        }
    ]);
})();