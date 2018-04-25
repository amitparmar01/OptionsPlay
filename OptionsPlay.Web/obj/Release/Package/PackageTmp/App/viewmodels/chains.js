define(['knockout',
		'dataContext',
		'modules/grid',
		'modules/dropDownList',
		'modules/context',
		'modules/combinationViewModel',
		'modules/combinationHelpers',
		'modules/combinationChart',
		'modules/kendoWindow',
		'modules/localizer',
		'jquery',
		'events',
		'modules/helpers',
		'modules/formatting',
		'koBindings/changeFlash',
		'koBindings/redGreen',
		'kendo',
		'knockout-kendo',
		'koBindings/kendoExt'],
function (ko, dataContext, grid, DropDownList, context, Combination, combinationHelpers, CombinationChart, kendoWindow, localizer, $, events, helpers, formatting) {

	function ViewModel() {
		var self = this;
		this.securityCode = context.ulCode;

		this.gridReady = ko.observable(false);
		this.quoteReady = ko.observable(false);
		this.expiryStrikes = ko.observable();

		this.combination = ko.observable();
		this.isPlVisible = ko.observable(false);
		
        
		this.securityName = ko.observable(false);
		this.lastPrice = ko.observable(false);
		this.previousClose = ko.observable(false);
		this.greekToggled = ko.observable(false);
		this.historicalOrderToggled = ko.observable(false);
		this.strategyReady = ko.observable(false);
		this.strategyTemplates = [];
		this.strategyTemplate = ko.observable(false);
		this.strategyGroups = [];
		this.multipliers = ko.observableArray();
		this.multiplier = ko.observable();
		this.isTDisplay = ko.observable(true);
		this.step = false;
		this.greeksToggleIcon = ko.computed(function () {
			var locale = localizer.activeLocale();
			return 'lastPriceToggle_' + locale;
		});


		// 1 for call/put. 2 for those have pairs. 3 for no pair ones
		this.gridType = ko.computed(function () {
			var strategyTemplate = self.strategyTemplate();
			if (strategyTemplate && strategyTemplate["org"]) {
				if (strategyTemplate["org"].name == 'Call') {
					return 1;
				} else if (strategyTemplate["pair"]) {
					return 2;
				} else return 3;
			} else {
				return 1;
			}
		});

		this.toggleGreek = function () {
			self.greekToggled(!self.greekToggled());
		};

		this.showQueryArea = function () {
		    self.isTDisplay(true);
		}
		this.hideQueryArea = function () {
		    self.isTDisplay(false);
		}
		

		this.selectedLeg = false;

		this.strategyComboChoices = ko.observableArray([]);
		this.selectedStrategy = ko.observable('Call');
		var strategiesDropDownList = new DropDownList();
		this.strategyOptions = $.extend(strategiesDropDownList.baseOptions(), {
			data: self.strategyComboChoices,
			value: self.selectedStrategy
		});

		this.strikeComboChoices = ko.observableArray([
				{ key: 'chains.allStrike', value: '1000' },
				{ key: '2', value: '2' },
				{ key: '4', value: '4' },
				{ key: '6', value: '6' }]);

		this.selectedStrike = ko.observable(1000);
		var strikesDropDownList = new DropDownList();
		this.strikeOptions = $.extend(strikesDropDownList.baseOptions(), {
			data: self.strikeComboChoices,
			value: self.selectedStrike
		});

		var multipliersDropDownList = new DropDownList();
		this.multipliersOptions = {
			data: self.multipliers,
			value: self.multiplier
		};
		
		this.widthComboChoices = ko.observableArray([
				{ key: '1', value: '1' },
				{ key: '2', value: '2' },
				{ key: '3', value: '3' },
				{ key: '4', value: '4' }]);
		this.selectedWidth = ko.observable(1);
		var widthDropDownList = new DropDownList();
		this.widthOptions = $.extend(widthDropDownList.baseOptions(), {
			data: self.widthComboChoices,
			value: self.selectedWidth
		});

		this.wingspanComboChoices = ko.observableArray([
				{ key: '1', value: '1' },
				{ key: '2', value: '2' },
				{ key: '3', value: '3' },
				{ key: '4', value: '4' }]);
		this.selectedWingspan = ko.observable(1);
		var wingspanDropDownList = new DropDownList();
		this.wingspanOptions = $.extend(wingspanDropDownList.baseOptions(), {
			data: self.wingspanComboChoices,
			value: self.selectedWingspan
		});

		this.expiryComboChoices = ko.observableArray([
				{ key: '1', value: '1' },
				{ key: '2', value: '2' },
				{ key: '3', value: '3' },
				{ key: '4', value: '4' }]);
		this.selectedExpiry = ko.observable(1);
		var expiryDropDownList = new DropDownList();
		this.expiryOptions = $.extend(expiryDropDownList.baseOptions(), {
			data: self.expiryComboChoices,
			value: self.selectedExpiry
		});

		self.strategyTemplate.subscribe(function (strategyTemplate) {
			if (strategyTemplate) {
				var leftLegs = strategyTemplate["org"].legs;
				var nonStockLeftLegs = [];
				var stockLeftLegs = [];
				var width = 1;
				var wingspan = 1;
				leftLegs.forEach(function (leg) {
					if (leg.legType == 'Security') {
						stockLeftLegs.push(leg);
					} else {
						nonStockLeftLegs.push(leg);
					}
				});
				var length = nonStockLeftLegs.length;
				if (length > 1) {
					var mid = parseInt(length / 2);
					width = nonStockLeftLegs[mid].strike - nonStockLeftLegs[mid - 1].strike;
					wingspan = nonStockLeftLegs[1].strike - nonStockLeftLegs[0].strike;
				}
				self.selectedWidth(width);
				self.selectedWingspan(wingspan);
				self.selectedExpiry(1);
			}
		});
		
		this.expiryChoices = ko.observableArray([]);
		this.selectedExpiryItem = ko.observable();
		this.selectedExpiries = ko.computed(function () {
			var selectedExpiries = [];
			if (self.selectedExpiryItem()) {
				selectedExpiries.push(self.selectedExpiryItem());
			}
			return selectedExpiries;
		});

		this.expiryDropDownOptions = $.extend(new DropDownList().baseOptions(), {
			data: self.expiryChoices,
			value: self.selectedExpiryItem,
			dataTextField: 'expiry',
			dataValueField: 'expiry',
			template: '#: expiry #'
		});

		function findTemplate(name) {
			var res = {};
			self.strategyTemplates.forEach(function (strategyOrg) {
				if (strategyOrg.name == name) {
					res["org"] = strategyOrg;
					if (strategyOrg.pairStrategyId) {
						self.strategyTemplates.forEach(function (pairStrategy) {
							if (pairStrategy.id == strategyOrg.pairStrategyId) {
								res["pair"] = pairStrategy;
							}
						});
					}
				}
			});
			return res;
		};

		self.itemsListAll = ko.observableArray();

		function getAggregated(items, path, isAvg) {
			var names = path.split('.');
			var res = ko.computed(function () {
				var result = 0;
				var qty = 0;
				items.forEach(function (item) {
					result += item.quantity * ko.unwrap(names.length == 2 ? item[names[0]][names[1]] : item[names[0]]);
					qty += item.quantity;
				});
				if (isAvg) {
					result /= qty;
				}
				return result;
			}, self).extend({ rateLimit: 10 });
			return res;
		};

		var ComplexOption = function (realLegs) {
			var that = this;
			that.greeks = {
				sigma: getAggregated(realLegs, 'greeks.sigma', true),
				delta: getAggregated(realLegs, 'greeks.delta'),
				theta: getAggregated(realLegs, 'greeks.theta'),
				gamma: getAggregated(realLegs, 'greeks.gamma'),
				vega: getAggregated(realLegs, 'greeks.vega'),
				rho: getAggregated(realLegs, 'greeks.rho')
			};
			that.volume = getAggregated(realLegs, 'volume');
			that.openInterest = getAggregated(realLegs, 'openInterest');
			that.bid = getAggregated(realLegs, 'bid');
			that.ask = getAggregated(realLegs, 'ask');
			that.change = getAggregated(realLegs, 'change');
			that.previousClose = getAggregated(realLegs, 'previousClose');
			that.latestTradedPrice = getAggregated(realLegs, 'latestTradedPrice');
			that.optionNumber = (function () {
				var result = '';
				realLegs.forEach(function (item, i) {
					result += (i > 0 ? '/' : '') + item.optionNumber;
				});
				return result;
			})();
			that.combLegs = (function () {
				var result = [];
				realLegs.forEach(function (item) {
					result.push(item.combLeg);
				});
				return result;
			})();
			that.strikes = (function () {
				var result = '';
				var temp = [];
				realLegs.forEach(function (item, i) {
					if (item.strikePrice && temp.indexOf(item.strikePrice) < 0) {
						result += (i > 0 ? '/' : '') + item.strikePrice;
						temp.push(item.strikePrice);
					}
				});
				return result;
			})();
		}

		function buildComplexCombination(legs, canCustomizeWidth, canCustomizeWingspan, firstOptionIndex, optionItems) {
			
			var legNum = legs.length;
			var selectedWidth = parseInt(self.selectedWidth());
			var selectedWingspan = parseInt(self.selectedWingspan());

			var realLegs = legs.map(function (leg, legIndex) {
				
				var mappedResult = {};
				if (leg.legType != 'Security') {
					var offset = leg.offset;
					if (legNum == 2) {
						if (canCustomizeWidth && legIndex == 1) {
							offset = selectedWidth;
						}
					} else if (legNum == 3) {
						if (canCustomizeWingspan && legIndex == 1) {
							offset = selectedWingspan;
						} else if (canCustomizeWingspan && legIndex == 2) {
							offset = 2 * selectedWingspan;
						}
					} else if (legNum == 4) {
						if (canCustomizeWingspan && legIndex == 1) {
							offset = selectedWingspan;
						} else if (canCustomizeWingspan && canCustomizeWidth && legIndex == 2) {
							offset = selectedWingspan + selectedWidth;
						} else if (canCustomizeWingspan && !canCustomizeWidth && legIndex == 2) {
							offset = (legIndex - 1) * selectedWingspan;
						} else if (canCustomizeWingspan && canCustomizeWidth && legIndex == 3) {
							offset = 2 * selectedWingspan + selectedWidth;
						} else if (canCustomizeWingspan && !canCustomizeWidth && legIndex == 3) {
							offset = 2 * selectedWingspan;
						}
					}

					var actualIndex = firstOptionIndex + offset;

					if (actualIndex >= optionItems.length) {
						throw { exception: 'Option Index out of Boundary' };
					} else {
						var legKey = leg.legType.toLowerCase() + 'Option';
						var option = optionItems[actualIndex][legKey];
						mappedResult = {
							greeks: {
								sigma: option.greeks ? option.greeks.sigma : null,
								delta: option.greeks ? option.greeks.delta : null,
								theta: option.greeks ? option.greeks.theta : null,
								gamma: option.greeks ? option.greeks.gamma : null,
								vega: option.greeks ? option.greeks.vega : null,
								rho: option.greeks ? option.greeks.rho : null,
							},
							volume: option.volume,
							openInterest: option.uncoveredPositionQuantity,
							bid: option.bid,
							ask: option.ask,
							optionNumber: option.optionNumber,
							legType: leg.legType,
							quantity: leg.quantity,
							strikePrice: optionItems[actualIndex].strikePrice,
							change: option.change,
							latestTradedPrice: option.latestTradedPrice,
							previousClose: option.previousClose
						};
						mappedResult.combLeg = {
							buyOrSell: leg.buyOrSell,
							expiry: optionItems[actualIndex].expiryDate,
							legType: leg.legType,
							quantity: leg.quantity,
							strikePrice: optionItems[actualIndex].strikePrice,
						};
					}
				} else {
					mappedResult = {
						greeks: {
							sigma: 0,
							delta: 0,
							theta: 0,
							gamma: 0,
							vega: 0,
							rho: 0,
						},
						volume: 0,
						openInterest: 0,
						bid: self.lastPrice,
						ask: self.lastPrice,
						quantity: leg.quantity / 1000 * self.multiplier(),
						optionNumber: self.securityCode(),
						previousClose: self.previousClose
					};
					mappedResult.combLeg = {
						buyOrSell: leg.buyOrSell,
						expiry: optionItems[0].expiryDate,
						legType: 'SECURITY',
						quantity: leg.quantity / 1000 * self.multiplier(),
						strikePrice: null,
					};
				}
				return mappedResult;
			});

			var complexOption = new ComplexOption(realLegs);

			return complexOption;
		};
		var itemsToDispose = null;

		self.itemsList = ko.computed(function () {
			var itemsListAll = self.itemsListAll().filter(function (item) {
				return item.premiumMultiplier == self.multiplier();
			});
			if (itemsListAll.length === 0 || !self.strategyReady()) {
				return [];
			}
			var selectedExpiries = self.selectedExpiries();
			var itemsList = [];
			var selectedStrike = self.selectedStrike();
			var itemMap = {};
			selectedExpiries.forEach(function (expiry) {
				itemMap[expiry] = [];
			});
			itemsListAll.forEach(function (item) {
				if (selectedExpiries.indexOf(item.expiryKey) > -1) {
					itemMap[item.expiryKey].push(item);
				}
			});
			var strategyTemplate = findTemplate(self.selectedStrategy());
			if (!self.strategyTemplate()) {
				self.strategyTemplate(strategyTemplate);
			}
			if (strategyTemplate['org'].id != self.strategyTemplate()['org'].id) {
				self.strategyTemplate(strategyTemplate);
			}
			selectedExpiries.forEach(function (expiry) {
				var items = itemMap[expiry];
				//self.expiryChoices().forEach(function (expiryChoice) {
				//	if (expiryChoice.expiry == expiry)
				//		itemsList.push({
				//			date: items[0].expiryDate,
				//			isExpiryRow: true,
				//			noOfDaysTillNow: expiryChoice.daysToExpiry
				//		});
				//}); 
				
				var strikeIndexOutOfBoundException = {};
				try {
					var leftLegs = strategyTemplate["org"].legs;
					var nonStockLeftLegs = [];
					var stockLeftLegs = [];
					leftLegs.forEach(function (leg) {
						if (leg.legType == 'Security') {
							stockLeftLegs.push(leg);
						} else {
							nonStockLeftLegs.push(leg);
						}
					});
					nonStockLeftLegs.forEach(function (leg) {
						leg.offset = leg.strike - nonStockLeftLegs[0].strike;
					});
					var rightLegs;
					if (strategyTemplate["pair"] != undefined) {
						rightLegs = strategyTemplate["pair"].legs;
						if (rightLegs != undefined) {
							var nonStockRightLegs = [];
							var stockRightLegs = [];
							rightLegs.forEach(function (leg) {
								if (leg.legType == 'Security') {
									stockRightLegs.push(leg);
								} else {
									nonStockRightLegs.push(leg);
								}
							});
							nonStockRightLegs.forEach(function (leg, index) {
								leg.offset = leg.strike - nonStockRightLegs[0].strike;
							});
						}
					}
					items.forEach(function (item, itemIndex) {
						var itemZero = {
							strikePrice: '',
							cmpPrice: 0,
							putOption: {
								greeks: {
									sigma: 0,
									delta: 0,
									theta: 0,
									gamma: 0,
									vega: 0,
									rho: 0,
								},
								volume: 0,
								openInterest: 0,
								bid: 0,
								ask: 0,
								change: ko.observable(0),
								optionNumber: ''
							},
							isExpiryRow: false,
							comLeftLegs: [],
							comRightLegs: [],
						};
						var newLeftOption = buildComplexCombination(leftLegs, strategyTemplate['org'].canCustomizeWidth, strategyTemplate['org'].canCustomizeWingspan, itemIndex, items);
						itemZero.callOption = newLeftOption;
						if (rightLegs && rightLegs.length) {
							var newRightOption = buildComplexCombination(rightLegs, strategyTemplate['org'].canCustomizeWidth, strategyTemplate['org'].canCustomizeWingspan, itemIndex, items);
							if (newRightOption) {
								itemZero.putOption = newRightOption;
							}
						}

						itemZero.strikePrice = itemZero.callOption.strikes;
						var strikeList = itemZero.strikePrice.split('/');
						
						itemZero.cmpPrice = parseFloat(strikeList[parseInt(strikeList.length / 2)]);
						var min = self.lastPrice() - self.step * selectedStrike / 2;
						var max = self.lastPrice() + self.step * selectedStrike / 2;
						if (itemZero.isExpiryRow || (itemZero.cmpPrice > min && itemZero.cmpPrice < max)) {
							itemsList.push(itemZero);
						} 
					});
				} catch (e) {
					console.log(e);
				}
			});
			// note: manual free computed objects.
			itemsToDispose = self.itemsList();
			setTimeout(disposeRowItems, 1);
			return itemsList;
		});

		var propertiesToDelete = [
			'callOption.greeks.sigma',
			'callOption.greeks.delta',
			'callOption.greeks.theta',
			'callOption.greeks.gamma',
			'callOption.greeks.vega',
			'callOption.greeks.rho',
			'callOption.volume',
			'callOption.openInterest',
			'callOption.bid',
			'callOption.ask',
			'callOption.change',
			'callOption.previousClose',
			'callOption.latestTradedPrice',
			'putOption.greeks.sigma',
			'putOption.greeks.delta',
			'putOption.greeks.theta',
			'putOption.greeks.gamma',
			'putOption.greeks.vega',
			'putOption.greeks.rho',
			'putOption.volume',
			'putOption.openInterest',
			'putOption.bid',
			'putOption.ask',
			'putOption.change',
			'putOption.previousClose',
			'putOption.latestTradedPrice'
		];
		
		function disposeRowItems() {
			$.each(itemsToDispose, function (i, item) {
				propertiesToDelete.forEach(function (path) {
					var objToDispose = helpers.getValue(item, path);
					if (objToDispose != null && typeof(objToDispose.dispose) == 'function') {
						objToDispose.dispose();
						delete objToDispose;
					}
				});
			});
		}

		this.chains = null;
		function updateChains(securityCode) {
			self.gridReady(false);
			self.itemsListAll.removeAll();
			dataContext.optionChains.get(securityCode).done(function (chains) {
				self.chains = chains;
				self.expiryChoices.removeAll();
				self.selectedExpiryItem(null);
				self.expiryStrikes(chains.expiryStrikes);
				self.expiryChoices([]);
				self.multipliers(chains.multipliers);
				self.multiplier(chains.defaultMultiplier);
				self.itemsListAll(chains.allRows.slice(0));
				self.step = chains.rows[1].strikePrice - chains.rows[0].strikePrice;
				chains.expirationDates.forEach(function (expiryDate) {
					self.expiryChoices.push({
						textDisplayed: formatting.formatDate(expiryDate.date, 'yyyy年MM月') + '(' + expiryDate.noOfDaysToExpiry + ')',
						expiry: expiryDate.expiryKey,
						date: expiryDate.date,
						daysToExpiry: expiryDate.noOfDaysToExpiry,
						isActivated: self.expiryChoices().length == 0 ? ko.observable(true) : ko.observable(false)
					});
				});
				if (self.expiryChoices().length) {
					self.selectedExpiryItem(self.expiryChoices()[0].expiry);
				}
			}).always(function () {
				self.gridReady(true);
			});
		}

		function updateQuote(stockCode) {
			self.quoteReady(false);
			dataContext.quotation.get(stockCode).done(function (quote) {
				self.securityName(quote.securityName);
				self.lastPrice(quote.lastPrice() || quote.previousClose());
			    //for 1400:
			    self.previousClose(quote.previousClose());		    
			}).always(function () {
				self.quoteReady(true);
			});
		}

		function loadStrategies() {
			dataContext.strategies.get().done(function (strategies) {
				self.strategyTemplates = ko.unwrap(strategies);
			}).always(function () {
				self.strategyReady(true);
			});

			dataContext.strategyGroups.get().done(function (strategyGroups) {
				strategyGroups = ko.unwrap(strategyGroups);
				self.strategyGroups = strategyGroups
				strategyGroups.sort(function (a, b) {
					return a.displayOrder - b.displayOrder;
				});
				strategyGroups.forEach(function (strategyGroup) {
					if (strategyGroup.display) {
						self.strategyComboChoices.push({
							key: 'chains.' + strategyGroup.name,
							value: strategyGroup.callStrategyName
						});
					}
				});
			});

		}

		this.gridOptions = $.extend(grid.baseOptions(), {
			data: self.itemsList,
			rowTemplate: 'chainsRowTemplate',
			resizable: true,
			scrollable: false ,
			dataBound: function (data) {
				if (self.gridReady()) {
					grid.showLabelIfEmpty(data);
				}
			}
		});
		
		this.plGraphWindowOptions = $.extend(kendoWindow.baseOptions(), { isOpen: self.isPlVisible});

		this.clickExpiry = function (data) {
			data.isActivated(!data.isActivated());
		};

		this.isExpActive = function () {
			return false;
		};

		this.popPl = function (data, event) {
			
			var $target = $(event.target);
			var legs = [];
			var legTypeKey = $target.hasClass('call') ? 'callOption' : 'putOption';
			var selectedOption = data[legTypeKey];
			selectedOption.combLegs.forEach(function (leg) {
				legs.push({
					buyOrSell: ($target.hasClass('buy') ^ leg.buyOrSell == "Buy") ? "SELL" : "BUY",
					expiry: leg.expiry,
					legType: leg.legType.toUpperCase(),
					quantity: leg.quantity,
					strikePrice: leg.strikePrice
				});
			});
			self.selectedLeg = {
				optionNumber: selectedOption.optionNumber,
				buyOrSell: $target.hasClass('buy') ? 'BUY' : 'SELL',
				bid: selectedOption.bid,
				ask: selectedOption.ask
			};
			if (self.combination()) {
				self.combination().dispose();
				self.combination(null);
			}
			var combination = new Combination(self.securityCode(), legs);
			self.isPlVisible(true);
			self.combination(combination);
		};

		this.kendoContextMenu = {
			currentItem: ko.observable(),
			targets: '#chainsGrid tbody tr td',
			beforeOpen: function (e) {
				var optionPair = ko.contextFor(e.target).$data;
				var callPutFlag = $(e.target).hasClass('call');
				var selectedOption = callPutFlag ? optionPair.callOption : optionPair.putOption;
				self.kendoContextMenu.currentItem(selectedOption);
			},

			itemSelect: function (e) {
				var selectedOption = self.kendoContextMenu.currentItem();
				var $item = $(e.item);
				var legs = [];
				selectedOption.combLegs.forEach(function (leg) {
					legs.push({
						buyOrSell: ($item.hasClass('buy') ^ leg.buyOrSell == "Buy") ? "SELL" : "BUY",
						expiry: leg.expiry,
						legType: leg.legType == null ? leg.legType : leg.legType.toUpperCase(),
						quantity: leg.quantity,
						strikePrice: leg.strikePrice
					});
				});
				var combination = new Combination(self.securityCode(), legs);
				$.when(combination.ready).then(function(){
					var orderLegs = combinationHelpers.extractOrderEntries(combination);
					if (orderLegs.length == 1) {
						if ($item.hasClass('covered-call')) {
							orderLegs[0].isCovered = true;
							orderLegs[0].stockBusiness = '404';
						}
					}
					events.trigger(events.OrderEntry.PREFILL_ORDER, orderLegs, combination);
					combination.dispose();
				});
			}
		};

		this.prefill = function () {
			self.isPlVisible(false);
			var comb = self.combination();
			var legs = combinationHelpers.extractOrderEntries(comb);
			events.trigger(events.OrderEntry.PREFILL_ORDER, legs, comb);
		};

		var chainsSub = null;
		var quoteSub = null;

		this.activate = function () {
			updateChains(this.securityCode());
			updateQuote(this.securityCode());
			chainsSub = self.securityCode.subscribe(updateChains);
			quoteSub = self.securityCode.subscribe(updateQuote);
		};
		this.detached = function () {
			chainsSub && chainsSub.dispose();
			quoteSub && quoteSub.dispose();
			self.itemsList && self.itemsList.dispose();
			
		};
		
		loadStrategies();

		this.selectedOptionNumber = ko.observable(null);

		this.onDoubleClick = function (row, event) {
			var option = null;
			if ($(event.target).hasClass('call')) {
				option = self.chains.findOption(row.callOption.optionNumber);
			} else if ($(event.target).hasClass('put')) {
				option = self.chains.findOption(row.putOption.optionNumber);
			}
			self.selectedOptionNumber(option && option.optionNumber);
			option && events.trigger(events.Quotes.CHANGE_DETAILS, option);
		}
	}
	return ViewModel;

});