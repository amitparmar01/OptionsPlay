define(['knockout',
		'komapping',
		'dataContext',
		'modules/grid',
		'modules/formatting',
		'modules/localizer',
		'modules/combinationViewModel',
		'modules/combinationChart',
		'events',
		'loader',
		'modules/kendoWindow',
		'modules/dropDownList',
		'plugins/router',
		'viewmodels/compositions/symbolLookup',
		'portfolioItemGroupModel',
		'modules/enums',
		'koBindings/changeFlash',
		'kendo',
		'kendo-plugins',
		'knockout-kendo',
		'koBindings/kendoExt'],
function (ko, komapping, dataContext, grid, formatting, localizer, Combination, CombinationChart, events, loader, kendoWindow, dropDownList, router, symbolLookup, PortfolioItemGroupModel, enums) {
	ko.mapping = komapping;

	var justLoggedIn = true;

	function ViewModel() {
		var self = this;

		this.grid = ko.observable(null);
		this.gridBound = ko.observable(false);
		this.dataFetched = ko.observable(false);
		
		this.toggleHistoricalOrder = function () {
			events.trigger(events.Portfolio.HISTORICAL_INQUIRY);
		};

		this.groupList = ko.observableArray([]);
		this.selectedItem = ko.observable();
		
		this.symbolLookup = symbolLookup;
		this.currentAutoExerciseInstructions = ko.observable({});
		this.autoExerciseInstructions = ko.observable();

		this.details = ko.observable(false);
		this.detailsSwitch = ko.computed(function () {
			var result = self.details() ? '' : 'greeksVisible';
			return result;
		});

		this.costBasisIconPath = ko.computed(function () {
			var result = self.details() ?  'greekToggle' : 'costBasis_' + localizer.activeLocale() ;
			return result;
		});

		this.closePositionIconPath = ko.computed(function () {
			var result = 'closePosition_' + localizer.activeLocale();
			return result;
		});

		this.complexPositionIconPath = ko.computed(function () {
			var result = 'complexPosition_' + localizer.activeLocale();
			return result;
		});

		/*this.strategyGraph = ko.computed(function () {
			var result = strategies.strategy();
			if (closeComplexPosition.quantity > 0) result += 'Buy';
			else result += 'Sell';
			return result;
		});*/

		this.expiryQuantity = ko.observable(0);
		this.expiryTodayQuantity = ko.observable(0);
		this.hasTodayExpiration = ko.observable(false);
		this.expiryWarningsMessage = ko.computed(function () {
			var message;

			localizer.waitForLocaleChange();

			
			if (self.expiryQuantity() === 0) {
				message = localizer.localize('portfolio.alerts.noExpiryWarnings');
			} else if (self.expiryQuantity() === 1) {
				if (self.hasTodayExpiration()) {
					message = localizer.localize('portfolio.alerts.oneExpiryTodayWarning');
				} else {
					message = localizer.localize('portfolio.alerts.oneExpiryWarning');
				}
			} else {
				if (self.hasTodayExpiration()) {
					message = localizer.localize('portfolio.alerts.manyExpiryTodayWarning');
				} else {
					message = localizer.localize('portfolio.alerts.manyExpiryWarnings');
				}
				message = message.replace('{X}', self.expiryQuantity());
			}

			return message;
		});

		self.portfolioDataReady = ko.observable(false);

		var fetchPortfolioData = function (ignoreCache) {
			var d = $.Deferred();

			//if (!self.portfolioDataReady()) {
			//	loader.show();
			//}

			//self.dataFetched(false);
			dataContext.portfolio.get('', {}, ignoreCache).done(function (result) {
				var items = ko.unwrap(result);
				if (router.activeItem() == self && (!items || items.length <= 1) && justLoggedIn) {
					router.navigate('#quotes');
				}
				justLoggedIn = false;
				self.groupList = result;
				self.gridOptions.data = result;
				self.expiryQuantity(0);
				self.expiryTodayQuantity(0);
				self.hasTodayExpiration(false);
				$.each(self.groupList(), function (groupIndex, group) {
					group.strategyGraphPath = group.strategyGraphPath || ko.observable('');
					if (group.isStockGroup()) {
						group.strategyGraphPath('StockBuy');
					} else {
						if (group.quantity() > 0) {
							group.strategyGraphPath(group.strategy() + 'Buy');
						} else {
							group.strategyGraphPath(group.strategy() + 'Sell');
						}
					}

					$.each(group.items(), function (index, item) {
						//var cost = group.quantity();
						if (!item.isStock()) {
							if (item.expiresInTwoDays()) {
								self.expiryQuantity(self.expiryQuantity() + 1);
								if (item.expiresToday()) {
									self.expiryTodayQuantity(self.expiryTodayQuantity() + 1);
									self.hasTodayExpiration(true);
								}
							}
						}
						item.autoExerciseInstruction = ko.observable();
					});
				});
				self.portfolioDataReady(true);
			}).always(function () {
				self.dataFetched(true);
				loader.hide();
				d.resolve();
			});

			return d.promise();
		};

		//TODO: move to autoExercise logic to separate module
		var fetchAutoExerciseData = function () {
			var d = $.Deferred();

			loader.showUnobtrusive();

			dataContext.autoExerciseData.get().done(function (items) {
				self.autoExerciseInstructions = items;
				$.each(self.groupList(), function (groupIndex, group) {
					$.each(group.items(), function (index, item) {
						$.each(self.autoExerciseInstructions(), function (ind, instruction) {
							if (item.optionNumber() && item.optionNumber() === instruction.contractNumber() && item.optionSide() === 'L') {
								var newInstruction = instruction;
								newInstruction.contractName(item.optionName());
								newInstruction.optionType = ko.observable(item.optionTypeFormatted());
								newInstruction.optionAvailableQuantity = ko.observable(item.optionAvailableQuantity());
								newInstruction.autoExerciseInstructionStatus = ko.computed(function () {
									if (newInstruction.exercisingQuantity() === 0) {
										return 0;
									}
									if (newInstruction.exercisingQuantity() > 0 && newInstruction.exercisingQuantity() < item.optionAvailableQuantity()) {
										return 1;
									}
									if (newInstruction.exercisingQuantity() === item.optionAvailableQuantity()) {
										return 2;
									}
									return 0;
								});
								newInstruction.exercisingStrategyValue.extend({ required: true, number: true, maxLength: 2 });
								if (typeof(item.autoExerciseInstruction) == 'undefined') {
									item.autoExerciseInstruction = ko.observable();
								}
								item.autoExerciseInstruction(newInstruction);
							}
						});
					});
				});
			}).always(function () {
				loader.hideUnobtrusive();

				d.resolve();
			});

			return d.promise();
		};

		var createCombination = function (portfolio, chains) {
			var legs;
			if (portfolio.strategy) {
				legs = portfolio.items();
			} else {
				legs = [portfolio];
			}
			var positions = legs.map(function (leg) {
				var row = chains.findRow(leg.optionNumber());
				return {
					buyOrSell: ko.unwrap(leg.optionSideEnum),
					legType: ko.unwrap(leg.optionTypeEnum),
					quantity: Math.abs(leg.optionHoldingQuantity ? leg.optionHoldingQuantity() : leg.adjustedBalance()),
					expiry: row ? row.expiryDate : null,
					strikePrice: row ? row.strikePrice : null,
					costBasis: Math.abs(leg.adjustedRealtimeCostBasis())
				};
			});

			var combination = new Combination(portfolio.underlyingCode(), positions);

			var stockPriceHigherBound = self.portfolioPLGraphOptions.stockPriceHigherBound();
			var stockPriceLowerBound = self.portfolioPLGraphOptions.stockPriceLowerBound();

			var noOfPoints = Math.min(200, (stockPriceHigherBound - stockPriceLowerBound) / 0.1);

			combination.chart = new CombinationChart(combination, noOfPoints);

			return combination;
		};

		this.kendowWindowOpen = function (data) {
			var windowObject = data.sender;
			var headerElement = windowObject.wrapper.find('.k-window-titlebar');
			if (!ko.dataFor(headerElement[0])) {
				headerElement.parent().addClass('exercise-instructions-window');
				var headerTemplate = $('#' + windowObject.options.headerTemplate).html();
				headerElement.html(headerTemplate);
				ko.applyBindings(self, headerElement[0]);
			}

			var template = $('#' + windowObject.options.template).html();
			windowObject.element.html(template);
			//if (!ko.dataFor(windowObject.element.children()[0])) {
				ko.applyBindings(self, windowObject.element.children()[0]);
			//}
			kendoWindow.centralizeWindow(data);
		};

		this.autoExerciseInstructionWindowOptions = $.extend(kendoWindow.baseOptions(), {
			template: 'autoExerciseInstructionsTemplate',
			headerTemplate: 'autoExerciseInstructionsHeaderTemplate',
			actions: ['close'],
			open: self.kendowWindowOpen
		});
		
		this.strategyOptions = $.extend(dropDownList().baseOptions(), {
			data: ko.observableArray([
			{ key: 'portfolio.autoExercise.strategyTypes.strategyType1', value: '1' },
			{ key: 'portfolio.autoExercise.strategyTypes.strategyType2', value: '2' },
			{ key: 'portfolio.autoExercise.strategyTypes.strategyType3', value: '3' }])
		});

		this.quantityOptions = {
			min: 0,
			decimals: 0,
			format: '#',
			step: 1,
			value: ''
		};

		this.thresholdOptions = {
			min: 0,
			decimals: 2,
			format: '#.00',
			step: 0.01,
			value: ''
		};

		this.expandRow = function (viewmodel) {
			var selector = ('tr[data-collapsable=true][data-parent={0}]').replace('{0}', viewmodel.id());
			self.grid().tbody.find(selector).show();
			viewmodel.expanded(true);
		};

		this.collapseRow = function (viewmodel) {
			var selector = ('tr[data-collapsable=true][data-parent={0}]').replace('{0}', viewmodel.id());
			self.grid().tbody.find(selector).hide();
			viewmodel.expanded(false);
		};

		this.gridOptions = $.extend(grid.baseOptions(), {
			data: self.groupList,
			resizable: true,
			rowTemplate: 'portfolioGridRowTemplate',
			scrollable: true,

			dataBound: function (event) {
				if (self.dataFetched()) {
					grid.showLabelIfEmpty(event);
				}

				if (self.gridBound()) {
					return;
				}
				self.grid(event.sender);
				self.gridBound(true);
				setTimeout(self.toggleColumns, 1);
			}
		});

		this.contextMenuOptions = {
			currentItem: ko.observable(),
			targets: '#portfolioGrid tbody tr',
			width: '260px',

			beforeOpen: function (e) {
				var portfolioItem = ko.contextFor(e.target).$data;
				portfolioItem.typeIsGroup = ko.observable(portfolioItem instanceof PortfolioItemGroupModel);
				self.contextMenuOptions.currentItem(portfolioItem);
			},

			itemSelect: function (e) {
				var position = self.contextMenuOptions.currentItem();
				var orderTicket;
				var $item = $(e.item);
				if ($item.hasClass('exercise')) {
					self.exercisePosition(position);
				} else if ($item.hasClass('closePosition')) {
					self.closePosition(position);
				} else if ($item.hasClass('closeComplex')) {
					self.closeComplexPosition(position);
				} else if ($item.hasClass('viewUnderlyingChart')) {
					console.log('You selected: "View Underlying Chart"');
				}
			}
		};

		this.portfolioPLGraphOptions = {
			combination: ko.observable(null),
			portfolio: ko.observable(null),
			stockPriceLowerBound: ko.observable(0),
			stockPriceHigherBound: ko.observable(205),
			chartPriceRange: ko.observable([30, 170]),
			sentiments: ko.computed(function () {
				var that = self.portfolioPLGraphOptions;
				if (that) {
					var value = that.combination().sentiments().join(' ');
					return value;
				}
				return null;
			}),
			visible: ko.observable(false),
		};

		this.plGraphWindowOptions = $.extend({}, kendoWindow.baseOptions(), {
			isOpen: self.portfolioPLGraphOptions.visible
		});

		this.closePosition = function (portfolio) {
			if (portfolio.strategy) {
				self.closeComplexPosition(portfolio);
				return;
			}
			var isCovered = portfolio.isCovered();
			var stockBiz = isCovered
					? '405'
					: portfolio.optionSide() === 'L'
							? '401'
							: '403';
			var orderInformation = {
				optionNumber: portfolio.optionNumber(),
				orderType: '133', // Market order FOK by default
				orderQuantity: Math.abs(portfolio.optionAvailableQuantity()),
				isCovered: isCovered,
				stockBiz: stockBiz
			};

			events.trigger(events.OrderEntry.PREFILL_ORDER, orderInformation);
		};

		this.closePositionFromPLGraph = function () {
			var portfolio = this.portfolio();
			self.closePosition(portfolio);
			this.visible(false);
		};

		function closeBuySell(position) {
			switch (position.optionSide()) {
				case 'L': return enums.SELL;
				case 'S': return enums.BUY;
				case 'C': return enums.BUY;
				default: return null;
			}
		}
		function closeStockBiz(position) {
			switch (position.optionSide()) {
				case 'L': return '401';
				case 'S': return '403';
				case 'C': return '405';
				default: return null;
			}
		}
		this.closeComplexPosition = function (group) {
			var positions = group.items().filter(function (item) {
				return !item.isStock();
			}).map(function (item) {
				return {
					buyOrSell: closeBuySell(item),
					legType: ko.unwrap(item.optionTypeEnum),
					quantity: Math.abs(item.optionAvailableQuantity()),
					expiry: new Date(item.expiry.date() + formatting.CHINA_TIME_ZONE),
					strikePrice: item.strikePrice(),
					isCovered: item.optionSide() == 'C',
					orderQuantity: Math.abs(item.optionAvailableQuantity()),
					stockBiz: closeStockBiz(item),
					optionNumber: item.optionNumber(),
					orderType: '133'
				}
			});
			
			var combination = new Combination(group.underlyingCode(), positions);

			$.when(combination.ready).done(function () {
			    events.trigger(events.OrderEntry.PREFILL_ORDER, positions, combination, combination.absQuantity());
			});
		};

		this.showAutoExerciseInstructions = function (item) {
			self.selectedItem(item);
			if (item.autoExerciseInstruction()) {
				self.currentAutoExerciseInstructions(ko.mapping.fromJS(ko.toJS(item.autoExerciseInstruction())));
				self.quantityOptions.value = self.currentAutoExerciseInstructions().exercisingQuantity;
				self.strategyOptions.value = self.currentAutoExerciseInstructions().exercisingStrategyType;
				self.thresholdOptions.value = self.currentAutoExerciseInstructions().exercisingStrategyValue;
				$("#autoExerciseInstructions").data("kendoWindow").open();
			}
		};
		
		this.closeAutoExerciseInstructions = function () {
		    $("#autoExerciseInstructions").data("kendoWindow").close();
		},

		this.submitAutoExerciseInstructions = function (item) {
		    dataContext.autoExerciseData.post('update', self.currentAutoExerciseInstructions())
				.done(function () {
				    self.selectedItem().autoExerciseInstruction().exercisingQuantity(self.currentAutoExerciseInstructions().exercisingQuantity());
				    self.selectedItem().autoExerciseInstruction().exercisingStrategyType(self.currentAutoExerciseInstructions().exercisingStrategyType());
				    self.selectedItem().autoExerciseInstruction().exercisingStrategyValue(self.currentAutoExerciseInstructions().exercisingStrategyValue());
				    $("#autoExerciseInstructions").data("kendoWindow").close();
				});
		},

		this.autoExercisePosition = function () {
		    dataContext.autoExerciseData.post('update', self.currentAutoExerciseInstructions())
				.done(function () {
				    $("#exerciseInstructions").data("kendoWindow").close();
				});
		},

		this.generatePremium = function () {
		    console.log('Generating premium...');
		},

        this.toggleColumnText = ko.observable('GREEKS');

		this.toggleColumns = function () {
			var costBasisColumns = [
				'optionRealtimeCostBasis',
				'lastPrice',
				'optionFloatingPL',
				'optionMarketValue',
				'optionMargin'
			];
			var greeksColumns = [
				'greekDelta',
				'greekGamma',
				'greekTheta',
				'greekVega',
				'greekRho'
			];

			if (self.details()) {
				// Greeks
				if (self.groupList().length <= 1) {
					return;
				}

				costBasisColumns.forEach(function (i) {
					self.grid().hideColumn(i);
				});

				greeksColumns.forEach(function (i) {
					self.grid().showColumn(i);
				});

				self.details(false);
				self.toggleColumnText('成本');
			} else {
				// Cost Basis
				costBasisColumns.forEach(function (i) {
					self.grid().showColumn(i);
				});

				greeksColumns.forEach(function (i) {
					self.grid().hideColumn(i);
				});

				self.details(true);
				self.toggleColumnText('GREEKS');
			}
		};


		this.togglePortfolioPLGraph = function (portfolio) {
			if (portfolio == self.portfolioPLGraphOptions.portfolio()) {
				self.portfolioPLGraphOptions.visible(true);
				return;
			}
			if (self.portfolioPLGraphOptions.visible()) {
				self.portfolioPLGraphOptions.combination(null);
				self.portfolioPLGraphOptions.visible(false);
				return;
			}

			loader.show();
			var underlying = portfolio.underlyingCode();

			self.dataFetched(false);
			dataContext.optionChains.get(underlying).done(function (chains) {
				var combination = createCombination(portfolio, chains);
				self.portfolioPLGraphOptions.portfolio(portfolio);
				self.portfolioPLGraphOptions.visible(true);
				self.portfolioPLGraphOptions.combination(combination);
			}).always(function () {
				self.dataFetched(true);
				loader.hide();
			});
		};

		this.exercisePosition = function (position) {
			//if (position.adjustedAvailableQuantity() > 0) {
				var orderTicket = {
					optionNumber: position.optionNumber(),
					optionCode: position.optionCode(),
					orderQuantity: position.optionAvailableQuantity()
				};
				events.trigger(events.OrderEntry.EXERCISE, orderTicket);
			//}
		};

		this.resetColumnWidth = function () {
			$('.k-grid col').css('width', '');
			$('.k-grid table').css('width', '');
		};

		function updatePortfolio(ignoreCache) {
			fetchPortfolioData(ignoreCache).pipe(fetchAutoExerciseData);
		}

		events.on(events.Portfolio.REFRESH, function () {
			updatePortfolio(true);
		});
		
		this.activate = function () {
			updatePortfolio();
		};

		this.attached = function () {
			// note: toggleColumns after view attached to DOM, to avoid exceptions when hide/show columns.
			
			//self.toggleGridGrouping();
		};
	}

	// note: use singlenton for view models of portfolio view. It will not be udpated in any case.
	return ViewModel;
});
