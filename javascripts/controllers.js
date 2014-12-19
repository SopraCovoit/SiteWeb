'use strict';

var sopracovoitControllers = angular.module('sopracovoitControllers', []);

sopracovoitControllers.controller('MainController', ["$scope", "$rootScope", "$cookieStore", function($scope, $rootScope, $cookieStore){

    $scope.menu = [
        {"nom": "Users", "url": "users"},
        {"nom": "Stats", "url": "stats"}
    ];

    if($cookieStore.get("loggedUser") != undefined)
    {
        // TODO check token
        $rootScope.loggedUser = $cookieStore.get("loggedUser");
    } else {
        $rootScope.loggedUser = {"connected": false};
    }

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
        return $rootScope.loggedUser.connected == true;
    }

    $scope.setPage = function(name)
    {
        $scope.page = name;
    }

}]);

sopracovoitControllers.controller('LogoutCtrl', ["$scope",
    "$rootScope",
    "$location",
    "$mdToast",
    "$cookieStore", function($scope, $rootScope, $location, $mdToast, $cookieStore){

        console.log("there");

        $rootScope.loggedUser = {"connected": false};
        $cookieStore.put("loggedUser", $rootScope.loggedUser);
        $mdToast.show(
            $mdToast.simple()
                .content("Aurevoir !")
                .position("top right")
                .hideDelay(3000)
        );

        $location.path("/");

}]);

sopracovoitControllers.controller('LoginCtrl', ["$scope",
    "$rootScope",
    "$location",
    "$mdToast",
    "$cookieStore", function($scope, $rootScope, $location, $mdToast, $cookieStore){

    $scope.$parent.setPage("Login");

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

            if(user.remember)
            {
                $cookieStore.put("loggedUser", $rootScope.loggedUser);
            }

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
    $scope.$parent.setPage("Stats");
}]);
