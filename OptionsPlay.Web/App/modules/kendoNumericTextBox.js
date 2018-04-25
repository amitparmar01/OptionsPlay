define(['jquery'],
function ($) {
	var self = {};

	self.onSpin = function (e) {
		var $wrapper = e.sender.wrapper;
	};

	self.baseOptions = function () {
		var baseOptions = {
			spin: self.onSpin
		};
		return baseOptions;
	};

	return self;
});
