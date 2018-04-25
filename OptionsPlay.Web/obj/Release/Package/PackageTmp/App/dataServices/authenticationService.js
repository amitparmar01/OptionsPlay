define(['jquery',
		'knockout',
		'events',
		'modules/session',
		'modules/notifications',
		'dataServices/dataServiceBase'], 
function ($, ko, events, session, notifications, DataServiceBase) {
	function AuthenticationService() {
		var self = this;
		DataServiceBase.call(self, 'api/authentication');

		this.signIn = function (signInModel) {
			var deferredResult = self.post('signIn', signInModel)
				.then(function (securityModel) {
					session.setSecurityModel(securityModel);
					events.trigger(events.SIGNED_IN, securityModel);
					return securityModel;
				}).fail(function () {
					session.setSecurityModel(null);
				});
			return deferredResult;
		};

		this.signOut = function () {
			var deferredResult = self.post('logOut')
				.then(function (result) {
					session.setSecurityModel(null);
					events.trigger(events.SIGNED_OUT, result);
					return result;
				});
			return deferredResult;
		};

		this.getSecurityModel = function () {
			return self.get('securityModel').then(function (securityModel) {
				session.setSecurityModel(securityModel);
				return securityModel;
			});
		};
	}

	return AuthenticationService;
});