'use strict';

var sopracovoitControllers = angular.module('sopracovoitControllers', []);

sopracovoitControllers.controller('MainController', ["$scope", function($scope){

    $scope.menu = [
        {"nom": "Users", "url": "users"},
        {"nom": "Stats", "url": "stats"}
    ];

    $scope.loggedUser = null;

    $scope.section = $scope.menu[0].nom;
    $scope.toggleSection = function(name)
    {
        $scope.section = name;
    };

    $scope.isSelected = function(name)
    {
        return name == $scope.section;
    };

    $scope.isLoggedUser = function()
    {
        console.log("ici");
        console.log($scope.loggedUser);
        return $scope.loggedUser != null;
    }

}]);

sopracovoitControllers.controller('LoginCtrl', ["$scope", "$rootScope", function($scope, $rootScope){
    $scope.bloub = "ici";
    $rootScope.loggedUser = {"ok":true};
}]);

sopracovoitControllers.controller("StatsCtrl", ["$scope", function($scope){

}]);
