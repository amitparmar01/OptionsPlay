define(['knockout'], function (ko) {
	var configs = {};

	configs.TechnicalAnalysis = Object.freeze({
		riskFreeRate: ko.observable(0.03),
		defaultDividendYield: ko.observable(0),
	    //daysOfDefaultExpiry: ko.observable(45)
		daysOfDefaultExpiry: ko.observable(20)
	});

	var showTrace = ko.observable((function () {
		if (localStorage && typeof (localStorage.showTrace) !== 'undefined') {
			return JSON.parse(localStorage.showTrace);
		}
		return false;
	})());

	showTrace.subscribe(function (newVal) {
		if (localStorage) {
			localStorage.showTrace = newVal;
		}
	});

	configs.App = Object.freeze({
		showTrace: showTrace,
		gridPageSize: ko.observable(10)
	});

	configs.updateConfiguration = function (cfg) {
		configs.TechnicalAnalysis.riskFreeRate(cfg.technicalAnalysis.riskFreeRate);
		configs.TechnicalAnalysis.defaultDividendYield(cfg.technicalAnalysis.defaultDividendYield);
		configs.TechnicalAnalysis.daysOfDefaultExpiry(cfg.technicalAnalysis.daysOfDefaultExpiry);

		if (!localStorage || typeof (localStorage.showTrace) === 'undefined') {
			configs.App.showTrace(cfg.app.showTrace);
		}
		configs.App.gridPageSize(cfg.app.gridPageSize);
	};

	configs.DATE_FORMAT = 'yyyy/MM/dd';

	return Object.freeze(configs);
});
