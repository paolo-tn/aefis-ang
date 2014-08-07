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
		save : {method:'POST', params:{schema:'@schema'}},
		delete:{method:'DELETE', params:{id:'@id', schema:'@schema'}}
	});
});


/**
 * service factory per ottenere le tipologie disponibili per
 * una determinata categoria
 */
services.factory('MachTypoFactory', function($resource){
	return $resource('http://localhost/aefis/rest/data/machinestypo2',{},{
		query:{method:'GET', params:{category:'@category'}, isArray: true }
	});
});

/**
 * service factory per ottenere i tipi di azionamento disponibili
 */
services.factory('MachDriveTypeFactory', function($resource){
	return $resource('http://localhost/aefis/rest/data/machinesdriving2',{},{
		query:{method:'GET', params:{lang:'@lang'}, isArray: true }
	});
});

/**
 *service factory per ottenere i tipi di potenza disponibili
 */
services.factory('MachSizeTypeFactory', function($resource){
	return $resource('http://localhost/aefis/rest/data/machinessizes2',{},{
		query:{method:'GET', params:{lang:'@lang'}, isArray: true }
	});
});

/**
 *service factory per ottenere le categorie disponibili
 *
 */
services.factory('MachineCategoriesFactory', function($resource){
	return $resource('http://localhost/aefis/rest/data/categories',{},{
		query:{method:'GET', params:{lang:'@lang'}, isArray: true }
	});
});


/*
 * service factory per iniettare nel controller la lista
 * delle combination type, dovrebbe prelevare i dati da un servizio
 * */
services.factory('MachCombTypeService', function(){
	console.log("about to use MachCombTypeService");
	return {machCombTypes : [
	       {code:'TR',desc:'trainato'},
	       {code:'SP',desc:'semovente'},
	       {code:'SM', desc: 'semiportato'},
	       {code:'TM', desc: 'portato'}]};
	       
});

/*
 * service factory per ottenere l'elenco delle macchine
 * disponibili nell'azienda.  ottiene i dati dalla vista
 * v_farm_dlogger
 */
services.factory('FarmMachinesService', function(){
	return {
		avail_farmMachines : [
		{
		  machId: 461,
		  name : 'Test Inferenza'
	    },
	    {
	  	  machId: 664,
		  name : 'Test atom 1'	    	
	    }
			]
	};
});

/*
 * service factory per iniettare nel controlle la lista dei data logger
 * disponibili
 * */
services.factory('AvailDataLoggersService', function(){	
	return{ avail_datalog :[
	   {
		   code : '358278002119',
		   tel  : '3351555675'
	   }                        
	]};
});



/*
 * service factory per visualizzare le associazione in uso
 * machine data logger
 */
services.factory('MachDataLoggersService', function(){
	return{
		mach_dataloggers :[
		  {
			  machine : {machId:302, name:'test'},
			  dataLogger :{code:'358278002119',  tel: 'xxx-xxxxxxxx'},
			  activ : '2014-04-30',
			  deact :''			  
		  },
		  {
			  machine : {machId:672, name:'test2'},
			  dataLogger :{code:'358278001739', tel:'xxx-xxxxxxxx'},
			  activ : '2014-07-10',
			  deact :''
		  }
		]
	};
});





