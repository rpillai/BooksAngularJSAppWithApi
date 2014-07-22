'use strict';

var AccountService = BooksApp.factory('AccountService', ['$http','$cookieStore',
    function ($http, $cookieStore) {

        var _authData = {
            isAuth: false,
            userName: "",
            token: ""
        };

        var Register = function(email, password) {
            return $http(
                {
                    'method': 'POST',
                    'url': 'http://localhost:57212/api/Account/Register',
                    'data': {
                        Email: email,
                        password: password,
                        confirmpassword: password
                    },
                    'content-Type': 'application/json'
                }
            ).then(function(response) {
                return response;
            }, function(error) {
                return error;
            });
        };

        var Login = function(email, password) {
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
                    
                return response;
                
            }, function(error) {
                return error;
            });
        }

        return {
            Register: Register,
            Login: Login
        }

    }
]);