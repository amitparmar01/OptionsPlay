define(['knockout',
		'modules/context',
		'dataContext',
		'events',
		'komapping',
		'modules/notifications',
		'viewmodels/howPanel/tradingStrategies',
        'modules/combinationHelpers',
		//'viewmodels/howPanel/tradeTicket',
		//'viewmodels/howPanel/incomeStrategies',
		//'viewmodels/howPanel/strategiesOverview',
		'viewmodels/howPanel/singleTrade',
		'durandal/activator',
		'modules/formatting',
        'modules/localizer',
		'bootstrap',
		'highstock'],
function (ko, context, dataContext, events, mapping, notifications, TradingStrategies, combinationHelpers, /*TradeTicket, IncomeStrategies, StrategiesOverview,*/ singleTrade, activator, formatting,localizer) {
    var BULLISH = "BULLISH";
    var BEARISH = "BEARISH";
    var HowPanel = function () {
        var self = this;

        this.isInSingleTrade = ko.observable(false);
        this.hasTriggeredTradingStrategies = ko.observable(false);

        this.isLoading = context.isHowPanelLoading;
        this.symbol = context.ulCode;
        this.hasData = ko.observable(false);
        this.hasOption = ko.observable(false);
        this.isTradable = ko.observable(false);

        this.tradeTicket = null;//new TradeTicket();

        this.tradingStrategiesRaw = {};
        this.tradingStrategiesRaw[BULLISH] = null;
        this.tradingStrategiesRaw[BEARISH] = null;

        this.sentiment = ko.observable();
        this.quote = null;
        this.chainEntity = null;
        this.chain = null;
        this.stdDev = null;
        this.predictions = null;
        this.optionType = ko.observable('S');

        // temporary fix for no premium in the morning
        var zeroPremiumNotificationHiddenByUser = ko.observable(false);
        this.zeroPremium = ko.observable();

        this.now = ko.observable(new Date());

        var countTimeInterval = window.setInterval(function () {
            self.now(new Date());
        }, 10000);

        this.showZeroPremium = ko.computed(function () {
            var time = self.now();
            var hour = time.getUTCHours();
            var minute = time.getUTCMinutes();
            if ((hour > 5 && hour < 13) || (hour == 13 && minute <= 50)) {
                var result = (!zeroPremiumNotificationHiddenByUser() && self.zeroPremium());
                return result;
            } else {
                window.clearInterval(countTimeInterval);
                return false;
            }
        });

        this.closeNotification = function () {
            zeroPremiumNotificationHiddenByUser(true);
        };

        this.checkAndResizeHighcharts = function () {
            $.each(Highcharts.charts, function (index, chart) {
                if (!chart || !document.documentElement.contains(chart.container)) {
                    return;
                }
                var $chartContainer = $(chart.container);
                var chartWidth = $chartContainer.width();
                var chartHeight = $chartContainer.height();
                var $containerParent = $chartContainer.parent();
                if ($containerParent.is(":visible")) {
                    var parentWidth = $containerParent.width(),
						parentHeight = $containerParent.height();
                    if (parentWidth && parentHeight && (chartWidth != parentWidth || chartHeight != parentHeight)) {
                        chart.reflow && chart.reflow();
                    }
                }
            });
        };

        function resetViewModel() {
            self.hasData(false);

            self.quote = null;
            self.chain = null;
        };

        this.updateViewModel = function (how) {
            resetViewModel();
            if (!how || !how.expandedQuote || !how.tradingStrategies) {
                return;
            }

            self.quote = mapping.fromJS(how.expandedQuote, {
                copy: ['symbol']
            });

            // todo: there code block just hide an issue related with different quotes for php and it's how panel
            self.quote.changeWithSign = ko.computed(function () {
                var res = self.quote.change();
                if (self.quote.changeSign() === 'd') {
                    res = res * -1;
                }
                return res;
            });

            // todo: code duplication. Think about creating custom binding or extender
            self.quote.extendedChangeFormatted = ko.computed(function () {
                return formatting.toExtendedChange(self.quote.changeWithSign(), self.quote.percentageChange());
            });

            self.hasOption(how.expandedQuote.hasOption);
            self.isTradable(how.expandedQuote.isTradable);
            self.sentiment(how.sentiment);

            self.optionType('S');
            if (self.hasOption()) {
                self.chain = self.chainEntity;
                self.chain.readOptionChains(self.symbol(), how.optionChains, self.quote.last());
                self.zeroPremium(self.chain.zeroPremium());
            } else {
                notifications.info('Symbol "' + how.expandedQuote.symbol + '" has no listed options', 'No Option Chains');
                self.chain = null;
            }

            self.stdDev = new StandardDeviation(self.symbol, self.quote.last(), how.standardDeviations);

            self.predictions = new Predictions(self.symbol, how.predictions);
            self.hasData(true);

            self.incomeStrategies.updateViewModel(how.callOptimal, how.putOptimal);

            self.tradingStrategiesRaw[BULLISH] = how.tradingStrategies;
            self.tradingStrategiesRaw[BEARISH] = how.oppositeStrategies;
            self.tradingStrategies.updateViewModel(self.tradingStrategiesRaw[how.sentiment]);

            if (!checkAndRestoreSharedTrade()) {
                self.showDefaultStrategiesView();
            }
        };

        //#region flipping strategies sentiment
        this.oppositeSentiment = ko.computed(function () {
            switch (self.sentiment()) {
                case BULLISH:
                    return BEARISH;
                case BEARISH:
                    return BULLISH;
                default:
                    return null;
            }
        });

        function changeStrategiesSentiment(sentiment) {
            if (sentiment != BULLISH && sentiment != BEARISH) {
                return;
            }
            context.showTradePanel();

            if (self.sentiment() == sentiment) {
                return;
            }

            if (self.hasData()) {
                self.sentiment(sentiment);
                self.tradingStrategies.updateViewModel(self.tradingStrategiesRaw[sentiment]);
                showTradingStrategiesTab();
            }
        }
        events.on(events.How.TOGGLE_SENTIMENT, changeStrategiesSentiment);
        //#endregion flipping strategies sentiment

        function showTradingStrategiesTab() {
            // TODO: Never use such a methods. Imagine how simple it would be if you implemented it via knockout binding: self.activeStrategiesPane(tradingStrategies)
            $('#tradingStrategiesTab').tab('show');
        }

        this.tradeCombination = function (comb) {
            //self.tradeTicket.refreshTrade(comb);
            //self.tradeTicket.show();
            var legs = combinationHelpers.extractOrderEntries(comb);
            if(!legs.length){
                notifications.info(localizer.localize('app.notifications.stockTradeNotSupport'));
                return false;
            }
            events.trigger(events.OrderEntry.PREFILL_ORDER, legs, comb);
        };

        this.currentView = activator.create();

        this.showCombinationInSingleTradeView = function (combination, shareDetails) {
            var singleTradeViewModel = singleTrade.create(combination, self, shareDetails);
            return self.currentView.activateItem(singleTradeViewModel);
        }

        this.showDefaultStrategiesView = function () {
            self.currentView.activateItem(self.strategiesOverview);
        }

        this.closeExpand = function () {
            self.currentView.activateItem(self.tradingStrategies);
        }

        var sharedTradeToRestore = null;
        function checkAndRestoreSharedTrade() {
            if (!sharedTradeToRestore || self.isLoading()) {
                return false;
            }

            var sharedTrade = sharedTradeToRestore;
            sharedTradeToRestore = null;

            if (sharedTrade.symbol != self.symbol()) {
                return false;
            }

            if (sharedTrade.isExpired) {
                notifications.info('Shared ' + sharedTrade.symbol + ' strategy from ' + sharedTrade.sharedBy + ' has expired');
                return false;
            }
            sharedTrade.legs.forEach(function (leg) {
                if (leg.expiry) {
                    leg.expiry = new Date(leg.expiry);
                }
            });

            var comb = self.tradingStrategies.allCombinations()[0];
            comb.initPositions(sharedTrade.legs);
            self.showCombinationInSingleTradeView(comb, sharedTrade);

            // this if added to support already created shared trades which not contains targetPrice and targetDate
            if (sharedTrade.targetPrice && sharedTrade.targetDate) {
                self.tradingStrategies.whatifSPrice(sharedTrade.targetPrice);
                self.tradingStrategies.whatifDate(new Date(sharedTrade.targetDate));
            }

            return true;
        }

        this.restoreSharedStrategy = function (sharedTrade) {
            if (!sharedTrade.legs || sharedTrade.legs.length < 1 || sharedTrade.symbol != self.symbol()) {
                return;
            }
            sharedTradeToRestore = sharedTrade;
            if (!self.isLoading()) {
                checkAndRestoreSharedTrade();
            }
        };

        this.tradingStrategies = new TradingStrategies(self);
        this.incomeStrategies = null; //new IncomeStrategies(self);
        this.strategiesOverview = null; //new StrategiesOverview(self);

        (function () {
            $(window).on('resize', self.checkAndResizeHighcharts);
            //events.on(events.PACE_DONE, self.checkAndResizeHighcharts);
            context.isTradePanelVisible.subscribe(function () {
                self.checkAndResizeHighcharts();
            });
        })();

        this.attached = function () {
            self.checkAndResizeHighcharts();
            dataContext.optionChains.get(self.symbol()).done(function (c) {
                self.chain = c;
                self.hasOption(true);
                //self.hasData(true);
                self.currentView.activateItem(self.tradingStrategies);
                //self.isLoading(false);
            });
        }

        //context.ulCode.subscribe(self.attached);
    };

    return new HowPanel();
});
