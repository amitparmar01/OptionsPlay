define(['knockout',
		'dataContext',
		'modules/formatting',
		'modules/help',
		'kendo',
		'modules/context',
		'viewmodels/tradeIdeas/tradeIdeaGrid',
		'koBindings/fadeBackdropVisible',
		'koBindings/redGreen',
		'bootstrap'],
function (ko, dataContext, formatting, help, kendo, context, TradeIdeaGrid) {
	var TradeIdea = function () {
		var self = this;

		var DEFAULT_SENTIMENT = '全部';
		var DEFAULT_SECTOR = '所有版块';
		var DEFAULT_REASON = '所有扫描';
		var BILLION = 1000000000;

		this.backdrop = ko.observable(true);
		var bullishSentiment = { name: 'Bullish', text: '牛市', checked: ko.observable(false) };
		var bearishSentiment = { name: 'Bearish', text: '熊市', checked: ko.observable(false) }
		this.sentiments = [bullishSentiment, bearishSentiment];
		
		this.selectSentiment = function (sentiment) {
			if (sentiment.checked()) {
				sentiment.checked(false);
			} else {
				if (bullishSentiment == sentiment && bearishSentiment.checked()) {
					bearishSentiment.checked(false);
				} else if (bearishSentiment == sentiment && bullishSentiment.checked()) {
					bullishSentiment.checked(false);
				} else {
					sentiment.checked(true);
				}
			}
		}

		function resetSentimentFilter() {
			var selectedSentiment = self.selectedSentiment();
			if (selectedSentiment) {
				selectedSentiment.checked(false);
			}
		}

		this.marketCapFilters = [
			// all ranges in billions
			{ name: '小盘', from: -Infinity, to: 2 * BILLION, checked: ko.observable(false) },
			{ name: '中盘', from: 2 * BILLION, to: 10 * BILLION, checked: ko.observable(false) },
			{ name: '大盘', from: 10 * BILLION, to: 200 * BILLION, checked: ko.observable(false) },
			{ name: '超大盘', from: 200 * BILLION, to: Infinity, checked: ko.observable(false) }
		];

		this.tradeIdeasGrid = new TradeIdeaGrid();


		this.sectors = ko.observableArray([DEFAULT_SECTOR]);
		this.sector = ko.observable(DEFAULT_SECTOR);
		this.sector.subscribe(filterTradeIdeas);
		this.isFilterActive = function (value) {
			var result = value !== DEFAULT_REASON && value !== DEFAULT_SECTOR;
			return result;
		};

		this.tradeIdeasCount = ko.computed(function () {
			return self.tradeIdeasGrid.filteredItems().length;
		});

		dataContext.quotation.get().done(function (optionables) {
		    dataContext.technicalRank.get().done(function (signals) {
		        dataContext.sentiments.get().done(function (sentiments) {
		            self.tradeIdeasGrid.updateTradeIdeas(optionables, signals, sentiments);
		            // initialize values for 'reason' and 'sector' filters
		            ko.utils.arrayForEach(self.tradeIdeasGrid.items(), function (tradeIdea) {
		                var sector;

		                sector = tradeIdea.sector;
		                if (sector && self.sectors().indexOf(sector) === -1) {
		                    //self.sectors.push(sector);
		                }
		            });
		            self.backdrop(false);
		        });
		    });
		});

		this.selectedSentiment = ko.computed(function () {
			var i;
			for (i = 0; i < self.sentiments.length; ++i) {
				if (self.sentiments[i].checked()) {
					return self.sentiments[i];
				}
			}
			return null;
		}).extend({ rateLimit: 10 });;

		this.selectedSentiment.subscribe(function () {
			filterTradeIdeas();
		});

		function selectAllMarketCaps() {
			for (var i = 0; i < self.marketCapFilters.length; i++) {
				self.marketCapFilters[i].checked(false);
			}
		}

		this.selectMarketCap = function (marketCap) {
			var allChecked;

			if (marketCap) {
				marketCap.checked(!marketCap.checked());
			}
			allChecked = !$(self.marketCapFilters).is(function (index) {
				return !self.marketCapFilters[index].checked();
			});

			if (allChecked) {
				selectAllMarketCaps();
			}
			filterTradeIdeas();
		};

		function filterTradeIdeas() {

			var selectedSentiment = self.selectedSentiment();
			var sentimentfilterValue = !selectedSentiment ? '' : selectedSentiment.name;

			var sector = self.sector();
			var sectorFilterVal = sector !== DEFAULT_SECTOR
				? sector
				: '';

			//var reason = self.reason();
			//var reasonFilterVal = reason !== DEFAULT_REASON
			//	? reason
			//	: '';

			var marketCaps = $.grep(self.marketCapFilters, function (filter) {
				return filter.checked();
			});

			self.tradeIdeasGrid.filter({
				sentiment: sentimentfilterValue,
				sector: sectorFilterVal,
				marketCap: marketCaps
			});
		}

		this.initializeUI = function () {
			$('.dropdown-toggle').dropdown();
		}
	}
	return new TradeIdea();
});