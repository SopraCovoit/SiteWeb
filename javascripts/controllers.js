'use strict';

var sopracovoitControllers = angular.module('sopracovoitControllers', []);

sopracovoitControllers.controller('MainController', ["appConfig", "$scope", "$rootScope", "$cookieStore", "$mdSidenav", "$location",
    function(appConfig, $scope, $rootScope, $cookieStore, $mdSidenav, $location){

    $scope.menu = [
        {"nom": appConfig.routes.stats.name, "url": appConfig.routes.stats.path},
        {"nom": appConfig.routes.users.name, "url": appConfig.routes.users.path},
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
    "Utils",
    "$cookieStore", function($scope, $rootScope, $location, Utils, $cookieStore){


        $rootScope.loggedUser = {"connected": false};
        $cookieStore.put("loggedUser", $rootScope.loggedUser);
        Utils.toast("Goodbye !")

        $location.path("/");

}]);

sopracovoitControllers.controller('LoginCtrl', ["appConfig", "$scope",
    "$rootScope",
    "$location",
    "Utils",
    "$cookieStore", function(appConfig, $scope, $rootScope, $location, Utils, $cookieStore){

    $scope.$parent.loadedPage(appConfig.routes.login.name);

    $scope.submit = function(user)
    {
        if(user == undefined || user.email == undefined || user.password == undefined)
        {
            Utils.toast("Please fill all fields !");
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

            Utils.toast("Welcome !");

            $location.path("#/stats");
        } else {
            Utils.toast("Bad user or password");
        }
    }

}]);

sopracovoitControllers.controller("StatsCtrl", ["appConfig", "$scope", function(appConfig, $scope){
    $scope.$parent.loadedPage(appConfig.routes.stats.name);
}]);

sopracovoitControllers.controller("UsersCtrl", ["appConfig", "$scope", "User", "Workplace", "Utils",
    function(appConfig, $scope, User, Workplace, Utils){
    $scope.$parent.loadedPage(appConfig.routes.users.name);

    $scope.users = User.query();
    $scope.workplaces = Workplace.query();

    $scope.save = function(user)
    {
        user.$save(function(data){ // success
            Utils.toast("User saved");
            user.tmp.expanded = false;
        }, function(err){ // error
            Utils.toast("User not saved - internal error");
        });
    };

    $scope.delete = function(user)
    {
        Utils.dialogConfirm("This user will be lost ...",
            function(){
                user.$remove(function(data){
                    Utils.toast("User deleted.");
                    $scope.users = User.query();
                }, function(err){
                    Utils.toast("User not deleted - internal error.");
                });
            },
            function(){
                Utils.toast("Action canceled");
            }
        );
    };

}]);

sopracovoitControllers.controller("WorkplacesCtrl", ["appConfig", "$scope", "Workplace", "$mdDialog", "Utils",
    function(appConfig, $scope, Workplace, $mdDialog, Utils){

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
                Utils.toast("Workplace added");

            }, function(err){ // error
                Utils.toast("Unable to create workplace");
            });
        });
    };

    $scope.save = function(workplace)
    {
        workplace.$save(function(data){ // success
            Utils.toast("Workplace saved");
            workplace.tmp.expanded = false;
        }, function(err){ // error
            Utils.toast("Workplace not saved !!!");
        });

    };

    $scope.delete = function(workplace)
    {

        Utils.dialogConfirm("This workplace will be lost ...",
            function(){
                workplace.$remove(function(data){
                    Utils.toast("Workplace deleted.");
                    $scope.workplaces = Workplace.query();
                }, function(err){
                    Utils.toast("Workplace not deleted - internal error.");
                });
            },
            function(){
                Utils.toast("Action canceled");
            }
        );

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
