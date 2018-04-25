define(['knockout',
		'jquery',
		'isotope',
		'modules/combinationChart',
		'highstock'],
function (ko, $, Isotope) {
	'use strict';

	ko.bindingHandlers.plChart = {
		init: function (element, valueAccessor, allBindings) {
			var chartModel = ko.unwrap(valueAccessor());
			var updating = allBindings().updating;
			chartModel.renderChartTo(element);
			var combinationSubscription =
					chartModel.combination.summary.subscribe(function () {
						chartModel.renderChartTo(element);
					});
			var updatingSubscription = null;
			if (ko.isObservable(updating)) {
				updatingSubscription = updating.subscribe(function () {
					chartModel.updateChart();
				});
			}
			ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
				chartModel.destroy();
				combinationSubscription.dispose();
				updatingSubscription && updatingSubscription.dispose();
			});
		}
	};

	var isotopeLiveOptions = ['filter', 'sortBy', 'sortAscending', 'layoutMode', 'itemSelector'];
	ko.bindingHandlers.isotope = {
		init: function (element, valueAccessor) {
			var options = ko.unwrap(valueAccessor());
			var initOptions = {};
			for (var option in options) {
				if (options.hasOwnProperty(option)) {
					initOptions[option] = ko.unwrap(options[option]);
				}
			}
			element.isotopeObj = new Isotope(element, initOptions);
			var itemsSub;
			if (ko.isObservable(options.items)) {
				itemsSub = options.items.subscribe(function () {
					var updatedOptions = {};
					for (var option in options) {
						if (options.hasOwnProperty(option)) {
							updatedOptions[option] = ko.unwrap(options[option]);
						}
					}
					element.isotopeObj.destroy();
					element.isotopeObj = new Isotope(element, updatedOptions);
				});
			}
			ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
				element.isotopeObj.destroy();
				itemsSub && itemsSub.dispose();
				delete element.isotopeObj;
			});
		},
		update: function (element, valueAccessor) {
			var options = ko.unwrap(valueAccessor());

			var updatedOptions = {};
			for (var option in options) {
				if (options.hasOwnProperty(option)) {
					updatedOptions[option] = ko.unwrap(options[option]);
				}
			}
			element.isotopeObj.arrange(updatedOptions);
			
		}
	};
});