(function () {
    'use strict';
    angular.module('meenu').directive('pageNavBtn', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.click(function (e) {
                    var clickedElement = angular.element(this).attr('id');
                    if (clickedElement === 'prev-btn') {
                        scope.hideSliderGallery = true;
                        angular.element(document).find('#prev-btn').addClass('hide-nav-btn')
                        angular.element(document).find('#nxt-btn').removeClass('hide-nav-btn')
                    } else if (clickedElement === 'nxt-btn') {
                        scope.hideSliderGallery = false;
                        angular.element(document).find('#nxt-btn').addClass('hide-nav-btn')
                        angular.element(document).find('#prev-btn').removeClass('hide-nav-btn')
                    }
                    scope.$apply();
                });
            }
        };
    });
})();
