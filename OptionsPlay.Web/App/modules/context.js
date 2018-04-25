define(['knockout',
		'dataContext',
		'koExtenders'],
function (ko, dataContext) {
	var DEFAULT_CODE = '510050';

	var context = {};
	context.optionables = ko.observableArray();

	function getDefaultCode() {
		var defaultCode = DEFAULT_CODE;
		if (localStorage && localStorage['defaultUlCode']) {
			defaultCode = localStorage['defaultUlCode'];
		}
		return defaultCode;
	}

	var setDefaultCode = function (code) {
		if (localStorage) {
			localStorage['defaultUlCode'] = code;
		}
		return code;
	};

	function isAllowedUlCode(code) {
		return context.optionables().some(function (security) {
			return security.securityCode == code;
		});
	}

	context.symbolCode = ko.observable(getDefaultCode()).extend({ shouldTrim: true });
	context.symbolCode.subscribe(setDefaultCode);
	context.ulCode = context.symbolCode.extend({ allows: isAllowedUlCode });

	context.quote = ko.observable(null);
	//context.dataContext = dataContext;

	context.selectedTradeIdea = ko.observable(null);

	// todo: detach relationship between ulCode and selected tradeIdea when refactorin quotes.
	context.selectedTradeIdea.subscribe(function (tradeIdea) {
		if (tradeIdea && context.ulCode() !== tradeIdea.securityCode) {
			context.ulCode(tradeIdea.securityCode);
		}
	});

	context.isTradePanelVisible = ko.observable(true);

	context.symbolSentiments = ko.observable();

	context.trendSentiment = ko.observable();

	context.isWhyPanelLoading = ko.observable(false);

	context.isHowPanelLoading = ko.observable(false);

	context.isTradeIdPanelLoading = ko.observable(false);

	return context;
});