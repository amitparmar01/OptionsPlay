define(['knockout',
		'komapping',
		'modules/localizer',
		'modules/notifications',
		'dataContext',
		'modules/grid',
		'modules/kendoWindow',
		'modules/orderEnums',
		'modules/formatting',
		'events',
		'knockout-kendo'],
function (ko, komapping, localizer, notifications, dataContext, grid, kendoWindow, orderEnums, formatting, events) {
	
	function IntradayOrders() {
		var self = this;

		

		this.withdrawableOnly = ko.observable(true);

		this.selectedOrder = ko.observable(null);
		this.selectOrder = function (order) {
			self.selectedOrder(order);
		};

		this.pullingIntradayOrders = ko.observable(false);
		this.gridReady = ko.observable(false);
		this.intradayOrderItems = ko.observableArray([]);
		this.displayedItems = ko.observableArray([]);
		function updateDisplayedItems(){
			// if (self.gridReady()) {
				var data = self.intradayOrderItems();

				if(data.length <= 0)
					return [];
				var orderData = [];
				data.forEach(function (item) {
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
				    orderData.push(o);
				});

				self.displayedItems(orderData);
				if (data.length != self.displayedItems().length) {
					events.trigger(events.Portfolio.REFRESH);
				}
				// return orderData;
			// } else {
			// 	return [];
			// }			
		}
	
		this.pullIntradayOrders = function () {
			if (self.pullingIntradayOrders()) {
				return;
			}

			self.pullingIntradayOrders(true);
			dataContext.intradayOrders.get('', {}, true).done(function (res) {
				self.intradayOrderItems(res());
				updateDisplayedItems();
			}).always(function () {
				self.gridReady(true);
				self.pullingIntradayOrders(false);
			});
		};

		events.on(events.Bottom.INTRADAY_REFRESH, this.pullIntradayOrders);

		this.withdrawConfirm = ko.observable(false);

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
						events.trigger(events.Bottom.INTRADAY_REFRESH);
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

		this.closeWithdrawConfirm = function () {
			self.withdrawConfirm(false);
		};

		this.kendoGrid = $.extend(grid.baseOptions(), { 
			data: self.displayedItems,
			rowTemplate: 'orderRowTemplate',
			sortable: true,
			height: 280,
			resizable: true,
			scrollable: true,
			dataBound: function () {
				// if (self.gridReady()) {
					//grid.showLabelIfEmpty(data);
				// }
			}
		});

		this.kendoContextMenu = {
			targets: '#intradayOrderGridContainer tbody tr',
			width: '260px',

			itemSelect: function (e) {
				self.withdrawSelected();
				var message = kendo.format('You selected: "{0}" on "{1}"',
					$(e.item).text().trim(),
					$(e.target).text());

				console.log(message);
			}
		};

		this.kendoWithdrawConfirmWindow = $.extend(kendoWindow.baseOptions(), {
			isOpen: self.withdrawConfirm,
			title: localizer.localize('trade.confirm'),
			resizable: true,
			width: 250
		});

		this.attached = function () {
			self.pullIntradayOrders();
			// todo: use signalR
			setInterval(self.pullIntradayOrders, 10000);
		};

		this.detached = function () {
			clearInterval(self.pullIntradayOrders);

		};
	}

	return IntradayOrders;
});
