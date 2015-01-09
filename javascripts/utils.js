'use strict';

var sopracovoitUtils = angular.module("sopracovoitUtils", []);

sopracovoitUtils.service("Utils", ["$mdToast", function($mdToast){
    this.toast = function(message)
    {
        $mdToast.show(
            $mdToast.simple()
                .content(message)
                .position("top right")
                .hideDelay(3000)
        );
    };
}]);