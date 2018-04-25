define(['knockout',
		'modules/orderEnums',
		'modules/formatting'
], function (ko, orderEnums, formatting) {
	'use strict';

	function IntradayOrderModel(item) {
		var self = this;

		this.updateModel = function (data) {
			var orderTime = data.orderTime;
			var orderDate = data.orderDate;
			var orderId = data.orderId;
			var optionNumber = data.optionNumber && data.optionNumber.trim();
			var optionName = data.optionName && data.optionName.trim();
			var optionCode = data.optionCode;
			var underlyingCode = data.optionUnderlyingCode && data.optionUnderlyingCode.trim();
			var underlyingName = data.optionUnderlyingName && data.optionUnderlyingName.trim();
			var matchedQuantity = data.matchedQuantity;
			var orderQuantity = data.orderQuantity;
			var orderPrice = data.orderPrice;
			var underlyingFrozenQuantity = data.underlyingFrozenQuantity;
			var comments = data.offerReturnMessage;
			var stockBiz = data.stockBusiness;
			var bizAction = data.stockBusinessAction;
			var orderStatus = data.orderStatus;

			self.orderDate(orderDate.constructor == Date ? orderDate : new Date(orderDate + formatting.CHINA_TIME_ZONE));
			self.orderTime(orderTime.constructor == Date ? orderTime : new Date(orderTime + formatting.CHINA_TIME_ZONE));
			self.orderId = ko.observable(orderId);
			self.optionNumber(optionNumber || underlyingCode);
			self.optionName(optionName || underlyingName);
			self.optionCode(optionCode);
			self.optionType(optionCode.indexOf('C') >= 0
								? 'trade.call'
								: optionCode.indexOf('P') >= 0
									? 'trade.put'
									: 'trade.unknown');
			self.buyOrSell(item.isWithdraw
								? 'trade.withdraw'
								: stockBiz in orderEnums.BuyStockBizes
									? 'trade.buy'
									: stockBiz in orderEnums.SellStockBizes
										? 'trade.sell'
										: stockBiz == '408' 
											? 'trade.stockBizOptions.lockSecurity'
											: stockBiz == '409' 
												? 'trade.stockBizOptions.unlockSecurity'
												: stockBiz == '406'
													? 'trade.close'
													: stockBiz == '407'
														? 'trade.close'
														: 'trade.unknown') ;
			self.optionSide(stockBiz in orderEnums.BuyStockBizes ? 'L' : (stockBiz in orderEnums.SellStockBizes ? 'S' : 'U'));

			if (stockBiz in orderEnums.OpenStockBizes) {
				self.openOrClose('trade.open');
			} else if (stockBiz in orderEnums.CloseStockBizes) {
				self.openOrClose('trade.close');
			} else if (stockBiz == '408') {
				self.openOrClose('trade.stockBizOptions.lockSecurity');
			} else if (stockBiz == '409') {
				self.openOrClose('trade.stockBizOptions.unlockSecurity');
			} else {
				self.openOrClose('trade.unknown');
			}
			self.stockBusiness(orderEnums.StockBusinessDic[stockBiz]);

			self.orderType(orderEnums.OrderTypeDic[bizAction]);
			self.orderPrice(orderPrice);
			self.orderQuantity(orderQuantity || underlyingFrozenQuantity);
			self.matchedQuantity(matchedQuantity);
			self.orderStatusValue(orderStatus);
			self.orderStatus(orderEnums.OrderStatuses[orderStatus]);
			self.isCovered(underlyingFrozenQuantity > 0);
			self.comments(comments);
			self.isWithdraw(data.isWithdraw);
			self.lastRefresh(new Date());
		}

		this.orderDate = ko.observable();
		this.orderTime = ko.observable();
		this.orderId = ko.observable();
		this.optionNumber = ko.observable();
		this.optionName = ko.observable();
		this.optionCode = ko.observable();
		this.optionType = ko.observable();
		this.buyOrSell = ko.observable();
		this.optionSide = ko.observable();
		this.openOrClose = ko.observable();
		this.stockBusiness = ko.observable();
		this.orderType = ko.observable();
		this.orderPrice = ko.observable();
		this.orderQuantity = ko.observable();
		this.matchedQuantity = ko.observable();
		this.orderStatusValue = ko.observable();
		this.orderStatus = ko.observable();
		this.isCovered = ko.observable();
		this.comments = ko.observable();
		this.isWithdraw = ko.observable();
		this.lastRefresh = ko.observable();

		this.updateModel(item);
	}

	return IntradayOrderModel;
});
