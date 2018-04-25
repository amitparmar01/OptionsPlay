define(['knockout',
		'durandal/system',
		'modules/context',
		'modules/strategyHelpers',
		'modules/combinationChart',
		'modules/configurations',
		'dataContext',
		'modules/formatting',
        'modules/combinationTextGeneration',
		'loader',
        'modules/session',
		'modules/helpers',
		'modules/enums'],
function (ko, system, context, strategyHelpers, combinationChartFactory, configuration, dataContext,
	formatting, combinationTextGeneration, loader, session, helpers, enums) {

    function SingleTrade(combination, strategyContext, shareDetails) {
        var self = this;

        if (shareDetails) {
            this.shareDetails = {
                sharedBy: shareDetails.sharedBy || 'Anonymous',
                creationDate: shareDetails.creationDate,
                totalProfitAndLoss: ko.computed(function () {
                    var totalProfitAndLoss = combination.midPricedCost() - shareDetails.costBasis;
                    return totalProfitAndLoss;
                }),
            };
        } else {
            this.shareDetails = null;
        }

        this.chart = null;
        this.combination = combination;
        this.greeks = null;
        this.quote = null;
        this.syrahSentiments = null;
        this.strategyChecklist = null;

        this.tradingStrategies = strategyContext.tradingStrategies;
        this.canShare = !configuration.isEmbeddingPlatform && !combination.incomeStrategy && session.hasPermission(enums.Permissions.ALLOW_SHARING);

        this.transformOrigin = (function () {
            var combinationIndex = strategyContext.tradingStrategies.allCombinations.indexOf(combination);
            switch (combinationIndex) {
                case 0:
                    return 'left-origin';
                case 2:
                    return 'right-origin';
                case 1:
                default:
                    return 'center-origin';
            }
        })();

        this.combinationTitle = ko.observable();
        this.flipped = ko.observable(false);

        // todo: charts Should be resized as part of binding process
        this.attached = function () {
            strategyContext.checkAndResizeHighcharts();
            strategyContext.isInSingleTrade = ko.observable(true);
        };

        this.detached = function () {
            //self.chart && self.chart.dispose();
            //self.chart = null;
            //if (self.shareDetails) {
            //	self.shareDetails.totalProfitAndLoss.dispose();
            //}
            if (strategyContext.isInSingleTrade()) {
                self.close();
            }
        };

        this.activate = function () {
            self.combinationTitle = combinationTextGeneration.generateTradeTicketTitle(combination);
            // sentiments may not be defined at the time of activation. We should use observable here
            self.syrahSentiments = context.symbolSentiments;
            self.sentiment = combination.sentiment;
            self.quote = combination.quote;
            //self.strategyChecklist = strategyHelpers.checkCombination(combination);
            self.strategyCheckList = ko.computed(function(){
                var list = [];
                var stockTrendItem = {
                    title: '股票趋势',
                    //className: 'green fa fa-check-square'
                };
                if(context.trendSentiment() == "Bullish"){
                    stockTrendItem.className = 'green fa fa-check-square';
                }else if(context.trendSentiment() == "Bearish"){
                    stockTrendItem.className = 'red fa fa-times-circle';
                }
                // var marketTrendItem = {
                //     title: '市场趋势',
                //     className: 'green fa fa-check-square'
                // };
                list.push(stockTrendItem);
                //list.push(marketTrendItem);
                return list;            
            });
            //self.loggedTradeTicket = strategyContext.tradeTicket.loggedData;
            self.chart = combinationChartFactory.createChartViewModelExpanded(combination);
        };

        this.close = strategyContext.closeExpand;

        this.deactivate = function () {
            //self.chart && self.chart.destroy();
            //self.chart = null;
            //if (self.shareDetails) {
            //    self.shareDetails.totalProfitAndLoss.dispose();
            //}
            strategyContext.isInSingleTrade = ko.observable(false);
        };

        this.editCombination = function () {
            strategyContext.tradingStrategies.editCombination(combination);
            self.close();
        };

        this.tradeCombination = function () {
            strategyContext.tradeCombination(combination);
        };

        this.DATE_FORMAT = configuration.DATE_FORMAT;
        this.shareViaEmail = helpers.partial(share, enums.SharingType.EMAIL_CLIENT);
        this.copyToClipboard = helpers.partial(share, enums.SharingType.COPY);
        this.shareViaQuickShare = helpers.partial(share, enums.SharingType.EMAIL);
        this.shareViaStocktwits = helpers.partial(share, enums.SharingType.STOCKTWITS);
        this.shareViaTwitter = helpers.partial(share, enums.SharingType.TWITTER);

        // this.showCheckList = ko.computed(function(){
        //     var list = [];
        //     var stockTrendItem = {
        //         title: '股票趋势',
        //         //className: 'green fa fa-check-square'
        //     };
        //     if(context.trendSentiment() == "Bullish"){
        //         stockTrendItem.className = 'green fa fa-check-square';
        //     }else if(context.trendSentiment() == "Bearish"){
        //         stockTrendItem.className = 'red fa fa-times-circle';
        //     }
        //     // var marketTrendItem = {
        //     //     title: '市场趋势',
        //     //     className: 'green fa fa-check-square'
        //     // };
        //     list.push(stockTrendItem);
        //     //list.push(marketTrendItem);
        //     return list;            
        // });

        context.trendSentiment.subscribe(self.activate);

        function share(sharingType) {
            loader.show();
            return html2CanvasHelpers.capture($('#singleTradeView'), configuration.screenshotDefaultMimeType).then(function (imageData) {
                loader.hide();
                var message = combinationTextGeneration.generateSharingMessage(combination);
                var title = 'Share: ' + combination.fullName();
                return sharing.share(title, message, combination.symbol, combination.sentiment(), imageData, saveShare, sharingType);
            });
        };

        function saveShare(screenshot) {
            var positions = combination.extractedPositions();
            var legs = formatting.mapObjects(positions, null, {
                'expiry': formatting.toUtcIsoDate
            });

            var sharingModel = {
                sharedTrade: {
                    fullName: combination.fullName(),
                    symbol: combination.symbol,
                    legs: legs,
                    costBasis: combination.midPricedCost(),
                    targetPrice: self.whatifSPrice(),
                    targetDate: self.whatifDate().toUTCString()
                },
                screenshot: screenshot
            };

            return dataContext.sharing.save(sharingModel);
        }
    }

    system.setModuleId(SingleTrade, 'viewmodels/howPanel/singleTrade');

    var result = {
        create: function (combination, parent, shareDetails) {
            return new SingleTrade(combination, parent, shareDetails);
        }
    };

    return result;
});