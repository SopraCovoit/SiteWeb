'use strict';

var sopracovoitControllers = angular.module('sopracovoitControllers', []);

sopracovoitControllers.controller('MainController', ["appConfig", "$scope", "$rootScope", "$cookieStore", "$mdSidenav", "$location",
    function(appConfig, $scope, $rootScope, $cookieStore, $mdSidenav, $location){

    $scope.menu = [
        {"nom": appConfig.routes.users.name, "url": appConfig.routes.users.path},
        {"nom": appConfig.routes.stats.name, "url": appConfig.routes.stats.path},
        {"nom": appConfig.routes.workplaces.name, "url": appConfig.routes.workplaces.path},
        {"nom": appConfig.routes.paths.name, url: appConfig.routes.paths.path}
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

sopracovoitControllers.controller('LoginCtrl', ["appConfig", "$scope",
    "$rootScope",
    "$location",
    "$mdToast",
    "$cookieStore", function(appConfig, $scope, $rootScope, $location, $mdToast, $cookieStore){

    $scope.$parent.loadedPage(appConfig.routes.login.name);

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

sopracovoitControllers.controller("StatsCtrl", ["appConfig", "$scope", function(appConfig, $scope){
    $scope.$parent.loadedPage(appConfig.routes.stats.name);
}]);

sopracovoitControllers.controller("UsersCtrl", ["appConfig", "$scope", function(appConfig, $scope){
    $scope.$parent.loadedPage(appConfig.routes.users.name);

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
            "expanded": false
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

sopracovoitControllers.controller("WorkplacesCtrl", ["appConfig", "$scope", "Workplace", function(appConfig, $scope, Workplace){
    $scope.$parent.loadedPage(appConfig.routes.workplaces.name);

    $scope.markerOptions = { draggable: true};
    $scope.workplaces = Workplace.query();

    $scope.save = function(workplace)
    {
        workplace.$save();
    };

}]);

sopracovoitControllers.controller("PathsCtrl", ["appConfig", "$scope", function(appConfig, $scope){
    $scope.$parent.loadedPage(appConfig.routes.paths.name);
}]);
