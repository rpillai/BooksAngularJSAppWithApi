(function() {
    var ModalOrderDetailCtrl = BooksApp.controller('ModalOrderDetailCtrl', function ($scope, $modalInstance, OrderDetails) {
        $scope.OrderDetails = OrderDetails;

        $scope.ok = function() {
            $modalInstance.close();
        }
    });
})();