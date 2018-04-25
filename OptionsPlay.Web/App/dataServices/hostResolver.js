define('hostResolver', function () {
	var self = {};

	var host = null;

	self.host = (function () {
		if (host === null) {
			var http = location.protocol;
			var slashes = http.concat("//");
			var pathParts;

			host = slashes.concat(window.location.hostname);

			if (window.location.hostname === 'localhost') {
				pathParts = window.location.pathname.split('/');
				if (pathParts.length > 2) {
					host = host + '/' + pathParts[1];
				}
			} else {
				// note: if deployment is not like "Http://domain.com/OptionsPlay/", this branch should be comment out
				pathParts = window.location.pathname.split('/');
				if (pathParts.length > 2) {
					host = host + '/' + pathParts[1];
				}
			}
		}

		return host;
	}());

	self.buildUrl = function (urlPart) {
		var result = self.host + '/' + urlPart;
		return result;
	};

	return self;
});