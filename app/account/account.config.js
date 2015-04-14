(function (angular) {
	"use strict";

	angular.module('app.account').config(['$routeProvider', function ($routeProvider) {
		// require user to be authenticated before they can access this page
		// this is handled by the .whenAuthenticated method declared in
		// components/router/router.js
		$routeProvider.whenAuthenticated('/account', {
			templateUrl: 'account/account.html',
			controller: 'AccountCtrl',
			controllerAs: 'AccountCtrl'
		})
	}]);
})(angular);