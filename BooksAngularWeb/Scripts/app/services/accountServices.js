'use strict';

var AccountService = BooksApp.factory('AccountService', [
        '$http', 'CookieService', '$rootScope', 'AUTHKEY', 'CARTKEY',
        function ($http, CookieService, $rootScope, AUTHKEY, CARTKEY) {

            var baseUrl = 'http://api.angularbookapp.com.au:57212/api/Account/';

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
                    'url': 'http://api.angularbookapp.com.au:57212/Token',
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

                    _setAuthData(response.data.access_token, response.data.userName);

                    //_authData.isAuth = true;
                    //_authData.token = response.data.access_token;
                    //_authData.userName = response.data.userName;

                    //CookieService.SetCookie(AUTHKEY, _authData);
                    //$rootScope.$broadcast('OnSuccessLogin', _authData);

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

                    CookieService.ClearCookie();
                    //$cookieStore.remove('AuthorisedData');

                    _authData.isAuth = false;
                    _authData.userName = {};
                    _authData.token = {}
                });
            }

            var fillAuthData = function () {

                var authData = CookieService.GetCookie(AUTHKEY);

                if (authData) {
                    _authData.isAuth = authData.isAuth;
                    _authData.userName = authData.userName;
                    _authData.token = authData.token;
                }
            }

            var _forgotPassword = function (email) {
                return $http({
                    method: 'GET',
                    data: email,
                    url: baseUrl + 'ResetPassword?email=' + email
                }).then(function (response) {
                    return response;
                });
            }

            var _getExternalProviders = function () {
                var returnUrl = encodeURIComponent('http://www.angularbookapp.com.au/');
                return $http.get
                (
                    baseUrl + '/ExternalLogins?returnUrl=' + returnUrl + '&generateState=true'
                ).then(function (response) {
                    return response;
                });
            }

            var _setAuthData = function (access_token, userName) {
                _authData.isAuth = true;
                _authData.token = access_token;
                _authData.userName = userName;
                CookieService.SetCookie(AUTHKEY, _authData);
                $rootScope.$broadcast('OnSuccessLogin', _authData);
            }

            var _setAuthUserName = function (userName) {
                var authData = CookieService.GetCookie(AUTHKEY);
                _authData.userName = userName;
                CookieService.SetCookie(AUTHKEY, _authData);
                $rootScope.$broadcast('OnSuccessLogin', _authData);
            }

            var _getUserInfo = function() {
                return $http.get(
                    baseUrl + 'UserInfo'
                );
            }

            return {
                Register: _register,
                Login: _login,
                Logout: _logOut,
                FillAuthData: fillAuthData,
                ForgotPassword: _forgotPassword,
                GetExternalProviders: _getExternalProviders,
                GetUserInfo: _getUserInfo,
                SetAuthData : _setAuthData,
                SetAuthUserName : _setAuthUserName,
                AuthData: _authData
            }

        }
]);