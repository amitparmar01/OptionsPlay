define(['knockout',
		'modules/configurations',
		'modules/notifications'],
function (ko, configurations, notifications) {
	var self = {};

	self.showLabelIfEmpty = function (data) {
		var gridObject = data.sender;
		var body = gridObject.tbody;
		if (gridObject.dataSource.total() === 0) {
			if (gridObject.options.noDataTemplate) {
				body.empty();
				var template = $('#' + gridObject.options.noDataTemplate).html();
				var content = body.prepend(template);
				ko.applyBindings(self, content.children()[0]);
			}
		}
	};

	self.baseOptions = function () {
		var baseOptions = {
			useKOTemplates: true,
			async: true,
			noDataTemplate: 'noDataTemplate',
			dataBound: function (data) {
				self.showLabelIfEmpty(data);
			}
		};
		return baseOptions;
	};

	self.kendoGridWithPagingOptions = function (url, processData) {
		var dataSchema = processData
			? processData
			: 'data';
		var options = {
			// empty array is passed in order to prevent redundant error log in console
			data: [],
			dataSource: {
				transport: {
					read: url
				},
				schema: {
					data: dataSchema,
					total: 'total'
				},
				pageSize: configurations.App.gridPageSize(),
				serverPaging: true
			},
			rowTemplate: 'rowTemplate',
			pageable: true,
			scrollable: false,
			useKOTemplates: true,
		};
		return options;
	};

	// deletes row from kendo grid
	self.deleteRow = function (event, entity, entityName) {
		var srcElement = event.target || event.srcElement;
		var table = $(srcElement).closest('[data-role=grid]');
		var rows = table.find('> tbody > tr:not(.details-row)');
		for (var i = 0; i < rows.length; i++) {
			var row = $(rows[i]);
			if (row.find(srcElement).length) {
				var kendoGrid = table.data('kendoGrid');
				var dataSource = kendoGrid.dataSource;
				var rowToDelete = dataSource.at(i);
				dataSource.remove(rowToDelete);
				notifications.success(entityName + ' <strong>' + entity.name + '</strong> has been deleted');
				break;
			}
		}
		if (rowToDelete === undefined) {
			notifications.error(entityName + '<strong>' + entity.name + '</strong> has not been found');
		}
	};

	return self;
});
