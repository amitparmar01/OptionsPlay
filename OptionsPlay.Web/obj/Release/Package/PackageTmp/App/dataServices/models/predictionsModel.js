define(['knockout'], function (ko) {
	var PredictionModel = function (symbol, days, probData) {
		var self = this;
		self.symbol = symbol;
		self.days = days;
		self.probs = [];
		self.prices = [];
		self.ready = ko.observable(false);
		self.midIndex = 501;

		self.price = function price(prob) {
			if (!prob || !self.probs.length || prob < self.probs[0]) {
				return 0;
			}

			var lowBound = 0;
			var highBound = self.probs.length - 1;
			var i = Math.floor(highBound / 2);
			while (i !== lowBound || i !== highBound) {
				var pri = i <= self.midIndex ? self.prices[i] : 1 - self.prices[i];
				var pro = self.probs[i];

				if (pro.toFixed(2) == prob.toFixed(2)) {
					return pri;
				} else if (i === lowBound || i === highBound) {
					var pro0 = self.probs[i - 1];
					var pri0 = (i - 1) <= self.midIndex ? self.prices[i - 1] : 1 - self.prices[i - 1];
					if (i === lowBound) {
						pro0 = self.probs[i + 1];
						pri0 = (i + 1) <= self.midIndex ? self.prices[i + 1] : 1 - self.prices[i + 1];
					}
					var p = (prob - pro0) * (pri - pri0) / (pro - pro0) + pri0;
					return p;
				} else if (pro > prob) {
					highBound = i;
				} else {
					lowBound = i;
				}
				i = Math.floor((lowBound + highBound) / 2);
			}
			return 1;
		};

		self.prob = function prob(price) {
			if (!price || !self.prices.length || price < self.prices[0]) {
				return 0;
			}

			var lowBound = 0;
			var highBound = self.prices.length - 1;
			var i = Math.floor(highBound / 2);
			while (i !== lowBound || i !== highBound) {
				var pro = i <= self.midIndex ? self.probs[i] : 1 - self.probs[i];
				var pri = self.prices[i];

				if (pri.toFixed(2) == price.toFixed(2)) {
					return pro;
				} else if (i === lowBound || i === highBound) {
					var pri0 = self.prices[i - 1];
					var pro0 = (i - 1) <= self.midIndex ? self.probs[i - 1] : 1 - self.probs[i - 1];
					if (i === lowBound) {
						pri0 = self.prices[i + 1];
						pro0 = (i + 1) <= self.midIndex ? self.probs[i + 1] : 1 - self.probs[i + 1];
					}
					var p = (price - pri0) * (pro - pro0) / (pri - pri0) + pro0;
					return p;
				} else if (pri > price) {
					highBound = i;
				} else {
					lowBound = i;
				}
				i = Math.floor((lowBound + highBound) / 2);
			}
			return 1;
		};

		self.probBetween = function (price1, price2) {
			if (price1 == undefined) {
				return 0;
			} else if (price2 == undefined) {
				return self.prob(price1);
			} else {
				return self.prob(Math.max(price1, price2)) - self.prob(Math.min(price1, price2));
			}
		};

		self.getSymmetricPrice = function (price) {
			var cumulatedProb = self.prob(price);
			var targetProb = 1 - cumulatedProb;
			var highBound = self.prices[self.prices.length - 1];
			var lowBound = self.prices[0];
			var targetPrice = (lowBound + highBound) / 2;
			while (!(targetPrice.toFixed(3) == lowBound.toFixed(3) || targetPrice.toFixed(3) == highBound.toFixed(3))) {
				var currentProb = self.prob(targetPrice);
				if (currentProb.toFixed(4) == targetProb.toFixed(4)) {
					return targetPrice;
				}
				if (currentProb > targetProb) {
					highBound = targetPrice;
				} else {
					lowBound = targetPrice;
				}
				targetPrice = (lowBound + highBound) / 2;
			}
			return targetPrice;
		}

		readProb(probData, self);
	};

	var Predictions = function (probData) {
		var self = this;
		this.probs = {};

		this.getProb = function (days) {
			return self.probs[days.toString()] || self.probs[(days - 1).toString()] || self.probs[(days + 1).toString()];
		};

		$.each(probData, function (i, data) {
			var days = data.daysInFuture.toFixed(0);
			var prediction = new PredictionModel(self.symbol, days, data);
			self.probs[days] = prediction;
		});

		this.getSymmetricPrice = function (price, days) {
			if (!self.probs)
				return 0;
			var prediction = self.getProb(days);
			if (!prediction)
				return 0;

			return prediction.getSymmetricPrice(price);
		}

	};

	function readProb(data, prob) {
		var midIndex = 0, maxProb = 0;
		for (var i = 0; i < data.probabilities.length; i++) {
			var probability = data.probabilities[i];
			var price = data.prices[i];
			if (probability > 0.0001) {
				prob.probs.push(probability);
				prob.prices.push(price);
				if (i && probability > maxProb) {
					maxProb = probability;
					midIndex = prob.probs.length - 1;
				}
			}
		}
		prob.midIndex = midIndex;
		prob.ready(true);
	}

	return Predictions;
});