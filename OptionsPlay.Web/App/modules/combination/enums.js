define(function () {

	var freeze = Object.freeze || function (o) {
		return o;
	};

	var enums = {
		BUY: 'BUY',
		SELL: 'SELL',
		CALL: 'CALL',
		PUT: 'PUT',
		COVERED: 'COVERED',
		SECURITY: 'SECURITY',
		BULLISH: 'bullish',
		BEARISH: 'bearish'
	};

	enums.Sentiment = freeze({
		BULLISH: 'Bullish',
		BEARISH: 'Bearish'
	});

	enums.StockTwitsSentiment = freeze({
		BULLISH: 'Bullish',
		BEARISH: 'Bearish',
		NEUTRAL: 'Neutral',
	});

	enums.BuyOrSell = freeze({
		BUY: 'BUY',
		SELL: 'SELL'
	});

	enums.LegType = freeze({
		CALL: 'CALL',
		PUT: 'PUT',
		SECURITY: 'SECURITY',
		SEC: 'SEC'
	});

	enums.PhpType = freeze({
		TRADEIDEAS: 'tradeIdeas',
		PORTFOLIO: 'portfolio',
		DEFAULT: 'tradeIdeas' // TRADEIDEAS
	});

	enums.PhpWhatState = freeze({
		WATCH_LISTS: 'watchLists',
		SHARE: 'share',
		DEFAULT: 'default'
	});

	enums.PhpHubEvents = freeze({
		QUOTES: 'Quotes',
		SYRAH_SENTIMENT: 'SyrahSentiment',
		LATEST_HISTORICAL_DATA: 'LatestHistoricalData',
		MARKET_WORK_TIME: 'MarketWorkTime',
		MARKET_INDEX_SENTIMENT: 'MarketIndexSentiment',
	});

	enums.Roles = freeze({
		ADMIN: 'Admin'
	});

	enums.Permissions = freeze({
		NOT_AUTHENTICATED: 'NotAuthenticated',
		USE_REAL_TIME_QUOTES: 'UseRealTimeQuotes',
		VIEW_USER_ACTIVITIES: 'ViewUserActivities',
		MANAGE_PROMO_CODES: 'ManagePromoCodes',
		MANAGE_DISCOUNTS: 'ManageDiscounts',
		MANAGE_SUBSCRIPTIONS: 'ManageSubscriptions',
		EDIT_USERS: 'EditUsers',
		MANAGE_API_KEYS: 'ManageApiKeys',
		VIEW_POWERHOUSE_OPP: 'ViewPowerhouseOPP',
		VIEW_POWERHOUSE_OPI: 'ViewPowerhouseOPI',
		VIEW_POWERHOUSE_PRO_COMMON: 'ViewPowerhouseProCommon',
		WORK_WITH_POWERHOUSE_PRO_CORE: 'WorkWithPowerhouseProCore',
		MANAGE_PROFILE: 'ManageProfile',
		MANAGE_PROFILE_SUBSCRIPTIONS: 'ManageProfileSubscriptions',
		MANAGE_PAYMENT_TRANSACTIONS: 'ManagePaymentTransactions',
		ALLOW_SHARING: 'AllowSharing'
	});

	enums.ErrorCodes = freeze({
		ALREADY_AUTHENTICATED: 1070001,
	});

	enums.BillingModel = freeze({
		MONTHLY: 'Monthly',
		ANNUAL: 'Annual'
	});

	enums.SharingType = freeze({
		TWITTER: "Twitter",
		STOCKTWITS: "StockTwits",
		EMAIL: "Email",
		EMAIL_CLIENT: "EmailClient",
		COPY: "Clipboard",
	});

	enums.SubscriptionStatus = freeze({
		ACTIVE_TRIAL: 'ActiveTrial',
		ACTIVE: 'Active',
		EXPIRED: 'Expired',
		NO_SUBSCRIPTIONS: 'NoSubscriptions',
		NO_APPLIED_SUBSCRIPTIONS: 'NoAppliedSubscriptions',
		EXPIRED_TRIAL: 'ExpiredTrial',
		ACTIVE_CANCELED: 'ActiveCanceled'
	});

	enums.KeyboardCodes = freeze({
		ENTER: 13,
		SLASH: 47
	});

	enums.Quadrant = freeze({
		TOP_LEFT: 'top-left',
		TOP_RIGHT: 'top-right',
		BOTTOM_RIGHT: 'bottom-right',
		BOTTOM_LEFT: 'bottom-left'
	});

	enums.PriceOptions = freeze({
		BID_ASK: 'Bid/Ask',
		MID: 'Mid'
	});


	return freeze(enums);
});