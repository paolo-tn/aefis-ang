'use strict';

/* Filters */

angular.module('ngdemo.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);
//
//var f = angular.module('aefis.filterDriveCode, []');
//f.filter('filterSizeType', function(){
//	return function(input, id){
//	  var i=0, len=input.length;
//	  for (; i<len; i++) {
//	    if (+input[i].id == +id) {
//	        return input[i];
//	      }
//	    }
//	    return null;
//		
//	}
//});
