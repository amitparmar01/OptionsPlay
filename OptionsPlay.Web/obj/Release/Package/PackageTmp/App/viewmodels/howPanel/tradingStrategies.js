define(['knockout',
        'events',
		'dataContext',
		'modules/context',
		'modules/enums',
		'modules/combinationViewModel',
		'modules/combinationHelpers',
		'modules/strategyHelpers',
		'modules/strategyTemplates',
		'modules/combinationChart',
		'modules/combinationEditor',
		'modules/formatting',
		'modules/notifications',
		'modules/configurations',
		'koBindings/bootstrapDatePicker',
		'koBindings/chartBindings',
		'koBindings/customControls',
		'koBindings/customExtenders'],
function (ko, events, dataContext, context, enums, Combination, combinationHelpers, strategyHelpers, strategyTemplates, CombinationChart,
	CombinationEditor, formatting, notifications, configuration) {

    // todo: remove all Math-related stuff out of here (separate modules)!
    var TradingStrategies = function (strategyContext) {
        var self = this;

        this.DATE_FORMAT = configuration.DATE_FORMAT;
        this.symbol = context.ulCode;
        this.isTradable = function () {
            return strategyContext.quote;
        };

        this.hasOption = strategyContext.hasOption;
       // this.hasData = strategyContext.hasData;
        this.sentiment = strategyContext.sentiment;

        this.expandChartClick = function (combination) {
            strategyContext.showCombinationInSingleTradeView(combination);
        };

        //this.closeExpand = function () {
        //	strategyContext.showDefaultStrategiesView();
        //};

        

        this.isTradePanelVisible = context.isTradePanelVisible;
        this.lowPrice = ko.observable(0);
        this.highPrice = ko.observable(100);
        this.maxDays = ko.observable(0);
        this.sdSliderTicks = ko.observableArray([]);
        this.sdSliderSupRes = ko.observableArray([]);
        this.chartLowBound = ko.observable(0);
        this.chartHighBound = ko.observable(100);
        this.chartLowPrice = ko.observable(0).extend({ numberRounded: 2 });
        this.chartHighPrice = ko.observable(100).extend({ numberRounded: 2 });
        this.chartLowPercent = ko.observable();
        this.chartHighPercent = ko.observable();
        this.chartRangeProb = ko.observable();
        this.chartSPrices = ko.computed({
            read: function () {
                if (strategyContext.predictions && self.maxDays()) {
                    var probs = strategyContext.predictions.getProb(self.maxDays());
                    if (probs) {
                        self.chartRangeProb(probs.probBetween(self.chartLowPrice(), self.chartHighPrice()) * 100);
                    } else {
                        self.chartRangeProb('N/A');
                    }
                } else {
                    self.chartRangeProb('N/A');
                }
                return [self.chartLowPrice(), self.chartHighPrice()];
            },
            write: function (newVal) {
                var low = newVal[0], high = newVal[1];
                self.chartLowPrice(low);
                self.chartHighPrice(high);
            }
        }, this).extend({ rateLimit: { timeout: 10, method: 'notifyWhenChangesStop' } });
        this.chartSPrices.subscribe(function () {
            if (typeof $('#sdRangeChart')[0] != 'undefined') {
                self.showRangeChart();
            }
        });
        this.narrowRange = ko.computed(function () {
            var range = self.chartSPrices();
            var sds = self.sdSliderTicks();
            if (sds && sds.length > 0) {
                return formatting.closeTo(range[0], sds[1], 0.02) && formatting.closeTo(range[1], sds[3], 0.02);
            }
            return false;
        });
        this.wideRange = ko.computed(function () {
            var range = self.chartSPrices();
            var sds = self.sdSliderTicks();
            if (sds && sds.length > 0) {
                return formatting.closeTo(range[0], sds[0], 0.02) && formatting.closeTo(range[1], sds[4], 0.02);
            }
            return false;
        });
        function getProbPos(value, leftRightFlag) {
            var left = 0;
            var lastPercentage = 0.5;
            var leftPercentage = (value - self.chartLowBound()) / (self.chartHighBound() - self.chartLowBound());
            if (strategyContext.quote) {
                lastPercentage = (strategyContext.quote.last() - self.chartLowBound()) / (self.chartHighBound() - self.chartLowBound());
                left = leftPercentage / 2 + lastPercentage / 2;
            }
            var bottom = 0.3 - Math.abs(lastPercentage - left) * 0.5;
            if (!leftRightFlag && self.leftProbPos() && Math.abs(self.leftProbPos().leftVal - left) < 0.15) {
                bottom -= 0.1;
            }
            var prob = 0;
            if (strategyContext.predictions && !$.isEmptyObject(strategyContext.predictions.probs) && self.maxDays()
				&& strategyContext.predictions.getProb(self.maxDays()) && (leftRightFlag ? value < strategyContext.quote.last() : value > strategyContext.quote.last())) {
                prob = strategyContext.predictions.getProb(self.maxDays()).probBetween(value, strategyContext.quote.last());
            }
            return {
                left: (left * 100) + '%',
                leftVal: left,
                bottom: (bottom * 100) + '%',
                display: prob != 0,
                prob: prob * 100
            };
        }
        this.leftProbPos = ko.computed(function () {
            return getProbPos(self.chartLowPrice(), true);
        }, this);
        this.rightProbPos = ko.computed(function () {
            return getProbPos(self.chartHighPrice(), false);
        }, this);

        this.tradeTicket = strategyContext.tradeTicket;

        this.tradeCombination = function (combination) {
            strategyContext.tradeCombination(combination);
        };

        this.symbolFullName = ko.computed(function () {
            var quote = context.quote();
            if (!quote) {
                return "";
            } else {
                return quote.securityName;
            }
        });

        this.displayedToolboxIndex = ko.observable(0);

        this.strategyTemplates = strategyTemplates.templates;
        this.sentimentOptions = strategyTemplates.sentiments;

        this.allCombinations = ko.observableArray([]);

        this.prefferedShareIconPlacement = ko.computed(function () {
            var combinations = self.allCombinations();

            var placementAndNumberOfPossibleUsage = {};
            combinations.forEach(function (combination) {
                if (combination.chartVM) {
                    combination.chartVM.freeQuadrants().forEach(function (quadrant) {
                        if (!placementAndNumberOfPossibleUsage[quadrant.name]) {
                            placementAndNumberOfPossibleUsage[quadrant.name] = 1;
                        } else {
                            placementAndNumberOfPossibleUsage[quadrant.name]++;
                        }
                    });
                }
            });

            var placementWithMaxSuitableUsage = null;
            var maxValue = -1;
            for (var placement in placementAndNumberOfPossibleUsage) {
                if (placementAndNumberOfPossibleUsage.hasOwnProperty(placement)) {
                    var value = placementAndNumberOfPossibleUsage[placement];
                    if (value > maxValue) {
                        placementWithMaxSuitableUsage = placement;
                        maxValue = value;
                    }
                }
            }
            combinations.forEach(function (combination) {
                if (combination.chartVM) {
                    combination.chartVM.freeChosenQuadrandName(placementWithMaxSuitableUsage);
                }
            });
            return placementWithMaxSuitableUsage;
        });

        this.sentimentStrategyMap = ko.observable([]);
        function updateSentimentStrategyMap() {
            if (self.isTradable()) {
                self.sentimentStrategyMap(strategyTemplates.sentimentStrategyMap);
            }

            var resultList = [];
            $.each(strategyTemplates.sentimentStrategyMap, function (data, list) {
                var internalList = list.filter(function (elem) {
                    var allLegsAreOptions = elem.template.legs.every(function (leg) {
                        return leg.legType !== 'Security';
                    });
                    return allLegsAreOptions;
                });
                resultList[data] = internalList;
            });
            self.sentimentStrategyMap(resultList);
        }

        this.showEditorCombination = ko.observable(null);
        this.selectedStrategy = ko.computed({
            read: function () {
                var comb = self.showEditorCombination();
                var result = null;
                if (comb && comb.matchedTemplate && comb.matchedTemplate()) {
                    result = comb.matchedTemplate();
                }
                return result;
            },
            write: function (strategy) {
                self.constructCombination(strategy);
            }
        }, this);
        this.defaultTradingStrategies = [ko.observable(null), ko.observable(null), ko.observable(null)];
        this.showDefaultEnglish = ko.computed(function () {
            var result = true, i = 0;
            for (; i < self.defaultTradingStrategies.length; i++) {
                result = result && !!self.defaultTradingStrategies[i]() && self.allCombinations()[i] && self.defaultTradingStrategies[i]() == self.allCombinations()[i].fullName();
            }
            return result;
        });
        this.noOfBreakeven = ko.observable(1);
        this.breakevenCss = ko.computed(function () {
            var combs = self.allCombinations();
            var noOfBreakeven = 1;
            for (var i = 0; i < combs.length; i++) {
                var comb = combs[i];
                if (comb && comb.whatifTheoretical) {
                    var be = comb.breakeven();
                    noOfBreakeven = Math.max(be.length, noOfBreakeven);
                }
            }
            self.noOfBreakeven(noOfBreakeven);
            return noOfBreakeven > 1 ? 'two-line' : 'one-line';
        }, this);

        this.bestTradingStrategy = ko.computed(function () {
            var combs = self.allCombinations();
            var bestPL = 0, bestComb = null;
            for (var i = 0; i < combs.length; i++) {
                var comb = combs[i];
                if (comb && comb.whatifTheoretical) {
                    comb.whatifTheoretical();
                    var pl = comb.whatifTheoreticalPL;
                    if (pl > bestPL) {
                        bestComb = comb;
                        bestPL = pl;
                    }
                }
            }
            return bestComb;
        });

        this.whatifSPrice = ko.observable(0);
        this.whatifSPriceAnchor = ko.observable(0);

        this.whatifDate = ko.observable(new Date());

        this.whatifDays = ko.computed({
            read: function () {
                return formatting.daysFromNow(self.whatifDate());
            },
            write: function (newDays) {
                var date = new Date(new Date().getTime() + newDays * 24 * 3600 * 1000);
                self.whatifDate(date);
            }
        });

        this.whatifVolatility = ko.observable(0.3);
        this.whatifVolatilityAnchor = ko.observable(0.3);

        var currentExpirations = [null, null, null];

        this.dateOfBellSlider = ko.observable(null);

        this.dateSliderMaxDays = ko.computed(function () {
            var result = formatting.daysFromNow(self.dateOfBellSlider());
            return result;
        }, this);


        this.furthestExpiration = ko.computed(function () {
            var combinations = self.allCombinations();
            if (strategyContext.chain == null) {
                return new Date();
            }
            var expirations = [];
            var result = strategyContext.chain != null ? strategyContext.chain.expirationDates[0].date : new Date();
            for (var i = 0; i < combinations.length; i++) {
                if (combinations[i] && combinations[i].expiration()) {
                    var date = combinations[i].expiration();
                    expirations[i] = date;
                    if (result.getTime() < date.getTime()) {
                        result = date;
                    }
                }
            }
            var sameExpirations = true;
            expirations.forEach(function (expiration, idx) {
                sameExpirations &= formatting.sameDate(expiration, currentExpirations[idx]);
            });
            if (!sameExpirations) {
                self.dateOfBellSlider(result);
            }
            currentExpirations = expirations;
            return result;
        }, this);

        self.expiryStr = ko.observable(null);
        self.dateOfBellSlider.subscribe(function () {
            self.expiryStr(formatting.formatDate(self.dateOfBellSlider(), 'yyyy-MM-dd'));
        });

        self.expiryStr.subscribe(function (newStr) {
            self.dateOfBellSlider(new Date(newStr));
        });

        this.expirySelectOptions = ko.observable([]);
        function updateExpirySelectOptions() {
            var newOptions = [];

            if (strategyContext.chain) {
                var expirySelectOptions = strategyContext.chain.expirySelectOptions;

                newOptions = expirySelectOptions.map(function (expiry) {
                    var expirySelect = $.extend({}, expiry);
                    expirySelect.isGrayed = ko.computed(function () {
                        return formatting.compareDates(expiry.date, self.furthestExpiration()) === 1;
                    });
                    expirySelect.expiryStr = formatting.formatDate(expirySelect.date, 'yyyy-MM-dd')
                    return expirySelect;
                });
            }

            self.expirySelectOptions(newOptions);
        }

        this.minVolatility = ko.computed(function () {
            if (self.dateOfBellSlider() && self.allCombinations().length && strategyContext.chain) {
                var result = strategyContext.chain.impliedVolatility(self.dateOfBellSlider()) * 0.5;
                if (result > 0) {
                    return result;
                }
            }
            return 0;
        });

        this.maxVolatility = ko.computed(function () {
            if (self.dateOfBellSlider() && self.allCombinations().length && strategyContext.chain) {
                return strategyContext.chain.impliedVolatility(self.dateOfBellSlider()) * 1.5;
            }
            return 100;
        });

        context.selectedTradeIdea.subscribe(updateSliderOptions);

        function updateSliderOptions() {
            var newMax = self.dateSliderMaxDays();
            self.maxDays(newMax);
            if (strategyContext.stdDev && strategyContext.chain) {
                var today = new Date();
                var expiry = new Date(today.getFullYear(), today.getMonth(), today.getDate() + newMax);

                var volatility = strategyContext.chain.impliedVolatility(expiry);
                self.whatifVolatility(volatility);
                self.whatifVolatilityAnchor(volatility);

                var sds = strategyContext.stdDev.getStdDevsByExpiry(self.dateOfBellSlider());
                sds = sds && sds.stdDevPrices.slice(0);

                var sentiment = getDefaultSentiment();

                if (sds) {
                    var sdsNarrow = [sds[1], sds[2], strategyContext.quote.last(), sds[3], sds[4]];
                    self.lowPrice(sdsNarrow[0]);
                    self.highPrice(sdsNarrow[4]);
                    self.chartLowBound(sdsNarrow[0]);
                    self.chartHighBound(sdsNarrow[4]);
                    self.sdSliderTicks(sdsNarrow);
                    self.chartLowPrice(sdsNarrow[1]);
                    self.chartHighPrice(sdsNarrow[3]);
                    self.whatifSPrice(formatting.roundNumber(sentiment == enums.Sentiment.BULLISH ? sdsNarrow[3] : sdsNarrow[1]));
                }
                else {
                    self.lowPrice(strategyContext.quote.last() * 0.7);
                    self.highPrice(strategyContext.quote.last() * 1.3);
                    self.whatifSPrice(formatting.roundNumber(sentiment == enums.Sentiment.BULLISH ? strategyContext.quote.last() * 1.15 : strategyContext.quote.last() * 0.85));
                }
            }
            if (strategyContext.quote) {
                self.whatifSPriceAnchor(strategyContext.quote.last());
            }
            self.whatifDays(newMax);
        }

        this.dateOfBellSlider.subscribe(updateSliderOptions);

        this.whatifDateOnSlide = function (event, ui) {
            var val = ui.value;
            if (!isNaN(val)) {
                self.whatifDays(val);
            }
        };
        this.whatifSPriceOnSlide = function (event, ui) {
            var val = ui.value;
            var currentVal = self.whatifSPrice();
            if (formatting.roundNumber(currentVal) != formatting.roundNumber(val)) {
                self.whatifSPrice(val);

                $.each(self.allCombinations(), function (i, comb) {
                    comb.chartVM && comb.chartVM.chart && comb.chartVM.chart.xAxis[0].update({
                        plotLines: [
							{
							    color: '#555',
							    width: 1.5,
							    value: strategyContext.quote.last()
							}, {
							    color: comb.payoff(self.whatifSPrice()) < 0 ? 'red' : (comb.payoff(self.whatifSPrice()) > 0 ? 'green' : '#555'),
							    width: 1,
							    value: self.whatifSPrice()
							}
                        ]
                    });
                });
            }
        };
        this.whatifVolatilityOnSlide = function (event, ui) {
            var val = ui.value;
            if (!isNaN(val)) {
                self.whatifVolatility(val);
            }
        }

        this.bestOPScoreCombIndex = ko.deferredComputed(function () {
            var combs = self.allCombinations(), i, bestScore = 0, result = -1;
            for (i = 0; i < combs.length; i++) {
                var originalName = combs[i].originalName();
                if (combs[i] && combs[i].opScore) {
                    if (!combs[i].expiry() && combs[i].buyOrSell() && combs[i].buyOrSell().match(/sell/i)) {
                        continue;
                    }
                    if (originalName) {
                        continue;
                    }
                    bestScore = Math.max(bestScore, combs[i].opScore());
                    if (bestScore == combs[i].opScore()) {
                        result = i;
                    }
                }
            }
            if (result != -1 && combs[result].opScore() >= 80) {
                return result;
            } else {
                return -1;
            }
        }, this).extend({ rateLimit: 10 });

        this.bestOPCombCheckListAllGreen = ko.deferredComputed(function () {
            if (-1 == self.bestOPScoreCombIndex()) {
                return false;
            } else {
                var combination = self.allCombinations()[self.bestOPScoreCombIndex()];
                var checkList = strategyHelpers.checkCombination(combination);
                for (var i = 0; i < checkList.length; i++) {
                    if (!checkList[i].className.match(/green/i)) {
                        return false;
                    }
                }
                return true;
            }
        }, this).extend({ rateLimit: 10 });

        // (facepalm)
        this.sliderMutex = true;
        // TODO: refactor sliders ASAP as it creates a lot of race conditions across all how panel
        this.sdSliderOnChange = function (event, ui) {
            if (!self.sliderMutex || !strategyContext.predictions) {
                return;
            } else {
                self.sliderMutex = false;
            }

            if (ui.values.indexOf(ui.value) == 0) {
                if (self.chartLowPrice() > strategyContext.quote.last()) {
                    ui.value = strategyContext.quote.last();
                    ui.values[0] = strategyContext.quote.last();
                }

                self.chartLowPrice(ui.values[0]);
                var high = strategyContext.predictions.getSymmetricPrice(parseFloat(ui.values[0].toFixed(2)), self.maxDays());
                if (high <= ui.values[0]) {
                    high = parseFloat(ui.values[0].toFixed(2)) + 0.01;
                }
                if (high.toFixed(2) !== self.chartHighPrice().toFixed(2) && -1 == self.SRValue()[0].indexOf(parseFloat(ui.values[0].toFixed(2)))) {
                    self.chartHighPrice(formatting.roundNumber(high, 2));
                }
            }
            else {
                if (self.chartHighPrice() < strategyContext.quote.last()) {
                    ui.value = strategyContext.quote.last();
                    ui.values[1] = strategyContext.quote.last();
                }

                self.chartHighPrice(ui.values[1]);
                var low = strategyContext.predictions.getSymmetricPrice(parseFloat(ui.values[1].toFixed(2)), self.maxDays());
                if (low >= ui.values[1]) {
                    low = parseFloat(ui.values[1].toFixed(2)) - 0.01;
                }
                if (low.toFixed(2) !== self.chartLowPrice().toFixed(2) && -1 == self.SRValue()[1].indexOf(parseFloat(ui.values[1].toFixed(2)))) {
                    self.chartLowPrice(parseFloat(low.toFixed(2)));
                }
            }

            var probs = strategyContext.predictions.getProb(self.maxDays());
            if (probs) {
                var lowPercent = probs.prob(self.chartLowPrice());
                var highPercent = probs.prob(self.chartHighPrice());
                self.chartLowPercent(lowPercent);
                //not used for calculating other prices
                self.chartHighPercent(highPercent);
            }
            setTimeout(function () { self.sliderMutex = true; }, 20);
        };

        this.sdSliderOnSlide = function (event, ui) {
            if (!strategyContext.predictions || !event.originalEvent || event.originalEvent.type != 'mousemove')
                return;
            self.sliderMutex = false;
            $(this).slider('values', 1 - ui.values.indexOf(ui.value), strategyContext.predictions.getSymmetricPrice(ui.value, self.maxDays()));
            // using jquery instead of ko here because ko obsevable will trigger subscription and make the slide extremely slow and unusable
            $('#sdLowInput').val(ui.values[0].toFixed(2));
            $('#sdHighInput').val(ui.values[1].toFixed(2));
            self.sliderMutex = true;
        }

        this.buyPower = ko.observable(0);
        this.amountType = ko.observable('investment');

        this.investmentRiskCalculate = function () {
            var amount = self.buyPower();
            var amountType = self.amountType();
            var sentiment = getDefaultSentiment();
            switch (amountType) {
                case 'investment':
                    if (amount) {
                        var unitPrice = (sentiment == enums.Sentiment.BULLISH ? strategyContext.quote.currentAskPrice() : strategyContext.quote.currentBidPrice()) || strategyContext.quote.lastPrice();
                        var shares = Math.floor(amount / unitPrice + 0.001);
                        if (shares < 1)
                            shares = 1;
                        $.each(self.allCombinations(), function (x, combination) {
                            if (combination.positions) {
                                if (combination.hasOnlyStx()) {
                                    combination.absQuantity(shares);
                                } else {
                                    var contracts = formatting.roundNumber(Math.floor((shares + 49) / combination.multiplier()), 0);
                                    if (contracts <= 1) {
                                        contracts = 1;
                                    }
                                    combination.absQuantity(contracts);
                                }
                            }
                        });
                    }
                    break;
                case 'risk':
                    if (amount) {
                        $.each(self.allCombinations(), function (x, combination) {
                            if (combination.hasOnlyStx() && combination.buyOrSell().match(/buy/i)) {
                                combination.absQuantity(Math.floor(amount / strategyContext.quote.currentAskPrice() + 0.001));
                            }
                            else if (self.sdSliderTicks().length == 5) {
                                var strikes = combination.strikes().filter(function (s) {
                                    return s >= self.sdSliderTicks()[0] && s <= self.sdSliderTicks()[4];
                                });
                                strikes.push(self.sdSliderTicks()[0]);
                                strikes.push(self.sdSliderTicks()[4]);
                                var risks = strikes.map(function (spot) {
                                    var payoff = combination.payoff(spot);
                                    return payoff < 0 ? -payoff / combination.absQuantity() : 0;
                                });
                                var maxRisk = Math.max.apply(self, risks);
                                if (maxRisk == 0) {
                                    maxRisk = combination.askPrice() * combination.multiplier();
                                }
                                var qty = Math.floor(amount / maxRisk);
                                combination.absQuantity(Math.abs(qty));
                            }
                        });
                    }
                    break;
                default:
            }
        };

        this.buyPower.subscribe(this.investmentRiskCalculate);
        this.amountType.subscribe(this.investmentRiskCalculate);

        function buildTradingCombination(tradingStrategy) {
            var comb = strategyHelpers.assembleCombination(tradingStrategy, strategyContext.optionType(), strategyContext.quote, strategyContext.chain, strategyContext.stdDev, strategyContext.predictions);
            // todo: it is bad practice to override observables itself. We should set values or pass them in constructor instead
            comb.outlookPriceLowerBound = self.chartLowPrice;
            comb.outlookPriceHigherBound = self.chartHighPrice;
            //comb.outlookLowPercent = self.chartLowPercent;
            //comb.outlookHighPercent = self.chartHighPercent;
            comb.outlookBoundChanged();
            //comb.chartVM = new CombinationChart(comb);
            comb.chartVM = CombinationChart.createChartViewModel(comb);
            comb.chartVM.chartPriceRange = self.chartSPrices;

            comb.editorVM = new CombinationEditor(comb);
            comb.whatifTheoretical = comb.computed(function () {
                var po = this.payoff(self.whatifSPrice(), self.whatifDate(), self.whatifVolatility() / 100);
                var pc = this.cost() != 0 ? po / Math.abs(this.cost()) * 100 : 0;
                this.whatifTheoreticalPL = pc;
                var poF = formatting.toFractionalCurrency(po) + (po >= 0 ? ' 盈利' : ' 损失');
                var pcF = formatting.toPercentage(pc, true) + ' 回报';
                return {
                    payoffValue: po,
                    payoff: formatting.toFractionalCurrency(po),
                    payoffFormatted: poF,
                    returnPercentage: formatting.toPercentage(pc, true),
                    returnPercentageFormatted: pcF
                };
            }, comb).extend({ rateLimit: 10 });

            comb.defaultPlainEnglish = '';
            return comb;
        }

        function updateTradingStrategies(tradingStrategies) {
            var combs = [], i, days;
            for (i = 0; i < 3; i++) {
                if (tradingStrategies[i] && tradingStrategies[i].legs && tradingStrategies[i].legs[0].expirationDate) {
                    days = tradingStrategies[i].legs[0].expirationDate.numOfDaysUntilExpired;
                }
            }
            //Combination.defaultDays = days;
            for (i = 0; i < 3; i++) {
                var tradingStrategy = tradingStrategies[i];
                self.defaultTradingStrategies[i](null);
                var comb;
                if (tradingStrategy.isComposed) {

                    var sentiment = getDefaultSentiment();

                    comb = buildTradingCombination(tradingStrategy);
                    comb.originalName = ko.observable(null);
                    combs.push(comb);
                    if (comb.rewardProfile() == 'unlimited' || comb.maxReward() > 0) {
                        var threshold = '';
                        if (tradingStrategy.legs.length > 1) {
                            threshold = sentiment == enums.Sentiment.BULLISH ?
								(comb.extractedPositions()[1].strikePrice + comb.extractedPositions()[1].price)
								: (comb.extractedPositions()[0].strikePrice - comb.extractedPositions()[0].price);
                            threshold = formatting.toFractionalCurrency(threshold);
                        }

                        comb.defaultPlainEnglish = {
                            symbol: self.symbol(),
                            buyOrSell: (comb.buyOrSell().toLowerCase() + 'ing'),
                            callOrPut: sentiment == enums.Sentiment.BULLISH ? 'call' : 'put',
                            upOrDown: sentiment == enums.Sentiment.BULLISH ? 'upside' : 'downside',
                            belowOrAbove: sentiment == enums.Sentiment.BULLISH ? 'below' : 'above',
                            threshold: threshold
                        };
                        self.defaultTradingStrategies[i](comb.fullName());
                    }
                }
                if (combs.length < i + 1 && self.hasOption()) {
                    var name = getDefaultSentiment() == enums.Sentiment.BULLISH ? 'Call' : 'Put';

                    var expiryDate = strategyContext.chain.findExpiry(new Date(), 0, 3).date,
						expiration = expiryDate.toISOString(),
						strike;
                    if (combs.length == 2) {
                        expiryDate = strategyContext.chain.findExpiry(combs[1].expiration(), 0, 0).date;
                        expiration = expiryDate.toISOString();
                        strike = strategyContext.chain.findStrike(combs[1].strikes()[0], expiryDate, 0);
                    } else {
                        strike = strategyContext.chain.findStrike(strategyContext.quote.lastPrice(), expiryDate, name == 'Call' ? 0 : -1);
                    }
                    var singleLegTradingStrategy = {
                        strategyName: name,
                        fullStrategyName: "Buy " + name,
                        buyOrSell: "Buy",
                        legs: [{
                            legType: name,
                            buyOrSell: "Buy",
                            strikePrice: strike,
                            quantity: 1,
                            expirationDate: {
                                futureDate: expiration,
                                numOfDaysUntilExpired: formatting.daysFromNow(expiryDate)
                            }
                        }]
                    };
                    comb = buildTradingCombination(singleLegTradingStrategy);
                    comb.originalName = ko.observable(name);
                    combs.push(comb);
                } else if (i > 0 && !self.hasOption()) {
                    combs.push({ originalName: ko.observable('N/A') });
                }
            }
            if(combs){
                self.sentiment = combs[0].sentiment;
            }
            self.allCombinations(combs);
            DefaultSentiment();
        }

        // the default sentiment of the combination is bullish, to go with the sentiment of tradeIdeas, we do this.
        function DefaultSentiment() {

            var defaultSentiment = getDefaultSentiment();
            if (defaultSentiment == null) { return;}
            if (defaultSentiment.toLowerCase() == 'bearish') {
                self.allCombinations().forEach(function (comb) {
                    if (comb.sentiment() == "bullish") {
                        comb.editorVM.flipBS();
                    }
                });
            }
            else if (defaultSentiment.toLowerCase() == 'bullish') {
                self.allCombinations().forEach(function (comb) {
                    if (comb.sentiment() == "bearish") {
                        comb.editorVM.flipBS();
                    }
                });
            }
        }

        function getDefaultSentiment() {

            if (context == null || context.selectedTradeIdea() == null)
                return enums.Sentiment.BULLISH;

            return context.selectedTradeIdea().sentiment;
        }

        function initiateViewModel() {
            self.showEditorCombination(null);
            self.dateOfBellSlider(null);
            var combs = self.allCombinations();
            if (combs && combs.length) {
                for (var i = 0; i < combs.length; i++) {
                    combs[i].dispose && combs[i].dispose();
                }
            }
            self.allCombinations([]);
            self.buyPower(0);
            self.amountType('investment');
            self.lowPrice(strategyContext.quote.last() * 0.7);
            self.highPrice(strategyContext.quote.last() * 1.3);
            self.chartLowPrice(strategyContext.quote.last() * 0.7);
            self.chartHighPrice(strategyContext.quote.last() * 1.3);
            self.sdSliderTicks([]);
            self.sdSliderSupRes([]);
            updateSliderOptions();
            if (strategyContext.quote && !self.hasOption()) {
                self.showOptionsPlayScore(false);
            } else {
                self.showOptionsPlayScore(true);
            }
        }

        this.updateViewModel = function (tradingStrategies) {
            updateExpirySelectOptions();
            if (strategyContext.quote) {
                self.whatifSPriceAnchor(strategyContext.quote.last());
            }
            initiateViewModel();
            updateSentimentStrategyMap();
            updateTradingStrategies(tradingStrategies);
            if (self.allCombinations()[0]) {
                var defaultComb;
                if (self.isTradable()) {
                    defaultComb = self.allCombinations()[0];
                } else {
                    defaultComb = self.allCombinations()[1];
                }
                // risk the bug of the chart to enlarge
                //self.allCombinations().forEach(function (comb) {
                //    self.showEditorCombination(comb);
                //});
                self.showEditorCombination(defaultComb);
                self.buyPower(Math.abs(defaultComb.cost()));
            }
            self.showRangeChart();
        };

        this.editCombination = function (combination) {
            if (combination && combination != self.showEditorCombination()) {
                self.showEditorCombination(combination);
            }
            if (self.showEditorCombination()) {
                setTimeout(function () { self.displayedToolboxIndex(4); }, 1);
            }
        };

        this.buildOwnStrategy = function (comb) {
            comb.originalName(null);

            self.editCombination(comb);
        };

        this.turnToNarrow = function () {
            var sds = self.sdSliderTicks();
            self.chartLowPrice(sds[1]);
            self.chartHighPrice(sds[3]);
        };
        this.turnToWide = function () {
            var sds = self.sdSliderTicks();
            self.chartLowPrice(sds[0]);
            self.chartHighPrice(sds[4]);
        };

        this.showOptionsPlayScore = ko.observable(true);

        this.toggleOptionsPlayScore = function (hasOption) {
            if (hasOption) self.showOptionsPlayScore(!self.showOptionsPlayScore());
            else self.showOptionsPlayScore(false);
        }

        this.SRValue = ko.computed(function () {
            if (false && context.supportAndResistance()) {
                var sr = context.supportAndResistance();
                var support = [];
                var resist = [];
                var i;
                for (i = 0; i < sr.support().length; i++) {
                    support.push(sr.support()[i].value);
                }
                for (i = 0; i < sr.resistance().length; i++) {
                    resist.push(sr.resistance()[i].value);
                }
                return [support, resist];
            } else {
                return [[], []];
            }
        });

        this.toolboxCarouselOptions = {
            options: {
                interval: 600000
            }
        };

        this.slideToolboxLeft = function () {
            self.displayedToolboxIndex(self.displayedToolboxIndex() - 1);
        }
        this.slideToolboxRight = function () {
            self.displayedToolboxIndex(self.displayedToolboxIndex() + 1);
        }

        function gauss(spot, u, sigma) {
            return 1 / (Math.sqrt(2 * Math.PI) * sigma) * Math.exp(-Math.pow(spot - u, 2) / (2 * Math.pow(sigma, 2)));
        }

        this.rangeBellChart = null;

        this.showRangeChart = function () {
            var sds = self.sdSliderTicks();
            var low = sds[0];
            var high = sds[sds.length - 1];
            if (!strategyContext.quote || !strategyContext.chain || sds.length < 1 || low == null || high == null) {
                // todo: a lot of bugs possible due to race conditions between (computed)observables. Get rid of this hack
                setTimeout(function () {
                    self.showRangeChart();
                }, 100);
                return;
            }

            if (self.rangeBellChart && self.rangeBellChart.renderTo) {
                self.rangeBellChart.destroy();
            }

            var data = [];
            var lastPrice = strategyContext.quote.last();
            var lowSpot = self.chartLowPrice();
            var highSpot = self.chartHighPrice();
            var dense = 50;
            var blue = '#0068B3';
            var lineData = [];

            var step = (high - low) / dense;
            var sd = (high - low) / 4;
            var y;
            var spotMarker = { enabled: true, fillColor: 'white', lineWidth: 2, lineColor: 'green', states: { hover: { enabled: false } } };

            
            for (var x = low; x <= high; x += step) {
                if (x >= lowSpot && Math.abs(x - lowSpot) < step) {
                    y = gauss(lowSpot, lastPrice, sd);
                    var lowSpotDatum = { x: lowSpot, y: y, marker: spotMarker };
                    data.push(lowSpotDatum);
                } else if (x >= highSpot && Math.abs(x - highSpot) < step) {
                    y = gauss(highSpot, lastPrice, sd);
                    var highSpotDatum = { x: highSpot, y: y, marker: spotMarker };
                    data.push(highSpotDatum);
                }
                y = gauss(x, lastPrice, sd);
                var datum = { x: x, y: y };
                data.push(datum);
            }
            var fillColor = {
                linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
                stops: [
					[0, 'rgba(200, 200, 200, 0)'],
					[(lowSpot - low) / (high - low), 'rgba(200, 200, 200, 0)'],
					[(lowSpot - low) / (high - low), 'rgba(200, 200, 200, 70)'],
					[(highSpot - low) / (high - low), 'rgba(200, 200, 200, 70)'],
					[(highSpot - low) / (high - low), 'rgba(200, 200, 200, 0)'],
					[1, 'rgba(200, 200, 200, 0)']
                ]
            };
            lineData = sds.slice(0).map(function (spot, idx) {
                y = gauss(spot, lastPrice, sd);
                return [{ x: spot, y: 0 }, {
                    x: spot,
                    y: y,
                    dataLabels: {
                        enabled: true,
                        format: (idx === 2 ? '' : (formatting.toSignedFractionalString(idx - 2, true, 0) + 'SD')) + '<br/>{x:.2f}',
                        color: blue,
                        y: -12
                    }
                }];
            });
            var chartOptions = {
                chart: {
                    width: 450,
                    height: 150,
                    margin: [0, 0, 0, 0],
                    animation: false
                },
                title: {
                    text: '',
                },
                plotOptions: {
                    series: {
                        animation: false
                    }
                },
                xAxis: [{
                    lineWidth: 0,
                    lineColor: 'transparent',
                    labels: {
                        enabled: false
                    },
                    minorTickLength: 0,
                    tickLength: 0
                }],
                yAxis: [{
                    title: {
                        text: ''
                    },
                    labels: {
                        enabled: false
                    },
                    gridLineWidth: 0,
                    min: 0,
                    maxPadding: 0.5,
                    endOnTick: false
                }],
                tooltip: {
                    formatter: function () {
                        return this.x.toFixed(2);
                    }
                },

                series: [
					{
					    type: 'area',
					    data: data,
					    lineColor: blue,
					    lineWidth: 3,
					    marker: {
					        enabled: false
					    },
					    fillColor: fillColor,
					    zIndex: 7
					}
                ],
                legend: {
                    enabled: false
                },
                credits: false
            }

            for (var i = 0; i < lineData.length; i++) {
                chartOptions.series.push({
                    data: lineData[i],
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: false
                            }
                        }
                    },
                    lineColor: blue,
                    zIndex: 8
                });
            }

            // Todo: Any DOM manipulations MUST be in knockout bindings
            chartOptions.chart.renderTo = $('#sdRangeChart')[0];
            if (chartOptions.chart.renderTo) {
                self.rangeBellChart = new Highcharts.Chart(chartOptions);
            }
        }

        this.constructCombination = function (strategy) {
            var comb = self.showEditorCombination();
            if (comb && strategy && strategy.template) {
                var isSuccess = strategyHelpers.rebuildCombination(comb, strategy, strategyContext.optionType(), strategyContext.quote, strategyContext.chain, strategyContext.stdDev, strategyContext.predictions);

                if (!isSuccess) {
                    notifications.error('Not enough strikes or expiries available to construct a ' + strategy.template.name, 'Strategy Constructor');
                }
            }
        };

        this.toggleSubmenu = function (vm, e) {
            var $p = $(e.target.parentElement);
            if (!$p.hasClass('open')) {
                $p.parent().children().removeClass('open');
                $p.addClass('open');
            }
        };

        this.selectStrategyToConstruct = function (strategy, e) {
            self.selectedStrategy(strategy);
            $($(e.target).parents()[5]).removeClass('open');
            $($(e.target).parents()[5]).find('.open').removeClass('open');
        };

        this.attached = function () {
            var tradingStrategiesPromise = dataContext.tradingStrategies.get(self.symbol());
            var quotePromise = dataContext.quotation.get(self.symbol());
            var chainPromise = dataContext.optionChains.get(self.symbol());
            var stdDevPromise = dataContext.standardDeviations.get(self.symbol());
            var predictionsPromise = dataContext.predictions.get(self.symbol());
            if (strategyContext.isInSingleTrade()) {
                strategyContext.closeExpand();
            }
            $.when(quotePromise, chainPromise, stdDevPromise, predictionsPromise, tradingStrategiesPromise).done(function (quote, chain, stdDev, predictions, tradingStrategies) {
                quote.last = quote.lastPrice;
                quote.symbol = quote.securityCode;
                quote.name = quote.securityName;
                chain.last = quote.last();
                strategyContext.quote = quote;
                strategyContext.chain = chain;
                strategyContext.stdDev = stdDev;
                strategyContext.predictions = predictions;
                self.updateViewModel(tradingStrategies);
            }).always(function () {
                context.isHowPanelLoading(false);
            });
            strategyContext.checkAndResizeHighcharts();
        }

        context.ulCode.subscribe(self.attached);

    };


    return TradingStrategies;
});