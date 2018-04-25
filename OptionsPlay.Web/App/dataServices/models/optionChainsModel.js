define(['komapping',
		'modules/formatting'],
function (mapping, formatting) {
	'use strict';
	function OptionChainModel(data, unusedOption, modelInCache) {
		var EXPIRY_KEY_FORMAT = 'yyyyMMdd';
		var self = this;
		var optionPropertiesToObserve = [
			'bid', 'bidVolume', 'ask', 'askVolume', 'volume',
			'bid2', 'bidVolume2', 'ask2', 'askVolume2',
			'bid3', 'bidVolume3', 'ask3', 'askVolume3',
			'bid4', 'bidVolume4', 'ask4', 'askVolume4',
			'bid5', 'bidVolume5', 'ask5', 'askVolume5',
			'greeks.gamma', 'greeks.delta', 'greeks.vega',
			'greeks.theta', 'greeks.rho', 'greeks.sigma',
			'greeks.rhoFx', 'change', 'changePercentage',
			'uncoveredPositionQuantity', 'auctionReferencePrice',
			'auctionReferenceQuantity', 'highestPrice',
			'lowestPrice', 'latestTradedPrice', 'previousClose',
			'turnover', 'openingPrice', 'previousSettlementPrice'];
		var propertiesToObserve = optionPropertiesToObserve.map(function (property) {
			return 'callOption.' + property;
		}).concat(optionPropertiesToObserve.map(function (property) {
			return 'putOption.' + property;
		}));

		this.rows = [];
		this.allRows = [];
		this.expiryStrikes = {};
		this.optionsDictionary = {};
		this.defaultMultiplier = 1000;
		this.flattenOptions = {};
		this.multipliers = [];
		this.multipleChains = {};
		this.hasMultiOptionUnit = false;
		this.expirySelectOptions = [];

		function createKey(strike, expiry) {
			if (typeof(expiry) !== 'string') {
				expiry = formatting.formatDate(expiry, EXPIRY_KEY_FORMAT);
			}
			var result = strike + '|' + expiry;
			return result;
		}

		this.updateOptions = function (options) {
			options.forEach(function (option, i) {
				if (self.flattenOptions.hasOwnProperty(option.optionNumber)) {
					mapping.fromJS(option, { 'ignore': ['openInterest', 'optionCode'] }, self.flattenOptions[option.optionNumber]);
				}
			});
		};

		this.updateModel = function (newData, optionChains) {

			if (self.rows.length > 0 || (typeof optionChains !== 'undefined' && optionChains)) {
				optionChains = optionChains || self;
				newData.chains.forEach(function (row) {
					mapping.fromJS(row, {
						observe: propertiesToObserve
					}, optionChains.flattenOptions[row.optionNumber]);
				});
				return optionChains;
			}

			self.strikePrices = newData.strikePrices;
			self.expirationDates = newData.expirationDates.map(function (expiration) {
				var date = new Date(expiration.date + formatting.CHINA_TIME_ZONE);
				return {
					date: date,
					noOfDaysToExpiry: Math.floor(expiration.totalNumberOfDaysUntilExpiry),
					daysToExpiry: expiration.totalNumberOfDaysUntilExpiry,
					expiryKey: formatting.formatDate(date, EXPIRY_KEY_FORMAT)
				};
			});

			self.expiryStrikes = {};
			self.expirySelectOptions = self.expirationDates.map(function (ex) {
				return {
				    date: ex.date,
				    expiryStr: formatting.formatDate(ex.date, 'yyyy-MM-dd'),
					dateOnSelector: formatting.formatDate(ex.date, 'MMM dd yyyy') + ' (' + formatting.daysFromNow(ex.date) + ')'
				};
			});

			var multipliers = {};
			var multipliersRaw = {};
			var multiOptionUnit = false;
			var tempFirst = true;

			for (var i = 0; i < newData.chains.length; i++) {

				var row = newData.chains[i];
				if (!multipliers.hasOwnProperty(row.premiumMultiplier)) {
					multipliers[row.premiumMultiplier] = [];
					multipliersRaw[row.premiumMultiplier] = [];
					if (tempFirst) {
						tempFirst = !tempFirst;
					} else {
						multiOptionUnit = true;
					}
				}

				var model = mapping.fromJS(row, {
					observe: propertiesToObserve
				});

				model.noOfDaysToExpiry = model.expiry.totalNumberOfDaysUntilExpiry;
				model.expiryDate = new Date(model.expiry.date + formatting.CHINA_TIME_ZONE);
				var expiryKey = model.expiryKey = formatting.formatDate(model.expiryDate, EXPIRY_KEY_FORMAT);
				var strike = model.strikePrice;

				self.optionsDictionary[createKey(strike, model.expiryKey)] = model;
				self.flattenOptions[model.callOption.optionNumber] = model.callOption;
				self.flattenOptions[model.putOption.optionNumber] = model.putOption;

				self.defaultMultiplier = model.premiumMultiplier % 1000 ? self.defaultMultiplier : model.premiumMultiplier;

				if (!(model.premiumMultiplier % 1000)) {
					if (!self.expiryStrikes.hasOwnProperty(expiryKey)) {
						self.expiryStrikes[expiryKey] = [];
					}
					if (self.expiryStrikes[expiryKey].indexOf(strike) < 0) {
						self.expiryStrikes[expiryKey].push(strike);
					}
					self.rows.push(model);
				}
				self.allRows.push(model);
				multipliers[row.premiumMultiplier].push(model);
				multipliersRaw[row.premiumMultiplier].push(row);
			}

			if (multiOptionUnit) {
				self.hasMultiOptionUnit = true;
				$.each(multipliersRaw, function (multi, chains) {
					self.multipliers.push(parseInt(multi));
					self.multipleChains[multi] = new OptionChainModel({
						chains: chains,
						strikePrices: newData.strikePrices,
						expirationDates: newData.expirationDates
					});
					self.multipleChains[multi].rows = multipliers[multi];
				});
			} else {
				self.multipliers.push(self.defaultMultiplier);
			}

			return self;
		};

		this.findOption = function (optionNumber) {
			return self.flattenOptions[optionNumber];
		};

		this.findRow = function (idOrStrike, expiryDate) {
			var id;
			var strikePrice;
			var result = null;
			if (arguments.length == 1) {
				id = idOrStrike;
				self.rows.some(function (row) {
					if (row.callOption.optionNumber == id || row.putOption.optionNumber == id) {
						result = row;
						return true;
					}
					return false;
				});
				if (self.multipliers.length > 1 && result === null) {
					for (var multi in self.multipleChains) {
						result = self.multipleChains[multi].findRow(id) || result;
					}
				}
			} else {
				strikePrice = idOrStrike;
				//strikePrice = self.findStrike(strikePrice, expiryDate, 0);
				result = self.optionsDictionary[createKey(strikePrice, expiryDate)];
			}
			return result;
		};

		this.findStrike = function (price, date, level) {
			var expiry = self.findExpiry(date, 0, 0);
			var strikes = self.expiryStrikes[expiry.expiryKey];
			var i = 0;
			for (; i < strikes.length; i++) {
				var k = strikes[i];
				if (price <= k) {
					break;
				}
			}
			level = level ? level : 0;
			if (i + level < 0) {
				return strikes[0];
			} else if (i + level < strikes.length) {
				return strikes[i + level];
			}
			return strikes[strikes.length - 1];
		};

		this.findExpiry = function (date, level, distance) {
			distance = distance || 0;
			level = level || 1;
			var exList = self.expirationDates;
			var i = 0;
			for (; i < exList.length; i++) {
				if ((exList[i].date.valueOf() - date.valueOf()) > (distance - 1) * 24 * 3600000) {
					break;
				}
			}
			var idx = i + level - 1;
			if (idx < 0) {
				return exList[0];
			} else if (idx >= exList.length) {
				return exList[exList.length - 1];
			}
			return exList[i + level - 1];
		};

		this.strikeListExpiry = function (expiry) {
			if (typeof (expiry) !== 'string') {
				expiry = formatting.formatDate(expiry, EXPIRY_KEY_FORMAT);
			}
			var strikes = self.expiryStrikes[expiry];
			return strikes;
		};

		this.impliedVolatility = function impliedVolatility(date) {
			date = self.findExpiry(date, 0, 0);
			date = date && date.date;
			var k0 = self.findStrike(self.last, date, -1),
				k1 = self.findStrike(self.last, date, 1);
			var row0 = self.findRow(k0, date),
				row1 = self.findRow(k1, date);
			var vol = (row0.putOption.greeks.sigma() + row1.callOption.greeks.sigma()) / 2 * 100;
			return formatting.roundNumber(vol);
		};

		return this.updateModel(data, modelInCache);
	}

	return OptionChainModel;
});