(function (angular) {
	'use strict';

	angular.module('app')
	.run(['$rootScope', 'Auth', function ($rootScope, Auth) {
		// track status of authentication
		Auth.$onAuth(function (user) {
			$rootScope.loggedIn = !!user;
		});
	}])
	.constant('version', '1.0.0')

	// where to redirect users if they need to authenticate (see security.js)
	.constant('loginRedirectPath', '/login')

	// your Firebase data URL goes here, no trailing slash
	.constant('FBURL', 'https://blinding-heat-4445.firebaseio.com')
})(angular);
