define(['durandal/events'], function (Events) {
	/**
	 * Declare here application-wide events here.
	 */

	var appEvents = {
		SIGNED_IN: 'app:signed_in',
		SIGNED_OUT: 'app:signed_out',
        PACE_DONE: 'app:pace_done',
        ROUTE_ACTIVATING: "router:route:activating"
	};

	appEvents.Bottom = {
		IS_SHOWN: 'bottom:is_shown',
		INTRADAY_REFRESH: 'bottom:intraday_refresh',
		INTRADAY_REFRESHED: 'bottom:intraday_refreshed',
        HIST_ORDERS_TRADES_STRIKES: 'bottom:hist_orders_trades_strikes',
        INTRADAY_EXERCISES_REFRESH: 'bottom:intraday_exercises_refreshed'
	};

	appEvents.Portfolio = {
		REFRESH: 'portfolio:refresh',
		LOCK_UNLOCK_SHARES: 'portfolio:lockUnlock',
		HISTORICAL_INQUIRY: 'portfolio:historicalInquiry'
	};

	/**
	 * structure of prefill order parameter.
	 * {
	 * optionNumber: 100000075,
	 * optionName: '上汽集团购6月1200',
	 * orderType: '133', // Market order FOK by default
	 * orderQuantity: 1,
	 * isCovered: false,
	 * stockBiz: '400'
	 * }
	 */
	appEvents.OrderEntry = {
		PREFILL_ORDER: 'orderEntry:prefill_order',
		EXERCISE: 'orderEntry:exercise'
	};
	
	appEvents.Funnel = {
		GO_TO_BOTTOM: 'funnel:goToBottom',
		UL_CHANGED: 'funnel:underlyingChanged'
	};

	appEvents.Quotes = {
		CHANGE_DETAILS: 'quotes:detailsChanged'
	};

	appEvents.How = {
		TOGGLE_SENTIMENT: 'how: toggleSentiment'
	};

	Events.includeIn(appEvents);

	return appEvents;
});