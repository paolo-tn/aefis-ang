'use strict';

/* Controllers */

var app = angular.module('ngdemo.controllers', []);


// Clear browser cache (in development mode)
//
// http://stackoverflow.com/questions/14718826/angularjs-disable-partial-caching-on-dev-machine

app.run(function ($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    });
});


/*
 * controller per la visualizzazione della lista di macchine di un'azienda
 * */
app.controller('MachinesListCtrl',['$scope', 'MachinesFactory',  '$location',
  function($scope, MachinesFactory,  $location){
	//TODO: lang e azienda devono essere settate dall'utente
	$scope.lang = 'it';
	$scope.schema = 'azienda_xx';

	 $scope.machines = MachinesFactory.query({lang: $scope.lang, schema: $scope.schema}, function(){
		 //callback per la visualizzazione immediata
     });
	 
	  // callback per ng-click 'editMachine'
	 //usa location per il redirect alla vista di dettaglio
     $scope.editMachine = function (machId) {    	
         $location.path('/machine-detail/');
         $location.search({'id': machId,'lang':$scope.lang,'schema': $scope.schema});
     };

     // callback per ng-click 'deleteMachine':
     // cancella la macchina e fa il redirect sulla lista
     $scope.deleteMachine = function (machineId) {    
    	 MachinesFactory.delete({'id': machineId,'schema': $scope.schema });
    	 console.log("about to refresh");
    	 console.log($scope.schema);
         $scope.machines = MachinesFactory.query({lang: $scope.lang, schema: $scope.schema},function(){
        	
         });
     };
	 
}]);


/*
 * controller per la vista di dettaglio 
 * */
app.controller('MachineDetailCtrl', ['$scope', '$routeParams', 'MachineFactory', '$location','MachTypoFactory',
                                     'MachDriveTypeFactory','MachSizeTypeFactory','MachCombTypeService',
    function ($scope, $routeParams, MachineFactory, $location, MachTypoFactory, MachDriveTypeFactory,
    		  MachSizeTypeFactory,MachCombTypeService){
		
	    // callback for ng-click 'updateMachine':
	    $scope.updateMachine = function (machineId, schema) {
	    	var params = $location.search();
	    	console.log("in app.ctrl.updateMachine");
	    	console.log("about to update" + params.id);
	    	console.log("schema" + params.schema);
	    	console.log($scope.machines[0]);
	        
	    	MachineFactory.update({'id': params.id,'schema': params.schema}, $scope.machines[0] );
	        $location.path('/machines-list');
	        $location.search({'id': machineId,'schema': $scope.schema});
	    };
	
	    // callback for ng-click 'cancel':
	    $scope.cancel = function () {
	        $location.path('/machines-list');
	        $location.search({'lang':$scope.lang,'schema': $scope.schema});
	    };
	    
	    
	    $scope.deleteSizeItem= function(index){
	    	console.log("index to delete:" + index);
	    
	    	$scope.machines[0].machineSizeList.splice(index,1);
	    	
	    	console.log('this is the array after spicing on pos');
	    	console.log($scope.machines[0].machineSizeList);
	    	console.log($scope.machines[0].machineSizeList.length);
	    		
	    };
	    
	    $scope.addSizeItem = function(){
	      console.log("adding  a new size");
		    console.log($scope.machines[0].machineSizeList);
	    	$scope.machines[0].machineSizeList.push({'machineSizeType':{'code':'', 'descr': '', 'um': ''}, 'amount': 0});
	    	console.log("this is the array after adding a new size"); 
	    	console.log($scope.machines[0].machineSizeList);
	    };
	    
	    
		  $scope.machCombTypes = MachCombTypeService.machCombTypes;	
	    
		  var params = $location.search();
	    
      $scope.machines = MachineFactory.query({id: params.id, schema:params.schema, lang:params.lang}, 
          function(){
        	 console.log("scope.machines");
        	 console.log($scope.machines[0]);
        	 
        	 //richiesta delle tipologie disponibili
        	 $scope.availTypologies = MachTypoFactory.query({category: $scope.machines[0].machineCategory.id},
                   		function(){
        		 console.log("checking available typologies");
        		 console.log($scope.availTypologies);
        	 });
        	 
        	 //richiesta degli azionamenti disponibili
        	 $scope.availDriveType = MachDriveTypeFactory.query({lang:params.lang}, function(){
        		 console.log("checking available driving type");
        		 console.log($scope.availDriveType);
        		 console.log(params.lang);
        	 });
        	 
        	 //richiesta dei tipi di potenza disponibili
        	 $scope.availSizeType = MachSizeTypeFactory.query({lang:params.lang},function(){
        		 console.log("checking available sizetypes");
        		 console.log($scope.availSizeType);
        	 }); 
        });  
      
      $scope.checkNoDriveItem = function(){
      	return $scope.machines[0].machineDrivingList.length ==  0;
      };
      
      $scope.addDriveItem = function(){
      	$scope.machines[0].machineDrivingList.push({code:0, acronym:'', descr:''});
      };
}]);



