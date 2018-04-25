define(['jquery', 'knockout', 'perfectScrollbar'], function ($, ko) {

	/**
	* Binding to perfectScrollbar.
	* You can trigger the scrollbar to scroll to top by toggle the observable that is bound to 'scrollTop'
	* Example:
	*	<div data-bind="perfectScrollbar: {suppressScrollX: true}, scrollTop: scrollTopFlag">
	*		...modal content
	*	</div>
	*	scrollTopFlag would be a observable in the viewmodel. It toggles between true and flase. The toggle will trigger scrollbar to scroll to top
	*/
	ko.bindingHandlers.perfectScrollbar = {
		init: function (element, valueAccessor) {
			var options = valueAccessor();
			$(element).perfectScrollbar(options);
		},

		update: function (element, valueAccessor, allBindings) {
			var scrollTopAccessor = allBindings.get('scrollTop');
			if (scrollTopAccessor) {
				var scrollTopValue = ko.unwrap(scrollTopAccessor);
				$(element).scrollTop(scrollTopValue);
				$(element).perfectScrollbar('update');
			}
		}
	};
});