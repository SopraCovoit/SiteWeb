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

sopracovoitControllers.controller("WorkplacesCtrl", ["appConfig", "$scope", "Workplace", "$mdToast", "$mdDialog",
    function(appConfig, $scope, Workplace, $mdToast, $mdDialog){
    $scope.$parent.loadedPage(appConfig.routes.workplaces.name);

    $scope.markerOptions = {draggable: true};
    $scope.workplaces = Workplace.query();

    $scope.add = function()
    {
        $mdDialog.show({
            title:"Add workplace",
            controller: "WorkplaceAddCtrl",
            templateUrl: "partials/workplace_add.html"
        }).then(function(workplace){
            workplace = new Workplace(workplace);
            workplace.$save(function(data){ // success

                data.tmp = {};
                data.tmp.expanded = true;
                $scope.workplaces = [data].concat($scope.workplaces);

            }, function(err){ // error
                $mdToast.show(
                    $mdToast.simple()
                        .content("Unable to create workplace")
                        .position("top right")
                        .hideDelay(3000)
                );
            });
        });
    };

    $scope.save = function(workplace)
    {
        workplace.$save(function(data){ // success
            $mdToast.show(
                $mdToast.simple()
                    .content("Workplace saved")
                    .position("top right")
                    .hideDelay(3000)
            );
            workplace.tmp.expanded = false;
        }, function(err){ // error
            $mdToast.show(
                $mdToast.simple()
                    .content("Workplace not saved !!!!")
                    .position("top right")
                    .hideDelay(3000)
            );
        });

    };

    $scope.delete = function(workplace)
    {
        var confirm = $mdDialog.confirm()
            .title("Are you sure?")
            .content("This workplace will be lost ...")
            .ariaLabel("Are you sure?")
            .ok("Yes, delete")
            .cancel("Cancel");
        $mdDialog.show(confirm).then(function(){
            workplace.$remove(function(data){
                $mdToast.show(
                    $mdToast.simple()
                        .content("Workplace deleted.")
                        .position("top right")
                        .hideDelay(3000)
                );
                $scope.workplaces = Workplace.query();
            }, function(err){
                $mdToast.show(
                    $mdToast.simple()
                        .content("Workplace not deleted - internal error.")
                        .position("top right")
                        .hideDelay(3000)
                );
            });
        }, function(){
            $mdToast.show(
                $mdToast.simple()
                    .content("Action canceled")
                    .position("top right")
                    .hideDelay(3000)
            );
        });

    };

}]);

sopracovoitControllers.controller("WorkplaceAddCtrl", ["$scope", "$mdDialog", function($scope, $mdDialog){

    $scope.markerOptions = { draggable: true};

    $scope.workplace = {
        location: {latitude:43.570900885989744, longitude:1.466313457965839},
    };

    $scope.cancel = function()
    {
        $mdDialog.cancel();
    };

    $scope.save = function()
    {
      $mdDialog.hide($scope.workplace);
    };

}]);

sopracovoitControllers.controller("PathsCtrl", ["appConfig", "$scope", function(appConfig, $scope){
    $scope.$parent.loadedPage(appConfig.routes.paths.name);
}]);
