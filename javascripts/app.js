
'use strict';

var sopracovoitApp = angular.module('sopracovoitApp', [
    'ngMaterial',
    'ngRoute',
    'sopracovoitControllers'
]);

/*
 * Routes
 */
sopracovoitApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
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
sopracovoitApp.run(function($rootScope, $location){
   $rootScope.$on('$routeChangeStart', function(event, next, current){
      if($rootScope.loggedUser.connected == false && next.originalPath != "/login")
      {
          $location.path('/login');
      }
   });
});
