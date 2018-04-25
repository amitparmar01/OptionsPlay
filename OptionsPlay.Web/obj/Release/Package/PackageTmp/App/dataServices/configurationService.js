define(['jquery',
		'knockout',
		'dataServices/dataServiceBase'], 
function ($, ko, DataServiceBase) {
	function ConfigurationService() {
		var self = this;
		DataServiceBase.call(self, 'api/configurations');

		self.getClientConfiguration = function () {
			var deferredResult = self.get('clientConfiguration');
			return deferredResult;
		};

		// todo: implement methods for configurations admin UI
	}

	return ConfigurationService;
});