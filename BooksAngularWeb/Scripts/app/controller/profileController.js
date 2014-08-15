(function () {
    'use strict';

    var ProfileController = BooksApp.controller('ProfileController', ['$scope','$modal','$log', 'AccountService', 'OrderService', function ($scope,$modal, $log, AccountService, OrderService) {

        OrderService.GetOrdersForUser(AccountService.AuthData.userName).then(function(response) {
            $scope.Orders = response.data;
        });

        $scope.GetUserProfile = function() {
            if (angular.isUndefined($scope.userdata)) {
                AccountService.GetUserInfo().then(function(response) {
                    $scope.userdata = response.data;
                }, function(error) {
                    $scope.message = 'An error occurred while getting user data';
                });
            }
        }

        $scope.GetOrderDetails = function (id) {
            OrderService.GetOrderDetailsByOrder(id).then(function (response) {

                $scope.OrderDetails = response.data;

                var modalInstance = $modal.open({
                    templateUrl: 'PartialViews/OrderDetailModal.html',
                    controller: 'ModalOrderDetailCtrl',
                    size: 'sm',
                    resolve : {
                        OrderDetails: function() {
                            return $scope.OrderDetails;
                        }  
                    }
                });

                modalInstance.result.then(function() {
                    console.log('Modal Closed at ' + new Date());
                });
            });
        }
    }]);
})();