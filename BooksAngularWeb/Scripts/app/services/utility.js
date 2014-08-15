(function () {
    'use strict';


    var UtilityService = BooksApp.service('UtilityService', [
        function () {

            var _getTokensFromUrl = function (url) {

                var tokens = url.split('&');

                var access_token = tokens[0].indexOf('access_token=') + 13;

                return {
                    access_token: tokens[0].slice(access_token),
                    token_type: tokens[1],
                    expires_in: tokens[2]
                }
            }

            return {
                GetTokensFromUrl: _getTokensFromUrl
            }
        }
    ]);


})();