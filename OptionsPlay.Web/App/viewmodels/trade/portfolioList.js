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
		'knockout-kendo',
        'modules/formatting',
        'modules/grid'],
function ($, ko, localizer, DropDownList, events, dataContext, orderEnums, kendoWindow, context, combinationHelpers, kendo, formatting, grid) {

    var tradeorderGrid = function () {
        var self = this;
        
        this.withdrawableOnly = ko.observable(true);
        this.portfolioListItems = ko.observableArray([]);

        this.selectedOrder = ko.observable(null);
        this.selectOrder = function (order) {
            self.selectedOrder(order);
        };
		
        self.loadPortfolio = function () {
            // console.log('INTRADAY_REFRESH');
        	// dataContext.portfolio.get().done(function (items) {
        	// 	var list = [];
        	// 	items().forEach(function (stockItem) {
        	// 		ko.unwrap(stockItem.items).forEach(function (optionItem) {
        	// 			if (optionItem.expiry && optionItem.adjustedAvailableQuantity > 0 && optionItem.expiry.totalNumberOfDaysUntilExpiry <= 1) {
        	// 				list.push(optionItem);
        	// 			}
        	// 		});
        	// 	});
        	// 	self.portfolioListItems(list);
        	// });
            dataContext.intradayExercises.get('', {}, true).done(function (res) {
                var list = [];
                res().forEach(function (item) {
                    var isWithdraw = item.isWithdraw() || !(item.orderStatusValue() in orderEnums.WithdrawableOrderStatuses);
                    item.isWithdraw(isWithdraw);
                    var o = new Object();
                    o.orderId = item.orderId();
                    o.orderTime = item.orderTime();
                    o.optionNumber = item.optionNumber();
                    o.optionName = item.optionName();
                    o.isWithdraw = item.isWithdraw();
                    o.buyOrSell = item.buyOrSell();
                    o.openOrClose = item.openOrClose();
                    o.orderPrice = item.orderPrice();
                    o.orderQuantity = item.orderQuantity();
                    o.matchedQuantity = item.matchedQuantity();
                    o.orderStatus = item.orderStatus();
                    o.optionType = item.optionType();
                    o.isCovered = item.isCovered();
                    o.orderType = item.orderType;
                    o.orderDate = item.orderDate();
                    o.optionSide = item.optionSide();
                    list.push(o);
                });
                self.portfolioListItems(list);
            }).always(function () {
                // self.gridReady(true);
                // self.pullingIntradayOrders(false);
            });
        };

        this.withdrawConfirm = ko.observable(false);

        events.on(events.Bottom.INTRADAY_EXERCISES_REFRESH, this.loadPortfolio);

        this.withdrawingSelected = ko.observable(false);
        this.withdrawSelected = function () {
            var order = self.selectedOrder();
            if (order) {
                if (!self.withdrawingSelected()) {
                    self.withdrawingSelected(true);
                    dataContext.order.post('cancel/' + ko.unwrap(order.orderId)).done(function (data) {
                        //alert(localizer.localize('trade.order') + ' ' + order.orderId() + ' ' + localizer.localize('trade.withdrawn'));
                        console.log(data);
                    }).fail(function (error) {
                        // notifications.error(localizer.localize('trade.withdraw') + ' ' + order.orderId + ' ' + localizer.localize('trade.failed'));
                        error.responseJSON && console.log(error.responseJSON.message);
                        console.log(error);
                    }).always(function () {
                        events.trigger(events.Bottom.INTRADAY_EXERCISES_REFRESH);
                        self.closeWithdrawConfirm();
                        self.withdrawingSelected(false);
                    });
                }
            }
        };

        this.showWithdrawConfirm = function () {
        
            var change;
            var noConfrimWhenCancelOrderInStore = window.localStorage.getItem("noConfrimWhenCancelOrderInStore")
        
            if ((noConfrimWhenCancelOrderInStore =="false") || (noConfrimWhenCancelOrderInStore == null) || (noConfrimWhenCancelOrderInStore == ""))
            { change = true; } else { change = false; }
            if (change) { self.withdrawConfirm(true); } else {self.withdrawSelected(); }
         };

        this.kendoWithdrawConfirmWindow = $.extend(kendoWindow.baseOptions(), {
            isOpen: self.withdrawConfirm,
            title: localizer.localize('trade.confirm'),
            resizable: true,
            width: 250
        });

        this.closeWithdrawConfirm = function () {
            self.withdrawConfirm(false);
        };

        self.portfolioGirds = $.extend(grid.baseOptions(), {
        	data: self.portfolioListItems,
            rowTemplate: 'exercisableRowTemplate',
            sortable: true,
            height: 320,
            resizable: true,
            scrollable: true,
            dataBound: function (data) {
                // grid.showLabelIfEmpty(data);
            }
        });

        this.attached = function () {
            self.loadPortfolio();
            setInterval(self.loadPortfolio, 30000);
        };

        this.detached = function () {
            clearInterval(self.loadPortfolio);
        };
    };

    return new tradeorderGrid();
});