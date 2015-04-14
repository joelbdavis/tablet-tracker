(function (angular) {
	"use strict";

	angular.module('app.home').config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/home', {
			templateUrl: 'home/home.html',
			controller: 'HomeCtrl',
			controllerAs: 'HomeCtrl',
			resolve: {
				// forces the page to wait for this promise to resolve before controller is loaded
				// the controller can then inject `user` as a dependency. This could also be done
				// in the controller, but this makes things cleaner (controller doesn't need to worry
				// about auth status or timing of accessing data or displaying elements)
				user: ['Auth', function (Auth) {
					return Auth.$waitForAuth();
				}]
			}
		});
	}]);
})(angular);
