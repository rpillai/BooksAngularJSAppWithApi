(function () {
    'use strict';

    var simpleDirective = BooksApp.directive('simpleDirective', function () {
        return {
            template : 'Name : {{cutomer.Name}} Address : {{customer.Address}}'
        }
    });

})();