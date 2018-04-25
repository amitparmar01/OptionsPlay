define(['knockout',
		'komapping',
		'plugins/router',
		'modules/notifications',
		'addToValidationContext',
		'modules/baseForm',
		'loader',
		'modules/validation/notEqualTo'],
function (ko, koMapping, router, notifications, addToValidationContext, baseForm, loader) {
	function StrategyGroup(initialData) {
		// inherit from 'BaseForm'
		baseForm.call(this, initialData.formCaption);
		var self = this;

		this.addToValidationContext = addToValidationContext;

		this.submit = function (form) {
			var strategyGroup;
			if (!$(form).valid()) {
				return;
			}

			strategyGroup = new window.FormData(form);
			loader.show();
			$.ajax('strategyGroupsManager/' + initialData.submitMethod, {
				type: 'POST',
				data: strategyGroup,
				contentType: false,
				processData: false
			}).done(function (data) {
				if (data.success) {
					router.navigate('#/strategy/group/all');
				} else {
					self.errorMessages(data.errorMessages);
					$('#mainContainer').animate({ scrollTop: $(document).height() }, 0);
				}
			}).fail(function () {
				notifications.error();
			}).always(function () {
				loader.hide();
			});
		};

		this.activate = function (id) {
			var url = initialData.getUrl(id);
			var ajaxResponse = $.get(url).done(function (data) {
				var viewModel;
				viewModel = koMapping.fromJS(data);
				$.extend(self, viewModel);
				self.errorMessages.removeAll();
			}).fail(function () {
				notifications.error();
			});

			return ajaxResponse;
		};
	}

	return StrategyGroup;
});