app.controller('MachineCreationCtrl', [ '$scope', '$routeParams',  '$location','MachTypoFactory',
                                         'MachDriveTypeFactory','MachSizeTypeFactory',"MachineCategoriesFactory",
                                         "MachineFactory","MachCombTypeService",
                                         function($scope, $routeParams, $location, MachTypoFactory, MachDriveTypeFactory,
                                        		MachSizeTypeFactory, MachineCategoriesFactory, MachineFactory, MachCombTypeService){
			 // la lingua va impostata in maniera dinamica 
			 //FIXME
			 var curr_lang ='it';	
			 
			 $scope.new_machine = {
			     mach_nick_name :"",
			     mach_brand : "",
			     mach_model : "",
			     machineCategory : {},
			     machineTypology : {},
			     mach_plate : "",
			     mach_manufact_registr :"",
			     mach_vin : "",
			     mach_remarks :"" ,
			     machineSizeList: [],
			     machineDrivingList : [{code:0, acronym:'', descr:''}],
			     machCombType : {}
			 };
		

		     $scope.validateData = function() {
		    	 var result = false;
		    	 console.log('validating machine');
		         result = $scope.new_machine.machineCategory.desc!= undefined;
		       
		         return result;
		     };
			 
			 $scope.selectedCategory = {};
			 
			 $scope.machCombTypes = MachCombTypeService.machCombTypes;	
			 
			 //richiesta dei tipi di potenza disponibili
			 $scope.availSizeType = MachSizeTypeFactory.query({lang:'it'},function(){
				 console.log("checking available sizetypes");
				 console.log($scope.availSizeType);
			 });
			 $scope.availCategories = MachineCategoriesFactory.query({lang:curr_lang}, function(){		
				 console.log("checking categories");
				 console.log($scope.availCategories);
			 });
			 
			 
			 $scope.availDriveType = MachDriveTypeFactory.query({lang:'it'}, function(){
				 console.log("checking available driving type");
				 console.log($scope.availDriveType);
			 });
			 
			 
			 $scope.getTypologies = function(machId){
				 if(machId === undefined){
					 console.log("machId undefined>>> "+ machId );
					 return;
				 }
				 $scope.availTypologies = MachTypoFactory.query({category: machId},
	                   		function(){
	        		 console.log("checking available typologies");
	        		 console.log($scope.availTypologies);
	        		 
	        	 });
				 
			 };
			 
			  $scope.deleteSizeItem= function(index){
			    	console.log("index to delete:" + index);
			    
			    	$scope.new_machine.machineSizeList.splice(index,1);
			    	
			    	console.log('this is the array after spicing on pos');
			    	console.log($scope.new_machine.machineSizeList);
			    	console.log($scope.new_machine.machineSizeList.length);
			    		
			    };
			    
			    
			    $scope.addSizeItem = function(){
			        console.log("adding  a new size");
				    console.log($scope.new_machine.machineSizeList);
			    	$scope.new_machine.machineSizeList.push({'machineSizeType':{'code':'', 'descr': '', 'um': ''}, 'amount': 0});
		
			    };
			    
			    // callback for ng-click 'cancel':
			    $scope.cancel = function () {
			        $location.path('/machines-list');
			        //$location.search({'lang':$scope.lang,'schema': $scope.schema});
			    };
			    
			    $scope.createMachine = function(){
			    	console.log("about to post a new machine")
			    	MachineFactory.save({'schema': "azienda_xx"}, $scope.new_machine );
			        $location.path('/machines-list');
			    };
	
}]);

app.controller('MachineDataLogCtrl', ['$scope','$location', 'AvailDataLoggersService','MachDataLoggersService', 'FarmMachinesService',
                                      function($scope, $location, AvailDataLoggersService, MachDataLoggersService, FarmMachinesService){
	
	$scope.lang='it';
	$scope.schema='azienda_xx';
	
	$scope.avail_dloggers = AvailDataLoggersService.query({schema:$scope.schema});
	$scope.mach_dataloggers = MachDataLoggersService.query({schema:$scope.schema});
	$scope.new_mach_datalogger = [];
	
	$scope.new_item = {
			machine:{},
			dataLogger: {},
			activ: '',
			deact: ''	
	};
	

	
	$scope.addMachDataLogger = function(){
		console.log("adding a new machdatalogger");
		$scope.new_mach_datalogger.push($scope.new_item);
	};
	$scope.cancel = function(){
		$location.path('/machines-dloggers');

	
		$scope.new_mach_datalogger = [];
	};  

	
	$scope.newItemExists= function(){
	 return $scope.new_mach_datalogger.length > 0;	
	};
	
	 $scope.avail_machines =FarmMachinesService.query({schema:$scope.schema});
	 
	 $scope.save =function(){
		console.log('saving') ;
		
		//$scope.mach_dataloggers.push($scope.new_mach_datalogger.pop());
		$scope.new_mach_datalogger = [];
		
		MachDataLoggersService.save({schema: $scope.schema}, $scope.new_item );
		$scope.new_item = {
				machine:{},
				dataLogger: {},
				activ: '',
				deact: ''	
		};
	 };
	
}]);


