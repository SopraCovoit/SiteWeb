'use strict';

var sopracovoitServices = angular.module('sopracovoitServices', ['sopracovoitResource']);

sopracovoitServices.factory('Workplace', ["appConfig", 'Resource', function(appConfig, $resource){
    return $resource(appConfig.api.base + "/workplace/:id", {id: "@id"});
}]);

sopracovoitServices.factory("User", ["appConfig", "Resource", function(appConfig, $resource){
    return $resource(appConfig.api.base + "/user/:id", {id: "@id"});
}]);
