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

        //var aUser =[{'firstName':'pipppo', 'lastName':'pluto'}, {firstName:'paolino', lastName:'paperino'}];
        //$scope.users = aUser;
        //$scope.bla = 'hi again I am the new controller';
        //callback for list
        $scope.users = UsersFactory.query(function(){
        	//console.log('all users -');
        	//console.log($scope.users);
        });
      
       
    }]);

/*
 * controller per la visualizzazione della lista di macchine di un'azienda
 * */
app.controller('MachinesListCtrl',['$scope', 'MachinesFactory',  '$location',
  function($scope, MachinesFactory,  $location){
	 $scope.machines = MachinesFactory.query(function(){
		 //callback per la visualizzazione immediata
     });
	  // callback per ng-click 'editMachine'
	 //usa location per il redirect alla vista di dettaglio
     $scope.editMachine = function (machineId) {
         $location.path('/machine-detail/' + machineId);
     };

     // callback per ng-click 'deleteMachine':
     // cancella la macchina e fa il redirect sulla lista
     $scope.deleteMachine = function (machineId) {
    	 //TODO
    	 //MachinesFactory.delete({ id: machineId });
         $scope.users = MachinesFactory.query(function(){});
     };

     // callback for ng-click 'createMachine':
     $scope.createMachine = function () {
         $location.path('/machine-creation');
     };
	 
}]);

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

app.controller('UserCreationCtrl', ['$scope', 'UsersFactory', '$location',
    function ($scope, UsersFactory, $location) {

        // callback for ng-click 'createNewUser':
        $scope.createNewUser = function () {
            UsersFactory.create($scope.user);
            $location.path('/user-list');
        };
    }]);
