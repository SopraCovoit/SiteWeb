'use strict';

var sopracovoitControllers = angular.module('sopracovoitControllers', []);

sopracovoitControllers.controller('MainController', ["$scope", "$rootScope", "$cookieStore", "$mdSidenav", "$location",
    function($scope, $rootScope, $cookieStore, $mdSidenav, $location){

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

    $scope.isLoggedUser = function()
    {
        return $rootScope.loggedUser.connected == true;
    };

    $scope.toggleMenu = function()
    {
        $mdSidenav('left').toggle();
    };

    $scope.closeMenu = function()
    {
        $mdSidenav('left').close();
    };

    $scope.isLoading = function()
    {
        return $rootScope.isLoading;
    };

    $scope.loadPage = function(page)
    {
        $location.path(page);
        $scope.closeMenu();
    };

    $scope.loadedPage = function(name)
    {
        $scope.page = name;
        $scope.closeMenu();
    };

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

    $scope.$parent.loadedPage("Login");

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
    $scope.$parent.loadedPage("Stats");
}]);

sopracovoitControllers.controller("UsersCtrl", ["$scope", function($scope){
    $scope.$parent.loadedPage("Users");

    $scope.users = [
        {
            "nom": "Jérémie",
            "prenom": "Boutoille",
            "email": "jeremie@gmail.com",
            "img": "./img/miaou.jpeg"
        },
        {
            "nom": "Harry",
            "prenom": "Cover",
            "email": "harry@gmail.com",
            "img": "./img/miaou.jpeg"
        },
        {
            "nom": "Boubi",
            "prenom": "Gna",
            "email": "boubi@gmail.com",
            "img": "./img/miaou.jpeg"
        },
        {
            "nom": "Boubi",
            "prenom": "Gna",
            "email": "boubi@gmail.com",
            "img": "./img/miaou.jpeg"
        },
        {
            "nom": "Boubi",
            "prenom": "Gna",
            "email": "boubi@gmail.com",
            "img": "./img/miaou.jpeg"
        },
        {
            "nom": "Boubi",
            "prenom": "Gna",
            "email": "boubi@gmail.com",
            "img": "./img/miaou.jpeg"
        },
        {
            "nom": "Boubi",
            "prenom": "Gna",
            "email": "boubi@gmail.com",
            "img": "./img/miaou.jpeg"
        },
        {
            "nom": "Boubi",
            "prenom": "Gna",
            "email": "boubi@gmail.com",
            "img": "./img/miaou.jpeg"
        },
        {
            "nom": "Stéphanie",
            "prenom": "De Monaco",
            "email": "boubi@gmail.com",
            "img": "./img/miaou.jpeg"
        }];

}]);
