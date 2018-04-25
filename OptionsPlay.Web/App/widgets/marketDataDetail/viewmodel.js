define(['jquery',
	'knockout',
	'modules/formatting',
	'dataContext'],
function ($, ko, formatting, dataContext) {

	var MarketDataDetail = function () {
	    var self = this;
	    var oneHundredShares = 100;

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

			self.sellVolume1 = Math.round(self.quote.sellVolume1() / oneHundredShares);
			self.sellVolume2 = Math.round(self.quote.sellVolume2() / oneHundredShares);
			self.sellVolume3 = Math.round(self.quote.sellVolume3() / oneHundredShares);
			self.sellVolume4 = Math.round(self.quote.sellVolume4() / oneHundredShares);
			self.sellVolume5 = Math.round(self.quote.sellVolume5() / oneHundredShares);

			self.askVolume = Math.round(self.quote.askVolume / oneHundredShares);
			self.askVolume2 = Math.round(self.quote.askVolume2 / oneHundredShares);
			self.askVolume3 = Math.round(self.quote.askVolume3 / oneHundredShares);
			self.askVolume4 = Math.round(self.quote.askVolume4 / oneHundredShares);
			self.askVolume5 = Math.round(self.quote.askVolume5 / oneHundredShares);

			self.buyVolume1 = Math.round(self.quote.buyVolume1() / oneHundredShares);
			self.buyVolume2 = Math.round(self.quote.buyVolume2() / oneHundredShares);
			self.buyVolume3 = Math.round(self.quote.buyVolume3() / oneHundredShares);
			self.buyVolume4 = Math.round(self.quote.buyVolume4() / oneHundredShares);
			self.buyVolume5 = Math.round(self.quote.buyVolume5() / oneHundredShares);
			
			self.bidVolume = Math.round(self.quote.bidVolume / oneHundredShares);
			self.bidVolume2 = Math.round(self.quote.bidVolume2 / oneHundredShares);
			self.bidVolume3 = Math.round(self.quote.bidVolume3 / oneHundredShares);
			self.bidVolume4 = Math.round(self.quote.bidVolume4 / oneHundredShares);
			self.bidVolume5 = Math.round(self.quote.bidVolume5 / oneHundredShares);

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