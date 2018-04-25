define(['knockout',
		'jquery'],
function (ko, $) {
	ko.bindingHandlers.slideVisible = {
		init: function (element, valueAccessor) {
			// Get the current value of the current property we're bound to
			var value = ko.utils.unwrapObservable(valueAccessor());
			// jQuery will hide/show the element depending on whether "value" or true or false
			$(element).toggle(value);
		},
		update: function (element, valueAccessor) {
			// Whenever the value subsequently changes, slowly slide the element down or up
			var value = valueAccessor();
			if (ko.utils.unwrapObservable(value)) {
				$(element).slideDown(500); // Make the element visible
			} else {
				$(element).slideUp(500); // Make the element invisible
			}
		}
	};

	return ko;
});