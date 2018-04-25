define(['knockout', 'modules/localizer'],
function (ko, localizer) {
	var DropDownList = function () {
		var self = {};

		self.control = null;

		self.changeLanguageSubscription = localizer.activeLocale.subscribe(function () {
			if (self.control) {
				self.control.setDataSource(self.control.dataSource._data);
			}
		});


		self.baseOptions = function () {
			return {
				dataTextField: 'option',
				dataValueField: 'value',
				async: true,
				dataBound: function (data) {
					self.control = data.sender;

					ko.utils.domNodeDisposal.addDisposeCallback(self.control.ul, function () {
						changeLanguageSubscription.dispose();
					});
				},

				dataBinding: function (data) {
					var source = data.sender.dataSource._data;
					if (source.length > 0) {
						$.each(source, function (index, element) {
							if (element.key) {
								element.option = localizer.localize(element.key);
							}

						});
					}
				}
			};
		};

		return self;
	};

	return DropDownList;
});
