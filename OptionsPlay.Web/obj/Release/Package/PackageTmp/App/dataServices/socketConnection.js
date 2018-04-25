define(['jquery',
		'hostResolver',
		'durandal/events',
		'jquery-signalr'],
function ($, hostResolver, Events) {
	'use strict';

	var socketConnectionMap = {};

	function SocketConnection(hubName, hubEvents, hubEventHandlers) {

		if (typeof (socketConnectionMap[hubName]) != 'undefined') {
			var instance = socketConnectionMap[hubName];
			$.extend(instance, hubEvents);
			instance.connectHubEvents(hubEvents);
			instance.initHubEventHandlers(hubEventHandlers);
			return instance;
		} else {
			socketConnectionMap[hubName] = this;
		}

		if (hubEvents != null) {
			$.extend(this, hubEvents);
		}
		Events.includeIn(this);

		var self = this;
		var connectionStart = $.Deferred();
		var connection = $.hubConnection(hostResolver.host + '/signalr', { useDefaultPath: false });
		self.isConnected = false;

		connection.disconnected(function () {
			// if it was connected previously, we need to recreate deferred for future calls to hub
			if (self.isConnected) {
				connectionStart = $.Deferred();
				self.isConnected = false;
			}
			console.log(hubName + ' connection disconnected ' + connection.id);
			// Restart connection after 10 seconds.
			setTimeout(self.connect, 10000); 
		});

		this.connect = function () {
			if (self.isConnected) {
				return connectionStart;
			}

            // Enable SignalR logging feature
			//connection.logging = true;
			connection.start().fail(function (err) {
				console.log(hubName + ' connection failed');
				connectionStart.fail(err);
			}).done(function () {
				self.isConnected = true;
				console.log(hubName + ' connected ' + connection.id);
				connectionStart.resolve();
			});
			return connectionStart.promise();
		};
		
		this.getEventProxy = function(eventName) {
			var result = function () {
				// converting arguments array to Array object
				var argsArray = Array.prototype.slice.call(arguments, 0);
				argsArray.unshift(eventName);
				//console.log(hubName + ' on ' + eventName);
				//console.log(argsArray);
				self.trigger.apply(self, argsArray);
			};

			return result;
		}
		
		this.connectHubEvents = function(events) {
			for (var eventPropertyName in events) {
				if (!events.hasOwnProperty(eventPropertyName)) {
					continue;
				}

				var eventName = events[eventPropertyName];
				self.hubProxy.on(eventName, self.getEventProxy(eventName));
			}
		}

		this.initHubEventHandlers = function(eventHandlers) {
			for (var eventPropertyName in eventHandlers) {
				if (!self.hasOwnProperty(eventPropertyName)
					|| !eventHandlers.hasOwnProperty(eventPropertyName)) {
					continue;
				}

				var eventName = self[eventPropertyName];
				self.hubProxy.on(eventName, eventHandlers[eventPropertyName]);
			}
		}

		this.hubProxy = connection.createHubProxy(hubName);

		this.invokeAction = function (hubAction, queryData) {
			var executedAction = $.Deferred();

			this.connect().then(function () {
				var args = [hubAction];
				if ($.isArray(queryData)) {
					$.merge(args, queryData);
				} else {
					if (!$.isPlainObject(queryData)) {
						args.push(queryData);
					}
				}
				self.hubProxy.invoke.apply(self.hubProxy, args).then(function (data) {
					executedAction.resolve(data);
				}).fail(function (er) {
					console.log('Request to hub: ' + hubName + ' action: ' + hubAction + ' failed');
					console.log(er);
					executedAction.reject(er);
				});
			});
			
			return executedAction.promise();
		};

		this.connectHubEvents(hubEvents);
		this.initHubEventHandlers(hubEventHandlers);
		return this;
	}

	return SocketConnection;
});