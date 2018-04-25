define(['jquery',
		'dataServices/socketConnection'],
function ($, SocketConnection) {
	'use strict';

	var traceEvents = {
		TRACE_START: 'traceStart',
		TRACE_RESULT: 'traceResult',
		TRACE_ERROR: 'traceError',
	};

	var connection = new SocketConnection('SZKingdomTraceHub', traceEvents);

	return connection;
});