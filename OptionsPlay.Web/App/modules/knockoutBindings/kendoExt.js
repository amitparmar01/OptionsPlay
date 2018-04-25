define(['jquery',
		'knockout',
		'modules/notifications',
		'kendo',
		'kendo-plugins',
		'knockout-kendo'],
function ($, ko, notification) {

	//TODO: Add jsdoc
	ko.bindingHandlers.kendoExtContextMenu = {
		init: function (element, valueAccessor) {
			var options = ko.utils.unwrapObservable(valueAccessor());
			$(element).kendoExtContextMenu(options);
		}
	};

	ko.virtualElements.allowedBindings.kendoExtContextMenu = true;

	ko.bindingHandlers.kendoGlobalNotification = {
		init: function (element, valueAccessor) {
			var options = ko.utils.unwrapObservable(valueAccessor());
			var notificationControl = $(element).kendoNotification(options).data('kendoNotification');
			notification.setNotificationModule(notificationControl);
		}
	};

	ko.bindingHandlers.kendoSpinner = {
		update: function (element, valueAccessor) {
			var value = ko.utils.unwrapObservable(valueAccessor());
			window.setTimeout(function () {
				kendo.ui.progress($(element), !value);
			});
		}
	};

	var oldMenu = ko.bindingHandlers.kendoMenu;

	ko.bindingHandlers.kendoMenu = {
		init: function (element) {
			oldMenu.init.apply(this, arguments);
			setTimeout(function () {
				$(element).show();
				var kendoMenu = $(element).data('kendoMenu');
				kendoMenu.bind('select', function () {
					kendoMenu.close();
				});
			});
		},
		update: oldMenu.update
	};

	return ko;
});