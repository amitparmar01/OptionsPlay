define(['jquery',
		'knockout',
		'modules/localizer',
		'modules/dropDownList',
		'events',
		'dataContext',
		'modules/orderEnums',
		'modules/kendoWindow',
		'modules/context',
		'modules/combinationHelpers',
        'modules/notifications',
		'knockout-kendo'],
function ($, ko, localizer, DropDownList, events, dataContext, orderEnums, kendoWindow, context, combinationHelpers, notifications) {

	var self = {};

	var optionNumberDataSource = new kendo.data.DataSource({
		serverFiltering: true,
		transport: {
			read: {
				url: function () {
					var filterValue = this.data.filter.filters[0].value;
				    //return 'api/marketdata/getoptions/' + filterValue;
					return 'api/portfolio/getOptionPositions/' + filterValue;
				},
				dataType: 'json'
			}
		}
	});
	
	function ExerciseTicket(optionNumber, quantity) {
		var that = this;
		that.optionNumber = ko.observable(optionNumber);
		that.optionName = ko.observable();
		that.optionType = ko.observable();
		that.securityCode = ko.observable('');
		that.securityName = ko.observable('');
		that.orderQuantity = ko.observable(quantity || 1);
		that.maxOrderQuantity = ko.observable(0);

		that.multiplier = ko.observable();
		that.stockBusiness = ko.computed(function () {
			if (that.optionType() == 'P') {
				return '407';
			}
			return '406';
		});
		
		that.success = ko.observable(false);
		that.fail = ko.observable(false);
		that.errorMessage = ko.observable('');
		that.submitting = ko.observable(false);

		that.optionNumber.subscribe(function (newVal) {
			if (!!newVal) {
				dataContext.optionBasic.get(newVal).done(function (data) {
					if (data) {
						that.optionName(data.optionName);
						that.optionType(data.optionType);
						//that.option(null);
						that.multiplier(data.optionUnit);
						that.securityCode(data.optionUnderlyingCode);
						that.securityName(data.optionUnderlyingName);
						//dataContext.optionChains.get(data.optionUnderlyingCode).done(function (chains) {
						//	that.option(chains.findOption(newVal));
					    //});
						var param = {
						    optionNumber: ko.unwrap(that.optionNumber),
						    stockBusiness: ko.unwrap(that.stockBusiness),
						    //orderType: ko.unwrap(that.orderType)
						};
						dataContext.order.post('maxOrderQuantity', param).done(function (result) {
						    that.maxOrderQuantity(result.orderQuantity);
						});

					}
				}).fail(function () {
				    notifications.error(localizer.localize('trade.incorrectOptionNumber'));
					//that.option(null);
				});
			} else {
				that.optionName(undefined);
				that.optionType(undefined);
				//that.option(null);
				that.multiplier(undefined);
				that.securityCode('');
				that.securityName('');
			}
		});
		
		that.optionNumberAutoComp = {
			data: optionNumberDataSource,
			dataTextField: 'optionNumber',
			suggest: true,
			autoBind: true,
			minLength: 0,
			template: '<span>#: optionNumber #	#: optionName #</span>',
			value: that.optionNumber,
			dataBound: function (e) {
				e.sender.list.width(220);
			}
		};
		
		that.kendoOrderQuantity = {
		    value: that.orderQuantity,
			decimals: 0,
			format: '#',
			step: 1,
			min: 1,
			max: that.maxOrderQuantity
		};

		//var lastOrderTicket = {
		//	optionNumber: '',
		//	stockBusiness: '',
		//	//orderType: '100'
		//};

		//that.getMaxOrderQuantity = function () {
		//	var data = {
		//		optionNumber: ko.unwrap(that.optionNumber),
		//		stockBusiness: ko.unwrap(that.stockBusiness),
		//	    //orderType: ko.unwrap(that.orderType)
		//	};
		//	var valid = JSON.stringify(lastOrderTicket) != JSON.stringify(data);
		//	for (var n in data) {
		//		valid &= !!data[n];
		//		if (!!data[n]) {
		//			lastOrderTicket[n] = data[n];
		//		}
		//	}
		//	if (valid) {
		//		dataContext.order.post('maxOrderQuantity', data).done(function (result) {
		//			that.maxOrderQuantity(result.orderQuantity);
		//		});
		//	}
		//	setTimeout(that.getMaxOrderQuantity, 1000);
		//};

		that.plainData = ko.computed(function () {
			var data = {
				optionNumber: ko.unwrap(that.optionNumber),
				orderQuantity: ko.unwrap(that.orderQuantity),
				stockBusiness: ko.unwrap(that.stockBusiness),
				//orderType: ko.unwrap(that.orderType)
			};
			//that.getMaxOrderQuantity();
			return data;
		}, that).extend({ rateLimit: 0 });

		that.valid = ko.computed(function () {
			var data = this.plainData();
			var valid = true;
			for (var n in data) {
				valid &= !!data[n];
			}
			return valid;
		}, that);
	}

	self.exerciseTicket = new ExerciseTicket();
	
	self.submittingOrder = ko.observable();

	self.postExerciseTicket = function () {
		self.submittingOrder(true);
		var data = self.exerciseTicket.plainData();
		self.exerciseTicket.submitting(true);
		self.exerciseTicket.success(false);
		self.exerciseTicket.fail(false);
		return dataContext.order.post('exercise', data).done(function () {
		    notifications.success(localizer.localize('trade.exerciseSuccessfully'));
		    self.exerciseTicket.success(true);
		    self.exerciseTicket.optionNumber("");
		    self.exerciseTicket.maxOrderQuantity(0);
		    self.exerciseTicket.orderQuantity(1);
		}).fail(function (error) {
			if (error && error.responseJSON && error.responseJSON.message) {
				self.exerciseTicket.errorMessage(error.responseJSON.message.substring(error.responseJSON.message.indexOf('Message:') + 9));
			}
			self.exerciseTicket.fail(true);
		}).always(function () {
			self.exerciseTicket.submitting(false);
		});
	}

	return self;
});