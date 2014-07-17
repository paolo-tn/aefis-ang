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
     $scope.editMachine = function (machineId) {
    	 console.log('editing id:' + machineId);
         $location.path('/machine-detail/');
         $location.search({'id': machineId,'lang':$scope.lang,'schema': $scope.schema});
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
app.controller('MachineDetailCtrl', ['$scope', '$routeParams', 'MachineFactory', '$location', 
    function ($scope, $routeParams, MachineFactory, $location){
		
	    // callback for ng-click 'updateMachine':
	    $scope.updateMachine = function () {
	        MachineFactory.update($scope.machine);
	        $location.path('/machines-list');
	    };
	
	    // callback for ng-click 'cancel':
	    $scope.cancel = function () {
	        $location.path('/machines-list');
	        $location.search({'lang':$scope.lang,'schema': $scope.schema});
	    };
	    var params = $location.search();

	    
        $scope.machines = MachineFactory.query({id: params.id, schema:params.schema, lang:params.lang}, 
          function(){
        	console.log($scope.machine);
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