'use strict';

BooksApp.factory('httpInterceptorService', ['$q', '$cookieStore',
    function ($q, $cookieStore) {

        var _request = function (config) {
            //var token = $cookieStore.get('AuthorisedToken');

            var token = '';
            if(token)
                config.headers.Authorisation = 'Bearer=' + token;
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
                $location.path('/login');
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

