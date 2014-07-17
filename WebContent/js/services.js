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

services.factory('UsersFactory', function ($resource) {
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


/*
 * service.factory per la visualizzazione della lista
 * */
services.factory('MachinesFactory', function($resource){
	return $resource('http://localhost/aefis/rest/data/machines2',{},
	  { query: { method: 'GET', params: {schema:'@schema', lang:'@lang'}, isArray: true}});
});

/*
 * service factory per l'update/delete/ di una singola macchina
 * e visualizzazione della singola macchina
 * */
services.factory('MachineFactory', function($resource){
	return $resource('http://localhost/aefis/rest/data/machines2', {},{
		query: { method: 'GET', params:{id: '@id', schema: '@schema', lang:'@lang'}, isArray: true },
		update:{method:'PUT', params:{id:'@id', schema:'@schema'}},
		
		delete:{method:'DELETE', params:{id:'@id', schema:'@schema'}}
	});
});
