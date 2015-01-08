'use strict';

var sopracovoitResource = angular.module('sopracovoitResource', ['ngResource']);

sopracovoitResource.factory('Resource', ['$resource', function($resource){
    return function(url, params, methods) {
        var defaults = {
            update: {method: 'put', isArray: false},
            create: {method: 'post'}
        };

        methods = angular.extend(defaults, methods);

        var resource = $resource(url, params, methods);

        resource.prototype.$save = function(){

            var current = angular.copy(this);

            if(current.tmp)
            {
                delete current.tmp;
            }

            if(!current.id) {
                return current.$create();
            } else {
                return current.$update();
            }
        };

        return resource;
    };
}]);
