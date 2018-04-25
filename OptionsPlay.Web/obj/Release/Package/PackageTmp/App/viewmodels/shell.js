define(['knockout',
		'durandal/app',
		'plugins/router',
		'modules/dropDownList',
		'dataContext',
		'modules/localizer',
		'modules/session',
		'modules/kendoWindow',
		'modules/grid',
		'modules/formatting',
		'modules/help',
        'modules/notifications',
		'events',
        'pace',
        'modules/context',
		'kendo',
		'koBindings/kendoExt'],
function (ko, app, router, DropDownList, dataContext, localizer, session, kendoWindow, grid, formatting, help, notifications, events, pace, context) {
    app.title = localizer.localize('app.title');

    function updateDocumentTitle(pageTitle) {
        if (pageTitle) {
            var pageTitleValue = localizer.localize(pageTitle);
            if (app.title) {
                document.title = pageTitleValue + ' | ' + app.title;
            } else {
                document.title = pageTitleValue;
            }
        } else if (app.title) {
            document.title = app.title;
        }
    }

    // override 'updateDocumentTitle' method in order to meet requirements of multilingual site
    router.updateDocumentTitle = function (instance, instruction) {
        updateDocumentTitle(instruction.config.title);
    };
    // update document title if current locale changed
    localizer.activeLocale.subscribe(function () {
        var activeRoute = router.activeInstruction();
        if (activeRoute && activeRoute.config) {
            updateDocumentTitle(activeRoute.config.title);
        }
    });

    var dataPreloaded = false;
    function signOut() {
        dataContext.authentication.signOut().done(function () {
            router.navigate('#signIn');
            dataPreloaded = false;
        }).always(function () {
            // according to bug 1271, refresh after signing out.
            window.location.reload();
        });
    };

    // Is used for authentication purposes and checks if we can navigate to particular route.
    router.guardRoute = function (routeInfo, params, instance) {
        var hasAccessToRoute;
        var isAuthenticated = session.isAuthenticated();

        if (typeof (params.config.requiredPermission) !== 'undefined') {
            hasAccessToRoute = session.hasPermission(params.config.requiredPermission);
            if (!hasAccessToRoute) {
                //todo: toastr
            }
        } else {
            hasAccessToRoute = params.config.notAuthenticatedAccess
				? !isAuthenticated
				: isAuthenticated;
        }

        var urlToRedirect;
        if (!hasAccessToRoute) {
            urlToRedirect = isAuthenticated ? '#' : '#signIn/' + params.config.hash;
        }
        var result = hasAccessToRoute || urlToRedirect;

        if (!dataPreloaded && isAuthenticated) {
            var deferredRes = $.Deferred();
            dataContext.apllicationStartupDataPreload().done(function () {
                dataPreloaded = true;
                deferredRes.resolve(result);
            }).fail(function () {
                // todo: redirect to 'application temporarily unavailable' page
                dataPreloaded = false;
                deferredRes.reject();
                //deferredRes.resolve('#unavailable/');
            });
            return deferredRes.promise();
        } else {
            return result;
        }
    };
    //router.on(events.ROUTE_ACTIVATING, function (instance, instruction) {
    //    if (instruction.config.showPace) {
    //        initPace();
    //    }
    //});

    //var isPaceShown = false;
    //function initPace() {
    //    if (!isPaceShown) {
    //        pace.restart();
    //    }
    //    isPaceShown = true;
    //}

    //pace.on("restart", function () {
    //    $("body").append("<div class=\"paceCover\"> </div>");
    //})
    //pace.on("done", function () {
    //    if ($(".paceCover")) {
    //        $(".paceCover").remove();
    //    }
    //});

    function activate() {
        var routes = [
			{ route: 'signIn(/:returnRoute)', title: 'pages.signIn', moduleId: 'viewmodels/signIn', notAuthenticatedAccess: true },
			{ route: '', title: '首页', moduleId: 'viewmodels/index', nav: true, showPace: true },
			{ route: 'quotes', title: 'pages.quotes', moduleId: 'viewmodels/quotes', nav: true, showPace: true },
			//{ route: 'chains', title: 'pages.chains', moduleId: 'viewmodels/chains', nav: true },
			//{ route: 'optionList', title: 'pages.optionList', moduleId: 'viewmodels/optionList', nav: true },
			//{ route: 'generatePremium', title: 'pages.generatePremium', moduleId: 'viewmodels/generatePremium', nav: true },
			//{ route: 'strategies', title: 'pages.strategies', moduleId: 'viewmodels/strategies/strategies', nav: true },
			{ route: 'portfolio', title: 'pages.portfolio', moduleId: 'viewmodels/portfolio', nav: true, showPace: true },

			{ route: 'strategy/all', title: 'manageStrategies.all', moduleId: 'viewmodels/strategy/all', requiredPermission: 'ManageStrategies' },
			{ route: 'strategy/new', title: 'manageStrategies.new', moduleId: 'viewmodels/strategy/new', requiredPermission: 'ManageStrategies' },
			{ route: 'strategy/edit/:id', title: 'manageStrategies.edit', moduleId: 'viewmodels/strategy/edit', requiredPermission: 'ManageStrategies' },
			{ route: 'strategy/group/all', title: 'manageStrategies.group.all', moduleId: 'viewmodels/strategy/group/all', requiredPermission: 'ManageStrategies' },
			{ route: 'strategy/group/new', title: 'manageStrategies.group.new', moduleId: 'viewmodels/strategy/group/new', requiredPermission: 'ManageStrategies' },
			{ route: 'strategy/group/edit/:id', title: 'manageStrategies.group.edit', moduleId: 'viewmodels/strategy/group/edit', requiredPermission: 'ManageStrategies' }
        ];
        router.map(routes).buildNavigationModel();

        var result = router.activate();
        return result;
    };
    var fundTransferHistoryList = ko.observableArray();
    var gridReady = ko.observable(false);
    var transactionDate = ko.observable();
    var transactionDateStart = ko.observable();
    var transactionDateEnd = ko.observable();






    ///////////////////////////show up default date after loading-Jeremy ///////////////////

    var showDefaultDate = function () {

        transactionDateStart(getFirstOfMonthDate());
        transactionDateEnd(getCurrentDate());
        if (transactionDateStart() == null || transactionDateEnd() == null) { return; } else {

            var transactionDateStartPart1 = transactionDateStart();
            var transactionDateEndPart2 = transactionDateEnd();
            var transactionDatePeriod = formatting.formatDate(transactionDateStartPart1, 'yyyyMMdd') + "/" + formatting.formatDate(transactionDateEndPart2, 'yyyyMMdd');
            console.log(transactionDatePeriod);
            dataContext.fundTransferHistory.get(transactionDatePeriod).done(function (fundTransferHistory) {
                if (fundTransferHistory) {
                    fundTransferHistoryList(fundTransferHistory());
                    gridReady(true);
                }
            });
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////two functions to get the default dates- Jeremy ////
    function getFirstOfMonthDate() {
        var date = new Date()
        with (date) {
            var year = getFullYear();
            var month = getMonth() + 1;

        }
        if (month < 10) { month = "0" + month; }
        startDay = year + "-" + month + "-" + "01";
        var formatBox = new Date(startDay);
        return formatBox;
    }
    function getCurrentDate() {
        var date = new Date()
        with (date) {
            var year = getFullYear();

            var month = getMonth() + 1;
            var day = getDate();
        }

        if (month < 10) { month = "0" + month; }
        endDay = year + "-" + month + "-" + day;
        var formatBox = new Date(endDay);
        return formatBox;
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////change the reflection from DB as data changing - Jeremy///////////
    var pullFundTransferHistory = function () {
        if (transactionDateStart() == null || transactionDateEnd() == null) { return; } else {

            var transactionDateStartPart1 = transactionDateStart();
            console.log(transactionDateStartPart1);
            var transactionDateEndPart2 = transactionDateEnd();
            var transactionDatePeriod = formatting.formatDate(transactionDateStartPart1, 'yyyyMMdd') + "/" + formatting.formatDate(transactionDateEndPart2, 'yyyyMMdd');
            console.log(transactionDatePeriod);
            dataContext.fundTransferHistory.get(transactionDatePeriod).done(function (fundTransferHistory) {
                if (fundTransferHistory) {
                    fundTransferHistoryList(fundTransferHistory());
                    gridReady(true);
                }
            });
        }
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    transactionDateStart.subscribe(function (transactionDateStart) {

        pullFundTransferHistory();

    });

    transactionDateEnd.subscribe(function (transactionDateEnd) {

        pullFundTransferHistory();

    });


    var bankComboChoices = ko.observableArray([]);
    var selectedBank = ko.observable();
    function pullBankCode() {
        bankComboChoices([]);
        dataContext.bankCode.get().done(function (bankCode) {
            bankCode().forEach(function (bank) {
                bankComboChoices.push({ key: bank.bankName, value: bank.bankCode });
            })
            if (bankCode().length >= 1) {
                selectedBank(bankCode()[0].bankCode);
            }

        });
    };

    var isTFVisible = ko.observable(false);

    var transferFundsOptions = $.extend(kendoWindow.baseOptions(), {
        title: localizer.localize('pages.transferFunds'),
        isOpen: isTFVisible,
        width: 870,
    });

    var transfer = function (dir) {
        isTFVisible(true);
        pullBankCode();
        transactionDate(new Date());
        transferNum(null);
        $("#fundValueInBox").val("");
        showDefaultDate();
        fundHasOrNot(1);
        warningInfo("");


    };

    var isCPVisible = ko.observable(false);
    var changePasswordWindow = $.extend(kendoWindow.baseOptions(), {
        title: localizer.localize('pages.changePassword'),
        isOpen: isCPVisible,
    });

    var isBKVisible = ko.observable(false)
    var excuteBankPassword = function () {
        console.log("单纯查看银行资金");



    };
    var bankPasswordWindow = $.extend(kendoWindow.baseOptions(), {
        title: localizer.localize('请输入银行密码'),
        isOpen: isBKVisible,
    });
    var activeBankPasswordWindow = function () {
        isBKVisible(true);
    };

    var isFundPasswordVisible = ko.observable(false);
    var excuteFundPassword = function () { console.log("直接显示资金密码"); };
    var fundPasswordWindow = $.extend(kendoWindow.baseOptions(), {
        title: localizer.localize('请输入资金密码'),
        isOpen: isFundPasswordVisible,
    });
    var activeFundPasswordWindow = function () {
        isFundPasswordVisible(true);
    };

    var isToWindowVisible = ko.observable(false);
    var excuteBankToBrokeWindow = function () {
        console.log(" 从银行到券商");

    };
    var bankToBrokeWindow = $.extend(kendoWindow.baseOptions(), {

        title: localizer.localize('请输入银行密码'),
        isOpen: isToWindowVisible,
    });
    var activeBankToBrokeWindow = function () {
        if (transferNum() !== null && transferNum() !== "") {
            fundPassword('');
            isToWindowVisible(true);
            fundHasOrNot(1);
            warningInfo("");

        } else {
            fundHasOrNot(-1);
            warningInfo("！请输入转账资金");
        }
    };

    var isBrokeToWindowVisible = ko.observable(false);
    var excuteBankToBrokeWindow = function () {

        console.log(" 从银行到券商");
        transferFunds(2);
    };
    var bankToBrokeWindow = $.extend(kendoWindow.baseOptions(), {
        title: localizer.localize('请输入银行密码'),
        isOpen: isToWindowVisible,

    });

    var isBrokeToBankVisible = ko.observable(false);
    var excuteBrokeToBankWindow = function () {
        console.log(" 从券商到银行");
        transferFunds(1);
    };
    var BrokeToBankWindow = $.extend(kendoWindow.baseOptions(), {
        title: localizer.localize('请输入资金密码'),
        isOpen: isBrokeToBankVisible,
    });

    var fundHasOrNot = ko.observable(1);
    var warningInfo = ko.observable("");
    var activeBrokeToBankWindow = function () {
        if (transferNum() !== null && transferNum() !== "") {
            fundPassword('');
            isBrokeToBankVisible(true);
            fundHasOrNot(1);
            warningInfo("");

        } else {
            fundHasOrNot(-1);
            warningInfo("！请输入转账资金");

        }
    };

    var gotFundOrNot = 0;
    var showFund = function () {
        if (gotFundOrNot == 0) {
            console.log("show Fund");
            loadFundInfo();
        } else {

            $("#fundValueInBox").val(portfolioFund().availableFund());
            gotFundOrNot = 0;
        };

    };
    var portfolioFund = ko.observable();
    function loadFundInfo() {

        dataContext.fund.get().done(function (fund) {
            portfolioFund(fund);
            gotFundOrNot = 1;
            showFund();
        });

    };

    var changePW = function () {
        isCPVisible(true);
    };

    var bankDropDownList = new DropDownList();
    var bankOptions = $.extend(bankDropDownList.baseOptions(), {
        data: bankComboChoices,
        value: selectedBank
    });

    var hisotoricalFundTransferGridOptions = $.extend(grid.baseOptions(), {
        data: fundTransferHistoryList,
        rowTemplate: 'historicalFundTransferRowTemplate',
        height: 280,
        resizable: true,
        scrollable: true,
        dataBound: function (data) {
            if (gridReady()) {
                grid.showLabelIfEmpty(data);
            }
        }
    });
    var fundPassword = ko.observable('');
    var bankPassword = ko.observable('');
    var transferNum = ko.observable(null);
    var colorWarning = ko.observable(-5);


    var transferFunds = function (dir) {

        dataContext.bankTransfer.post('', {
            bankCode: selectedBank(),
            fundPassword: fundPassword(),
            bankPassword: bankPassword(),
            transferAmount: transferNum(),
            dir: dir
        }).done(function () {
            isToWindowVisible(false);
            isBrokeToBankVisible(false);
            pullFundTransferHistory();
        });
    }

    var passwordTypeCandidates = [
			{ key: 'pages.tradePassword', value: '4' },
			{ key: 'pages.capitalPassword', value: '5' }
    ];

    var chosenPasswordType = ko.observable('4');

    var kendoPasswordTypes = $.extend(new DropDownList().baseOptions(), {
        data: passwordTypeCandidates,
        value: chosenPasswordType
    });

    var currentPassword = ko.observable("");
    var newPassword = ko.observable("");
    var newPasswordAgain = ko.observable("");

    var changePassword = function () {
        if (self.newPassword() !== self.newPasswordAgain()) {
            //todo: if newPassword is not correct
            return;
        }
        $.post('api/portfolio/changePassword', {
            oldPassword: currentPassword(),
            newPassword: newPassword(),
            useScope: chosenPasswordType()
        }).done(function () {
            isCPVisible(false);
            notifications.info(localizer.localize('pages.passwordChanged'));
        }).fail(function (error) {
            notifications.error(error.responseJSON.message);
        });
    }



    var expandTrade = function () {
        events.trigger(events.Bottom.IS_SHOWN);
    };

    var self = {
        kendoNotification: {
            position: {
                top: 20,
                right: 20
            },
            stacking: 'down',
            width: 300
        },
        currentPassword: currentPassword,
        newPassword: newPassword,
        newPasswordAgain: newPasswordAgain,
        chosenPasswordType: chosenPasswordType,
        changePassword: changePassword,
        signOut: signOut,
        router: router,
        session: session,
        activate: activate,
        transferFundsOptions: transferFundsOptions,
        transfer: transfer,
        changePasswordWindow: changePasswordWindow,
        changePW: changePW,
        kendoPasswordTypes: kendoPasswordTypes,
        bankOptions: bankOptions,
        gridReady: gridReady,
        hisotoricalFundTransferGridOptions: hisotoricalFundTransferGridOptions,
        fundPassword: fundPassword,
        bankPassword: bankPassword,
        transferNum: transferNum,
        transferFunds: transferFunds,
        transactionDateStart: transactionDateStart,
        selectedBank: selectedBank,
        transactionDate: transactionDate,
        transactionDateEnd: transactionDateEnd,
        help: help,
        expandTrade: expandTrade,
        activeFundPasswordWindow: activeFundPasswordWindow,
        fundPasswordWindow: fundPasswordWindow,
        activeBankPasswordWindow: activeBankPasswordWindow,
        excuteBankPassword: excuteBankPassword,
        bankPasswordWindow: bankPasswordWindow,
        excuteFundPassword: excuteFundPassword,
        excuteBankToBrokeWindow: excuteBankToBrokeWindow,
        bankToBrokeWindow: bankToBrokeWindow,
        activeBankToBrokeWindow: activeBankToBrokeWindow,
        excuteBrokeToBankWindow: excuteBrokeToBankWindow,
        BrokeToBankWindow: BrokeToBankWindow,
        activeBrokeToBankWindow: activeBrokeToBankWindow,
        showFund: showFund,
        loadFundInfo: loadFundInfo,
        showDefaultDate: showDefaultDate,
        colorWarning: colorWarning,
        fundHasOrNot: fundHasOrNot,
        warningInfo: warningInfo,
        context: context
    };

    return self;
});