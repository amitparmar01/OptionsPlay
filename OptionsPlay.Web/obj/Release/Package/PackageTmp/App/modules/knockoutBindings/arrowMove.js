define(['knockout',
		'jquery'],
function (ko, $) {
	ko.bindingHandlers.arrowMove = {
		init: function (element, valueAccessor) {
			element.lastPriceVal = ko.unwrap(valueAccessor());
		},
		update: function (element, valueAccessor, allBindings) {
			var highBound = ko.unwrap(allBindings().highBound) || 0;
			var lowBound = ko.unwrap(allBindings().lowBound) || 100;
			var lastPriceVal = ko.unwrap(allBindings().lastPriceVal) || 50;
			var valuetest = (lastPriceVal - lowBound) / (highBound - lowBound) * 100;
			$(element).css("left", valuetest + '%');
		}
	};

	return ko;
});