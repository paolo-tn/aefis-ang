'use strict';

/* Services */

/*
 http://docs.angularjs.org/api/ngResource.$resource

 Default ngResources are defined as

 'get':    {method:'GET'},
 'save':   {method:'POST'},
 'query':  {method:'GET', isArray:true},
 'remove': {method:'DELETE'},
 'delete': {method:'DELETE'}

 */

var services = angular.module('ngdemo.services', ['ngResource']);

services.factory('DummyFactory', function ($resource) {	
    //return $resource('/ngdemo/web/dummy', {}, {
	return $resource('http://localhost:8080/aefis/rest/users',{},{
        query: { method: 'GET', params: {}, isArray: false }
    });
});

services.factory('UsersFactory', function ($resource) {
    //return $resource('/ngdemo/web/users', {}, {
	
	 return $resource('http://localhost/aefis/rest/users', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    });

});

services.factory('UserFactory', function ($resource) {
    return $resource('/ngdemo/web/users/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    });
});

services.factory('MachinesFactory', function($resource){
	console.log("in machinesFactory");
	return $resource('http://localhost/aefis/rest/data/machines2?schema=azienda_xx&lang=it',{},
	  { query: { method: 'GET', params: {}, isArray: true}});
});
