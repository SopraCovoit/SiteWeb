
'use strict';

var sopracovoitApp = angular.module('sopracovoitApp', [
    'ngMaterial',
    'ngRoute',
    'sopracovoitControllers'
]);

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

sopracovoitApp.run(function($rootScope, $location){
   $rootScope.$on('$routeChangeStart', function(event, next, current){
      if($rootScope.loggedUser == null && next.originalPath != "/login")
      {
          $location.path('/login');
          console.log("Redirect route not allowed");
      }
   });
});
