define([
	'knockout',
	'komapping',
	'dataContext',
	'modules/grid',
	'modules/formatting',
	'modules/localizer',
	'modules/combinationViewModel',
	'modules/combinationChart',
	'events',
	'loader',
	'modules/kendoWindow',
	'modules/dropDownList',
	'plugins/router',
	'viewmodels/compositions/symbolLookup',
	'portfolioItemGroupModel',
	'modules/enums',
	'koBindings/changeFlash',
	'kendo',
	'kendo-plugins',
	'knockout-kendo',
	'koBindings/kendoExt'],
function (ko, komapping, dataContext, grid, formatting, localizer, Combination, CombinationChart, events, loader, kendoWindow, dropDownList, router, symbolLookup, PortfolioItemGroupModel, enums) {


	var HistoricalInquiry = function () {
		var self = this;

		this.datePickerEnabled = false;
		this.orderStartDate = ko.observable();
		this.orderEndDate = ko.observable();
		this.tradeStartDate = ko.observable();
		this.tradeEndDate = ko.observable();
		this.orderGridReady = ko.observable(false);
		this.tradeGridReady = ko.observable(false);

		this.historicalOrders = ko.observableArray([]);
		this.historicalTrades = ko.observableArray([]);
		this.fundTransferHistory = ko.observableArray([]);
		this.isHCVisible = ko.observable(false);

		this.initializeDate = function () {
			var today = new Date();
			var lastMonthDay = new Date();
			lastMonthDay.setDate(lastMonthDay.getDate() - 20);
			self.orderStartDate(lastMonthDay);
			self.orderEndDate(today);
			self.tradeStartDate(lastMonthDay);
			self.tradeEndDate(today);
		};
		this.initializeDate();
		this.pullHistoricalOrder = function () {
			var startDate = self.orderStartDate();
			var endDate = self.orderEndDate();
			dataContext.historicalOrders.get({
				beginDate: formatting.formatDate(startDate, 'yyyyMMdd'),
				endDate: formatting.formatDate(endDate, 'yyyyMMdd')
			}).done(function (historicalOrders) {
				if (historicalOrders) {
					self.historicalOrders(historicalOrders());
				}
			}).always(function () {
				self.orderGridReady(true);
			});

		};
		this.pullHistoricalTrade = function () {
			var startDate = self.tradeStartDate();
			var endDate = self.tradeEndDate();
			dataContext.historicalTrades.get({
				beginDate: formatting.formatDate(startDate, 'yyyyMMdd'),
				endDate: formatting.formatDate(endDate, 'yyyyMMdd')
			}).done(function (historicalTrades) {
				if (historicalTrades) {
					self.historicalTrades(historicalTrades());
				}
			}).always(function () {
				self.tradeGridReady(true);
			});
		};
		
		this.kendoGridForOrder = $.extend(grid.baseOptions(), {
			data: self.historicalOrders,
			rowTemplate: 'orderRowTemplateOnChains',
			sortable: true,
			height: 155,
			resizable: true,
			scrollable: true,
			dataBound: function (data) {
				if (self.tradeGridReady()) {
					grid.showLabelIfEmpty(data);
				}
			}
		});
		this.kendoGridForTrade = $.extend(grid.baseOptions(), {
			data: self.historicalTrades,
			rowTemplate: 'tradeRowTemplateOnChains',
			sortable: true,
			height: 155,
			resizable: true,
			scrollable: true,
			dataBound: function (data) {
				if (self.tradeGridReady()) {
					grid.showLabelIfEmpty(data);
				}
			}
		});

		this.hcWindowOptions = $.extend(kendoWindow.baseOptions(), {
			isOpen: self.isHCVisible,
			title: localizer.localize('portfolio.historicalInquiry'),
			width: 1000
		});

		events.on(events.Portfolio.HISTORICAL_INQUIRY, function () {
			self.isHCVisible(!self.isHCVisible());
		});
	};

	return new HistoricalInquiry();
});