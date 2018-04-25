define(['jquery',
		'knockout',
		'dataContext',
		'modules/formatting',
		'modules/context',
        'modules/session',
		'viewmodels/tradeIdeas/quoteWidget',
        'viewmodels/tradeIdeas/howPanel',
		'viewmodels/tradeIdeas/chartIq',
        'modules/enums',
		'koBindings/textFormatted',
		'koBindings/bootstrap',
		'koBindings/customBindings',
		'koBindings/changeFlash'

], function ($, ko, dataContext, formatting, context, session, QuoteWidget, howPanel, ChartIq,enums) {
    var WhyVM = function () {
        var self = this;

        this.backdrop = ko.computed(function () {
            return !session.isAuthenticated() || context.isWhyPanelLoading();
        });
        this.isInitialized = ko.observable(true);

        this.isTradePanelVisible = ko.observable(true);
        this.selectedTradeIdea = context.selectedTradeIdea;
        this.selectedTradeIdeaRule = ko.observable(null);
        this.selectedTradeIdeaRuleIndex = ko.observable(0);
        this.stockCode = ko.observable(context.ulCode());

        this.quoteWidget = {};
        var currentTradeIdea = this.selectedTradeIdea();

        if (currentTradeIdea) {
            this.selectedTradeIdeaRule(currentTradeIdea.rules[0]);
        }

        this.selectedTradeIdea.subscribe(function (newVal) {
            self.selectedTradeIdeaRuleIndex(0);
            newVal && self.stockCode(newVal.securityCode);
        });

        this.selectedTradeIdeaRuleIndex.subscribe(function (newIndex) {
            if (newIndex != null) {
                var currentIdea = self.selectedTradeIdea();
                if (currentIdea) {
                    self.selectedTradeIdeaRule(currentIdea.rules[newIndex]);
                }
            } else {
                self.selectedTradeIdeaRule(null);
            }
        });

        this.showBullishStrategies = function () {
            var a = howPanel.tradingStrategies.allCombinations();

            a.forEach(function (comb) {

                if (comb.sentiment() == "bearish") {
                    comb.editorVM.flipBS();
                    context.trendSentiment("Bullish");
                }
            });

        };
        this.showBearishStrategies = function () {
            var a = howPanel.tradingStrategies.allCombinations();
            a.forEach(function (comb) {

                if (comb.sentiment() == "bullish") {
                    comb.editorVM.flipBS();
                    context.trendSentiment("Bearish");
                }

            });

        };

        this.symbolWidget = new QuoteWidget();

        this.sentence = ko.observable(null);
        self.updatesentence = function () {
            dataContext.quotation.get(context.ulCode()).done(function (quote) {
                dataContext.signals.get(context.ulCode() + "/5y").done(function (supportAndResistance) {
                    var sentence = "";
                    var support, resistance;

                    if (context.trendSentiment() == "Bearish") {
                        sentence = quote.securityName + " 处在下降通道，压力线在 " + supportAndResistance.resistance[0].value + ", 支撑线在 " + supportAndResistance.support[0].value + " 。"
                    }else if (context.trendSentiment() == "Bullish") {
                        sentence = quote.securityName + " 处在上升通道，支撑线在 " + supportAndResistance.support[0].value + " , 压力线在 " + supportAndResistance.resistance[0].value + " 。"
                    }else {
                        sentence = "";
                    }
                    self.sentence(sentence);
                });
            });
        }

        this.selectedTradeIdea.subscribe(function () {

            self.updatesentence();

            if (self.selectedTradeIdea().sentiment == enums.Sentiment.BULLISH) {
                self.showBullishStrategies();
            } else {
                self.showBearishStrategies();
            }
        });
        self.chartIq = new ChartIq();

        this.selectedTradeIdeaRule.subscribe(function (newRule) {
            if (!newRule) {
                self.selectedTradeIdeaRuleIndex(0);
                return;
            }
            var length = self.selectedTradeIdea().rules.length;
            for (var i = 0; i < length; i++) {
                if (self.selectedTradeIdea().rules[i].ruleMatch == self.selectedTradeIdeaRule().ruleMatch) {
                    self.selectedTradeIdeaRuleIndex(i);
                    return;
                }
            }
            self.selectedTradeIdeaRuleIndex(0);
        });

        this.isFirst = ko.computed(function () {
            if (self.selectedTradeIdea() == null) {
                return true;
            }
            return self.selectedTradeIdeaRuleIndex() == 0;
        });

        this.isLast = ko.computed(function () {
            if (self.selectedTradeIdea() == null) {
                return true;
            }
            var index = self.selectedTradeIdeaRuleIndex();
            return index == (self.selectedTradeIdea().rules.length - 1);
        });

        this.onIntradayShown = function () {
            $(window).resize();
        };

        this.attached = function() {
            self.updatesentence();
        }
    };

    return new WhyVM();
});