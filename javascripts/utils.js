'use strict';

var sopracovoitUtils = angular.module("sopracovoitUtils", []);

sopracovoitUtils.service("Utils", ["$mdToast", "$mdDialog", function($mdToast, $mdDialog){

    this.toast = function(message)
    {
        $mdToast.show(
            $mdToast.simple()
                .content(message)
                .position("top right")
                .hideDelay(3000)
        );
    };

    this.dialogConfirm = function(message, okCallback, errCallback)
    {
        var confirm = $mdDialog.confirm()
            .title("Are you sure?")
            .content(message)
            .ariaLabel("Are you sure?")
            .ok("Yes")
            .cancel("Cancel");

        $mdDialog.show(confirm).then(okCallback, errCallback);

    };

}]);
