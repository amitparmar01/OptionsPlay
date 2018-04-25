define(['jquery',
	'knockout',
	'modules/formatting',
	'dataContext'],
function ($, ko, formatting, dataContext) {

	var MarketDataDetail = function () {
		var self = this;

		this.activate = function (settings) {
			self.quote = ko.unwrap(settings.quote);
			if(self.quote.hasOptions === true){
				self.sellPrice5 = self.quote.sellPrice5;
				self.sellPrice4 = self.quote.sellPrice4;
				self.sellPrice3 = self.quote.sellPrice3;
				self.sellPrice2 = self.quote.sellPrice2;
				self.currentAskPrice = self.quote.currentAskPrice;

				self.currentBidPrice = self.quote.currentBidPrice;
				self.buyPrice2 = self.quote.buyPrice2;
				self.buyPrice3 = self.quote.buyPrice3;
				self.buyPrice4 = self.quote.buyPrice4;
				self.buyPrice5 = self.quote.buyPrice5;

				self.lastPrice = self.quote.lastPrice;
				self.openPrice = self.quote.openPrice;
				self.highPrice = self.quote.highPrice;
				self.lowPrice = self.quote.lowPrice;
				self.previousClose = self.quote.previousClose;


			}else{
				self.sellPrice5 = self.quote.ask5;
				self.sellPrice4 = self.quote.ask4;
				self.sellPrice3 = self.quote.ask3;
				self.sellPrice2 = self.quote.ask2;
				self.currentAskPrice = self.quote.ask;

				self.currentBidPrice = self.quote.bid;
				self.buyPrice2 = self.quote.bid2;
				self.buyPrice3 = self.quote.bid3;
				self.buyPrice4 = self.quote.bid4;
				self.buyPrice5 = self.quote.bid5;

				self.lastPrice = self.quote.latestTradedPrice;
				self.openPrice = self.quote.openingPrice;
				self.highPrice = self.quote.highestPrice;
				self.lowPrice = self.quote.lowestPrice;
				self.previousClose = self.quote.previousSettlementPrice;
			}

			self.sellVolume1 = self.quote.sellVolume1;
			self.sellVolume2 = self.quote.sellVolume2;
			self.sellVolume3 = self.quote.sellVolume3;
			self.sellVolume4 = self.quote.sellVolume4;
			self.sellVolume5 = self.quote.sellVolume5;

			self.askVolume = self.quote.askVolume;
			self.askVolume2 = self.quote.askVolume2;
			self.askVolume3 = self.quote.askVolume3;
			self.askVolume4 = self.quote.askVolume4;
			self.askVolume5 = self.quote.askVolume5;

			self.buyVolume1 = self.quote.buyVolume1;
			self.buyVolume2 = self.quote.buyVolume2;
			self.buyVolume3 = self.quote.buyVolume3;
			self.buyVolume4 = self.quote.buyVolume4;
			self.buyVolume5 = self.quote.buyVolume5;
			
			self.bidVolume =  self.quote.bidVolume;
			self.bidVolume2 =  self.quote.bidVolume2;
			self.bidVolume3 =  self.quote.bidVolume3;
			self.bidVolume4 =  self.quote.bidVolume4;
			self.bidVolume5 =  self.quote.bidVolume5;

			self.change = self.quote.change;
			self.volume = self.quote.volume;
			self.uncoveredPositionQuantity = self.quote.uncoveredPositionQuantity;
			



			self.changePercentage = self.quote.changePercentage;
			self.limitUp = self.quote.limitUpPrice || ko.observable(0);
			self.limitDown = self.quote.limitDownPrice || ko.observable(0);
			self.openInterest = ko.observable();
			self.code = self.quote.optionNumber || self.quote.securityCode;
			self.name = self.quote.name || self.quote.securityName;
			if (self.quote.optionNumber) {
				dataContext.optionBasic.get(self.quote.optionNumber).done(function (data) {
					self.limitUp(data.limitUpPrice);
					self.limitDown(data.limitDownPrice);
					self.openInterest(data.openInterest);
				});
			}
		}
	}

	return MarketDataDetail;
});