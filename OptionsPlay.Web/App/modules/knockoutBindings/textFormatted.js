define(['knockout',
		'modules/formatting'],
function (ko, formatting) {
	/**
	* Read-only (one-way) binding to easily format numeric/date fields. This binding uses our own formatting engine. 
	* Supports knockout virtual elements
	* Examples: 
	*	<span data-bind="textFormatted: dateValueOrObservable, format: { type: 'date', dateFormat: 'T dd yyyy' }" />
	*	<span data-bind="textFormatted: currencyValueOrObservable, format: 'currency'" />
	*	<!-- ko textFormatted: someValueOrObservable, format: 'percentage' --><!-- /ko -->
	* Available options:
	*	'currency';
	*	'percentage' ( format: { type: 'percentage', signed: true } or format: 'percentage' );
	*	'volume';
	*	'date' (format: { type: 'date', dateFormat: 'T dd yyyy' }, or format: 'date')
	*	and custom format string supported by kendo. @see kendo docs for additional details
	*	@link http://docs.telerik.com/kendo-ui/getting-started/framework/globalization/dateformatting
	*	@link http://docs.telerik.com/kendo-ui/getting-started/framework/globalization/numberformatting
	*	e.g. <span data-bind="textFormatted: valueOrObservable, format: '##'" />
	*/
	ko.bindingHandlers.textFormatted = {
		init: ko.bindingHandlers.text.init,
		update: function (element, valueAccessor, allBindings, viewModel) {
			var value = ko.utils.unwrapObservable(valueAccessor());
			var options = allBindings().format || {};
			var formattedValue = formatting.customFormat(value, options);

			function customValueAccessor() {
				return formattedValue;
			}

			ko.bindingHandlers.text.update.call(this, element, customValueAccessor, allBindings, viewModel);
		}
	};
	ko.virtualElements.allowedBindings.textFormatted = true;
	return ko;
});