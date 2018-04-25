define(['modules/localizer'],
function (localizer) {

	function Notification() {
		var SUCCESS_MESSAGE = 'app.notifications.success';
		var ERROR_MESSAGE = 'app.notifications.error';

		function stub() {
		}

		var popupNotification = {
			success: stub,
			error: stub,
			warning: stub,
			info: stub,
			show: stub
		};

		this.setNotificationModule = function (notificationModule) {
			popupNotification = notificationModule;
		};

		this.success = function (text) {
			if (!text) {
				popupNotification.success(localizer.localize(SUCCESS_MESSAGE));
				return;
			}
			popupNotification.success(text);
		};

		this.error = function (textOrResponse) {
			if (!textOrResponse) {
				popupNotification.error(localizer.localize(ERROR_MESSAGE));
				return;
			}
			if (textOrResponse.responseJSON && textOrResponse.responseJSON.message) {
				popupNotification.error(textOrResponse.responseJSON.message);
				return;
			}
			popupNotification.error(textOrResponse);
		};

		this.warning = function () {
			popupNotification.warning.apply(this, arguments);
		};

		this.info = function (textOrResponse) {
			popupNotification.info(textOrResponse);
		};

		this.show = function () {
			popupNotification.show.apply(this, arguments);
		};
	}

	var notification = new Notification();
	return notification;
});
