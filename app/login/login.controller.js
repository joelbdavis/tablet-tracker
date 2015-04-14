(function (angular) {
	"use strict";

	angular.module('app.login').controller('LoginCtrl', ['Login', function (Login) {
		var LoginCtrl = this;

		LoginCtrl.email = null;
		LoginCtrl.pass = null;
		LoginCtrl.confirm = null;

		Object.defineProperty(LoginCtrl, 'createMode', {
			get: function() {
				return Login.createMode;
			},
			set: function(val) {
				Login.createMode = val;
			}
		});

		Object.defineProperty(LoginCtrl, 'err', {
			get: function () {
				return Login.err;
			},
			set: function (val) {
				Login.err = val;
			}
		});

		LoginCtrl.login = function () {
			Login.login(LoginCtrl.email, LoginCtrl.pass);
		};

		LoginCtrl.createAccount = function () {
			Login.createAccount(LoginCtrl.email, LoginCtrl.pass, LoginCtrl.confirm);
		};

		activate();

		function activate() {
			LoginCtrl.createMode = false;
		}

	}]);
})(angular);
