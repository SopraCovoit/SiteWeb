'use strict';

var sopracovoitServices = angular.module('sopracovoitServices', ['ngResource']);

sopracovoitServices.factory('Workplace', ["appConfig", '$resource', function(appConfig, $resource){
    return $resource(appConfig.api.base + "/workplace/:id",{},{});
}]);
