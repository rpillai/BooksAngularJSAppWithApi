(function() {
    'use strict';

    var ModalInstanceCtrl = BooksApp.controller('ModalInstanceCtrl',['$scope','$modalInstance',function ($scope,$modalInstance) {
        $scope.OK = function () {
           $modalInstance.close();
        }

        $scope.Login = function () {
            $modalInstance.close('Login');
        }

        $scope.Continue = function() {
            $modalInstance.close('Guest');
        }

    }]);
   
})();