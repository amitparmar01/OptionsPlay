define(function () {
	var self = {};

	var loader = '#loader';
	var loaderUnobtrusive = '#routerIsNavigatingIndicator';

	function disableAnyKeyDown(event) {
		event.preventDefault();
		return false;
	}

	self.show = function () {
		$(document.activeElement).blur();
		$(window).on('keydown', disableAnyKeyDown);

		$(loader).show();
	};

	self.hide = function () {
		$(window).off('keydown', disableAnyKeyDown);
		$(loader).hide();
	};

	self.showUnobtrusive = function () {
		$(loaderUnobtrusive).show();
	};

	self.hideUnobtrusive = function () {
		$(loaderUnobtrusive).hide();
	};

	return self;
});
