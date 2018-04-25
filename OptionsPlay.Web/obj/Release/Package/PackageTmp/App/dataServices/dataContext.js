define(['jquery',
		'modules/context',
		'modules/configurations',
		'modules/strategyTemplates',
		'defaultModel',
		'dataServices/dataServiceBase',
		'dataServices/authenticationService',
		'dataServices/configurationService',
		'dataServices/signalrDataService',
		'optionChainsModel',
		'portfolioItemGroupModel',
		'portfolioItemModel',
		'standardDeviationModel',
		'predictionsModel',
		'models/intradayTradeModel',
		'models/intradayOrderModel',
		'models/historicalTradeModel',
		'models/historicalOrderModel',
        'models/historicalStrikeModel'],
function ($, context, configurations, strategyTemplates, DefaultModel, DataServiceBase, AuthenticationService, ConfigurationService, SignalrDataService, OptionChainsModel,
	PortfolioItemGroupModel, PortfolioItemModel, StandardDeviationModel, PredictionsModel, IntradayTradeModel, IntradayOrderModel, HistoricalTradeModel, HistoricalOrderModel, HistoricalStrikeModel) {
	'use strict';

	var apiConfig = {};

	apiConfig.Controllers = Object.freeze({
		ENTRY: 'api/',
		
		AUTO_EXERCISE: 'portfolio/autoExerciseData',
		LOCK_UNLOCK_SHARES: 'order/shares',
		CONFIGURATION: 'configuration',
		OPTION_CHAINS: 'optionChains',
		QUOTATION: 'quotation',
		STOCK_QUOTE_PER_MINUTE: 'marketdata/stockQuotesPerMinute',
		OPTIONABLES: 'optionables/quotes',
		PREDICTION: 'prediction',
		STDDEVS: 'prediction/stddevs',
		OPTION_BASIC: 'marketdata/optionBaisc',
		OPTION_TRADING_INFO: 'marketdata/getoptiontradinginfo',
		PORTFOLIO: 'portfolio',
		STRATEGIES: 'strategies',
		STRATEGYGROUPS: 'strategygroups',
		ORDER: 'order',
		INTRADAY_TRADES: 'order/intradayTrades',
		INTRADAY_ORDERS: 'order/intradayOrders',
		HISTORICAL_TRADES: 'order/historicalTrades',
		HISTORICAL_ORDERS: 'order/historicalOrders',
		HISTORICAL_STRIKES: 'order/historicalExerciseDetail',
		TRADING_STRATEGIES: 'suggestion/tradingStrategies',
		COVEREDCALL: 'suggestion/coveredCall',
		FUND: 'portfolio/fund',
		HISTORICALQUOTES: 'marketdata/historicalQuotes',
		SIGNALS: 'signals/supres',
		TECHNICALRANK: 'signals/technicalRank',
        SENTIMENTS: 'signals/sentiments',
		HISTORICALBANKTRANSFER: 'portfolio/fundTransferHistory',
		BANKCODE: 'portfolio/bankCode',
		BANKTRANSFER: 'portfolio/bankTransfer',
		INDEXVALUE: 'marketdata/getstockmarketindex',
	  	INTRADAY_EXERCISES: 'order/intradayExercises'
	});
	
	apiConfig.Hubs = Object.freeze({
		PORTFOLIO: {
			HubName: 'PortfolioHub',
			HubAction: 'subscribePortfolio',
			HubEvents: {
				UPDATE_PORTFOLIO: 'updatePortfolio'
			},
			UpdateEvent: 'updatePortfolio'
		},
		FUND: {
			HubName: 'PortfolioHub',
			HubAction: 'subscribeFund',
			HubEvents: {
				UPDATE_FUND: 'updateFund'
			},
			UpdateEvent: 'updateFund'
		},
		INTRADAY_ORDERS: {
			HubName: 'PortfolioHub',
			HubAction: 'subscribeIntradayOrders',
			HubEvents: {
				UPDATE_FUND: 'updateIntradayOrders'
			},
			UpdateEvent: 'updateIntradayOrders'
		},
		INTRADAY_TRADES: {
			HubName: 'PortfolioHub',
			HubAction: 'subscribeIntradayTrades',
			HubEvents: {
				UPDATE_FUND: 'updateIntradayTrades'
			},
			UpdateEvent: 'updateIntradayTrades'
		},
		OPTION_CHAINS: {
			HubName: 'MarketDataHub',
			HubAction: 'getOptionChains',
			HubEvents: {
				UPDATE_OPTION_CHAINS: 'updateOptionChains',
				UPDATE_OPTION_QUOTES: 'updateOptionQuotes'
			}
		},
		STOCK_QUOTE: {
			HubName: 'MarketDataHub',
			HubAction: 'getQuote',
			HubEvents: {
				UPDATE_QUOTES: 'updateQuote'
			}
		},
		OPTIONABLE_QUOTES: {
			HubName: 'MarketDataHub',
			HubAction: 'getOptionableQuotes',
			HubEvents: {
				UPDATE_QUOTES: 'updateOptionableQuotes'
			},
			UpdateEvent: 'updateOptionableQuotes'
		}
	});

	function getServicePrefix(controller) {
		return apiConfig.Controllers.ENTRY + controller + '/';
	}

	var COPY_ALL_MAPPING = { observe: [''] };
	var QUOTATION_MAPPING = {
		key: function (quote) {
			return ko.unwrap(quote.securityCode) || ko.unwrap(quote.optionNumber);
		},
		copy: [
			'stockExchange', 'tradeSector', 'securityCode', 'hasOptions',
			'securityName', 'securityClass', 'underlyingSecurityCode'
		]
	};
	var PORTFOLIO_MAPPING = {
		key: function (item) {
			return ko.unwrap(item.underlyingCode) + '|' + ko.unwrap(item.isStockGroup);
		},
		update: function (item) {
			if (item.target) {
				item.target.updateModel(item.data);
				return item.target;
			} else {
				return new PortfolioItemGroupModel(item.data);
			}
		},
		autoUpdate: true
	};
	var TRADE_MAPPING = {
		key: function (order) {
			return ko.unwrap(order.orderId) + ko.unwrap(order.matchedSerialNo);
		},
		update: function (item) {
			if (item.target) {
				item.target.updateModel(item.data);
				return item.target;
			} else {
				return new IntradayTradeModel(item.data);
			}
		},
		autoUpdate: true
	};
	var ORDER_MAPPING = {
		key: function (order) {
			return ko.unwrap(order.orderId);
		},
		update: function (item) {
			if (item.target) {
				item.target.updateModel(item.data);
				return item.target;
			} else {
				return new IntradayOrderModel(item.data);
			}
		},
		autoUpdate: true
	};

	var DataContext = function () {
		var self = this;

		var hubRefreshTime = 1;
		var alwaysExpired = 1;
		//console.log("Refresh duration = " + hubRefreshTime);
		this.authentication = new AuthenticationService();
		//this.optionChains = new DataServiceBase(getServicePrefix(apiConfig.Controllers.OPTION_CHAINS), OptionChainsModel, 15);
		this.optionTradingInfo = new DataServiceBase(getServicePrefix(apiConfig.Controllers.OPTION_TRADING_INFO),DefaultModel);
		this.optionChains = new SignalrDataService(apiConfig.Hubs.OPTION_CHAINS, OptionChainsModel, 3600*6);
		this.optionBasic = new DataServiceBase(getServicePrefix(apiConfig.Controllers.OPTION_BASIC), null, 3600*6);
		this.portfolio = new DataServiceBase(getServicePrefix(apiConfig.Controllers.PORTFOLIO), PortfolioItemGroupModel, 15, PORTFOLIO_MAPPING);
		// this.portfolio = new SignalrDataService(apiConfig.Hubs.PORTFOLIO, PortfolioItemGroupModel, hubRefreshTime*5, PORTFOLIO_MAPPING);
		this.autoExerciseData = new DataServiceBase(getServicePrefix(apiConfig.Controllers.AUTO_EXERCISE), DefaultModel);
		this.lockableUnlockableShares = new DataServiceBase(getServicePrefix(apiConfig.Controllers.LOCK_UNLOCK_SHARES), DefaultModel);
		// this.fund = new SignalrDataService(apiConfig.Hubs.FUND, DefaultModel, hubRefreshTime*10);
		this.fund = new DataServiceBase(getServicePrefix(apiConfig.Controllers.FUND), DefaultModel);
		this.strategies = new DataServiceBase(getServicePrefix(apiConfig.Controllers.STRATEGIES));
		this.strategyGroups = new DataServiceBase(getServicePrefix(apiConfig.Controllers.STRATEGYGROUPS));
		this.historicalQuotes = new DataServiceBase(getServicePrefix(apiConfig.Controllers.HISTORICALQUOTES));

		this.signals = new DataServiceBase(getServicePrefix(apiConfig.Controllers.SIGNALS));
		this.technicalRank = new DataServiceBase(getServicePrefix(apiConfig.Controllers.TECHNICALRANK));
		this.sentiments = new DataServiceBase(getServicePrefix(apiConfig.Controllers.SENTIMENTS));
		this.quotation = new SignalrDataService(apiConfig.Hubs.STOCK_QUOTE, DefaultModel, hubRefreshTime, QUOTATION_MAPPING);
		this.stockQuotePerMin = new DataServiceBase(getServicePrefix(apiConfig.Controllers.STOCK_QUOTE_PER_MINUTE), null, 60);
		this.stockQuotePerMin.ignoreArrayResults = true;
		this.indexValue = new DataServiceBase(getServicePrefix(apiConfig.Controllers.INDEXVALUE), null, 60);

		//this.optionables = new SignalrDataService(apiConfig.Hubs.OPTIONABLE_QUOTES, DefaultModel, 3600, QUOTATION_MAPPING);
		//this.optionables = new DataServiceBase(getServicePrefix(apiConfig.Controllers.OPTIONABLES), DefaultModel, 15, QUOTATION_MAPPING);
		this.order = new DataServiceBase(getServicePrefix(apiConfig.Controllers.ORDER), null, 15);
		// this.intradayTrades = new SignalrDataService(apiConfig.Hubs.INTRADAY_TRADES, IntradayTradeModel, hubRefreshTime*5, TRADE_MAPPING);
		// this.intradayOrders = new SignalrDataService(apiConfig.Hubs.INTRADAY_ORDERS, IntradayOrderModel, hubRefreshTime*5, ORDER_MAPPING);
		this.intradayTrades = new DataServiceBase(getServicePrefix(apiConfig.Controllers.INTRADAY_TRADES), IntradayTradeModel, 15, TRADE_MAPPING);
		this.intradayOrders = new DataServiceBase(getServicePrefix(apiConfig.Controllers.INTRADAY_ORDERS), IntradayOrderModel, 15, ORDER_MAPPING);
		this.intradayExercises = new DataServiceBase(getServicePrefix(apiConfig.Controllers.INTRADAY_EXERCISES), IntradayOrderModel, 15, ORDER_MAPPING);
		this.historicalTrades = new DataServiceBase(getServicePrefix(apiConfig.Controllers.HISTORICAL_TRADES), HistoricalTradeModel, 0);
		this.historicalOrders = new DataServiceBase(getServicePrefix(apiConfig.Controllers.HISTORICAL_ORDERS), HistoricalOrderModel, 0);
		this.historicalStrikes = new DataServiceBase(getServicePrefix(apiConfig.Controllers.HISTORICAL_STRIKES), HistoricalStrikeModel, 0);
		this.coveredCall = new DataServiceBase(getServicePrefix(apiConfig.Controllers.COVEREDCALL), null, 60, COPY_ALL_MAPPING);
		this.bankCode = new DataServiceBase(getServicePrefix(apiConfig.Controllers.BANKCODE), null, 60, COPY_ALL_MAPPING);
		this.fundTransferHistory = new DataServiceBase(getServicePrefix(apiConfig.Controllers.HISTORICALBANKTRANSFER), null);
		this.bankTransfer = new DataServiceBase(getServicePrefix(apiConfig.Controllers.BANKTRANSFER), null, 3600);
		this.configurations = new ConfigurationService();

		this.tradingStrategies = new DataServiceBase(getServicePrefix(apiConfig.Controllers.TRADING_STRATEGIES), null, 0, COPY_ALL_MAPPING);
		this.tradingStrategies.ignoreArrayResults = true;

		this.standardDeviations = new DataServiceBase(getServicePrefix(apiConfig.Controllers.STDDEVS), StandardDeviationModel, 3600);
		this.standardDeviations.ignoreArrayResults = true;

		this.predictions = new DataServiceBase(getServicePrefix(apiConfig.Controllers.PREDICTION), PredictionsModel, 3600);
		this.predictions.ignoreArrayResults = true;

		this.optionChains.connection.on(apiConfig.Hubs.OPTION_CHAINS.HubEvents.UPDATE_OPTION_QUOTES, function (data) {
		    //console.log((data && data.length) + ': ' + new Date());
		    console.log("Update Options Chain at " + new Date());
			if (data && data.length > 0) {
				var underlyings = {};
				data.forEach(function (option) {
					if (!underlyings.hasOwnProperty(option.securityCode)) {
						underlyings[option.securityCode] = true;
					}
				});
				for (var underlying in underlyings) {
					self.optionChains.get(underlying).done(function (optionChains) {
						optionChains.updateOptions(data);
					});
				}
			}
		});
		this.quotation.connection.on(apiConfig.Hubs.STOCK_QUOTE.HubEvents.UPDATE_QUOTES, function (data) {
		    console.log("Update Quotation at " + new Date());
			if (data && data.length > 0) {
				data.forEach(function (quote) {
					if (quote.securityCode) {
						var cacheKey = self.quotation.generateCacheId(quote.securityCode, {});
						self.quotation.getResultHandler(cacheKey)(quote);
					}
				});
			}
		});

		// todo: consider to move it out from here
		/**
		 * @returns promise with data prerequisites for the whole application. Used to defer application startup until this data is loaded
		 * If called multiple times multiple requests will be made.
		 */
		this.apllicationStartupDataPreload = function () {
			var result = $.Deferred();
			var optionablesDeferred = self.quotation.get();
			var configurationsDeffered = self.configurations.getClientConfiguration();
			var strategyTemplatesDeffered = self.strategies.get();
			$.when(optionablesDeferred, configurationsDeffered, strategyTemplatesDeffered).done(function (allQuotes, cfg, strategies) {
				context.optionables(ko.unwrap(allQuotes));
				configurations.updateConfiguration(ko.unwrap(cfg));
				strategyTemplates.setTempates(ko.unwrap(strategies));
				result.resolve();
			}).fail(function () {
				result.reject();
			});

			return result.promise();
		};
	};


	var dataContext = new DataContext();
	context.ulCode.subscribe(function (newVal) {
		dataContext.quotation.get(newVal).done(function (q) {
			context.quote(ko.unwrap(q));
		});
	});
	return dataContext;
});