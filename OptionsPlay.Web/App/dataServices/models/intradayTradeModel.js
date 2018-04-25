define(['knockout',
		'modules/orderEnums',
		'modules/formatting'
], function (ko, orderEnums, formatting) {
	'use strict';

	function IntradayTradeModel(item) {
		var self = this;

		this.updateModel = function (data) {
			var matchedTime = data.matchedTime;
			var tradeDate = data.tradeDate;
			var optionNumber = data.optionNumber;
			var optionName = data.optionName;
			var optionCode = data.optionCode;
			var matchedPrice = data.matchedPrice;
			var matchedQuantity = data.matchedQuantity;
			var orderPrice = data.orderPrice;
			var matchedAmount = data.matchedAmount;
			var orderId = data.orderId;
			var matchedSerialNo = data.matchedSerialNo;
			var stockBiz = data.stockBusiness;
			var bizAction = data.stockBusinessAction;

			self.tradeDate(tradeDate.constructor == Date ? tradeDate : new Date(tradeDate + formatting.CHINA_TIME_ZONE));
			self.matchedTime(matchedTime.constructor == Date ? matchedTime : new Date(matchedTime + formatting.CHINA_TIME_ZONE));
			self.orderId = ko.observable(orderId);
			self.optionNumber(optionNumber && optionNumber.trim());
			self.optionName(optionName && optionName.trim());
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
										: 'trade.unknown');
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
			self.matchedPrice(matchedPrice);
			self.matchedQuantity(matchedQuantity);
			self.matchedAmount(matchedAmount);
			self.isCovered(stockBiz in orderEnums.CoveredStockBizes);
			self.matchedSerialNo(matchedSerialNo);
			self.offerReturnMessage(data.offerReturnMessage);
		}

		this.tradeDate = ko.observable();
		this.matchedTime = ko.observable();
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
		this.matchedPrice = ko.observable();
		this.matchedQuantity = ko.observable();
		this.matchedAmount = ko.observable();
		this.isCovered = ko.observable();
		this.matchedSerialNo = ko.observable();
		this.offerReturnMessage = ko.observable();

		this.updateModel(item);
	}

	return IntradayTradeModel;
});
