'use strict';

// Declare app level module which depends on filters, and services
angular.module('ngdemo', ['ngdemo.filters', 'ngdemo.services', 'ngdemo.directives', 'ngdemo.controllers']).
    config(['$routeProvider', function ($routeProvider) {      
        $routeProvider.when('/user-list', {templateUrl: 'partials/user-list.html', controller: 'UserListCtrl'});
        $routeProvider.when('/machine-detail/', {templateUrl: 'partials/machine-detail.html', controller: 'MachineDetailCtrl'});
        $routeProvider.when('/machine-creation', {templateUrl: 'partials/machine-creation.html', controller: 'MachineCreationCtrl'});
        $routeProvider.when('/machines-list', {templateUrl: 'partials/machines-list.html', controller: 'MachinesListCtrl'});
        $routeProvider.otherwise({redirectTo: '/machines-list'});
    }]);
