'use strict';

var AccountService = BooksApp.factory('AccountService', ['$http', '$cookieStore', '$rootScope',
    function ($http, $cookieStore, $rootScope) {

        var baseUrl = 'http://localhost:57212/api/Account/';

        var _authData = {
            isAuth: false,
            userName: "",
            token: ""
        };

        var _register = function (email, password) {
            return $http(
                {
                    'method': 'POST',
                    'url': baseUrl + '/Register',
                    'data': {
                        Email: email,
                        password: password,
                        confirmpassword: password
                    },
                    'content-Type': 'application/json'
                }
            ).then(function (response) {
                return response;
            }, function (error) {
                return error;
            });
        };

        var _login = function (email, password) {
            return $http({
                'url': 'http://localhost:57212/Token',
                'method': 'POST',
                'data': 'grant_type=password&username=' + email + "&password=" + password,
                'headers': {
                    'Access-Control-Allow-Methods': ['POST', 'OPTIONS'],
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Credentials': 'true',
                    'content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }
            ).then(function (response) {

                _authData.isAuth = true;
                _authData.token = response.data.access_token;
                _authData.userName = response.data.userName;

                $cookieStore.put('AuthorisedData', _authData);

                $rootScope.$broadcast('OnSuccessLogin', _authData);

                return response;

            }, function (error) {
                return error;
            });
        }

        var _logOut = function () {

            $http({
                'url': baseUrl + "/Logout",
                'method': 'POST',
            }).then(function () {
                $cookieStore.remove('AuthorisedData');

                _authData.isAuth = false;
                _authData.userName = "";
                _authData.token = ""
            });
        }

        var fillAuthData = function () {
            var authData = $cookieStore.get('AuthorisedData');

            if (authData) {
                _authData.isAuth = authData.isAuth,
                _authData.userName = authData.userName,
                _authData.token = authData.token
            };

        }

        return {
            Register: _register,
            Login: _login,
            Logout: _logOut,
            FillAuthData: fillAuthData,
            AuthData: _authData
        }

    }
]);