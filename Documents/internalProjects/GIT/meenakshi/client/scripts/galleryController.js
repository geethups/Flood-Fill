(function () {
    'use strict';
    angular.module('meenu').controller('galleryController', galleryController);
    galleryController.$inject = ['$scope'];

    function galleryController($scope) {
        function autoPlayVideo() {
            if (angular.element(document).find('video')) {
                angular.element(document).find('video')[0].play();
            }
        }

        function constructor() {
            $scope.hideSliderGallery = true;
            autoPlayVideo();
        }
        constructor();
    }
})();
