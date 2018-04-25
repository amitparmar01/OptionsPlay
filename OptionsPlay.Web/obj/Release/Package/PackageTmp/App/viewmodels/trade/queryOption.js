define(['jquery',
		'knockout',
		'modules/localizer',
		'modules/dropDownList',
		'events',
		'dataContext',
		'modules/orderEnums',
		'modules/kendoWindow',
		'modules/context',
		'modules/combinationHelpers',
		'knockout-kendo',
        'modules/formatting'],
function ($, ko, localizer, DropDownList, events, dataContext, orderEnums, kendoWindow, context, combinationHelpers, kendo, formatting) {

    var self = {};

    var queryBizCandidates = [
        { key: 'trade.queryOptions.historicalOrder', value: '101' },
        { key: 'trade.queryOptions.historicalTrade', value: '102' },
        { key: 'trade.queryOptions.historicalStrike', value: '103' }
    ];

    var queryBiz = {'101': true, '102': true, '103': true};

    var queryOption = function(Biz) {
        var that = this;
        that.histStartDate = ko.observable();
        that.histEndDate = ko.observable();
        that.Biz = ko.observable(Biz || '101');
        that.orderGridReady = ko.observable(false);
        that.historicalOrders = ko.observableArray([]);
        that.historicalTrades = ko.observableArray([]);
        that.historicalStrikes = ko.observableArray([]);
        that.showOrdersOrTradesOrStrikes = ko.observable(0);

        that.queryBizOptions = ko.computed(function(){
            var candidates= queryBiz;
            return queryBizCandidates.filter(function(item){
                return item.value in candidates;
            });
        });

        that.kendoQueryType = $.extend(new DropDownList().baseOptions(), {
            data: that.queryBizOptions,
            value: that.Biz,
            select: function (e) {
                var oOrTOrS = e.item.index();
                events.trigger(events.Bottom.HIST_ORDERS_TRADES_STRIKES, oOrTOrS);
                that.showOrdersOrTradesOrStrikes(oOrTOrS);
            }
        });

        that.initializeDate = function () {
            var today = new Date();
            var lastMonthDay = new Date();
            lastMonthDay.setDate(lastMonthDay.getDate() - 20);
            that.histStartDate(lastMonthDay);
            that.histEndDate(today);
        };

        that.initializeDate();

        that.pullHistoricalOrder = function () {
            var startDate = that.histStartDate();
            var endDate = that.histEndDate();
            dataContext.historicalOrders.get('historicalQuery',
                [formatting.formatDate(startDate, 'yyyyMMdd'),formatting.formatDate(endDate, 'yyyyMMdd')]
            ).done(function (historicalOrders) {
                if (historicalOrders) {
                    that.historicalOrders(historicalOrders());
                }
            }).always(function () {
                that.orderGridReady(true);
            });
        };

        that.pullHistoricalTrade = function () {
            var startDate = that.histStartDate();
            var endDate = that.histEndDate();
            dataContext.historicalTrades.get('historicalQuery',
                [formatting.formatDate(startDate, 'yyyyMMdd'), formatting.formatDate(endDate, 'yyyyMMdd')]
                ).done(function (historicalTrades) {
                if (historicalTrades) {
                    that.historicalTrades(historicalTrades());
                }
            }).always(function () {
                that.orderGridReady(true);
            });
        };

        that.pullHistoricalStrike = function () {
            var startDate = that.histStartDate();
            var endDate = that.histEndDate();
            dataContext.historicalStrikes.get('historicalQuery',
                [formatting.formatDate(startDate, 'yyyyMMdd'), formatting.formatDate(endDate, 'yyyyMMdd')]
                ).done(function (historicalStikes) {
                    if (historicalStikes) {
                        that.historicalStrikes(historicalStikes());
                    }
                }).always(function () {
                    that.orderGridReady(true);
                });
        };
        
    };

    return new queryOption();
});