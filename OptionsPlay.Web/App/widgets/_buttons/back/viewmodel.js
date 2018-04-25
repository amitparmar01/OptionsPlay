define(function () {
	function BackButton() {
		var self = this;

		this.activate = function (settings) {
			self.href = settings.href;
		};
	}

	return BackButton;
});