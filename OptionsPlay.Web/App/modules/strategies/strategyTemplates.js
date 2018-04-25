define(['knockout',
		'modules/enums'],
function (ko, Enums) {

	var DEFAULT_MULTIPLIER = 1000;

	var StrategyTemplates = function () {
		var self = this;
		
		this.sentiments = ['Bullish', 'Bearish', 'Neutral', 'Sharp-Move', 'All Strategies'];

		this.strategyTemplates = ko.observableArray([]);
		this.templateMap = this.strategyMapping = {};

		function eigenvalue(strategy) {
			var legs = strategy.legs;
			legs.sort(function (a, b) {
				if (a.legType.toUpperCase() == Enums.SECURITY) {
					return -1;
				}
				if (b.legType.toUpperCase() == Enums.SECURITY) {
					return 1;
				}

				var result = a.strike - b.strike;
				if (!result) {
					result = a.expiry - b.expiry;
				}
				if (!result) {
					result = a.legType.toUpperCase() == Enums.CALL ? -1 : 1;
				}

				return result;
			});
			var value = '';
			for (var i = 0; i < legs.length; i++) {
				var leg = legs[i],
					preLeg = legs[i - 1],
					qty = leg.buyOrSell.toUpperCase() == Enums.BUY ?
						leg.quantity
						: -leg.quantity;
				var preQty = 1;
				if (preLeg) {
					preQty = preLeg.buyOrSell.toUpperCase() == Enums.BUY ?
						preLeg.quantity
						: -preLeg.quantity;
					if (preLeg.legType.toUpperCase() == Enums.SECURITY) {
						preQty = preQty / DEFAULT_MULTIPLIER;
					}
				}
				if (leg.legType.toUpperCase() == Enums.SECURITY) {
					qty = qty / DEFAULT_MULTIPLIER;
				}
				value += ((preLeg ? qty / preQty : (qty > 0 ? 1 : -1)) * 100).toFixed(0);
				value += ((!preLeg || preLeg.legType.toUpperCase() == Enums.SECURITY) ?
					2
					: (preLeg.expiry == leg.expiry ?
						0 :
						(preLeg.expiry < leg.expiry ? -1 : 1)));
				value += ((!preLeg || preLeg.legType.toUpperCase() == Enums.SECURITY) ?
					2
					: (leg.strike == preLeg.strike ? 0 : 1));
				value += (leg.legType.toUpperCase() == Enums.SECURITY ? 0 : (leg.legType.toUpperCase() == Enums.CALL ? 1 : 2));
				value += '|';
			}
			;

			return value;
		}

		function buildTemplateMap(strategyTemplates) {
			var mapping = {};
			for (var i = 0; i < strategyTemplates.length; i++) {
				var sellTemp = { legs: [] }, temp = strategyTemplates[i];
				var value = eigenvalue(temp);
				// warn duplicated tempateMapping
				if (mapping[value]) {
					console.log('Buy');
					console.log(temp);
					console.log(mapping[value]);
				}
				var name = 'Long ' + temp.name;
				self.strategyMapping[value] = { template: temp, buyOrSell: 'Buy', longOrShort: 'Long', displayedName: name, iconName: name.replace(/ /g, '') };
				self.nameStrategyMap[name] = self.strategyMapping[value];
				mapping[value] = { template: temp, buyOrSell: Enums.BUY };
				temp.buyEigenvalue = value;

				$.each(temp.legs, function (i, leg) {
					sellTemp.legs.push({
						buyOrSell: leg.buyOrSell == 'Sell' ? 'Buy' : 'Sell',
						quantity: leg.quantity,
						strike: leg.strike,
						expiry: leg.expiry,
						legType: leg.legType
					});
				});
				value = eigenvalue(sellTemp);
				if (mapping[value]) {
					console.log('Sell');
					console.log(temp);
					console.log(mapping[value]);
				}
				name = 'Short ' + temp.name;
				self.strategyMapping[value] = { template: temp, buyOrSell: 'Sell', longOrShort: 'Short', displayedName: name, iconName: name.replace(/ /g, '') };
				self.nameStrategyMap[name] = self.strategyMapping[value];
				mapping[value] = { template: temp, buyOrSell: Enums.SELL };
				temp.sellEigenvalue = value;
			}
			return mapping;
		}

		this.initialize = function (data) {
			for (var i = 0; i < data.length; i++) {
				var sellTemp = { legs: [] }, temp = data[i];
				var value = eigenvalue(temp);
				if (self.strategyMapping[value]) {
					console.log('Buy');
					console.log(temp);
					console.log(self.strategyMapping[value]);
				}
				var name = 'Long ' + temp.name;
				self.strategyMapping[value] = { template: temp, buyOrSell: 'Buy', longOrShort: 'Long', displayedName: name, iconName: name.replace(/ /g, '') };
				self.nameStrategyMap[name] = self.strategyMapping[value];
				temp.buyEigenvalue = value;
				if (!temp.name.match(/covered call/i) && !temp.name.match(/protective put/i)) {
					$.each(temp.legs, function (i, leg) {
						sellTemp.legs.push({
							buyOrSell: leg.buyOrSell == 'Sell' ? 'Buy' : 'Sell',
							quantity: leg.quantity,
							strike: leg.strike,
							expiry: leg.expiry,
							legType: leg.legType
						});
					});
					value = eigenvalue(sellTemp);
					if (self.strategyMapping[value]) {
						console.log('Sell');
						console.log(temp);
						console.log(self.strategyMapping[value]);
					}
					name = 'Short ' + temp.name;
					self.strategyMapping[value] = { template: temp, buyOrSell: 'Sell', longOrShort: 'Short', displayedName: name, iconName: name.replace(/ /g, '') };
					self.nameStrategyMap[name] = self.strategyMapping[value];
				}
				temp.sellEigenvalue = value;
				self.strategyTemplates.push(temp);
			}

			for (var s in self.sentimentStrategyNamesMap) {
				var list = self.sentimentStrategyNamesMap[s];
				list.forEach(function (nam) {
					self.sentimentStrategyMap[s].push(self.nameStrategyMap[nam]);
				});
			}
		};
		this.setTempates = function (templates) {
			self.templates = templates;
			self.initialize(templates);
		};

		this.sentimentStrategyNamesMap = {
			'Bullish': ['Long Call', 'Long Call Vertical', 'Short Put Vertical', 'Long Call Ratio 1x2', 'Long Synthetic Stock', 'Long Collar', 'Short Put', 'Long Call Diagonal'],
			'Bearish': ['Long Put', 'Long Put Vertical', 'Short Call Vertical', 'Long Put Ratio 1x2', 'Short Synthetic Stock', 'Short Collar', 'Short Call', 'Long Put Diagonal'],
			'Neutral': ['Long Call Butterfly', 'Long Put Butterfly', 'Long Call Condor', 'Long Put Condor', 'Short Iron Butterfly', 'Short Iron Condor', 'Short Straddle', 'Short Strangle', 'Long Call Calendar', 'Long Put Calendar'],
			'Sharp-Move': ['Long Straddle', 'Long Strangle', 'Long Iron Butterfly', 'Long Iron Condor', 'Short Call Butterfly', 'Short Put Butterfly', 'Short Call Condor', 'Short Put Condor'],
			'All Strategies': ['Long Stock', 'Long Call', 'Long Put', 'Long Call Vertical', 'Long Put Vertical', 'Long Call Ratio 1x2', 'Long Put Ratio 1x2', 'Long Call Ratio 2x3', 'Long Put Ratio 2x3', 'Long Straddle', 'Long Strangle', 'Long Call Butterfly', 'Long Put Butterfly', 'Long Iron Butterfly', 'Long Call Condor', 'Long Put Condor', 'Long Iron Condor', 'Long Covered Call', 'Long Synthetic Stock', 'Long Collar', 'Long Vertical Spread Spread', 'Long Call Calendar', 'Long Put Calendar', 'Long Call Diagonal', 'Long Put Diagonal', 'Long Double Diagonal', 'Long Financed Vertical', 'Short Call', 'Short Put', 'Short Call Vertical', 'Short Put Vertical', 'Short Call Ratio 1x2', 'Short Put Ratio 1x2', 'Short Call Ratio 2x3', 'Short Put Ratio 2x3', 'Short Straddle', 'Short Strangle', 'Short Call Butterfly', 'Short Put Butterfly', 'Short Iron Butterfly', 'Short Call Condor', 'Short Put Condor', 'Short Iron Condor', 'Short Synthetic Stock', 'Short Collar', 'Short Vertical Spread Spread', 'Short Financed Vertical', 'Short Stock']
		};

		this.nameStrategyMap = {};

		this.strategyNameSentimentMap = (function (map) {
			var result = {};
			for (var s in map) {
				var list = map[s];
				list.forEach(function (name) {
					result[name] = s;
				});
			}
			return result;
		})(this.sentimentStrategyNamesMap);

		this.sentimentStrategyMap = {
			'Bullish': [],
			'Bearish': [],
			'Neutral': [],
			'Sharp-Move': [],
			'All Strategies': []
		}
	};
	var strategyTemplates = new StrategyTemplates();
	return strategyTemplates;
});