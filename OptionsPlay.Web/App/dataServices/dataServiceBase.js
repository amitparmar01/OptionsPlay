define(['jquery',
		'knockout',
		'komapping',
		'modules/notifications',
		'cache',
		'modules/localizer'],
function ($, ko, mapping, notifications, cache,localizer) {
	'use strict';

	/**
	 * Base class for ALL data services. If you want extended functionality (like saving model) you can extend this class in separate service.
	 * @param prefix {string} API prefix for service. (e.g. /api/strategies/)
	 * @param modelCtor {function} model constructor. data and mapping options are passed by default
	 * @param mappingOptions {object} mapping options for knockout-mapping plugin. @see {@link http://knockoutjs.com/documentation/plugins-mapping.html} for details.
	 * @param cacheExpiration {number} cache expiration in seconds. -1 to disable cache. 0 or invalid numeric value - no cache expiration
	 */
	function DataService(prefix, modelCtor, cacheExpiration, mappingOptions) {
		var cacheInstance = cache();
		var self = this;
		var queriesInProggress = {};

		if (prefix.slice(-1) !== '/') {
			prefix = prefix + '/';
		}

		this.serviceApiPrefix = prefix;
		this.mappingOptions = mappingOptions;
		this.ModelConstructor = modelCtor;
		this.ignoreArrayResults = false;
		this.cacheExpiration = cacheExpiration;

		this.pullings = {};
		this.subscriptions = {};

		function pullLatest() {
			var defferedList = [];
			for (var cacheKey in self.subscriptions) {
				if (cacheInstance.expired(cacheKey) && self.getValueFromCache(cacheKey) != null) {
					if (!self.pullings[cacheKey]) {
						var args = self.subscriptions[cacheKey];
						self.pullings[cacheKey] = true;
						defferedList.push(self.get.apply(self, args).always(function () {
							self.pullings[cacheKey] = false;
						}));
					}
				}
			}
			$.when.apply(self, defferedList).always(function () {
				setTimeout(pullLatest, 2000);
			});
		}

		/**
		 * @param queryStringPartOrData {(string|object)} string is treated as query string part which should be added to full api path;
		 * object is treated as URL arguments.
		 * @param [...] if first argument is object then second argument should represent 'ignore cache' flag; 
		 * if first argument is string then second argument is query data and third argument is 'ignore cache' flag
		 */
		this.get = function (queryStringPartOrData /*, queryData, ignoreCache*/) {
			var queryStringPart;
			var queryData;
			var ignoreCache;

			if (queryStringPartOrData === undefined) {
				queryStringPartOrData = '';
			}

			if ($.isPlainObject(queryStringPartOrData)) {
				queryStringPart = '';
				queryData = queryStringPartOrData || {};
				ignoreCache = !!arguments[1]; // ensure variable is boolean.
			} else if (queryStringPartOrData == 'historicalQuery' && $.isArray(arguments[1])) {
			    queryStringPart = '';
			    arguments[1].forEach(function (arg) {
			        queryStringPart += arg + '/';
			    });
			    queryData = {};
			    ignoreCache = !!arguments[2];
			}
			else if (typeof (queryStringPartOrData) === 'string') {
			    queryStringPart = queryStringPartOrData;
			    queryData = arguments[1] || {};
			    ignoreCache = !!arguments[2];
			} else if ($.isArray(queryStringPartOrData)) {
			    queryStringPart = '';
			    queryData = queryStringPartOrData;
			    ignoreCache = !!arguments[1]; // ensure variable is boolean.
			} else {
			    throw 'Invalid arguments for "get" function';
			}

			var cacheKey = self.generateCacheId(queryStringPart, queryData);
			
			self.subscriptions[cacheKey] = arguments;

			var valueFromCache = self.getValueFromCache(cacheKey);

			if (ignoreCache || self.disconnected || cacheInstance.expired(cacheKey) || valueFromCache == null) {
				var result = self.updateDate(queryStringPart, queryData, cacheKey);
				if (ignoreCache || valueFromCache == null) {
					return result;
				}
			}

			var deferredResult = new $.Deferred();
			deferredResult.resolve(valueFromCache);
			return deferredResult.promise();
		};

		this.updateDate = function (queryStringPart, queryData, cacheKey) {
			if (queriesInProggress.hasOwnProperty(cacheKey)) {
				return queriesInProggress[cacheKey];
			}

			var result = $.get(self.serviceApiPrefix + queryStringPart, queryData)
				.then(self.getResultHandler(cacheKey), self.errorHandler);

			queriesInProggress[cacheKey] = result;

			function removeCachedDeffered() {
				delete queriesInProggress[cacheKey];
			}

			result.then(removeCachedDeffered, removeCachedDeffered);
			return result;
		};

		/**
		 * Posts data to the server. 
		 */
		this.post = function (path, data) {
			// todo: rethink cache policy
			// self.clearCache();
			return $.post(self.serviceApiPrefix + path, data).then(null, self.errorHandler);
		};

		/**
		 * @returns cached value if cache contains one, else null is returned
		 */
		this.getValueFromCache = function (cacheKey) {
			var result = cacheInstance.get(cacheKey);
			return result;
		};

		/**
		 * @returns a function which should be passed as ajax handler
		 */
		this.getResultHandler = function (cacheKey) {
			function resultHandler(result) {
				var model;
				var cachedModel = self.getValueFromCache(cacheKey);
				if (typeof(cacheKey) !== 'undefined') {
					if (!self.ignoreArrayResults && $.isArray(result)) {
						if (cachedModel == null) {
							model = result.map(function (item) {
								return self.createModel(item);
							});
							model = ko.observableArray(model);
						} else {
							if (!self.mappingOptions || !self.mappingOptions.autoUpdate) {
								result = result.map(function (item) {
									return self.createModel(item);
								});
							}
							model = mapping.fromJS(result, self.mappingOptions, cachedModel);
						}
					} else {
						if (cachedModel == null || typeof (cachedModel.updateModel) !== 'function') {
							model = self.createModel(result, cachedModel);
						} else {
							cachedModel.updateModel(result, cachedModel);
							model = cachedModel;
						}
					}
					self.storeModelInCache(cacheKey, model);
					return model;
				}
				return cachedModel;
			}
			return resultHandler;
		};

		this.storeModelInCache = function (cacheKey, result) {
			if (this.cacheExpiration < 0) {
				return;
			}
			cacheInstance.set(cacheKey, result, self.makeCacheExpiryDate());
		};

		this.makeCacheExpiryDate = function () {
			if (this.cacheExpiration == null || this.cacheExpiration === 0) {
				return undefined;
			}
			
			var date = new Date();

			if (this.cacheExpiration < 0) {
				// means ve should not use cache and value already expired
				date.setTime(date.getTime() - 1);
			} else {
				date.setTime(date.getTime() + 1000 * this.cacheExpiration);
			}
			return date;
		};

		this.createModel = function (data, modelInCache) {
			if (data == null || self.ModelConstructor == null) {
				return data;
			}
			return new self.ModelConstructor(data, self.mappingOptions, modelInCache);
		};

		this.errorHandler = function (response) {
			if(response.responseJSON){
				notifications.error(response.responseJSON.message);
			}else{
				notifications.error(localizer.localize("app.common.systemError"));	
			}
			return response;
		};

		this.clearCache = function (cacheKey) {
			if (cacheKey == null) {
				cacheInstance = cache();
			} else {
				cacheInstance.kill(cacheKey);
			}
		};

		this.generateCacheId = function (queryStringPart, queryData) {
			var key = self.serviceApiPrefix + queryStringPart;
			if (!queryData) {
				return key;
			}
			key += JSON.stringify(queryData);
			return key;
		};

		if (!isNaN(cacheExpiration) || cacheExpiration > 0) {
			pullLatest();
		}
	}

	return DataService;
});