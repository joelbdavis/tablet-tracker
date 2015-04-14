(function (angular) {
	"use strict";

	angular.module('app.home').controller('HomeCtrl', ['$scope', 'fbutil', 'user', '$firebaseObject', 'FBURL', function ($scope, fbutil, user, $firebaseObject, FBURL) {
		var HomeCtrl = this;

		HomeCtrl.syncedValue = $firebaseObject(fbutil.ref('syncedValue'));
		HomeCtrl.user = user;
		HomeCtrl.FBURL = FBURL;
	}]);
})(angular);

