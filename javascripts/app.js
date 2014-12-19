
'use strict';

var sopracovoitApp = angular.module('sopracovoitApp', [
    'ngMaterial',
    'ngRoute',
    'ngCookies',
    'sopracovoitControllers'
]);

/*
 * Routes
 */
sopracovoitApp.config(['$routeProvider', function($routeProvider){
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

    $routeProvider.otherwise({
        redirectTo: '/stats'
    });
}]);

/*
 * Register function to connection
 */
sopracovoitApp.run(function($rootScope, $location, $mdToast){
   $rootScope.$on('$routeChangeStart', function(event, next, current){
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
});
