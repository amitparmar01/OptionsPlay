define(['knockout',
		'modules/context',
		'modules/enums',
		'modules/strategyHelpers',
		'modules/combinationChart',
		'modules/combinationEditor',
		'modules/notifications'],
function (ko, context, enums, strategyHelpers, combinationChartFactory, CombinationEditor, notifications) {

	var IncomeStrategies = function (strategyContext) {
		var self = this;

		var PositionType = enums.LegType;
		var coveredCalls = null;
		var phpContext = context;

		this.incomeCall = ko.observable();
		this.incomePut = ko.observable();
		this.showEditorIncomeCombination = ko.observable(null);
		this.shares = ko.observable();
		this.costBasis = ko.observable();
		this.activeIncomeStrategy = ko.observable(null);
		this.sharesToWrite = ko.observable('');

		this.showIncomeCall = function () {
			var isCombinationSet = updateIncomeStrategiesCandidates(enums.LegType.CALL);
			if (!isCombinationSet) {
				notifications.info(self.symbol() + " doesn't have any optimal covered call.");
			}
		};
		this.showIncomePut = function () {
			var isCombinationSet = updateIncomeStrategiesCandidates(enums.LegType.PUT);
			if (!isCombinationSet) {
				notifications.info(self.symbol() + " doesn't have any optimal covered call.");
			}
		};

		var putIncomeCombination = {
			combination: this.incomePut,
			legType: PositionType.PUT,
			showIncomeComb: this.showIncomePut
		};

		var callIncomeCombination = {
			combination: this.incomeCall,
			legType: PositionType.CALL,
			showIncomeComb: this.showIncomeCall
		};

		this.incomeCombinations = [callIncomeCombination, putIncomeCombination];

		this.hasOption = strategyContext.hasOption;
		this.isTradable = strategyContext.isTradable;
		this.symbol = strategyContext.symbol;
		//todo: remove this dependency
		this.tradeTicket = strategyContext.tradeTicket;

		this.tradeCombination = function (combination) {
			strategyContext.tradeCombination(combination);
		};

		this.editIncomeCombination = function (combination) {
			if (combination && combination != self.showEditorIncomeCombination()) {
				self.showEditorIncomeCombination(combination);
			} else {
				self.showEditorIncomeCombination(null);
			}
		};

		this.shares.subscribe(updateCostBasis);
		this.costBasis.subscribe(updateCostBasis);
		this.incomeCall.subscribe(updateCostBasis);
		this.positionInfo = null;

		function updateCostBasis() {
			// todo: saving model is a different responsibility. remove it from here
			if (self.positionInfo) {
				self.positionInfo.shares = self.shares();
				self.positionInfo.costBasis = self.costBasis();
				phpContext.savePositionInfo();
			}
			var incomeCall = self.incomeCall();
			if (!incomeCall || !strategyContext.chain) {
				return;
			}

			incomeCall.originalShares = self.shares();
			var sellCallPos = null, ownedSecPos = null, i = 0, positions = incomeCall.positions(), pos, buySecPos = null;

			for (i = 0; i < positions.length; i++) {
				pos = positions[i];
				if (pos.type() == PositionType.CALL && pos.quantity() < 0) {
					sellCallPos = pos;
				} else if (pos.type() == PositionType.SECURITY && pos.isOwned()) {
					ownedSecPos = pos;
				} else if (pos.type() == PositionType.SECURITY) {
					if (ownedSecPos) {
						buySecPos = pos;
					}
					ownedSecPos = ownedSecPos || pos;
				}
			}
			var optionQty = 1;
			var initialQty = strategyContext.chain.getSecurityQuantity(incomeCall.optionType);
			var securityQty = initialQty;
			var shares = self.shares();
			var securityCost = null;
			var manualPremium = false;
			var isOwned = false;
			if (shares) {
				optionQty = Math.floor(self.shares() / initialQty) || 1;
				securityQty = self.shares();
				securityCost = self.costBasis() || strategyContext.quote.ask() || strategyContext.quote.last();
				manualPremium = true, isOwned = true;
			}
			if (sellCallPos) {
				sellCallPos.absQuantity(optionQty);
			}
			if (ownedSecPos) {
				ownedSecPos.absQuantity(securityQty);
				ownedSecPos.costBasis(securityCost);
				self.costBasis() || self.costBasis(securityCost);
				ownedSecPos.isOwned(isOwned);
			}
			if (shares && shares < initialQty) {
				if (!buySecPos) {
					buySecPos = incomeCall.editorVM.addNewLeg(PositionType.SECURITY);
				}
				buySecPos.quantity(initialQty - self.shares());
				self.sharesToWrite('You need to buy another <b>' + buySecPos.quantity() + ' share' + (buySecPos.quantity() > 1 ? 's' : '') + ' </b> to write this covered call.');
			} else {
				self.sharesToWrite('');
				if (buySecPos) {
					incomeCall.removePosition(buySecPos);
				}
			}
			if (incomeCall.changed) {
				incomeCall.changed.notifySubscribers();
			}
		}

		function resetViewModel() {
			self.showEditorIncomeCombination(null);

			self.incomeCall() && self.incomeCall().dispose();
			self.incomePut() && self.incomePut().dispose();
			self.incomeCall(null);
			self.incomePut(null);

			self.shares(undefined);
			self.sharesToWrite('');
			self.costBasis(undefined);
			self.activeIncomeStrategy(null);

			coveredCalls = null;
		};

		function createIncomeCombinationViewModel(incomeStrategy) {
			var comb = strategyHelpers.assembleIncomeCombination(incomeStrategy, strategyContext.optionType(), strategyContext.quote, strategyContext.chain, strategyContext.stdDev, strategyContext.predictions, self.positionInfo);
			comb.editorVM = new CombinationEditor(comb);
			// TODO: hack. Income combinations logic should be refactored
			var oldReset = comb.editorVM.reset;
			comb.editorVM.reset = function () {
				oldReset();
				updateCostBasis();
			}
			comb.incomeChartVM = combinationChartFactory.createChartViewModel(comb);

			return comb;
		}


		function setIncomeStrategyByType(coveredCallsFiltered, type) {
			var matched = ko.utils.arrayFirst(coveredCallsFiltered, function (cc) {
				return cc.legType.toUpperCase() === type;
			});
			if (!matched) {
				return false;
			}
			var observable = type === enums.LegType.CALL ? self.incomeCall : self.incomePut;
			var combinationViewModel = createIncomeCombinationViewModel(matched);
			observable(combinationViewModel);
			return true;
		}

		function updateIncomeStrategiesCandidates(typeToSet) {

			if (typeToSet === enums.LegType.CALL) {
				self.incomeCall(null);
			} else if (typeToSet === enums.LegType.PUT) {
				self.incomePut(null);
			} else {
				self.incomeCall(null);
				self.incomePut(null);
			}
			// set first strategy if user picked up 'Show more aggressive';
			if (typeToSet) {
				return setIncomeStrategyByType(coveredCalls, typeToSet);
			}

			// set only optimals by default
			var optimals = ko.utils.arrayFilter(coveredCalls, function (cc) {
				return cc && cc.riskTolerance === 'Optimal';
			});

			if (optimals.length > 0) {
				setIncomeStrategyByType(optimals, enums.LegType.CALL);
				setIncomeStrategyByType(optimals, enums.LegType.PUT);
				return true;
			}
			return false;
		};

		this.updateViewModel = function (callOptimal, putOptimal) {
			resetViewModel();

			var positionInfo = phpContext.positionInfo();
			self.shares(positionInfo.shares);
			self.costBasis(positionInfo.costBasis);
			self.positionInfo = positionInfo;
			if (positionInfo.shares) {
				self.activateIncomeStrategy(true);
			}

			coveredCalls = [putOptimal, callOptimal];
			updateIncomeStrategiesCandidates();
		};

		this.activeIncomeStrategy.subscribe(function (newValue) {
			if (!newValue || newValue.combination() !== self.showEditorIncomeCombination()) {
				self.showEditorIncomeCombination(null);
			}
		});

		this.activateIncomeStrategy = function (hasShares) {
			if (hasShares) {
				self.activeIncomeStrategy(callIncomeCombination);
			} else {
				self.activeIncomeStrategy(putIncomeCombination);
			}
			self.showEditorIncomeCombination(null);
		};

		this.hasShares = ko.computed(function () {
			var activeIncomeStrategy = self.activeIncomeStrategy();
			if (!activeIncomeStrategy) {
				return null;
			}

			return activeIncomeStrategy === callIncomeCombination;
		});

		this.expandedIncomeCombination = ko.observable(null);
		this.expandIncomeCombination = function (combination) {
			if (!self.activeIncomeStrategy() || combination !== self.activeIncomeStrategy().combination()) {
				return;
			}

			combination.expandedChart = combinationChartFactory.createChartViewModelExpanded(combination);
			self.expandedIncomeCombination(combination);
		}

		this.closeExpandedIncomeCombination = function () {
			if (self.expandedIncomeCombination()) {
				var comb = self.expandedIncomeCombination();
				comb.expandedChart && comb.expandedChart.destroy();
				comb.expandedChart = null;
				self.expandedIncomeCombination(null);
			}
		};

		this.hasOptimal = ko.computed(function () {
			var allUndefined = ko.utils.arrayFirst(self.incomeCombinations, function (c) {
				return c.combination() != undefined;
			});
			return !!allUndefined;
		});

	}

	return IncomeStrategies;
});