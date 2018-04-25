define(['knockout',
		'dataContext',
		'modules/formatting',
		'modules/context',
		'modules/helpers'],
function (ko, dataContext, formatting, context, helpers) {
    var TradeIdeaGrid = function () {
        var self = this;

        this.items = ko.observableArray([]);
        this.activeFilters = ko.observableArray([]);

        var Header = function (title, sortPropertyName, cssClass) {
            this.title = title;
            this.sortPropertyName = sortPropertyName;
            this.sortingAsc = ko.observable(null);
            this.cssClass = cssClass;
        };

        this.headers = [
			new Header('公司名称', 'securityName', 'company-name-cell'),
			new Header('价格', 'lastPrice', 'last-price-cell'),
			new Header('评级', 'technicalRank', 'technical-rank-cell'),
			new Header('趋势', 'sentiment', 'sentiment-cell')
        ];

        this.updateTradeIdeas = function (tradeIdeas, signals, sentiments) {
            if (ko.isObservable(tradeIdeas)) {
                tradeIdeas = ko.unwrap(tradeIdeas);
            }
            if (ko.isObservable(signals)) {
                signals = ko.unwrap(signals);
            }
            if (ko.isObservable(sentiments)) {
                sentiments = ko.unwrap(sentiments);
            }
            var signalsArray = signals;
            var sentimentsaArray = sentiments;
            var items = tradeIdeas.map(function (tradeIdea, index) {
                return {
                    securityName: tradeIdea.securityName,
                    securityCode: tradeIdea.securityCode,
                    lastPrice: tradeIdea.lastPrice,
                    change: tradeIdea.change,
                    changePercentage: tradeIdea.changePercentage,
                    //sentiment: tradeIdea.change() > 0 ? 'Bullish' : 'Bearish',
                    sentiment: sentimentsaArray[index].sentiment,
                    //sentimentGradientCssClass: tradeIdea.change() > 0 ? 'bullish' : 'bearish',
                    sentimentGradientCssClass: sentimentsaArray[index].sentiment,
                    sector: tradeIdea.securityClass,
                    rules: [],
                    marketCap: tradeIdea.turnover(),
                    //technicalRank: tradeIdea.change() > 0 ? 6 : 2,
                    technicalRank: signalsArray[index].value,
                }
            });
            self.items(items);
            context.trendSentiment(sentimentsaArray[0].sentiment);
            findCurrentSymbolInTradeIdeas(context.ulCode());
        };

        var filterFunctions = {
            security: function (item, value) {
                var uppercaseValue = value.toUpperCase();
                var codeStartsWith = item.securityCode.indexOf(uppercaseValue) == 0;
                var comapnyContains = value.length > 3 && item.companyName.toUpperCase().indexOf(uppercaseValue) != -1;
                return codeStartsWith || comapnyContains;
            },
            sector: defaultFilterFunction('sector'),
            sentiment: defaultFilterFunction('sentiment'),
            reason: function (item, value) {
                if (value === configuration.MULTIPLE_SCANS_VALUE) {
                    var result = item.rules.length > 1;
                    return result;
                }

                var firstMatch = ko.utils.arrayFirst(item.rules, function (rule) {
                    return rule.reason === value;
                });
                return !!firstMatch;
            },
            marketCap: function (item, selectedMarketCaps) {
                var i;
                var filter;
                var marketCap;

                if (!selectedMarketCaps || selectedMarketCaps.length == 0) {
                    return true;
                }

                marketCap = item.marketCap;
                for (i = 0; i < selectedMarketCaps.length; i++) {
                    filter = selectedMarketCaps[i];
                    if ((marketCap <= filter.to) && (marketCap > filter.from)) {
                        return true;
                    }
                }
                return false;
            }
        };

        function defaultFilterFunction(property) {
            return function (item, value) {
                return item[property] === value;
            };
        }
        function resetScroll() {
            self.scrollTop(0);
            self.scrollTop.valueHasMutated();
        }

        this.filter = function (filterObject) {
            var filterValue, filterFunc;
            var resultFilters = [];
            var property;

            for (property in filterObject) {
                filterValue = filterObject[property];

                if (filterValue == null || filterValue == '' || filterValue == []) {
                    continue;
                }

                filterFunc = filterFunctions[property];
                if (!filterFunc) {
                    throw "Filter is not specified";
                }

                resultFilters.push(helpers.partialRight(filterFunc, filterValue));
            }

            self.activeFilters(resultFilters);
            resetScroll();
        };


        this.selectedItem = context.selectedTradeIdea;
        this.selectTradeIdea = function (tradeIdea) {
            if (!tradeIdea && self.selectedItem()) {
                self.selectedItem(null);
            }
            if (!tradeIdea || context.ulCode() === tradeIdea.securityCode.toUpperCase()) {
                return;
            }
            context.trendSentiment(tradeIdea.sentiment);
            context.isWhyPanelLoading(true);
            context.isHowPanelLoading(true);
            context.isTradeIdPanelLoading(false);
            self.selectedItem(tradeIdea);
        };

        this.headers[0].sortingAsc(true);

        // to be able determine current header the grid is currently sorted by
        this.activeSortHeader = ko.observable(this.headers[0]);

        // Default sort does nothing.
        this.activeSortFunction = ko.observable(function () {
            return 0;
        });

        this.sort = function (header) {
            var propertyName, ascSort, descSort, sortFunc;
            var currentHeaderSort = header.sortingAsc();

            //if this header was just clicked a second time
            if (currentHeaderSort != null) {
                header.sortingAsc(!currentHeaderSort); //toggle the direction of the sort
            } else {
                ko.utils.arrayForEach(self.headers, function (item) { item.sortingAsc(null); });
                header.sortingAsc(true);
            }

            propertyName = header.sortPropertyName;

            ascSort = function (first, second) {
                var firstValue = ko.utils.unwrapObservable(first[propertyName]);
                var secondValue = ko.utils.unwrapObservable(second[propertyName]);
                return firstValue < secondValue ? -1 : firstValue > secondValue ? 1 : firstValue == secondValue ? 0 : 0;
            };

            descSort = function (b, a) {
                return ascSort(a, b);
            };

            sortFunc = header.sortingAsc() ? ascSort : descSort;

            self.activeSortHeader(header);
            self.activeSortFunction(sortFunc);

            resetScroll();
        };

        this.filteredItems = ko.computed(function () {
            var sortFunction = self.activeSortFunction();
            var array;
            var filterFunction;

            var filters = self.activeFilters();
            if (filters.length == 0) {
                array = self.items();
            } else {
                filterFunction = function (item) {
                    var i, filter;
                    for (i = 0; i < filters.length; i++) {
                        filter = filters[i];
                        if (!filter(item)) {
                            return false;
                        }
                    }
                    return true;
                };
                array = ko.utils.arrayFilter(self.items(), filterFunction);
            }

            return array.sort(sortFunction);
        });

        this.rowHeight = 36;
        this.scrollTop = ko.observable(0);

        this.isTradePanelVisible = ko.observable(true);

        this.visibleItemIndexes = ko.observable();

        function ensureVisible(tradeIdea) {
            var filteredItems = self.filteredItems();
            var index = filteredItems.indexOf(tradeIdea);
            if (index == -1) {
                return;
            }

            var newTop = index * self.rowHeight;
            self.scrollTop(newTop);
        }

        function findCurrentSymbolInTradeIdeas(ulCode) {
            var currentlySelected = self.selectedItem();
            var firstMatch, result;
            if (currentlySelected && currentlySelected.securityCode === ulCode) {
                return true;
            }

            firstMatch = ko.utils.arrayFirst(self.items(), function (item) {
                return item.securityCode.toUpperCase() === ulCode.toUpperCase();
            });
            self.selectedItem(firstMatch);
            ensureVisible(firstMatch);

            result = firstMatch != null;
            return result;
        }

        context.ulCode.subscribe(findCurrentSymbolInTradeIdeas);
        //findCurrentSymbolInTradeIdeas(context.ulCode());
    };

    return TradeIdeaGrid;
});