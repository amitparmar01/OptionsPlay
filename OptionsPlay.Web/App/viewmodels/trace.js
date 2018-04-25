define(['jquery',
		'knockout',
		'dataServices/traceDataService'],
function ($, ko, traceConnection) {
	var trace = {};

	var FunctionState = {
		RUNNING: 'running',
		COMPLETED: 'completed',
		FAILED: 'failed'
	};

	// todo: introduce module with JS helpers
	function first(arr, test, ctx) {
		var result = null;
		arr.some(function (el, i) {
			return test.call(ctx, el, i, arr) ? ((result = el), true) : false;
		});
		return result;
	}

	function LibraryFunctionNotification(functionName) {
		var self = this;
		this.functionName = functionName;
		this.state = ko.observable(FunctionState.RUNNING);
		
		this.stateTranslation = ko.computed(function () {
			var state = self.state();
			switch (state) {
				case FunctionState.RUNNING:
					return 'trace.running';
				case FunctionState.COMPLETED:
					return 'trace.executionTime';
				case FunctionState.FAILED:
					return 'trace.executionFailed';
				default:
					return '';
			}
		});

		this.seconds = 0;
		this.milliseconds = 0;
	}

	trace.removeNotification = function (elem) {
		if (elem.nodeType === 1) {
			window.setTimeout(function () {
				$(elem).slideUp(500, function () {
					$(elem).remove();
				});
			}, 5000);
		}
	};
	
	trace.libraryFunctionsInProgress = ko.observableArray([]);

	traceConnection.on(traceConnection.TRACE_START, function (functionName) {
		var notification = new LibraryFunctionNotification(functionName);
		trace.libraryFunctionsInProgress.push(notification);
	});
	
	function setDuration(notification, duration) {
		notification.seconds = Math.floor(duration / 1000);
		notification.milliseconds = Math.ceil(duration - notification.seconds * 1000);
	}
	
	function handleNotificationCompletion(functionName, duration) {
		var notifications = trace.libraryFunctionsInProgress();
		var notificationMatch = first(notifications, function (el) {
			return el.functionName === functionName;
		});
		if (notificationMatch == null) {
			notificationMatch = new LibraryFunctionNotification(functionName);
			trace.libraryFunctionsInProgress.push(notificationMatch);
		}
		
		setDuration(notificationMatch, duration);
		
		window.setTimeout(function () {
			trace.libraryFunctionsInProgress.remove(notificationMatch);
		});

		return notificationMatch;
	}

	traceConnection.on(traceConnection.TRACE_RESULT, function (functionName, duration) {
		var notificationMatch = handleNotificationCompletion(functionName, duration);
		notificationMatch.state(FunctionState.COMPLETED);
	});
	
	traceConnection.on(traceConnection.TRACE_ERROR, function (functionName, error, duration) {
		var notificationMatch = handleNotificationCompletion(functionName, duration);
		notificationMatch.state(FunctionState.FAILED);
	});

	trace.activate = function () {
		return traceConnection.connect();
	};

	return trace;
});