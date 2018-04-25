define(['knockout', 'modules/formatting'], function (ko, formatting) {

	var SupportAndResistanceModel = function () {
		var self = this;

		var ValueWithPercentageChangeModel = function (value, quote) {
			this.value = value;

			this.formattedValue = formatting.toFractionalCurrency(value);

			this.percentageChange = ko.computed(function () {
				//if (!quote.isReady()) {
			    if( typeof quote == 'undefined' || quote == null){
			        return null;
				}

			    var last = quote.lastPrice();
				var result = (value - last) * 100 / last;
				return result;
			});
		};

		this.support = ko.observable([]);
		this.resistance = ko.observable([]);
		

		this.update = function (supportAndResistance, quote) {

			function toValueWithPercentageChange(sr) {
			    var srModel = new ValueWithPercentageChangeModel(sr.value, quote);
			   // var srModel = new ValueWithPercentageChangeModel(sr, quote);
				return srModel;
			}

			var support = [];
			var resistance = [];
			
			if (supportAndResistance) {
				support = supportAndResistance.support.slice(0, 2).map(toValueWithPercentageChange);
				resistance = supportAndResistance.resistance.slice(0, 2).map(toValueWithPercentageChange);
			}
			self.support(support);
			self.resistance(resistance);
		};
	};

	return SupportAndResistanceModel;
});
