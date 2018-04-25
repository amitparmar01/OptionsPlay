define(['knockout',
		'komapping',
		'modules/localizer',
		'modules/notifications',
		'dataContext',
		'modules/grid',
		'modules/orderEnums',
		'modules/formatting',
		'events',
		'knockout-kendo'],
function (ko, komapping, localizer, notifications, dataContext, grid, orderEnums, formatting, events) {
	function IntradayTrades() {
		var self = this;
		
		this.intradayTradeItems = ko.observableArray([]);
		this.gridReady = ko.observable(false);
		this.pullingIntradayTraders = ko.observable(false);
		this.selectedTrade = ko.observable(null);
		this.selectTrade = function (t) {
			self.selectedTrade(t);
		};

		this.displayedTradeItems = ko.observableArray([]);

		function updateDisplayedItems(){
			// if (self.gridReady()) {
				var data = self.intradayTradeItems();

				if(data.length <= 0) 
					return [];
				var orderData = [];
				data.forEach(function(item){
					var o = new Object();
					o.matchedTime = item.matchedTime();
					o.optionNumber = item.optionNumber();
					o.optionName = item.optionName();
					o.buyOrSell = item.buyOrSell();
					o.openOrClose = item.openOrClose();
					o.matchedPrice = item.matchedPrice();
					o.matchedQuantity = item.matchedQuantity();
					o.orderPrice = item.orderPrice();
					o.matchedAmount = item.matchedAmount();
					o.optionSide = item.optionSide();
					o.optionType = item.optionType();
					o.isCovered = item.isCovered();
					o.orderId = item.orderId();
					o.matchedSerialNo = item.matchedSerialNo();
					o.offerReturnMessage = item.offerReturnMessage();
					orderData.push(o);
				});

				self.displayedTradeItems(orderData);
				if (data.length != self.displayedTradeItems().length) {
					events.trigger(events.Portfolio.REFRESH);
				}

				// return orderData;
			// } else {
			// 	return [];
			// }			
		}

		this.pullIntradayTrades = function () {
			if (self.pullingIntradayTraders()) {
				return;
			}

			self.pullingIntradayTraders(true);
			dataContext.intradayTrades.get('', {}, true).done(function (res) {
				self.intradayTradeItems(res());
				updateDisplayedItems();
				// events.trigger(events.Bottom.INTRADAY_REFRESHED);
			}).always(function(){
				self.gridReady(true);
				self.pullingIntradayTraders(false)
			});
		};
		this.dblClickToTrade = function (t) {
			events.trigger(events.OrderEntry.PREFILL_ORDER, {
				optionNumber: ko.unwrap(t.optionNumber)
			});
		};
		this.kendoGrid = $.extend(grid.baseOptions(), {
			data: self.displayedTradeItems,
			rowTemplate: 'tradeRowTemplate',
			sortable: true,
			height: 280,
			resizable: true,
			scrollable: true,
			dataBound: function (data) {
				// if (self.gridReady()) {
				// 	grid.showLabelIfEmpty(data);
				// }
			}
		});

		events.on(events.Bottom.INTRADAY_REFRESH, this.pullIntradayTrades);

		this.attached = function () {
			self.pullIntradayTrades();
			setInterval(self.pullIntradayTrades, 10000);
		};

		this.detached = function () {
			clearInterval(self.pullIntradayTrades);
		};

	}

	return IntradayTrades;
});