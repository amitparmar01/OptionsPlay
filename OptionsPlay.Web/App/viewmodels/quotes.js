define(['knockout',
		'dataContext',
		'komapping',
		'events',
		'plugins/router',
		'modules/context',
		'koBindings/textFormatted',
		'koBindings/redGreen',
		'koBindings/bootstrap',
		'koBindings/perfectScrollbar',
		'koBindings/changeFlash'
],
function (ko, dataContext, komapping, events, router, context) {
	function QuotePage() {
		var self = this;

		this.optionables = ko.observableArray([]);
		this.securityCode = context.ulCode;

		this.fullChart = ko.observable(false);

		this.pullOptionableQuotes = function () {
			dataContext.quotation.get().done(function (optionables) {
				if (ko.isObservable(optionables)) {
					self.optionables(optionables());
					self.optionables().some(function (quote) {
						if (quote.securityCode == self.securityCode()) {
							events.trigger(events.Quotes.CHANGE_DETAILS, quote);
							return true;
						}
						return false;
					});
				} else {
					debugger;
				}
			});
		};


		router.on('router:route:activating', function (instance) {
			if (instance != self) {
				$('.stx_annotation').hide();
			}
		});
		
		this.columnHeaders = ko.computed(function () {
			var noOfOptionables = self.optionables().length;
			var noOfHeaders = Math.min(3, noOfOptionables);
			return new Array(noOfHeaders);
		});

		this.goToChains = function (quote) {
			context.symbolCode(quote.securityCode);
			router.navigate('#chains');
		}

		this.updateChart = function (quote) {
			context.symbolCode(quote.securityCode);
			events.trigger(events.Quotes.CHANGE_DETAILS, quote);
			return false;
		}

		this.marketDataDetail = ko.observable();

		events.on(events.Quotes.CHANGE_DETAILS).then(function (quote) {
			self.marketDataDetail(quote);
		});

		this.showHistChartTab = function () {
			
		}
		this.showIntradayChartTab = function () {
			// force Hightcharts charts reflow to proper size.
			$(window).resize();
	}

		this.pullOptionableQuotes();
	}

	return QuotePage;
});