define(['knockout',
		'komapping',
		'modules/enums',
		'modules/localizer'],
function (ko, mapping, enums) {
	'use strict';

	function PortfolioItemModel(data, mappingOptions) {
		var self = this;

		mappingOptions = mappingOptions || {};

		this.updateModel = function (newData) {
			mapping.fromJS(newData, {}, self);
		};

		mapping.fromJS(data, {}, this);
		
		this.alertVisible = ko.computed(function () {
			return true;
		});

		this.optionTypeEnum = ko.computed(function () {
			switch (self.optionType()) {
				case 'C': return self.isCovered() ? enums.COVERED : enums.CALL;
				case 'P': return enums.PUT;
				case 'S': return enums.SECURITY;
				default: return null;
			}
		});

		this.optionTypeStyle = ko.computed(function () {
			switch (self.optionType()) {
				case 'C': return { color: self.isCovered() ? 'gold' : 'red' };
				case 'P': return { color: 'green' };
				case 'S': return { color: 'blue' };
				default: return null;
			}
		});

		this.optionSideEnum = ko.computed(function () {
			switch (self.optionSide()) {
				case 'L': return enums.BUY;
				case 'S': return enums.SELL;
				case 'C': return enums.SELL;
				default: return null;
			}
		});

		this.expanded = ko.observable(true);

		this.collapsed = ko.computed(function () {
			return !self.expanded();
		});
	}

	return PortfolioItemModel;
});
