define(['knockout'], function (ko) {
	var SENTIMENT_LONG = '6M Trend';
	var SENTIMENT_SHORT = '1M Trend';
	var NOT_AVAILABLE = 'N/A';

	function SentimentsTermModel(period) {
		var self = this;
		this.caption = period;
		this.value = ko.observable(null);


		this.cssClass = ko.observable('');
		this.name = ko.observable(NOT_AVAILABLE);
		this.secondary = ko.observable(null);

		// change name, css class and secondary tag with value
		ko.computed(function () {
			var value = self.value();
			var model = getSentimentTerm(value);
			self.cssClass(model.cssClass);
			self.name(model.name);
			self.secondary(model.secondary);
		});
	}

	function SyrahSentiments(longTermValue, shortTermValue) {
		var self = this;

		this.syrahSentimentLongTerm = new SentimentsTermModel(SENTIMENT_LONG);
		this.syrahSentimentShortTerm = new SentimentsTermModel(SENTIMENT_SHORT);

		this.longTermValue = this.syrahSentimentLongTerm.value;
		this.shortTermValue = this.syrahSentimentShortTerm.value;

		this.longTermValue(longTermValue);
		this.shortTermValue(shortTermValue);

		this.combinedCssClass = ko.computed(function () {
			var longtermCss = self.syrahSentimentLongTerm.cssClass();
			if (longtermCss) {
				return longtermCss;
			}

			var shortTermCss = self.syrahSentimentShortTerm.cssClass();
			return shortTermCss;
		});

		this.updateSentiments = function (data) {
			self.longTermValue(data.syrahLongSentiment);
			self.shortTermValue(data.syrahShortSentiment);
		}
	}

	function getSentimentTerm(value) {
		var sentimentTerm;

		function SentimentTerm(name, cssClass, secondary) {
			this.name = name || 'N/A';
			this.cssClass = cssClass;
			this.secondary = secondary;
		}

		switch (value) {
			case -4:
				sentimentTerm = new SentimentTerm('Bearish', 'bearish', 'Overextended');
				break;
			case -3:
				sentimentTerm = new SentimentTerm('Bearish', 'bearish');
				break;
			case -2:
				sentimentTerm = new SentimentTerm('Bearish', 'bearish');
				break;
			case -1:
				sentimentTerm = new SentimentTerm('Neutral', 'neutral');
				break;
			case 0:
				sentimentTerm = new SentimentTerm('Mildly Bearish', 'bearish');
				break;
			case 1:
				sentimentTerm = new SentimentTerm('Mildly Bullish', 'bullish');
				break;
			case 2:
				sentimentTerm = new SentimentTerm('Neutral', 'neutral');
				break;
			case 3:
				sentimentTerm = new SentimentTerm('Bullish', 'bullish');
				break;
			case 4:
				sentimentTerm = new SentimentTerm('Bullish', 'bullish');
				break;
			case 5:
				sentimentTerm = new SentimentTerm('Bullish', 'bullish', 'Overextended');
				break;
			default:
				sentimentTerm = new SentimentTerm();
				break;
		}
		return sentimentTerm;
	}

	return SyrahSentiments;
});