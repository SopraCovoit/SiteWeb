'use strict';

var sopracovoitControllers = angular.module('sopracovoitControllers', []);

sopracovoitControllers.controller('MainController', ["$scope", function($scope){
    $scope.menu = [
        {"nom": "Users", "url": "users"},
        {"nom": "Stats", "url": "stats"}
    ];

    $scope.section = $scope.menu[0].nom;
    $scope.toggleSection = function(name)
    {
        $scope.section = name;
    };

    $scope.isSelected = function(name)
    {
        return name == $scope.section;
    };

}]);

sopracovoitControllers.controller('LoginCtrl', ["$scope", "$rootScope", function($scope, $rootScope){
    $scope.bloub = "ici";
    $rootScope.loggedUser = {"ok":true};
}]);

sopracovoitControllers.controller("StatsCtrl", ["$scope", function($scope){

}]);
