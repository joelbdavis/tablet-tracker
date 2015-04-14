(function (angular) {
	"use strict";

	angular.module('app.login').service('Login', ['$rootScope', 'Auth', '$location', 'fbutil', function ($rootScope, Auth, $location, fbutil) {
		var Login = this;

		Login.login = function (email, pass) {
			Login.err = null;
			Auth.$authWithPassword({email: email, password: pass}, {rememberMe: true})
				.then(function (/* user */) {
					$location.path('/account');
				}, function (err) {
					Login.err = errMessage(err);
				});
		};

		Login.createAccount = function (email, pass, confirm) {
			Login.createMode = true;
			Login.err = null;

			if (assertValidAccountProps(email, pass, confirm)) {
				// create user credentials in Firebase auth system
				Auth.$createUser({email: email, password: pass})
					.then(function () {
						// authenticate so we have permission to write to Firebase
						return Auth.$authWithPassword({email: email, password: pass});
					})
					.then(function (user) {
						// create a user profile in our data store
						var ref = fbutil.ref('users', user.uid);
						return fbutil.handler(function (cb) {
							ref.set({email: email, name: name || firstPartOfEmail(email)}, cb);
						});
					})
					.then(function (/* user */) {
						// redirect to the account page
						$location.path('/account');
					}, function (err) {
						Login.err = errMessage(err);
					});
			}
		};

		function assertValidAccountProps(email, pass, confirm) {
			if (!email) {
				Login.err = 'Please enter an email address';
			}
			else if (!pass || !confirm) {
				Login.err = 'Please enter a password';
			}
			else if (Login.createMode && pass !== confirm) {
				Login.err = 'Passwords do not match';
			}
			return !Login.err;
		}

		function errMessage(err) {
			return angular.isObject(err) && err.code ? err.code : err + '';
		}

		function firstPartOfEmail(email) {
			return ucfirst(email.substr(0, email.indexOf('@')) || '');
		}

		function ucfirst(str) {
			// inspired by: http://kevin.vanzonneveld.net
			str += '';
			var f = str.charAt(0).toUpperCase();
			return f + str.substr(1);
		}

	}]);
})(angular);