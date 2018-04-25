(function (undefined) {
	var oldFunction = window.getComputedStyle;
	if (oldFunction) {
		window.getComputedStyle = function (el) {
			if (el === document) {
				return undefined;
			} else {
				return oldFunction.apply(window, arguments);
			}
		};
	}
})();