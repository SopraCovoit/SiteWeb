'use strict';

var sopracovoitControllers = angular.module('sopracovoitControllers', []);

sopracovoitControllers.controller('MainController', ["$scope", "$rootScope", "$cookieStore", "$mdSidenav", "$location",
    function($scope, $rootScope, $cookieStore, $mdSidenav, $location){

    $scope.menu = [
        {"nom": "Users", "url": "users"},
        {"nom": "Stats", "url": "stats"},
        {"nom": "Workplaces", "url": "workplaces"}
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
            id: 1,
            "name": "Jérémie",
            "surname": "Boutoille",
            "mail": "jeremie@gmail.com",
            "phone": "0616026915",
            "isDriver": true,
            "home": {
                "lat": 1336,
                "lng": 1338
            },
            "workplace": 1234,
            "img": "./img/miaou.jpeg",
            "expanded": true
        },
        {
            id: 2,
            "name": "Jérémie",
            "surname": "Boutoille",
            "mail": "jeremie@gmail.com",
            "phone": "0616026915",
            "isDriver": true,
            "home": {
                "lat": 1336,
                "lng": 1338
            },
            "workplace": 1234,
            "img": "./img/miaou.jpeg",
            "expanded": false
        }];

}]);

sopracovoitControllers.controller("WorkplacesCtrl", ["$scope", function($scope){
    $scope.$parent.loadedPage("Workplaces");

    $scope.marker = {
        options: {draggable:true}
    };

    $scope.workplaces = [
        {
            id: 1,
            name: "Toulouse Sopra",
            location: {
                latitude: 45,
                longitude: -73
            },
            expanded:true
        },
        {
            id: 2,
            name: "Bullshit Sopra",
            location: {
                latitude: 13.37,
                longitude: 89.89
            }
        }
    ];

}]);
