define(['knockout',
		'jquery'],
function (ko, $) {
	ko.bindingHandlers.changeFlash = {
		init: function (element, valueAccessor) {
			element.changeFlashOldValue = ko.unwrap(valueAccessor());
		},
		update: function (element, valueAccessor, allBindings) {
			var increaseCss = ko.unwrap(allBindings().increaseCss) || 'increaseCss';
			var decreaseCss = ko.unwrap(allBindings().decreaseCss) || 'decreaseCss';
			var flashDelay = ko.unwrap(allBindings().flashDelay) || 2000;
			var newVal = ko.unwrap(valueAccessor());
			var oldVal = element.changeFlashOldValue;
			element.changeFlashOldValue = newVal;
			if (newVal - oldVal > 0.0001) {
				$(element).removeClass(decreaseCss);
				$(element).addClass(increaseCss);
				setTimeout(function () {
					$(element).removeClass(increaseCss);
				}, flashDelay);
			} else if (newVal - oldVal < -0.0001) {
				$(element).removeClass(increaseCss);
				$(element).addClass(decreaseCss);
				setTimeout(function () {
					$(element).removeClass(decreaseCss);
				}, flashDelay);
			}
		}
	};

	return ko;
});