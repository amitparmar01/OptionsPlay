define(['knockout',
		'modules/formatting',
		'jquery',
		'modules/context',
		'modules/configurations',
		'dataContext',
		'modules/strategyTemplates',
		'modules/combinationViewModel',
		'modules/combinationChart',
		'modules/combinationHelpers',
		'viewmodels/strategies/strategyComparison',
		'events',
		'plugins/router',
		'koBindings/chartBindings',
		'isotope',
		'kendo',
		'kendo-plugins',
		'knockout-kendo',
		'koBindings/kendoExt'],
function (ko, formatting, $, context, configurations, dataContext, strategyTemplates, Combination, CombinationChart, combinationHelpers, StrategyComparison, events, router) {
	var FunnelPage = function () {
		var self = this;

		this.ulCode = context.ulCode;

		var daysOfDefaultExpiry = configurations.TechnicalAnalysis.daysOfDefaultExpiry();

		function almostEqual(n1, n2) {
			return n1.toFixed(2) == n2.toFixed(2);
		}

		this.expiryList = ko.observableArray([]);
		this.stockPriceLowerBound = ko.observable(0).extend({ rateLimit: { timeout: 100, method: "notifyWhenChangesStop" } });
		this.stockPriceHigherBound = ko.observable(100).extend({ rateLimit: { timeout: 100, method: "notifyWhenChangesStop" } });
		this.chartPriceLow = ko.observable(0);
		this.chartPriceHigh = ko.observable(100);
		this.chartPriceRange = ko.computed({
			read: function () {
				return [self.chartPriceLow(), self.chartPriceHigh()];
			},
			write: function (newVal) {
				if (!almostEqual(newVal[0], self.chartPriceLow())) {
					self.chartPriceLow(newVal[0]);
				} else if (!almostEqual(newVal[1], self.chartPriceHigh())) {
					self.chartPriceHigh(newVal[1]);
				}
			}
		}).extend({ rateLimit: { timeout: 100, method: "notifyWhenChangesStop" } });
		this.selectedExpiry = ko.observable();
		this.lastPricePosition = ko.observable();

		this.sentimentOptions = [{
			label: 'strategies.bearish',
			selector: '.Bearish',
			css: 'bearish',
			isSelected: ko.observable(false)
		}, {
			label: 'strategies.neutral',
			selector: '.Neutral',
			css: 'neutral',
			isSelected: ko.observable(false)
		}, {
			label: 'strategies.bullish',
			selector: '.Bullish',
			css: 'bullish',
			isSelected: ko.observable(false)
		}, {
			label: 'strategies.mildlyBearish',
			selector: '.MildlyBearish',
			css: 'mildly-bearish',
			isSelected: ko.observable(false)
		}, {
			label: 'strategies.sharpmove',
			selector: '.SharpMove',
			css: 'sharpmove',
			isSelected: ko.observable(false)
		}, {
			label: 'strategies.mildlyBullish',
			selector: '.MildlyBullish',
			css: 'mildly-bullish',
			isSelected: ko.observable(false)
		}];
		this.selectedSentiments = ko.computed(function () {
			return self.sentimentOptions.filter(function (sentiment) {
				return sentiment.isSelected();
			});
		});

		this.ulQuotation = ko.observable(null);
		this.optionChains = ko.observable(null);
		this.standardDeviations = ko.observable(null);
		this.marketDataReady = ko.observable(false);

		var ulCodeSubscription, selectExpirySubscription;
		var expiryStrikes = {};

		function initDefaultExpiry() {
			self.expiryList().some(function (expiry) {
				if (expiry.daysToExpiry > daysOfDefaultExpiry) {
					self.selectedExpiry(expiry);
					return true;
				} else {
					return false;
				}
			});
		}

		this.priceChanging = ko.observable(true);

		function expiryChange() {
			removeAllCombinations();
			var lowestStrike = Number.MAX_VALUE,
				highestStrike = 0,
				expiryKey = self.selectedExpiry().expiryKey;

			var stdDevsItem = self.standardDeviations().getStdDevsByExpiry(expiryKey);
			if (stdDevsItem) {
				var stdDevPrices = stdDevsItem.stdDevPrices;
				self.stockPriceLowerBound(stdDevPrices[1]);
				self.stockPriceHigherBound(stdDevPrices[4]);
				self.chartPriceLow(stdDevPrices[2]);
				self.chartPriceHigh(stdDevPrices[3]);
			} else {
				var strikeList = expiryStrikes[expiryKey];
				strikeList.forEach(function (strike) {
					lowestStrike = Math.min(lowestStrike, strike);
					highestStrike = Math.max(highestStrike, strike);
				});
				self.stockPriceLowerBound(Math.max(0, lowestStrike - (highestStrike - lowestStrike) * 0.25));
				self.stockPriceHigherBound(highestStrike + (highestStrike - lowestStrike) * 0.25);
				self.chartPriceLow(lowestStrike);
				self.chartPriceHigh(highestStrike);
			}
			self.priceChanging(false);

			initializeCombinations();
		}

		function chartPriceLowChange(newLow) {
			var last = self.ulQuotation().lastPrice();
			if (newLow > last) {
				self.chartPriceLow(last - (self.chartPriceHigh() - last));
				return;
			}
			var newHigh = last + (last - newLow);
			var expiryKey = self.selectedExpiry().expiryKey;
			var stdDevsItem = self.standardDeviations().getStdDevsByExpiry(expiryKey);
			if (stdDevsItem) {
				var stdDevPrices = stdDevsItem.stdDevPrices;
				if (newLow <= stdDevPrices[2]) {
					newHigh = (stdDevPrices[2] - newLow) / (stdDevPrices[2] - stdDevPrices[1]) * (stdDevPrices[4] - stdDevPrices[3]) + stdDevPrices[3];
				} else if (newLow < last) {
					newHigh = (last - newLow) / (last - stdDevPrices[2]) * (stdDevPrices[3] - last) + last;
				} else {
					self.chartPriceLow(stdDevPrices[2]);
					return;
				}
			}
			if (newHigh.toFixed(2) != self.chartPriceHigh().toFixed(2)) {
				self.chartPriceHigh(newHigh);
			}
		}
		function chartPriceHighChange(newHigh) {
			var last = self.ulQuotation().lastPrice();
			if (newHigh < last) {
				self.chartPriceHigh(last - (self.chartPriceLow() - last));
				return;
			}
			var newLow = last + (last - newHigh);
			var expiryKey = self.selectedExpiry().expiryKey;
			var stdDevsItem = self.standardDeviations().getStdDevsByExpiry(expiryKey);
			if (stdDevsItem) {
				var stdDevPrices = stdDevsItem.stdDevPrices;
				if (newHigh >= stdDevPrices[3]) {
					newLow = stdDevPrices[2] - (newHigh - stdDevPrices[3]) / (stdDevPrices[4] - stdDevPrices[3]) * (stdDevPrices[2] - stdDevPrices[1]);
				} else if (newHigh > last) {
					newLow = last - (newHigh - last) / (stdDevPrices[3] - last) * (last - stdDevPrices[2]);
				} else {
					self.chartPriceHigh(stdDevPrices[3]);
					return;
				}
			}
			if (newLow.toFixed(2) != self.chartPriceLow().toFixed(2)) {
				self.chartPriceLow(newLow);
			}
		}

		this.chartPriceLow.subscribe(chartPriceLowChange);
		this.chartPriceHigh.subscribe(chartPriceHighChange);

		function underlyingChange() {
			self.marketDataReady(false);
			self.priceChanging(true);
			removeAllCombinations();
			events.trigger(events.Funnel.UL_CHANGED);
			$.when(dataContext.quotation.get(self.ulCode()),
					dataContext.optionChains.get(self.ulCode()),
					dataContext.standardDeviations.get(self.ulCode()))
				.done(function (quotation, chains, standardDeviations) {
					self.ulQuotation(quotation);
					self.optionChains(chains);
					self.standardDeviations(standardDeviations);
					expiryStrikes = chains.expiryStrikes;
					self.expiryList(chains.expirationDates);
					initDefaultExpiry();
					self.marketDataReady(true);
					if (router.activeItem() == self && self.defaultCombinations().length < 1) {
						initializeCombinations();
					}
					self.priceChanging(false);
				});
		}

		router.on('router:route:activating', function (instance) {
			if (instance != self) {
				removeAllCombinations();
			}
		});

		this.toggleSentiment = function (sentiment) {
			if (sentiment) {
				sentiment.isSelected(!sentiment.isSelected());
			}
		};

		this.defaultCombinations = ko.observableArray([]);
		this.showComparison = ko.observable(false);
		this.strategyComparison = new StrategyComparison(this);

		this.goToBottom = function (combination) {
			events.trigger(events.Funnel.GO_TO_BOTTOM, combination);
		}

		function removeAllCombinations() {
			self.defaultCombinations().forEach(function (comb) {
				comb.dispose();
			});
			self.defaultCombinations.removeAll();
			console.log('combinations removed');
		}

		function initializeCombinations() {
			if (!self.marketDataReady()) {
				return;
			}
			removeAllCombinations();
			var defaultCombinations = [];
			strategyTemplates.templates.forEach(function (template) {
				var buyOrSell, comb, legs, noOfPoints;
				if (template.buyDetails.display) {
					buyOrSell = 'BUY';
					legs = combinationHelpers.buildCombinationLegs(self.ulCode(), template.legs, buyOrSell,
						self.ulQuotation(), self.optionChains(), self.selectedExpiry().date);
					comb = new Combination(self.ulCode(), legs);
					if (comb.strategyName() == template.name) {
						noOfPoints = Math.min(200, (self.stockPriceHigherBound() - self.stockPriceLowerBound()) / 0.1);
						comb.chart = new CombinationChart(comb, noOfPoints);
						comb.chart.stockPriceLowerBound = self.stockPriceLowerBound;
						comb.chart.stockPriceHigherBound = self.stockPriceHigherBound;
						comb.chart.chartPriceRange = self.chartPriceRange;
						comb.displayOrder = template.buyDetails.displayOrder;
						defaultCombinations.push(comb);
					}
				}
				if (template.sellDetails.display) {
					buyOrSell = 'SELL';
					legs = combinationHelpers.buildCombinationLegs(self.ulCode(), template.legs, buyOrSell,
						self.ulQuotation(), self.optionChains(), self.selectedExpiry().date);
					comb = new Combination(self.ulCode(), legs);
					if (comb.strategyName() == template.name) {
						noOfPoints = Math.min(200, (self.stockPriceHigherBound() - self.stockPriceLowerBound()) / 0.1);
						comb.chart = new CombinationChart(comb, noOfPoints);
						comb.chart.stockPriceLowerBound = self.stockPriceLowerBound;
						comb.chart.stockPriceHigherBound = self.stockPriceHigherBound;
						comb.chart.chartPriceRange = self.chartPriceRange;
						comb.displayOrder = template.sellDetails.displayOrder;
						defaultCombinations.push(comb);
					}
				}
			});
			defaultCombinations.sort(function (c1, c2) {
				return c1.displayOrder - c2.displayOrder;
			});
			console.log('combination initialized');
			self.defaultCombinations(defaultCombinations);
			console.log('combination completed');
		}

		this.compositionComplete = function () {
			ulCodeSubscription = self.ulCode.subscribe(underlyingChange);
			selectExpirySubscription = self.selectedExpiry.subscribe(expiryChange);
			underlyingChange();
		};

		this.activate = function () {
		};

		this.detached = function () {
			ulCodeSubscription && ulCodeSubscription.dispose && ulCodeSubscription.dispose();
			selectExpirySubscription && selectExpirySubscription.dispose && selectExpirySubscription.dispose();
		};

		this.orderBy = ko.observable();
		this.strategyFilter = ko.computed(function () {
			return self.selectedSentiments().map(function (sent) {
				return sent.selector;
			}).join(', ');
		});

		this.strategyIsotope = {
			itemSelector: '.strategy-container',
			layoutMode: 'fitRows',
			getSortData: {
				price: '[data-price]',
				risk: '[data-risk]',
				reward: 'data-reward',
				sentiment: function (itemElem) {
					var sentimentNum = 100;
					self.sentimentOptions.some(function (sent, i) {
						if ($(itemElem).hasClass(sent.selector)) {
							sentimentNum = i;
							return true;
						}
						return false;
					});
					return sentimentNum;
				}
			},
			orderBy: this.orderBy,
			filter: this.strategyFilter,
			items: this.defaultCombinations
		};

		this.stockPriceKendoRange ={
			values: this.chartPriceRange,
			min: this.stockPriceLowerBound,
			max: this.stockPriceHigherBound,
			largeStep: 0.1,
			smallStep: 0.001,
			tickPlacement: 'bottomRight'
		};

		this.bottomExpanded = ko.observable(false);
		events.on(events.Bottom.IS_SHOWN, function (isShown) {
			self.bottomExpanded(isShown);
		});

		//this.lastPricePosition = (self.stockPriceHigherBound - self.ulQuotation().lastPrice()) / (self.stockPriceHigherBound - self.stockPriceLowerBound);

		events.trigger(events.Bottom.IS_SHOWN, false);
	};

	return new FunnelPage();
});