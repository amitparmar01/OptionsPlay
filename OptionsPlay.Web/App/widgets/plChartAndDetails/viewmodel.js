define([
	'knockout',
	'modules/formatting',
	'jquery',
	'modules/combinationChart',
	'koBindings/chartBindings'
],
function (ko, formatting, $, CombinationChart) {
	function PLChartAndTable() {

		this.activate = function (settings) {
			var combination = settings.combination;
			this.stockPriceLowerBound = settings.stockPriceLowerBound || combination.stockPriceLowerBound;
			this.stockPriceHigherBound = settings.stockPriceHigherBound || combination.stockPriceHigherBound;
			this.chartPriceRange = settings.chartPriceRange || combination.chartPriceRange;

			this.combination = combination;

			this.chartModel = ko.observable();

		}

		this.attached = function () {
			var chartModel = new CombinationChart(this.combination);
			this.stockPriceLowerBound && (chartModel.stockPriceLowerBound = this.stockPriceLowerBound);
			this.stockPriceHigherBound && (chartModel.stockPriceHigherBound = this.stockPriceHigherBound);
			this.chartPriceRange && (chartModel.chartPriceRange = this.chartPriceRange);
			this.chartModel(chartModel);
		}

	}

	return PLChartAndTable;
})