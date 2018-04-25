define(['jquery',
		'knockout',
		'modules/context',
		'kendo',
		'dataContext',
		'modules/help'],
function ($, ko, context, kendo, dataContext, help) {
	var self = {};

	self.securityName = ko.observable('');
	self.securityCode = ko.observable('');
	self.lastPrice = ko.observable('');

	self.quoteReady = ko.observable(false);
	self.quote = ko.observable(null);
	
	function updateQuote(stockCode) {
		self.quoteReady(false);
		dataContext.quotation.get(stockCode).done(function (quote) {
			self.lastPrice = quote.lastPrice() ? quote.lastPrice : quote.previousClose;
			self.securityName(quote.securityName);
			self.securityCode(quote.securityCode);
			self.quote(quote);
			self.quoteReady(true);
		});
	}

	updateQuote(context.symbolCode());
	context.symbolCode.subscribe(function (stockCode) {
		updateQuote(stockCode);
	});


	self.globalCompaniesDataSource = new kendo.data.DataSource({
		serverFiltering: true,
		transport: {
			read: {
				url: function () {
					var filterValue = this.data.filter.filters[0].value;
					return 'api/marketdata/getcompanies/' + filterValue;
				},
				dataType: 'json'
			}
		}
	});
	
	self.portfolioCompaniesDataSource = new kendo.data.DataSource({
		serverFiltering: true,
		transport: {
			read: {
				url: function () {
					return 'api/portfolio/getPortfolioCompanies';
				},
				dataType: 'json'
			}
		}
	});


	self.expandButtonClick = function () {
		var autoComplete = $("#symbolLookup").data("kendoAutoComplete");
		if (autoComplete.options.isOpened) {
			autoComplete.close();
		} else {
			self.showPortfolioCompanies();
		}
	};

	self.showPortfolioCompanies = function () {
		var autoComplete = $("#symbolLookup").data("kendoAutoComplete");
		autoComplete.setDataSource(self.portfolioCompaniesDataSource);
		autoComplete.search('');
	};

	self.symbolViewOptions = {
		data: self.globalCompaniesDataSource,
		dataTextField: 'securityCode',
		suggest: true,
		autoBind: true,
		minLength: 0,
		isOpened: false,
		templateName: 'symbolViewTemplate',
		expandButtonTemplateName: 'symbolViewExpandButtonTemplate',
		alignToRightSide: true,
		value: context.symbolCode,
		dataBinding: function (data) {
			data.sender.template = kendo.template($('#' + data.sender.options.templateName).html());
		},
		dataBound: function (data) {
			//TODO: encapsulate this logic inside of autocomplete control
			if (data.sender.options.alignToRightSide) {
				var listWidth = data.sender.list.width();
				var elementWidth = data.sender.element.width();
				var marginsSize = 4;
				// note: to avoid change position of document body in some rare case.
				if (data.sender.list.parent().index(document.body) < 0) {
					data.sender.list.parent().offset({ left: data.sender.list.parent().offset().left - listWidth + elementWidth - marginsSize });
				}
			}
		},

		select: function (data) {
			function getDataByField(fieldName) {
				return $.trim(data.item.find('[data-field="' + fieldName + '"]').text());
			}

			var company = {
				code: getDataByField('code'),
				name: getDataByField('name'),
				stockExchange: getDataByField('stockExchange')
			};
			
			context.symbolCode(company.code);
		},
		
		close: function (data) {
			data.sender.options.isOpened = false;
			data.sender.setDataSource(self.globalCompaniesDataSource);
		},
		
		open: function (data) {
			data.sender.options.isOpened = true;
		}
		
	};

	self.attachSymbolLookupExpandButton = function () {
		var expandButtonHtml = $('#' + self.symbolViewOptions.expandButtonTemplateName).html();
		var expandButton = $(expandButtonHtml);
		$('#symbolLookup').parent().append(expandButton);
		expandButton.bind('click', self.expandButtonClick);
	};

	self.bindingComplete = function () {
		self.attachSymbolLookupExpandButton();
	};

	return self;
});