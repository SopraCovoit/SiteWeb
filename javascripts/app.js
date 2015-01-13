
'use strict';

var sopracovoitApp = angular.module('sopracovoitApp', [
    'ngMaterial',
    'ngRoute',
    'ngCookies',
    'uiGmapgoogle-maps',
    'sopracovoitControllers',
    'sopracovoitServices',
    'sopracovoitUtils'
]);

sopracovoitApp.constant("appConfig", {
    api : {
       // base: "http://188.165.245.229:21780/Server_war/api"
        base: "http://192.168.1.6:8080/api"
    },
    routes : {
        defaultRoute: '/stats',
        login: {
            name: 'Login',
            path: '/login',
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
        },
        logout: {
            name: 'Logout',
            path: '/logout',
            templateUrl: 'partials/login.html',
            controller: "LogoutCtrl"
        },
        stats: {
            name: 'Stats',
            path: '/stats',
            templateUrl: 'partials/stats.html',
            controller: 'StatsCtrl'
        },
        users: {
            name: 'Users',
            path: '/users',
            templateUrl: 'partials/users.html',
            controller: 'UsersCtrl'
        },
        workplaces: {
            name: 'Workplaces',
            path: '/workplaces',
            templateUrl: 'partials/workplaces.html',
            controller: "WorkplacesCtrl"
        },
        paths: {
            name: "Paths",
            path: '/paths',
            templateUrl: 'partials/paths.html',
            controller: 'PathsCtrl'
        }
    }
});

/*
 * Routes
 */
sopracovoitApp.config(['appConfig', '$routeProvider', 'uiGmapGoogleMapApiProvider', function(appConfig, $routeProvider, uiGmapGoogleMapApiProvider){

    for(var i in appConfig.routes)
    {
        var route = appConfig.routes[i];
        $routeProvider.when(route.path, {
            templateUrl: route.templateUrl,
            controller: route.controller
        });
    }

    $routeProvider.otherwise({
        redirectTo: appConfig.routes.defaultRoute
    });

    uiGmapGoogleMapApiProvider.configure({
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });

}]);

/*
 * Register function to connection
 */
sopracovoitApp.run(function($rootScope, $location, $mdToast, $timeout){

   $rootScope.$on('$routeChangeStart', function(event, next, current){

      $rootScope.isLoading = true;
      if($rootScope.loggedUser.connected == false && next.originalPath != "/login")
      {
          $location.path('/login');
      }

       if($rootScope.loggedUser.connected && next.originalPath == "/login")
       {
           $location.path('/stats');
           $mdToast.show(
               $mdToast.simple()
                   .content("Vous êtes déjà connecté")
                   .position("top right")
                   .hideDelay(3000)
           );
       }

   });

   $rootScope.$on('$routeChangeSuccess', function(event, next, current){
      $timeout(function(){
        $rootScope.isLoading = false;
      }, 1000);
   });

});
