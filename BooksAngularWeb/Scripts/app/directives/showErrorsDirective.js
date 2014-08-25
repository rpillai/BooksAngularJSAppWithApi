(function() {
    'use strict';

    var showErrors = BooksApp.directive('showErrors',['$timeout', function ($timeout) {

        var linkFn;

        linkFn = function(scope, element, attr, formCtrl) {

            var inputElement = element[0].querySelector('[name]');
            var inputNgElement = angular.element(inputElement);
            var inputName = inputNgElement.attr('name');

            var blurred = false;

            if (! inputName) {
                throw 'show-errors element has no child input elements with a \'name\' attribute';
            }

            inputNgElement.bind('blur', function() {
                blurred = true;
                return element.toggleClass('has-error', formCtrl[inputName].$invalid);
            });

            scope.$watch(function() {
                return formCtrl[inputName].$invalid;
            }, function(invalid) {
                if (! blurred && invalid) {
                    return;
                }
                return element.toggleClass('has-error', invalid);
            });

            scope.$on('show-errors-check-validity', function() {
                return element.toggleClass('has-error', formCtrl[inputName].$invalid);
            });

            scope.$on('show-errors-reset', function() {
                return $timeout(function() {
                    element.removeClass('has-error');
                }, 0, false);
            });
        };

        return {
            restrict: 'A',
            require: '^form',
            compile : function(elem, attrs) {
                if (!elem.hasClass('form-group')) {
                    throw 'show-errors element doesnt have a the \'form-group\' class';
                }
                return linkFn;
            }
        }
    }]);
})();