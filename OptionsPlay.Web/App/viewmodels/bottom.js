define(['knockout',
		'komapping',
		'dataContext',
		'jquery',
		'events',
		'modules/localizer',
		'modules/configurations',
		'durandal/system',
		'koBindings/slideVisible',
		'jquery-hotkeys',
		'koBindings/arrowMove',
		'koBindings/bootstrap'],
function (ko, mapping, dataContext, $, events, localizer, cfg, system) {
    var SHOW_HIDE_TRACE_HOTKEY = 'alt+ctrl+l';
    var self = {};
    self.shangHaiIndex = ko.observable();

    self.traceVisible = cfg.App.showTrace;

    self.inDebugMode = ko.observable(false);

    self.title = 'pages.trade';
    self.isExpanded = ko.observable(false);
    self.portfolioFund = ko.observable(null);
    self.portfolioindexValue = ko.observable(null);


    self.indexes = {

        shIndex: ko.computed(function () {
            if (self.portfolioindexValue()) {
                return self.portfolioindexValue()[0].currentPeriod;
            } else {
                return 'N/A';
            }
        }),
        szIndex: ko.computed(function () {
            if (self.portfolioindexValue()) {
                return self.portfolioindexValue()[1].currentPeriod;
            } else {
                return 'N/A';
            }
        }),
        hsIndex: ko.computed(function () {
            if (self.portfolioindexValue()) {
                return self.portfolioindexValue()[2].currentPeriod;
            } else {
                return 'N/A';
            }
        }),


    }
    self.fund = {
        totalAssetsValue: ko.computed(function () {
            if (self.portfolioFund()) {
                return self.portfolioFund().totalAssetsValue();
            } else {
                return 'N/A';
            }
        }),
        availableFund: ko.computed(function () {
            if (self.portfolioFund()) {
                return self.portfolioFund().availableFund();
            } else {
                return 'N/A';
            }
        }),
        floatingPL: ko.computed(function () {
            if (self.portfolioFund()) {
                return self.portfolioFund().floatingPL();
            } else {
                return 'N/A';
            }
        }),
        marginRate: ko.computed(function () {
            if (self.portfolioFund()) {
                return self.portfolioFund().marginRate() * 100;
            } else {
                return 'N/A';
            }
        })
    };

    function loadFundInfo() {
        console.log("in loadFundInfo");
        dataContext.fund.get("","",true).done(function (fund) {
            self.portfolioFund(fund);
        });
    }


    function loadIndexInfo() {

        dataContext.indexValue.get().done(function (indexValue) {
            self.portfolioindexValue(ko.unwrap(indexValue));
        });

    }
    function toggleTraceLog() {
        self.traceVisible(!self.traceVisible());
    }

    self.attached = function () {
        loadFundInfo();
        loadIndexInfo();
        setInterval(loadIndexInfo, 60000);
        setInterval(loadFundInfo, 10000);
        $(document).bind('keydown', SHOW_HIDE_TRACE_HOTKEY, toggleTraceLog);
        setInterval(self.lastRefreshAuto, 1000);
    };

    self.detached = function () {
        // clearInterval(self.updateSubscribtion);
        clearInterval(loadIndexInfo);
        clearInterval(loadFundInfo);
        clearInterval(self.lastRefreshAuto);
        $(document).unbind('keydown', toggleTraceLog);
    };

    var REFRESH_INTERVAL = 5000;

    self.refreshOrders = function () {

        var elapsed = Date.now() - (self.lastRefresh() && self.lastRefresh().getTime());
        if (elapsed > REFRESH_INTERVAL) {
            //console.log(elapsed);
            events.trigger(events.Bottom.INTRADAY_REFRESH);
            loadFundInfo();
            loadIndexInfo();
        } else {
            console.log(localizer.localize('trade.donotRefreshFrequently'));
        }
    };

    self.lastRefresh = ko.observable();
    self.lastRefreshAuto = function () { self.lastRefresh(new Date()); };


    events.on(events.Bottom.INTRADAY_REFRESHED, function () {
        self.lastRefresh(new Date());
    });
    events.on(events.Bottom.IS_SHOWN, function (isShown) {
        if (arguments.length > 0) {
            self.isExpanded(isShown);
        } else {
            self.isExpanded(!self.isExpanded());
        }
    });
    events.on(events.OrderEntry.PREFILL_ORDER, function (orderTicket) {

        if ($.isArray(orderTicket) && orderTicket.length > 1) {
            self.isExpanded(false);
        }
        else {
            self.isExpanded(true);
        }
    });
    self.counter = false;
    self.isExpanded.subscribe(function (newVal) {
        events.trigger(events.Bottom.IS_SHOWN, newVal);

        self.counter = !self.counter;
        if (self.counter) {
            $(".appearWhenUp").css("display", "block");
            $(".appearWhenDown").css("display", "none");
        } else {
            $(".appearWhenUp").css("display", "none");
            $(".appearWhenDown").css("display", "block");
        }


    });

    return self;
});
