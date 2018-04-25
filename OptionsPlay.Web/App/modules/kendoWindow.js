define(['jquery'],
function ($) {
	var self = {};

	self.centralizeWindow = function (e) {
		var $wrapper = e.sender.wrapper;
		var width = $wrapper.width();
		if (width) {
			var height = $wrapper.height() + 100;
			$wrapper.css('margin-left', -width / 2);
			$wrapper.css('margin-top', -height / 2);
		}
	};

	self.baseOptions = function () {
		var baseOptions = {
			visible: false,
			actions: ['Close'],
			modal: true,
			position: {
				left: '50%',
				top:'50%'
			},
			open: self.centralizeWindow
		};
		return baseOptions;
	};

	return self;
});
