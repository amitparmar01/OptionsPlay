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
function ($, ko, localizer, DropDownList, events, dataContext, orderEnums, kendoWindow, context, combinationHelpers,notifications ) {

	var self = {};
	self.getMaxLockUnlockQuantity = function(){};
	self.isLoadingOptionsInfo = ko.observable(false);
	var stockBusinessCandidates = [
			{ key: 'trade.stockBizOptions.buyToOpen', value: '400' },
			{ key: 'trade.stockBizOptions.sellToClose', value: '401' },
			{ key: 'trade.stockBizOptions.sellToOpen', value: '402' },
			{ key: 'trade.stockBizOptions.buyToClose', value: '403' },
			{ key: 'trade.stockBizOptions.openCoveredCall', value: '404' },
			{ key: 'trade.stockBizOptions.closeCoveredCall', value: '405' }
			//{ option: localizer.localize('trade.stockBizOptions.lockSecurity'), value: '408' },
			//{ option: localizer.localize('trade.stockBizOptions.unlockSecurity'), value: '409' }
	];

	var coveredBusiness = { '404': true, '405': true };
	var nonCoveredBusiness = { '400': true, '401': true, '402': true, '403': true };
	var priceNeededOrderTypes = { '130': true, '131': true, '132': true };

	var orderTypeOptions = ko.observableArray([
		{ key: 'trade.orderTypeOptions.limitGFD', value: '130' },
		{ key: 'trade.orderTypeOptions.limitFOK', value: '131' },
		{ key: 'trade.orderTypeOptions.marketToLimitGFD', value: '132' },
		{ key: 'trade.orderTypeOptions.marketFOK', value: '133' },
		{ key: 'trade.orderTypeOptions.marketIOC', value: '134' }
	]);
	
	var optionNumberDataSource = new kendo.data.DataSource({
		serverFiltering: true,
		transport: {
			read: {
				url: function () {
					var filterValue = this.data.filter.filters[0].value;
					return 'api/marketdata/getoptions/' + filterValue;
				},
				dataType: 'json'
			}
		}
	});
	var securityCodeDataSource = new kendo.data.DataSource({
		serverFiltering: true,
		transport: {
			read: {
				url: function () {
					var filterValue = this.data.filter.filters[0].value;
					return 'api/marketdata/getcompanies/' + filterValue;
				},
				dataType: 'json'
			}
		}
	});

	function OrderLeg(optionNumber, stockBusiness, orderQuantity, orderPrice, orderType) {
		var that = this;
		that.optionNumber = ko.observable(optionNumber);
		that.optionName = ko.observable();
		that.securityCode = ko.observable('');
		that.securityName = ko.observable('');
		that.orderQuantity = ko.observable(orderQuantity || 1);
		that.orderPrice = ko.observable(orderPrice || 0.0001);
		that.stockBusiness = ko.observable(stockBusiness || '400');
		that.orderType = ko.observable(orderType || '130');
		that.maxOrderQuantity = ko.observable(0);
		that.optionType = ko.observable();
		that.option = ko.observable(null);

		that.multiplier = ko.observable();
		
		that.orderPriceMin = ko.observable(0.0001);
		that.orderPriceMax = ko.observable();

		that.success = ko.observable(false);
		that.fail = ko.observable(false);
		that.errorMessage = ko.observable('');
		that.submitting = ko.observable(false);
		that.isChecked = ko.observable(true);

		that.optionNumber.subscribe(function (newVal) {
			self.isLoadingOptionsInfo(true);
			if (!!newVal) {
				dataContext.optionTradingInfo.get(newVal).done(function(option){
					that.option(option);
					that.optionName(option.name());
					that.orderPriceMin(option.limitDownPrice());
					that.orderPriceMax(option.limitUpPrice());
					that.optionType(option.TypeOfOption);
					that.multiplier(option.optionUnit());
					that.securityCode(option.optionUnderlyingCode());
					that.securityName(option.optionUnderlyingName());
				}).fail(function (error) {
				    console.log(localizer.localize('trade.incorrectOptionNumber'));
				    console.log(error.responseJSON.message.substring(error.responseJSON.message.indexOf('Message:') + 9));
					that.option(null);
					self.isLoadingOptionsInfo(false);
				});
			} else {
				that.optionName(undefined);
				that.orderPriceMin(0.0001);
				that.orderPriceMax(undefined);
				that.optionType(undefined);
				that.option(null);
				that.multiplier(undefined);
				that.securityCode('');
				that.securityName('');
				self.isLoadingOptionsInfo(false);
			}
			
		});

		that.isCovered = ko.observable(false);

		that.stockBusinessOptions = ko.computed(function () {
			var candidates = that.isCovered() ? coveredBusiness : nonCoveredBusiness;
			setTimeout(function () {
				var stkBiz = that.stockBusiness();
				if (that.isCovered()) {
					if (!(stkBiz in coveredBusiness)) {
						that.stockBusiness('404');
					}
				} else {
					if (stkBiz in coveredBusiness) {
						that.stockBusiness('400');
					}
				}
			}, 0);
			return stockBusinessCandidates.filter(function (item) {
				return item.value in candidates;
			});
		});

		that.selectedStockBusinessName = ko.computed(function () {
			return orderEnums.StockBusinessDic[that.stockBusiness()];
		});

		that.orderTypeName = ko.computed(function () {
			return orderEnums.OrderTypeDic[that.orderType()];
		});

		that.priceNeeded = ko.computed(function () {
			var ot = that.orderType();
			return (ot in priceNeededOrderTypes);
		});

		that.orderPriceText = ko.computed(function () {
			if (that.priceNeeded()) {
				return that.orderPrice();
			} else {
				return localizer.localize('trade.marketPrice');
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
		
		that.kendoStockBusiness = $.extend(new DropDownList().baseOptions(), {
			data: that.stockBusinessOptions,
			value: that.stockBusiness
		});

		that.kendoOrderTypeOptions = $.extend(new DropDownList().baseOptions(), {
			data: orderTypeOptions,
			value: that.orderType
		});

		that.kendoOrderPrice = {
			value: that.orderPrice,
			decimals: 4,
			format: '#.0000',
			step: 0.0001,
			min: that.orderPriceMin,
			max: that.orderPriceMax,
			enabled: that.priceNeeded
		};
		that.kendoOrderQuantity = {
			value: that.orderQuantity,
			decimals: 0,
			format: '#',
			step: 1,
			min: 0,
			max: that.maxOrderQuantity
		};
		that.kendoOrderQuantityForMulti = {
		    value: that.orderQuantity,
		    decimals: 0,
		    format: '#',
		    step: 1,
		    min: 1
		}

		var lastOrderTicket = {
			optionNumber: '',
			stockBusiness: '',
			orderPrice: '',
			orderType: '130'
		};

		that.getMaxOrderQuantity = function () {
			var data = {
				optionNumber: ko.unwrap(that.optionNumber),
				stockBusiness: ko.unwrap(that.stockBusiness),
				orderPrice: ko.unwrap(that.orderPrice),
				orderType: ko.unwrap(that.orderType),
				securityCode: ko.unwrap(that.securityCode)
			};
			var valid = JSON.stringify(lastOrderTicket) != JSON.stringify(data);
			for (var n in data) {
				valid &= !!data[n];
				if (!!data[n]) {
					lastOrderTicket[n] = data[n];
				}
			}
			if (valid) {
				dataContext.order.post('maxOrderQuantity', data).done(function (result) {
					that.maxOrderQuantity(result.orderQuantity);
				});
			}
			setTimeout(that.getMaxOrderQuantity, 1000);
		};

		that.plainData = ko.computed(function () {
		    var data = {
                isChecked: ko.unwrap(that.isChecked),
				optionNumber: ko.unwrap(that.optionNumber),
				orderQuantity: ko.unwrap(that.orderQuantity),
				orderPrice: ko.unwrap(that.orderPrice),
				stockBusiness: ko.unwrap(that.stockBusiness),
				orderType: ko.unwrap(that.orderType),
				securityCode: ko.unwrap(that.securityCode)
			};

			that.getMaxOrderQuantity();
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

	function LockUnlockOrder() {
		var that = this;
		that.securityCode = ko.observable('');
		that.securityName = ko.observable('');

		that.valid = ko.observable(false);

		that.securityCodeAutoComp = {
			data: securityCodeDataSource,
			dataTextField: 'securityCode',
			suggest: true,
			autoBind: true,
			minLength: 0,
			template: '<span>#: securityCode #	#: securityName #</span>',
			value: that.securityCode,
			dataBound: function (e) {
				e.sender.list.width(220);
			}
		};

		that.securityCode.subscribe(function (newVal) {
			that.maxLockQuantity(0);
			that.maxUnlockQuantity(0);
			dataContext.quotation.get(newVal).done(function (data) {
				that.valid(true);
				that.getMaxLockUnlockQuantity();
				that.securityName(data.securityName);
			}).fail(function () {
				that.valid(false);
			});
		});

		that.maxLockQuantity = ko.observable(0);
		that.maxUnlockQuantity = ko.observable(0);
		that.orderQuantity = ko.observable(0);

		that.kendoOrderQuantity = {
			value: that.orderQuantity,
			decimals: 0,
			format: '#',
			step: 100,
			min: 0,
			// spin: onSpinOrderQuantity,
			// change:onChangeOrderQuantity
		};

		// function onSpinOrderQuantity(){
		// 	var it = this;
		// 	that.orderQuantity(it.element.attr("aria-valuenow"));
		// 	console.log("spin:" + that.orderQuantity());
		// }

		// function onChangeOrderQuantity(){
		// 	var it = this;
		// 	that.orderQuantity(it.element.attr("aria-valuenow"));
		// 	console.log("change:" + that.orderQuantity());
		// }

		that.lockMax = function () {
			that.orderQuantity(that.maxLockQuantity());
		};

		that.unlockMax = function () {
			that.orderQuantity(that.maxUnlockQuantity());
		};

		self.getMaxLockUnlockQuantity = that.getMaxLockUnlockQuantity = function () {
			if (that.valid()) {
				var data = {
					stockBusiness: '408',
					orderType: '100',
					securityCode: ko.unwrap(that.securityCode)
				};
				dataContext.order.post('maxOrderQuantity', data).done(function (result) {
					that.maxLockQuantity(result.orderQuantity);
				}).fail(function () {
					that.orderQuantity(0);
				});
				data.stockBusiness = '409';
				dataContext.order.post('maxOrderQuantity', data).done(function (result) {
					that.maxUnlockQuantity(result.orderQuantity);
					self.submittingOrder(false);
					if($(".k-i-close")){
						$(".k-i-close").parent().show();	
					}
				}).fail(function () {
					that.orderQuantity(0);
				});
			}
		};
	};

	self.orderLegs = ko.observableArray([new OrderLeg()]);
	self.edittedLeg = ko.observable(self.orderLegs()[0]);

	self.emptyLegForMulti = ko.observable(new OrderLeg());

	self.lockUnlockOrder = new LockUnlockOrder();
	
	self.removeLeg = function (leg) {
		if (self.orderLegs().length > 1){
			self.orderLegs.remove(leg);
			if (self.edittedLeg() == leg) {
				self.edittedLeg(self.orderLegs()[0]);
			}
		}
	};

	self.editLeg = function (leg) {
		self.edittedLeg(leg);
	};

	self.confirmWindow = ko.observable(false);
	self.submittingOrder = ko.observable(false);



	self.submitOrder = function () {
	    var change;
	    var noConfirmWhenPlaceOrderInStore = window.localStorage.getItem("noConfirmWhenPlaceOrderInStore");
	    if ((noConfirmWhenPlaceOrderInStore == "false") || (noConfirmWhenPlaceOrderInStore == null) || (noConfirmWhenPlaceOrderInStore == ""))
	    { change = true; } else { change = false; }
	  
	    if (change) {

	        var legs = self.orderLegs();
	        var valid = true;
	        legs.forEach(function (item) {
	        valid &= item.valid();
	        });
	        if (valid) {
	            self.confirmWindow(true);
	        }

	    } else {
	        self.confirmAndSubmit();
	    }
	}



	
	self.confirmAndSubmit = function () {
	   
		self.submittingOrder(true);
		var originalOrderLegs = self.orderLegs().length;
		var promises = self.orderLegs().map(function (leg) {
			var data = leg.plainData();
			leg.submitting(true);
			leg.success(false);
			leg.fail(false);
			if (data.isChecked) {
			    return dataContext.order.post('submit', data).done(function () {
			        leg.success(true);
			    }).fail(function (error) {
			        if (error && error.responseJSON && error.responseJSON.message) {
			            leg.errorMessage(error.responseJSON.message.substring(error.responseJSON.message.indexOf('Message:') + 9));
			        }
			        leg.fail(true);
			    }).always(function () {
			        leg.submitting(false);
			    });
			}
			else
			{
			    leg.submitting(false);
			    leg.success(false);
			    leg.fail(false);
			}
		});
		return $.when.apply(self, promises).done(function () {
			if (self.orderLegs().length > 1) {
				//self.orderLegs.splice(1, self.orderLegs().length - 1);
			    //events.trigger(events.Bottom.IS_SHOWN, false);
			    notifications.success(localizer.localize('trade.orderSuccessfully'));
				setTimeout(self.closeConfirmWindow, 2000);
			} else {
				self.closeConfirmWindow();
			}
		}).fail(function (error) {
			if (self.orderLegs().length == 1) {
				if (error && error.responseJSON && error.responseJSON.message) {
					console.log(error.responseJSON.message.substring(error.responseJSON.message.indexOf('Message:') + 9));
				}
				self.closeConfirmWindow();
			}
		}).always(function () {
			self.closeExerciseWindow();
			events.trigger(events.Bottom.INTRADAY_REFRESH);
			events.trigger(events.Bottom.INTRADAY_EXERCISES_REFRESH);
			self.closeConfirmWindow();
		});
	};
	self.closeConfirmWindow = function () {
		self.confirmWindow(false);
		self.submittingOrder(false);
		self.orderLegs().forEach(function (leg) {
			leg.submitting(false);
			leg.success(false);
			leg.fail(false);
			leg.errorMessage('');
		});
	};

	self.kendoConfirmWindow =  $.extend(kendoWindow.baseOptions(), {
			isOpen: self.confirmWindow,
			title: localizer.localize('trade.confirm'),
			resizable: true,
	    //width: ko.computed(function () { return self.orderLegs().length > 1 ? 450 : 300; }),
			width: ko.computed(function () { return self.orderLegs().length > 1 ? 650 : 300; }),
			open: function (e) {
			    //e.sender.wrapper.width(self.orderLegs().length > 1 ? 450 : 300);
			    e.sender.wrapper.width(self.orderLegs().length > 1 ? 650 : 300);
				kendoWindow.centralizeWindow(e);
			}
	});

	self.exerciseWindowShown = ko.observable(false);
	self.kendoExerciseWindow = $.extend(kendoWindow.baseOptions(), {
		isOpen: self.exerciseWindowShown,
		title: localizer.localize('trade.exercise'),
		resizable: true,
		width: 250
	});
	
	self.lockUnlockWindowOpen = ko.observable(false);
	self.lockUnlockSharesWindowOptions = $.extend(kendoWindow.baseOptions(), {
		isOpen: self.lockUnlockWindowOpen,
		title: localizer.localize('trade.lockUnlockShares'),
		width: 250
	});

	self.openLockUnlockWindow = function () {
		if (!self.lockUnlockOrder.securityCode()) {
			self.lockUnlockOrder.securityCode(context.symbolCode());
		}
		self.lockUnlockWindowOpen(true);
		self.getMaxLockUnlockQuantity();
	};

	self.lockUnlockShares = function (lockOrUnlock) {

		self.submittingOrder(true);
		if($(".k-i-close")){
			$(".k-i-close").parent().hide();	
		}
		
		if (lockOrUnlock === "refresh") {
			self.getMaxLockUnlockQuantity();
		}else{
			if(self.lockUnlockOrder.orderQuantity()<=0 || !self.lockUnlockOrder.orderQuantity()){
				notifications.error(localizer.localize('trade.nonZeroMessage'));
				self.closeLockUnlockWindow();
		        return;			
			}


		var data = {
			quantity: self.lockUnlockOrder.orderQuantity(),
			securityCode: ko.unwrap(self.lockUnlockOrder.securityCode)
			};

			dataContext.order.post('shares/' + lockOrUnlock, data).done(function () {
			    notifications.success(localizer.localize('trade.orderSuccessfully'));
			}).always(function () {
				self.closeLockUnlockWindow();
				self.submittingOrder(false);
			});
		}
	};

	self.closeLockUnlockWindow = function () {
		self.lockUnlockWindowOpen(false);
	}

	self.closeExerciseWindow = function () {
		self.exerciseWindowShown(false);
	};

	self.cancelMultipleLeg = function () {
		self.orderLegs.splice(1, self.orderLegs().length - 1);
		self.orderLegs()[0].optionNumber(null);
		self.combination(null);
	};

	function fillSingleLeg(paras, leg) {
		leg.optionNumber(paras.optionNumber);
		leg.orderType(paras.orderType || orderEnums.OrderTypes.MARKET_FOK);
		leg.maxOrderQuantity(paras.orderQuantity || 1);
		leg.orderQuantity(paras.orderQuantity || 1);
		paras.orderPrice && leg.orderPrice(paras.orderPrice);
		leg.isCovered(paras.isCovered || false);
		leg.stockBusiness(paras.stockBiz || '400');
		leg.getMaxOrderQuantity();
	}

	self.combination = ko.observable(null);
	self.combinationMaxQuantity = ko.observable(0);
	self.combinationQuantity = ko.computed({
		read: function () {
			var result = 1, value = 1;
			var maxValue = Math.min.apply(this, self.orderLegs().map(function (l) { return l.orderQuantity(); }));
			while (++value <= maxValue) {
				var dividable = true;
				self.orderLegs().forEach(function (leg) {
					dividable = leg.orderQuantity() % value == 0;
				});
				if (dividable) {
					result = value;
				}
			}
			return result;
		},
		write: function (newQty) {
			newQty = parseInt(newQty);
			if (newQty < 1) {
				return;
			}
			var combinationQty = self.combinationQuantity();
			self.orderLegs().forEach(function (leg) {
				var currentQty = leg.orderQuantity();
				leg.orderQuantity(parseInt(currentQty * newQty / combinationQty));
			});
			self.combination().absQuantity(newQty);
		}
	}, self).extend({ rateLimit: 0 });

	self.stockBusinessName = ko.computed(function () {
		var leg = self.orderLegs()[0];
		if (self.combination()) {
			var openOrClose = orderEnums.OpenStockBizes[leg.stockBusiness()]
				? 'Open'
				: orderEnums.CloseStockBizes[leg.stockBusiness()]
				? 'Close' : 'Unknown';
			var result = self.combination().buyOrSell().toLowerCase() + 'To' + openOrClose;
			return result;
		}
		return leg.selectedStockBusinessName();
	});

	self.multiOrderLegsNonChecked = ko.computed(function () {
	    if (self.orderLegs().length > 1) {
	        var count = 0;
	        self.orderLegs().forEach(function (leg) {
	            if (leg.isChecked()) {
	                count++;
	            }
	        });
	        if (count > 0) {
	            self.submittingOrder(false);
	        }
	        else {
	            self.submittingOrder(true);
	        }
	    }
	});

	self.combinationQuantityOptions = {
		value: self.combinationQuantity,
		format: '#',
		step: 1,
		min: 1,
		max: self.combinationMaxQuantity,
		spin: function (e) {
			self.combinationQuantity(e.sender.value());
			console.log(this.value());
		}
	};
	events.on(events.OrderEntry.PREFILL_ORDER).then(function (orderTicket, combination, maxQuantity) {	    
		if (self.combination()) {
			self.combination().dispose();
			self.combination(null);
		}
		self.orderLegs.splice(1, self.orderLegs().length - 1);
		if ($.isArray(orderTicket)) {
			orderTicket.forEach(function (legParas, i) {
				if (legParas.orderQuantity > 0) {
					var leg = self.orderLegs()[i];
					if (typeof(leg) === 'undefined') {
						leg = new OrderLeg();
						fillSingleLeg(legParas, leg);
						self.orderLegs.push(leg);
					} else {
						fillSingleLeg(legParas, leg);
					}
				}
			});
			self.combinationMaxQuantity(maxQuantity);
			self.combination(combinationHelpers.cloneCombination(combination));
		} else {
			var leg = self.orderLegs()[0];
			fillSingleLeg(orderTicket, leg);
		}
		if (orderTicket.length > 1) {
		    self.confirmWindow(true);
		    return;
		}
		$("#OrdersnewTab").click();
	});

	events.on(events.OrderEntry.EXERCISE).then(function (orderTicket) {
		var order = self.orderLegs()[0];
		order.optionNumber(orderTicket.optionNumber);
		order.orderType(orderEnums.OrderTypes.SUBMIT_ORDER);
		order.orderQuantity(orderTicket.orderQuantity);
		if (orderTicket.optionCode.indexOf('C') >= 0) {
			order.stockBusiness(orderEnums.StockBusinesses.EXERCISE_CALL);
		} else if (orderTicket.optionCode.indexOf('P') >= 0) {
			order.stockBusiness(orderEnums.StockBusinesses.EXERCISE_PUT);
		}
		self.exerciseWindowShown(true);
	});
	


	return self;
});