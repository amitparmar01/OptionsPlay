define(['knockout',
		'modules/enums',
		'events',
		'modules/combinationViewModel',
		'modules/combinationHelpers'],
function (ko, enums, events, Combination, combinationHelpers) {

	var StrategyComparison = function (strategiesPage) {
		var self = this;

		this.comparedCombinations = ko.observableArray([]);
		this.strategiesPage = strategiesPage;
		this.edittedCombination = ko.observable(null);

		this.stockPriceLowerBound = strategiesPage.stockPriceLowerBound;
		this.stockPriceHigherBound = strategiesPage.stockPriceHigherBound;
		this.chartPriceRange = strategiesPage.chartPriceRange;
		this.addToComparison = function (combination) {
			if (self.comparedCombinations.indexOf(combination) < 0 && self.comparedCombinations().length < 3) {
				var comb = combinationHelpers.cloneCombination(combination);
				self.comparedCombinations.push(comb);
				if (self.comparedCombinations().length == 3) {
					strategiesPage.showComparison(true);
				}
				return comb;
			}
			return null;
		};

		this.removeFromComparison = function (combination) {
			if (combination == self.edittedCombination()) {
				self.edittedCombination(null);
			}
			combination.dispose();
			self.comparedCombinations.remove(combination);
			if (self.comparedCombinations().length < 1) {
				strategiesPage.showComparison(false);
			}
		};

		this.removeAll = function () {
			self.edittedCombination(null);
			self.comparedCombinations.removeAll();
			strategiesPage.showComparison(false);
		};

		this.toggleComparison = function () {
			if (self.comparedCombinations().length < 1) {
				strategiesPage.showComparison(false);
			} else {
				strategiesPage.showComparison(!strategiesPage.showComparison());
			}
		};

		this.prefillOrder = function (combination) {
			var legs = combinationHelpers.extractOrderEntries(combination);
			events.trigger(events.OrderEntry.PREFILL_ORDER, legs, combination);
		};

		this.editCombination = function (comb) {
			self.edittedCombination(comb);
		};

		events.on(events.Funnel.UL_CHANGED, function () {
			self.removeAll();
		});

		events.on(events.Funnel.GO_TO_BOTTOM, function (combination) {
			self.comparedCombinations.removeAll();
			var comb = self.addToComparison(combination);
			self.edittedCombination(comb);
			strategiesPage.showComparison(true);
		});
	};

	return StrategyComparison;

});