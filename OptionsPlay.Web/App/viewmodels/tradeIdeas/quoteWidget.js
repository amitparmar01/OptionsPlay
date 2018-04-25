define(['knockout',
		'modules/sentimentsModel',
		'dataContext',
		'modules/context'],
function (ko, SentimentsModel, dataContext, context) {
	function QuoteWidget() {
		var self = this;

		// #region symbol lookup

		this.securityCode = context.ulCode;
		this.securitySearch = ko.observable(this.securityCode()).extend({ characterCase: 'upper' });
		this.securitySearch.subscribe(function (newInput) {
			if (newInput) {
				if (validateSymbol(newInput)) {
					self.securityCode(newInput);
				} else {
					setTimeout(function () {
						self.securitySearch(self.securityCode());
					});
				}
			}
		});
		this.securityCode.subscribe(function (newInput) {
			self.securitySearch(newInput);
		});

		function isNullOrWhiteSpace(str) {
			return (!str || /^\s*$/.test(str));
		}

		function validateSymbol(str) {
			if (!isNullOrWhiteSpace(str)) {
				var ignoredChars = ['/', '\\', '*', '&', '%', '#', ':', '<', '>', ',', '[', ']', ';', '`', '=', '-'];
				for (var i = 0, j = ignoredChars.length; i < j; i++) {
					if (str.indexOf(ignoredChars[i]) >= 0) {
						return false;
					}
				}
			}
			return true;
		}

		this.lookupButtonClick = function () {
			self.securityCode.notifySubscribers(self.securityCode());
		};
		
		this.selectTextBoxContent = function (viewModel, event) {
			var element = event.target || event.srcElement;
			setTimeout(function () {
				$(element).select();
			});
		};

		this.loseFocusOnEnter = function (viewModel, event) {
			if (event.which === 13) {
				var element = event.target || event.srcElement;
				$(element).blur();
			}
			return true;
		};

		// #endregion symbol lookup

		this.isSymbolTradeIdea = ko.computed(function () {
			return !!context.selectedTradeIdea();
		});

		this.quote = ko.observable();

		function loadQuote(code) {
			dataContext.quotation.get(code).done(function (quote) {
				self.quote(ko.unwrap(quote));
			});
		}

		loadQuote(this.securityCode());

		this.securityCode.subscribe(loadQuote);

		this.syrahSentiments = new SentimentsModel();

		this.isSentimentTextLong = ko.computed(function () {
			var result;
			var longTermName = self.syrahSentiments.syrahSentimentLongTerm.name();
			var shortTermName = self.syrahSentiments.syrahSentimentShortTerm.name();
			result = longTermName && longTermName.length > 10 ||
				shortTermName && shortTermName.length > 10;
			return result;
		});

		this.updateSentiments = function (newSentimentShortTerm, newSentimentLongTerm) {
			self.syrahSentiments.updateSentiments({
				syrahLongSentiment: newSentimentLongTerm ? newSentimentLongTerm.value : null,
				syrahShortSentiment: newSentimentShortTerm ? newSentimentShortTerm.value : null
			});
			context.symbolSentiments(self.syrahSentiments);
		};
	}

	return QuoteWidget;
});