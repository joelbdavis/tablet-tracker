(function (angular) {
	"use strict";

	angular.module('app.account').controller('AccountCtrl', ['Auth', 'fbutil', 'user', '$location', '$firebaseObject',
		function (Auth, fbutil, user, $location, $firebaseObject) {
			var AccountCtrl = this;

			var unbind;
			// create a 3-way binding with the user profile object in Firebase
			AccountCtrl.profile = $firebaseObject(fbutil.ref('users', user.uid));
			//profile.$bindTo(AccountCtrl, 'profile').then(function (ub) {
			//	unbind = ub;
			//});

			// expose logout function to scope
			AccountCtrl.logout = function () {
				if (unbind) {
					unbind();
				}
				AccountCtrl.profile.$destroy();
				Auth.$unauth();
				$location.path('/login');
			};

			AccountCtrl.changePassword = function (pass, confirm, newPass) {
				resetMessages();
				if (!pass || !confirm || !newPass) {
					AccountCtrl.err = 'Please fill in all password fields';
				}
				else if (newPass !== confirm) {
					AccountCtrl.err = 'New pass and confirm do not match';
				}
				else {
					Auth.$changePassword({email: AccountCtrl.profile.email, oldPassword: pass, newPassword: newPass})
						.then(function () {
							AccountCtrl.msg = 'Password changed';
						}, function (err) {
							AccountCtrl.err = err;
						})
				}
			};

			AccountCtrl.clear = resetMessages;

			AccountCtrl.changeEmail = function (pass, newEmail) {
				resetMessages();
				var oldEmail = AccountCtrl.profile.email;
				Auth.$changeEmail({oldEmail: oldEmail, newEmail: newEmail, password: pass})
					.then(function () {
						// store the new email address in the user's profile
						return fbutil.handler(function (done) {
							fbutil.ref('users', user.uid, 'email').set(newEmail, done);
						});
					})
					.then(function () {
						AccountCtrl.emailmsg = 'Email changed';
					}, function (err) {
						AccountCtrl.emailerr = err;
					});
			};

			function resetMessages() {
				AccountCtrl.err = null;
				AccountCtrl.msg = null;
				AccountCtrl.emailerr = null;
				AccountCtrl.emailmsg = null;
			}
		}
	]);

})(angular);