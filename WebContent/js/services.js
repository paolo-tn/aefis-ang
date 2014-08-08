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

/**
 * url per debug da commentare in produzione
 */
var 
  urlMachines = 'http://localhost/aefis/rest/data/machines2',
  urlMachinesTypo = 'http://localhost/aefis/rest/data/machinestypo2',
  urlMachinesDriving = 'http://localhost/aefis/rest/data/machinesdriving2',
  urlMachineSizes = 'http://localhost/aefis/rest/data/machinessizes2',
  urlMachinesCategories = 'http://localhost/aefis/rest/data/categories',
  urlFarmMachineService = 'http://localhost/aefis/rest/data/farmmachines',
  urlDataLoggerService = 'http://localhost/aefis/rest/data/dataloggers',
  urlMachinesDataLogService = 'http://localhost/aefis/rest/data/farmmachines/dataloggers';
  


/**
 * url da usare in produzione commentare in debug

var 
  urlMachines = '/aefis/rest/data/machines2',
  urlMachinesTypo = '/aefis/rest/data/machinestypo2',
  urlMachinesDriving = '/aefis/rest/data/machinesdriving2',
  urlMachineSizes = '/aefis/rest/data/machinessizes2',
  urlMachinesCategories = '/aefis/rest/data/categories',
  urlFarmMachineService = '/aefis/rest/data/farmmachines',
  urlDataLoggerService = '/aefis/rest/data/dataloggers',
  urlMachinesDataLogService = '/aefis/rest/data/farmmachines/dataloggers';
   */
var services = angular.module('ngdemo.services', ['ngResource']);


/*
 * service.factory per la visualizzazione della lista
 * */
services.factory('MachinesFactory', function($resource){
	return $resource(urlMachines,{},
	  { query: { method: 'GET', params: {schema:'@schema', lang:'@lang'}, isArray: true}});
});

/*
 * service factory per l'update/delete/ di una singola macchina
 * e visualizzazione della singola macchina
 * */
services.factory('MachineFactory', function($resource){
	return $resource(urlMachines, {},{
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
	return $resource(urlMachinesTypo,{},{
		query:{method:'GET', params:{category:'@category'}, isArray: true }
	});
});

/**
 * service factory per ottenere i tipi di azionamento disponibili
 */
services.factory('MachDriveTypeFactory', function($resource){
	return $resource(urlMachinesDriving,{},{
		query:{method:'GET', params:{lang:'@lang'}, isArray: true }
	});
});

/**
 *service factory per ottenere i tipi di potenza disponibili
 */
services.factory('MachSizeTypeFactory', function($resource){
	return $resource(urlMachineSizes,{},{
		query:{method:'GET', params:{lang:'@lang'}, isArray: true }
	});
});

/**
 *service factory per ottenere le categorie disponibili
 *
 */
services.factory('MachineCategoriesFactory', function($resource){
	return $resource(urlMachinesCategories,{},{
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
services.factory('FarmMachinesService', function($resource){

	return $resource(urlFarmMachineService,{},{
		query:{method:'GET', params:{schema:'@schema'}, isArray: true }
	});
	
});

/*
 * service factory per iniettare nel controlle la lista dei data logger
 * disponibili
 * */
services.factory('AvailDataLoggersService', function($resource){	

	return $resource(urlDataLoggerService,{},{
		query:{method:'GET', params:{schema:'@schema'}, isArray: true }
	});
});



/*
 * service factory per visualizzare le associazione in uso
 * machine data logger
 */
services.factory('MachDataLoggersService', function($resource){
	return $resource(urlMachinesDataLogService,{},{
	    query:{method:'GET', params:{schema:'@schema'}, isArray: true },
	    save : {method:'POST', params:{schema:'@schema'}},
	    deactivate : {method:'PUT', params:{id:'@id', schema:'@schema'}}
	});
});





