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
        'modules/formatting',
        'modules/grid',
        './queryOption'],
function ($, ko, localizer, DropDownList, events, dataContext, orderEnums, kendoWindow, context, combinationHelpers, kendo, formatting, grid, queryOption) {

    var QueryGrid = function () {
        var self = this;

        //self.historicalOrders = ko.observable([]);
        //self.historicalTrades = ko.observable([]);

        self.showOrdersOrTradesOrStrikes = ko.observable(0);
        events.on(events.Bottom.HIST_ORDERS_TRADES_STRIKES, function (oOrTOrS) {
            self.showOrdersOrTradesOrStrikes(oOrTOrS);
        });

        self.kendoGridForOrder = $.extend(grid.baseOptions(), {
            data: queryOption.historicalOrders,
            rowTemplate: 'orderRowTemplateOnChains',
            sortable: true,
            height: 280,
            resizable: true,
            scrollable: true,
            dataBound: function (data) {
                grid.showLabelIfEmpty(data);
            }
        });

        self.kendoGridForTrade = $.extend(grid.baseOptions(), {
            data: queryOption.historicalTrades,
            rowTemplate: 'tradeRowTemplateOnChains',
            sortable: true,
            height: 280,
            resizable: true,
            scrollable: true,
            dataBound: function (data) {
                grid.showLabelIfEmpty(data);
            }
        });

        self.kendoGridForStrike = $.extend(grid.baseOptions(), {
            data: queryOption.historicalStrikes,
            rowTemplate: 'strikeRowTemplateOnChains',
            sortable: true,
            height: 280,
            resizable: true,
            scrollable: true,
            dataBound: function (data) {
                grid.showLabelIfEmpty(data);
            }
        });
    };

    return new QueryGrid();
});