define(['knockout',
		'komapping',
		'portfolioItemModel',
		'modules/enums',
		'modules/localizer'
		],
function (ko, mapping, PortfolioItemModel, enums) {
	'use strict';

	function PortfolioItemGroupModel(data, mappingOptions) {
		var self = this;
		mappingOptions = {};
		var PORTFOLIO_MAPPING = {
			key: function (item) {
				return ko.unwrap(item.underlyingCode) + '|' + ko.unwrap(item.isStockGroup);
			},
			'items': {
				key: function (item) {
					return ko.unwrap(item.optionNumber) + '|' + ko.unwrap(item.optionSide);
				},
				//create: function (item) {
				//	return new PortfolioItemModel(item.data);
				//},
				update: function (item) {
					if (item.target) {
						if (typeof(item.target.updateModel) === 'function') {
							item.target.updateModel(item.data);
						}
						return item.target;
					} else {
						return new PortfolioItemModel(item.data);
					}
				}
			}
		};

		this.initModel = function (newData) {
			mapping.fromJS(newData, PORTFOLIO_MAPPING, this);
			//this.items = mapping.fromJS(newData.items, { create: function (item) {
			//	return new PortfolioItemModel(item.data);
			//}});
		};

		this.updateModel = function (newData, unused, updateMapping) {
			//$.each(newData.items, function (index, item) {
			//	var it = self.items()[index];
			//	if (typeof (it) !== 'undefined') {
			//		//it.updateModel(item);
			//	} else {
			//		newData.items[index] = $.extend(item, new PortfolioItemModel(item));
			//		delete newData.items[index]['__ko_mapping__'];
			//	}
			//});
			if (self.items) {
				if (newData.isStockGroup) {
					self.id(newData.id);
				} else {
					self.anyExpiresInTwoDaysNotToday(newData.anyExpiresInTwoDaysNotToday);
					self.closeVisible(newData.closeVisible);
					self.strategyName(newData.strategyName);
					self.strategy(newData.strategy);
					self.quantity(newData.quantity);
					self.quantityFormatted(newData.quantityFormatted);
					self.realtimeCostBasis(newData.realtimeCostBasis);
					self.mark(newData.mark);
					self.floatingPL(newData.floatingPL);
					self.margin(newData.margin);
					self.marketValue(newData.marketValue);
					self.generatePremiumVisible(newData.generatePremiumVisible);
					self.id(newData.id);
					self.greeks.gamma(newData.greeks.gamma);
					self.greeks.delta(newData.greeks.delta);
					self.greeks.theta(newData.greeks.theta);
					self.greeks.vega(newData.greeks.vega);
					self.greeks.rho(newData.greeks.rho);
					self.greeks.rhoFx(newData.greeks.rhoFx);
					self.greeks.sigma(newData.greeks.sigma);
					self.isStockGroup(newData.isStockGroup);
				}
				mapping.fromJS(newData.items, PORTFOLIO_MAPPING.items, self.items);
			}
		};

		this.initModel(data);

		this.expanded = ko.observable(true);

		this.collapsed = ko.computed(function () {
			return !self.expanded();
		});
	}

	return PortfolioItemGroupModel;
});
