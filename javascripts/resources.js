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

            if(this.tmp)
            {
                delete this.tmp;
            }

            if(!this.id) {
                return this.$create();
            } else {
                return this.$update();
            }
        };

        return resource;
    };
}]);
