'use strict'

/* weather controller function */

var weatherApp = angular.module('weatherApp', []);

weatherApp.controller('weatherController', ['$scope', '$http', function($scope, $http) {
	$http.get('http://api.openweathermap.org/data/2.5/weather?q=Virginia%20Beach,VA').success(function(data) {
		$scope.reports = data;
		
	});
}]);
	



