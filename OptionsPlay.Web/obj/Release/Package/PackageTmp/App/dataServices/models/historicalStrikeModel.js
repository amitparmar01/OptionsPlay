define(['knockout',
		'modules/orderEnums',
		'modules/formatting'
], function (ko, orderEnums, formatting) {
	'use strict';

	function HistoricalStrikeModel(item) {
	    var self = this;

		this.updateModel = function (data) {
		    var occurDate = new Date(data.occurDate.toString().replace(/^(\d{4})(\d{2})(\d{2})$/, "$1/$2/$3"));
		    var optionCode = data.optionCode;
		    var optionNumber = data.optionNumber && data.optionNumber.trim();
		    var optionName = data.optionName && data.optionName.trim();
		    var optionType = data.optionType;
		    var optionUnderlyingCode = data.optionUnderlyingCode;
		    var optionEffect = data.optionEffect;
		    var stockEffect = data.stockEffect;
		    var fundEffect = data.fundEffect;
		    var execPrice = data.exercisePrice;
		    var execSide = data.exerciseSide;

		    self.occurDate(occurDate.constructor == Date ? occurDate : new Date(occurDate + formatting.CHINA_TIME_ZONE));
		    self.optionCode(optionCode);
		    self.optionNumber(optionNumber);
		    self.optionName(optionName);
		    //self.optionType(optionType);
		    self.optionType(optionType.indexOf('C') >= 0
                    ? 'trade.call'
                    : optionType.indexOf('P') >= 0
                        ? 'trade.put'
                        : 'trade.unknown');
		    self.optionUnderlyingCode(optionUnderlyingCode);
		    self.optionEffect(optionEffect);
		    self.stockEffect(stockEffect);
		    self.fundEffect(fundEffect);
		    self.execPrice(execPrice);
		    self.execSide(execSide == "S" ? 'trade.execSides.S' : "trade.execSides.B");

		}

		this.occurDate = ko.observable();
		this.optionCode = ko.observable();
		this.optionNumber = ko.observable();
		this.optionName = ko.observable();
		this.optionType = ko.observable();
		this.optionUnderlyingCode = ko.observable();
		this.optionEffect = ko.observable();
		this.stockEffect = ko.observable();
		this.fundEffect = ko.observable();
		this.execPrice = ko.observable();
		this.execSide = ko.observable();


		this.updateModel(item);
	}

	return HistoricalStrikeModel;
});
