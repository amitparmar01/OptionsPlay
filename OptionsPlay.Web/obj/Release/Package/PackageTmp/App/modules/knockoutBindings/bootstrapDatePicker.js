define(['knockout',
		'bootstrap-datepicker'],
function (ko) {
	'use strict';

	function addDays(date, days, isEndOfDay) {
		var result = new Date(date);
		days = isEndOfDay ? days + 1 : days;
		result.setDate(date.getDate() + days);
		return result;
	}

	function setValue(valueAccessor, $element, date) {
		var value = valueAccessor();
		if (!ko.isObservable(value) || !$element.data().datepicker) {
			return;
		}
		var options = $element.data().datepicker._o;
		var defaultOffset = options.defaultOffset;
		var endDate = options.endDate;

		if (isNaN(+date)) {
			if (defaultOffset) {
				date = addDays(new Date(), defaultOffset);
			} else {
				value(null);
				return;
			}
		} else {
			if (endDate && date > endDate) {
				date = endDate;
			}
		}

		date = new Date(date.setHours(0, 0, 0, 0));
		value(date);
		// set value for datepicker input. if added to prevent recursion call
		if ($element.datepicker('getDate') === '' || $element.datepicker('getDate').getTime() !== date.getTime()) {
			$element.datepicker('setDate', date);
		}
	}

	ko.bindingHandlers.datepicker = {
		init: function (element, valueAccessor, bindingsAccessor) {

			var options = ko.computed(function () {
				var defaults = {
					autoclose: true,
					format: 'mm/dd/yyyy',
					todayHighlight: true,
				};
				var result = $.extend({}, defaults);
				var parameters = bindingsAccessor().datepickerOptions;

				for (var property in parameters) {
					result[property] = ko.unwrap(parameters[property]);
				}

				if (!result.endDate || !Object.prototype.toString.call(result.endDate) === '[object Date]') {
					delete result.endDate;
				}

				if (result.availablePeriod && typeof result.availablePeriod === 'number') {
					result.endDate = addDays(new Date(), result.availablePeriod);
				}

				if (result.endDate) {
					result.endDate = new Date(result.endDate.setHours(0, 0, 0, 0));
				}

				if (result.startDate) {
					result.startDate = new Date(result.startDate.setHours(0, 0, 0, 0));
				}

				if (result.displayFormat) {
					result.format = result.displayFormat;
					delete result.displayFormat;
				}

				var $element = $(element);
				$element.datepicker(result);

				var date = ko.utils.unwrapObservable(valueAccessor());
				setValue(valueAccessor, $element, date);

				return result;
			});

			function setObservable(event) {
				var date = event.date || new Date(element.value);
				setValue(valueAccessor, $(element), date);
			}

			ko.utils.registerEventHandler(element, 'changeDate', setObservable);
			ko.utils.registerEventHandler(element, 'change', setObservable);

			ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
				options.dispose();
			});
		},

		update: function (element, valueAccessor) {
			var $element = $(element);

			var date = ko.utils.unwrapObservable(valueAccessor());
			if (date) {
				setValue(valueAccessor, $element, date);
			}
		}
	};
});