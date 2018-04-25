define(['knockout',
		'modules/grid',
		'modules/notifications',
		'loader',
		'knockout-kendo'],
function (ko, grid, notifications, loader) {
	var self = {};

	function processData(response) {
		var strategies = response.data;
		ko.utils.arrayForEach(strategies, function (strategy, index) {
			strategy.cssClass = index % 2
				? 'even'
				: '';
			strategy.detailsAreVisible = ko.observable(false);
		});
		return strategies;
	}

	var URL = 'api/strategies';

	var kendoGridOptions = grid.kendoGridWithPagingOptions(URL, processData);
	self.kendoGridOptions = kendoGridOptions;

	self.toggleDetails = function (strategy) {
		var inverseValue = !strategy.detailsAreVisible();
		strategy.detailsAreVisible(inverseValue);
	};

	// todo: implement common method with strategy deletion
	self.deleteStrategy = function (strategy, event) {
		// todo: implement beautiful confirm dialog
		var result = confirm('Are you sure that you want to delete this strategy?');
		if (!result) {
			return;
		}

		loader.show();
		$.ajax(URL + '/' + strategy.id, {
			type: 'DELETE'
		}).done(function () {
			grid.deleteRow(event, strategy, 'Strategy');
		}).fail(function () {
			// todo: display correct error message if strategy has not been found
			notifications.error();
		}).always(function () {
			loader.hide();
		});
	};

	return self;
});