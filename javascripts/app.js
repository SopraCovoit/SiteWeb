
'use strict';

var sopracovoitApp = angular.module('sopracovoitApp', [
    'ngMaterial',
    'ngRoute',
    'ngCookies',
    'uiGmapgoogle-maps',
    'sopracovoitControllers'
]);

/*
 * Routes
 */
sopracovoitApp.config(['$routeProvider', 'uiGmapGoogleMapApiProvider', function($routeProvider, uiGmapGoogleMapApiProvider){
    $routeProvider.when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
    });

    $routeProvider.when('/logout', {
        templateUrl: 'partials/login.html',
        controller: 'LogoutCtrl'
    });

    $routeProvider.when('/stats', {
        templateUrl: 'partials/stats.html',
        controller:'StatsCtrl'
    });

    $routeProvider.when('/users', {
        templateUrl: 'partials/users.html',
        controller: 'UsersCtrl'
    });

    $routeProvider.when('/workplaces', {
        templateUrl: 'partials/workplaces.html',
        controller: 'WorkplacesCtrl'
    });

    $routeProvider.when('/paths', {
        templateUrl: 'partials/paths.html',
        controller: 'PathsCtrl'
    });

    $routeProvider.otherwise({
        redirectTo: '/users'
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
