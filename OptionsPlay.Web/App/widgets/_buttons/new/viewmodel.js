define(function () {
	function NewButton() {
		var self = this;

		this.activate = function (settings) {
			self.href = settings.href;
			self.name = settings.name;
		};
	}

	return NewButton;
});