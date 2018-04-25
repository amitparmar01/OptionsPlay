define(['jquery',
		'dataServices/socketConnection',
		'dataServices/dataServiceBase',
		'jquery-signalr'],
function ($, SocketConnection, DataServiceBase) {
	'use strict';

	function SignalrDataService(hubConfig, modelCtor, cacheExpiration, mappingOptions, updateBackground) {
		var hubName = hubConfig.HubName;
		var hubAction = hubConfig.HubAction;
		var hubEvents = hubConfig.HubEvents;
		var hubEventHandlers = hubConfig.HubEventHandlers;
		var updateEvent = hubConfig.UpdateEvent;

		var that = new DataServiceBase(hubName, modelCtor, cacheExpiration, mappingOptions, updateBackground);
		that.connection = new SocketConnection(hubName, hubEvents, hubEventHandlers);
		
		that.queriesInProggress = {};

		that.updateHandler = null;
		that.disconnected = true;
		
		that.updateDate = function (queryStringPart, queryData, cacheKey) {
			if (that.queriesInProggress.hasOwnProperty(cacheKey)) {
				return that.queriesInProggress[cacheKey];
			}

			if (typeof (queryStringPart) != 'undefined' && queryStringPart != '') {
				queryData = queryStringPart;
			}
			var resultHandler = that.getResultHandler(cacheKey);
			var result = that.connection.invokeAction(hubAction, queryData).then(resultHandler, that.errorHandler);
			that.queriesInProggress[cacheKey] = result;
			that.disconnected = false;

			function removeCachedDeffered() {
				delete that.queriesInProggress[cacheKey];
			}

			result.always(removeCachedDeffered);

			if (hubConfig.hasOwnProperty('UpdateEvent') && that.updateHandler == null) {
				that.updateHandler = hubConfig['UpdateHandler'] || resultHandler;
				that.connection.on(updateEvent, that.updateHandler);
			}

			return result;
		};

		that.connection.hubProxy.connection.disconnected(function () {
			that.disconnected = true;
		});

		that.generateCacheId = function (queryStringPart, queryData) {
			var key = hubName + '|' + hubAction + '|' + queryStringPart + JSON.stringify(queryData);
			return key;
		};

		return that;
	}

	return SignalrDataService;
});