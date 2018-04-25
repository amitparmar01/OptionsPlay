define(['knockout'],
function (ko) {
	ko.bindingHandlers.redGreen = {
		update: function (element, valueAccessor, allBindings, viewModel) {
			var value = ko.utils.unwrapObservable(valueAccessor());

			return ko.bindingHandlers.css.update.call(this, element, function () {
				return {
					'bullish-red': value > 0,
					'bearish-green': value < 0,
					'black': value == 0
				}
			}, allBindings, viewModel);
		}
	};
	ko.virtualElements.allowedBindings.textFormatted = true;

	return ko;
});