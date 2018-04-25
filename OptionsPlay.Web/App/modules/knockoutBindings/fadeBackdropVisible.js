define(['knockout'], function (ko) {

	function updateFadeBackdrop(element, valueAccessor) {
		// Whenever the value subsequently changes, slowly fade the element in or out
		var value = valueAccessor();
		if (!$(element).hasClass('fixed')) {
			$(element).width($(element).parent().width());
			$(element).height($(element).parent().height());
		}

		if (ko.unwrap(value)) {
			$(element).removeClass('invisible');
			$(element).addClass('in');
		} else {
			$(element).removeClass('in');
			$(element).addClass('invisible');
		}
	}

	// A custom Knockout binding that makes elements shown/hidden via jQuery's fadeIn()/fadeOut() methods
	ko.bindingHandlers.fadeBackdropVisible = {
		init: function (element, valueAccessor) {
			$(element).addClass('fade');
			function paceDone() {
				updateFadeBackdrop(element, valueAccessor);
			}

			window.Pace && Pace.on('done', paceDone);
		},
		update: updateFadeBackdrop
	};

	return ko;
});