(function (angular) {
	"use strict";

	angular.module('app.login').config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/login', {
			controller: 'LoginCtrl',
			controllerAs: 'LoginCtrl',
			templateUrl: 'login/login.html'
		});
	}])
})(angular);
