define(['knockout',
		'komapping',
		'plugins/router',
		'modules/notifications',
		'addToValidationContext',
		'modules/baseForm',
		'loader',
		'modules/validation/onlyOneSecurityLeg'],
function (ko, koMapping, router, notifications, addToValidationContext, baseForm, loader) {
	// 'isNew' is set to 'true' is user clicks on 'Add Strategy Leg' button
	function StrategyLeg(isNew) {
		if (isNew) {
			this.id = ko.observable();
			this.buyOrSell = ko.observable();
			this.quantity = ko.observable();
			this.strike = ko.observable();
			this.expiry = ko.observable();
			this.legType = ko.observable();
		}

		//#region 'name' and 'id' attr values of 'Strategy Leg' properties

		this.legIdName = function (index) {
			var name = 'Legs[' + index() + '].Id';
			return name;
		};

		this.legTypeName = function (index) {
			var name = 'Legs[' + index() + '].LegType';
			return name;
		};

		this.buyOrSellName = function (index) {
			var name = 'Legs[' + index() + '].BuyOrSell';
			return name;
		};

		this.quantityName = function (index) {
			var name = 'Legs[' + index() + '].Quantity';
			return name;
		};

		this.expiryName = function (index) {
			var name = 'Legs[' + index() + '].Expiry';
			return name;
		};

		this.strikeName = function (index) {
			var name = 'Legs[' + index() + '].Strike';
			return name;
		};

		//#endregion 'name' and 'id' attr values of 'Strategy Leg' properties
	}

	function Strategy(initialData) {
		// inherit from 'BaseForm'
		baseForm.call(this, initialData.formCaption);
		var self = this;

		this.addToValidationContext = addToValidationContext;

		this.addLeg = function () {
			var newLeg = new StrategyLeg(true);
			self.legs.push(newLeg);
		};

		this.deleteLeg = function (leg) {
			self.legs.remove(leg);
		};

		// remove validation erros for leg types if necessary
		this.legTypeChanged = function (strategyLeg, event) {
			var legTypes = $('.strategy-leg select[name*=LegType]');
			for (var i = 0; i < legTypes.length; i++) {
				if (legTypes[i].value === 'Security') {
					var srcElement = event.target || event.srcElement;
					var form = $(srcElement).closest('form');
					$(form).validate().element(legTypes[i]);
					return;
				}
			}
		};

		this.submit = function (form) {
			if (!$(form).valid()) {
				return;
			}

			var strategy = ko.toJSON(self);
			strategy = JSON.parse(strategy);
			loader.show();
			$.ajax('api/strategies', {
				type: initialData.type,
				data: strategy
			}).done(function () {
				router.navigate('#/strategy/all');
			}).fail(function (data, error, errorType) {
				// todo: fail handler is not working properly
				var errorMessage, errorMessages, propName;
				self.errorMessages.removeAll();
				if (errorType !== 'Bad Request') {
					notifications.error();
				} else {
					errorMessages = JSON.parse(data.responseText);
					for (propName in errorMessages) {
						errorMessage = errorMessages[propName];
						if (errorMessage) {
							self.errorMessages.push(errorMessage);
						}
					}
					if (self.errorMessages().length) {
						$('#mainContainer').animate({ scrollTop: $(document).height() }, 0);
					} else {
						notifications.error();
					}
				}
				self.loading(false);
			})
			.always(function () {
				loader.hide();
			});
		};

		this.activate = function (id) {
			var url = initialData.getUrl(id);
			var ajaxResponse = $.get(url).done(function (data) {
				var viewModel = koMapping.fromJS(data);
				$.extend(self, viewModel);
				ko.utils.arrayForEach(self.legs(), function (leg) {
					$.extend(leg, new StrategyLeg());
				});
				self.errorMessages.removeAll();
			}).fail(function () {
				notifications.error();
			});

			return ajaxResponse;
		};
	}

	return Strategy;
});