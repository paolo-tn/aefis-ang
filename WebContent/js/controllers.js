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
     $scope.editMachine = function () {    	
         $location.path('/machine-detail/');
         $location.search({'id': $scope.machines[0].mach_identnr,'lang':$scope.lang,'schema': $scope.schema});
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
                                     'MachDriveTypeFactory','MachSizeTypeFactory',
    function ($scope, $routeParams, MachineFactory, $location, MachTypoFactory, MachDriveTypeFactory,MachSizeTypeFactory){
		
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
	    
	    
	    //TOLTO LA POSSIBILITÁ DI RIMUOVERE/AGGIUNGERE GLI AZIONAMENTI
	    // PERCHÉ ALMENO UN AZIONAMENTO DEVE ESISTERE QUINDI
	    // L'UTENTE PUÓ SOLO CAMBIARE QUELLO ESISTENTE
	    /*
	    $scope.deleteDriveItem = function(code){
	    	console.log("in deleteDriveItem");
	    	console.log(code);
	    	console.log($scope.machines[0].machineDrivingList);
	    	var idx = null;
	    	$scope.machines[0].machineDrivingList.forEach(function(item, index){
	    		if(item.code === code){
	    			console.log("found");
	    			console.log(index);
	    			idx = index;
	    			
	    		} 
	    		$scope.machines[0].machineDrivingList.splice(idx,1);
	    	});
	    };
	     $scope.addDriveItem = function(){
	       $scope.machines[0].machineDrivingList.push({'acronym':'', 'descr':'', 'code':''});
	       console.log("added a new driving");
	       console.log($scope.machines[0].machineDrivingList);
	    };
	    */
	    
	    $scope.deleteSizeItem= function(code){
	    	var idx = null;
	    	$scope.machines[0].machineSizeList.forEach(function(item, index){
	    		if(item.masi_size_code === code){
	    			console.log("found");
	    			console.log(index);
	    			idx = index;	
	    			$scope.machines[0].machineSizeList.splice(idx,1);
	    		} 
	    		
	    	});
	    	console.log('this is the array after spicing on pos');
	    	console.log($scope.machines[0].machineSizeList);
	    	console.log($scope.machines[0].machineSizeList.length);
	    		
	    };
	    
	    $scope.addSizeItem = function(){
	        console.log("adding  a new size");
		    console.log($scope.machines[0].machineSizeList);
	    	$scope.machines[0].machineSizeList.push({'masi_size_code':'', 'masi_amount':0, 'masi_desc':''});
	    	console.log("this is the array after adding a new size"); 
	    	console.log($scope.machines[0].machineSizeList);
	    };
	    
	    
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
        	 });
        	 
        	 //richiesta dei tipi di potenza disponibili
        	 $scope.availSizeType = MachSizeTypeFactory.query({lang:params.lang},function(){
        		 console.log("checking available sizetypes");
        		 console.log($scope.availSizeType);
        	 }); 
        });    
}]);


/*
app.controller('UserDetailCtrl', ['$scope', '$routeParams', 'UserFactory', '$location',
    function ($scope, $routeParams, UserFactory, $location) {

        // callback for ng-click 'updateUser':
        $scope.updateUser = function () {
            UserFactory.update($scope.user);
            $location.path('/user-list');
        };

        // callback for ng-click 'cancel':
        $scope.cancel = function () {
            $location.path('/user-list');
         
        };

        $scope.user = UserFactory.show({id: $routeParams.id});
    }]);
    
    
  app.controller('DummyCtrl', ['$scope', 'DummyFactory', function ($scope, DummyFactory) {
    $scope.bla = 'bla from controller';
    DummyFactory.get({}, function (dummyFactory) {
        $scope.firstname = dummyFactory.firstName;
    });
}]);  
    
 app.controller('UserListCtrl', ['$scope', 'UsersFactory', 'UserFactory', '$location',
    function ($scope, UsersFactory, UserFactory, $location) {

        // callback for ng-click 'editUser':
        $scope.editUser = function (userId) {
            $location.path('/user-detail/' + userId);
        };

        // callback for ng-click 'deleteUser':
        $scope.deleteUser = function (userId) {
            UserFactory.delete({ id: userId });
            $scope.users = UsersFactory.query();
        };

        // callback for ng-click 'createUser':
        $scope.createNewUser = function () {
            $location.path('/user-creation');
        };

        $scope.users = UsersFactory.query(function(){

        });
    }]);

app.controller('UserCreationCtrl', ['$scope', 'UsersFactory', '$location',
    function ($scope, UsersFactory, $location) {
        // callback for ng-click 'createNewUser':
        $scope.createNewUser = function () {
            UsersFactory.create($scope.user);
            $location.path('/user-list');
        };
    }]);
*/