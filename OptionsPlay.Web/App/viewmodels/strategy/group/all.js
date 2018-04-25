define(['modules/grid',
		'modules/notifications',
		'loader',
		'knockout-kendo'],
function (grid, notifications, loader) {
	var self = {};

	var URL = 'api/strategyGroups';

	var kendoGridOptions = grid.kendoGridWithPagingOptions(URL);
	self.kendoGridOptions = kendoGridOptions;

	// todo: implement common method with strategy deletion
	self.deleteStrategyGroup = function (strategyGroup, event) {
		// todo: implement beautiful confirm dialog
		var result = confirm('Are you sure that you want to delete this strategy group?');
		if (!result) {
			return;
		}

		loader.show();
		$.ajax(URL + '/' + strategyGroup.id, {
			type: 'DELETE'
		}).done(function () {
			grid.deleteRow(event, strategyGroup, 'Strategy Group');
		}).fail(function () {
			// todo: display correct error message if strategy group has not been found
			notifications.error();
		}).always(function () {
			loader.hide();
		});
	};

	return self;
});