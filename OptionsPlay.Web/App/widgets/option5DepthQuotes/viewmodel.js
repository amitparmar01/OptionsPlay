define([
	'knockout',
	'modules/formatting',
	'dataContext',
	'modules/localizer',
	'modules/enums',
	'events',
	'viewmodels/trade/orderEntry',
	'koBindings/chartBindings'
],
function (ko, formatting, dataContext, localizer, enums, events,orderEntry) {
	var OptionQuotationViewModel = function () {
		var self = this;

		this.asks = [];
		this.bids = [];

		this.activate = function (settings) {
			var option = ko.unwrap(settings.option);
			self.selectedPrice = settings.selectedPrice;
			self.priceSelect = typeof (settings.priceSelect) === 'undefined' ? true : settings.priceSelect;
			for (var i = 1; i <= 5; i++) {
				var j = 6 - i;
				var bidI = i === 1 ? '' : i.toString();
				var askI = j === 1 ? '' : j.toString();
				self.asks.push({
					depth: j,
					price: option['ask' + askI],
					volume: option['askVolume' + askI]
				});
				self.bids.push({
					depth: i,
					price: option['bid' + bidI],
					volume: option['bidVolume' + bidI]
				});
			}
			orderEntry.isLoadingOptionsInfo(false);

			self.selectPrice = function (q) {
				if (self.priceSelect && ko.isObservable(self.selectedPrice)) {
					self.selectedPrice(ko.unwrap(q.price));
				}
			};
		};
	};

	return OptionQuotationViewModel;
});