'use strict';

BooksApp.factory('httpInterceptorService', [
    '$q', 'CookieService', '$location', 'AUTHKEY',
    function ($q, CookieService, $location, AUTHKEY) {

        var _request = function (config) {
            var authorisedData = CookieService.GetCookie(AUTHKEY);

            if (authorisedData)
                config.headers.Authorization = 'Bearer ' + authorisedData.token;
            return config;
        };

        var _requestError = function(rejection) {
            return $q.reject(rejection);
        }

        var _response = function(response) {
            return response;
        }

        var _responseError = function(rejection) {
            if (rejection.status === 401) {
                $location.path('/Login');
            }

            return $q.reject(rejection);
        };

        return {
            request: _request,
            requestError: _requestError,
            response: _response,
            responseError : _responseError
        };
    }
]);

