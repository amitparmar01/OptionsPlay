define([
	'knockout',
	'modules/formatting',
	'dataContext',
	'modules/localizer',
	'modules/combinationViewModel',
	'modules/dropDownList',
	'modules/enums',
	'events',
	'koBindings/chartBindings'
],
function (ko, formatting, dataContext, localizer, Combination, dropDownList, enums, events) {
	var CombinationEditor = function () {
		var self = this;

		this.expiryList = ko.observableArray([]);
		this.expiryStrikes = ko.observable({});
		function initExpiries() {
			dataContext.optionChains.get(self.combination.ulCode).done(function (chains) {
				var expiryList = chains.expirationDates.map(function (item) {
					var expiryItem = {
						key: formatting.formatDate(item.date, 'MMM') + ' (' + item.noOfDaysToExpiry + ')',
						value: item.date
					};
					return expiryItem;
				});
				self.expiryList(expiryList);
				self.expiryStrikes(chains.expiryStrikes);
			});
		}
		this.activate = function (settings) {
			var combination = settings.combination;
			this.combination = combination;
			initExpiries();
			this.localeSub = localizer.activeLocale.subscribe(initExpiries);
			this.removeLeg = function (position) {
				self.combination.removePosition(position);
			};
			this.flipBuySell = function () {
				self.combination.positions().forEach(function (item) {
					item.buySellFlag(!item.buySellFlag());
				});
			};
			this.increaseQuantity = function () {
				var combinationQty = self.combination.absQuantity();
				self.combination.positions().forEach(function (item) {
					var currentQty = item.absQuantity();
					item.absQuantity(currentQty + Math.max(1, item.absQuantity()/combinationQty));
				});
			};
			this.decreaseQuantity = function () {
				var combinationQty = self.combination.absQuantity();
				if (combinationQty > 1) {
					self.combination.positions().forEach(function (item) {
						var currentQty = item.absQuantity();
						item.absQuantity(Math.max(1, currentQty - Math.max(1, item.absQuantity() / combinationQty)));
					});
				}
			};
			this.forwardExpiry = function (num) {
				var chains = self.combination.chains;
				if (chains) {
					self.combination.positions().forEach(function (item) {
						var nextExpiry = chains.findExpiry(item.expiry(), num, 1);
						if (nextExpiry) {
							item.expiry(nextExpiry.date);
						}
					});
				}
			};
			this.forwardStrike = function (num) {
				var chains = self.combination.chains;
				if (chains) {
					self.combination.positions().forEach(function (item) {
						var nextStrike = chains.findStrike(item.strikePrice(), item.expiry(), num);
						if (nextStrike) {
							item.strikePrice(nextStrike);
						}
					});
				}
			};
			this.addNewLeg = function (callOrPut) {
				var type = callOrPut ? enums.CALL : enums.PUT;
				var newStrike = self.combination.strikes()[0] || self.expiryStrikes()[formatting.formatDate(self.combination.expiry(), 'yyyyMMdd')];
				self.combination.addPosition(self.combination.buyOrSell(), 1, type, self.combination.expiry(), newStrike);
			};

			this.resetCombination = function () {
				var poses = self.combination.positions().slice(0);
				for (var i = 0; i < poses.length; i++) {
					self.combination.removePosition(poses[i]);
				}
				self.combination.initPositions(self.combination.originalLegs);
			};

			this.prefillOrder = function () {
				// events.trigger(events.OrderEntry.PREFILL_ORDER);
			};
		}
		this.detached = function () {
			self.localeSub && self.localeSub.dispose();
		};
	}

	return CombinationEditor;
});