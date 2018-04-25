define(function () {
	function SubmitButton() {
		var self = this;

		this.activate = function (settings) {
			// 'value' attribute of submit button
			self.value = settings.value;
		};
	}

	return SubmitButton;
});