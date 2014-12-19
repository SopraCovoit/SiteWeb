'use strict';

var sopracovoitControllers = angular.module('sopracovoitControllers', []);

sopracovoitControllers.controller('MainController', ["$scope", "$rootScope", function($scope, $rootScope){

    $scope.menu = [
        {"nom": "Users", "url": "users"},
        {"nom": "Stats", "url": "stats"}
    ];

    $rootScope.loggedUser = {"connected": false};

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
        return $scope.loggedUser != null;
    }

}]);

sopracovoitControllers.controller('LoginCtrl', ["$scope",
    "$rootScope",
    "$location",
    "$mdToast", function($scope, $rootScope, $location, $mdToast){

    $scope.submit = function(user)
    {
        if(user == undefined || user.email == undefined || user.password == undefined)
        {
            $mdToast.show(
                $mdToast.simple()
                    .content("Merci de remplir tous les champs !")
                    .position("top right")
                    .hideDelay(3000)
            );
            return;
        }

        if(user.email == "admin" && user.password == "admin") // TODO : add good check ...
        {
            $rootScope.loggedUser = {
                "email" : user.email,
                "connected": true
            };

            $mdToast.show(
                $mdToast.simple()
                    .content("Bienvenue !")
                    .position("top right")
                    .hideDelay(3000)
            );

            $location.path("#/stats");
        } else {
            $mdToast.show(
                $mdToast.simple()
                    .content("Mauvais utilisateur ou mot de passe !")
                    .position("top right")
                    .hideDelay(3000)
            );
        }
    }

}]);

sopracovoitControllers.controller("StatsCtrl", ["$scope", function($scope){

}]);
