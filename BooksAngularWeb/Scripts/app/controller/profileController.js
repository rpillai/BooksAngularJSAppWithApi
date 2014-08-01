(function () {
    'use strict';

    var ProfileController = BooksApp.controller('ProfileController', ['$scope','$modal','$log', 'AccountService', 'OrderService', function ($scope,$modal, $log, AccountService, OrderService) {

        OrderService.GetOrdersForUser(AccountService.AuthData.userName).then(function(response) {
            $scope.Orders = response.data;
        });

        $scope.GetOrderDetails = function(id) {
            OrderService.GetOrderDetailsByOrder(id).then(function(response) {
                $scope.OrderDetails = response.data;

                var modalInstance = $modal.open({
                    templateUrl: 'myModalContent.html',
                    controller: ModalInstanceCtrl,
                    size: 'sm',
                    windowClass: 'position:relative;',
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

    var ModalInstanceCtrl = function($scope, $modalInstance, OrderDetails) {
        $scope.OrderDetails = OrderDetails;

        $scope.ok = function() {
            $modalInstance.close();
        }
    };

   
})();