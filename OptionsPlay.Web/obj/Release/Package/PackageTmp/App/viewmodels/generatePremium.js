define(['knockout',
		'dataContext',
		'modules/grid',
		'modules/dropDownList',
		'modules/context',
		'modules/combinationViewModel',
		'modules/combinationChart',
		'koBindings/chartBindings',
		'jquery',
		'events',
		'kendo',
		'knockout-kendo',
		'koBindings/kendoExt'],
function (ko, dataContext, grid, DropDownList, context, Combination, CombinationChart, chartBindings, $, events) {
	function ViewModel() {
		var self = this;

		this.securityCode = context.ulCode;
		this.selectedRowData = undefined;
		this.gridReady = ko.observable(false);
		this.quoteReady = ko.observable(false);

		this.securityName = ko.observable(false);
		this.lastPrice = ko.observable(false);
		this.itemsListAll = ko.observableArray([]);

		this.priceFilter = ko.observable();
		this.changePriceFilter = function (val) {
			self.priceFilter(val);
			self.priceFilterValue1(undefined);
			self.priceFilterValue2(undefined);
			self.priceFilterValue3(undefined);
		};
		this.priceFilterValue1 = ko.observable();
		this.priceFilterValue2 = ko.observable();
		this.priceFilterValue3 = ko.observable();

		this.minPremium = ko.observable(0.15);
		this.minReturn = ko.observable(4);
		this.premiumFilter = ko.observable(false);
		this.returnFilter = ko.observable(false);
		this.flipPremiumFilter = function () {
			self.premiumFilter(!self.premiumFilter());
		};
		this.flipReturnFilter = function () {
			self.returnFilter(!self.returnFilter());
		};

		this.start = ko.observable(3);
		this.end = ko.observable(60);
		this.step = 0;
		
		this.combination = ko.observable();
		this.combinationChart = ko.observable();
		this.defaultMultiplier = ko.observable(false);
		

		this.itemsList = ko.computed(function () {
			if (self.lastPrice() === false) {
				return [];
			}
			var itemsListOrg = self.itemsListAll();
			var start = self.start() === undefined ? -1 : self.start();
			var end = self.end() === undefined? 999: self.end();
			var itemsListAll = [];
			itemsListOrg.forEach(function (item) {
				var daysToExpiry = item.expiryDate.totalNumberOfDaysUntilExpiry;
				if (daysToExpiry >= start && daysToExpiry <= end) {
					itemsListAll.push(item);
				}
			});
			var itemsList = itemsListAll;
			if (self.priceFilter() === 1 && self.priceFilterValue1() != undefined && self.priceFilterValue1() != '' ) {
				itemsList = [];
				itemsListAll.forEach(function (row) {
					if (row.strike > self.lastPrice() && row.sdOffset > self.priceFilterValue1()) {
						itemsList.push(row);
					}
				});
			} else if (self.priceFilter() === 2 && self.priceFilterValue2() != undefined && self.priceFilterValue2() != '') {
				itemsList = [];
				itemsListAll.forEach(function (row) {
					if (row.strike >= parseFloat(self.priceFilterValue2()) * self.step + self.lastPrice())
						itemsList.push(row);
				});
			} else if (self.priceFilter() === 3 && self.priceFilterValue3() != undefined && self.priceFilterValue3() != '') {
				itemsList = [];
				itemsListAll.forEach(function (row) {
					if (row.otm > self.priceFilterValue3() / 100) {
						itemsList.push(row);
					}
				});
			}
			var temp = [];
			if (self.premiumFilter()) {
				itemsList.forEach(function (item) {
					if (item.bid > self.minPremium()) {
						temp.push(item);
					}
				});
				itemsList = temp;
			}
			
			temp = [];
			if (self.returnFilter()) {
				itemsList.forEach(function (item) {
					if (parseFloat(item.annualReturn) > parseFloat(self.minReturn())/100) {
						temp.push(item);
					}
				});
				itemsList = temp;
			}
			return itemsList;
		}).extend({ rateLimit: 100 });;

		this.itemsList.subscribe(function (newList) {
			if (newList.length && $('.gen-chart-zone').length > 0) {
				//Remove timeout function will cause chart display abnormally when it's switched from other pages to generate premium page.
				setTimeout(function () {
					self.popPl(newList[Math.floor(newList.length / 2)]);
				}, 100);
			} else {
				self.combination() && self.combination().dispose();
				self.combination(null);
				self.combinationChart(false);
			}
		});

		function updateCoveredCall(securityCode) {
		    self.gridReady(false);
		    self.itemsListAll.removeAll();
		    var list = [];

		    //$.when(dataContext.optionChains.get(securityCode), dataContext.coveredCall.get(securityCode, { legType: 'call' }))
			//	.done(function (optionChains, cc) {
			//	    self.defaultMultiplier(optionChains.defaultMultiplier);
			//	    cc = ko.unwrap(cc);
			//	    cc.forEach(function (data) {
			//	        var row = optionChains.findRow(data.optionNumber);
			//	        if (!row) {
			//	            return;
			//	        }
			//	        var option = row.putOption.optionNumber === data.optionNumber ? row.putOption : row.callOption;
			//	        list.push({
			//	            bid: option.bid(),
			//	            annualReturn: data.return / 100,
			//	            otm: data.numberOfStrikesBelowAboveCurrentPrice >= 1 ? data.percentAboveBelowCurrentPrice / 100 : -data.percentAboveBelowCurrentPrice / 100,
			//	            breakeven: self.lastPrice() - option.bid(),
			//	            prob: data.probability / 100,
			//	            strike: row.strikePrice,
			//	            expiryDate: row.expiry,
			//	            chosen: ko.observable(false),
			//	            optionNumber: data.optionNumber,
			//	            sdOffset: data.numberOfSdBelowAboveCurrentPrice
			//	        });
			//	    });
			//	    self.step = optionChains.rows[1].strikePrice - optionChains.rows[0].strikePrice;
			//	    self.itemsListAll(list);
			//	    self.priceFilterValue1(0);
			//	}).always(function () {
			//	    self.gridReady(true);
			//	});
		};

		function updateQuote(stockCode) {
		    self.quoteReady(false);
		    dataContext.quotation.get(stockCode).done(function (quote) {
		        self.securityName(quote.securityName);
		        var price = quote.lastPrice() ? quote.lastPrice() : quote.previousClose();
		        self.lastPrice(price);
		    }).always(function () {
		        self.quoteReady(true);
		    });
		};

		this.gridOptions = $.extend(grid.baseOptions(), {
			data: self.itemsList,
			rowTemplate: 'genRowTemplate',
			scrollable: false,
			dataBound: function (data) {
				if (self.gridReady()) {
					grid.showLabelIfEmpty(data);
				}
			}
		});

		this.popPl = function (data) {
			self.selectedRowData = data;
			var itemList = self.itemsList();
			itemList.forEach(function(item) {
				item.chosen(false);
			});
			data.chosen(true);

			var legs = [{
				buyOrSell: 'SELL',
				expiry: new Date(data.expiryDate.date),
				legType: 'CALL' ,
				quantity: 1,
				strikePrice: data.strike
			}, {
				buyOrSell: 'BUY',
				expiry: new Date(data.expiryDate.date),
				legType: 'SECURITY',
				quantity: self.defaultMultiplier(),
				strikePrice: data.strike
			}];
			var combination = new Combination(self.securityCode(), legs);
			//if (self.combination()) {
			//	self.combination() && self.combination().dispose();
			//	self.combinationChart() && self.combinationChart().destroy();
			//	self.combination(undefined);
			//	self.combinationChart(undefined);
			//}
			var old = self.combination();
			old && old.dispose();
			self.combination(undefined);
			self.combinationChart(undefined);
			self.combination(combination);
			var chart = new CombinationChart(combination);
			self.combinationChart(chart);
		};

		this.prefill = function () {
			var data = self.selectedRowData;
			events.trigger(events.OrderEntry.PREFILL_ORDER, {
				optionNumber: data.optionNumber,
				orderType: '130',
				orderQuantity: 1,
				isCovered: true,
				stockBiz: '404',
				orderPrice: data.bid
			});
		};
	
		var chainsSub = null;
		var quoteSub = null;

		this.activate = function () {
			updateCoveredCall(this.securityCode());
			updateQuote(this.securityCode());
			chainsSub = self.securityCode.subscribe(updateCoveredCall);
			quoteSub = self.securityCode.subscribe(updateQuote);
		};
		this.detached = function () {
			chainsSub && chainsSub.dispose();
			quoteSub && quoteSub.dispose();
		};

		function getStockBiz(position) {
			switch (position) {
				case 'buytoOpen': return '400';
				case 'buytoClose': return '403';
				case 'selltoOpen': return '402';
				case 'selltoClose': return '401';
				case 'buytoCoverdCall': return '405';
				case 'selltoCoveredCall': return '404';
				default: return null;
			}
		}

		this.premiumContextMenu = {
			currentItem: ko.observable(),
			targets: '#genGrid tbody tr td',
			beforeOpen: function (e) {
				var item = ko.contextFor(e.target).$data;
				self.premiumContextMenu.currentItem(item);
			},

			itemSelect: function (e) {
				var symbol = false;
				var selectedItem = self.premiumContextMenu.currentItem();
				var className = e.item.classList[0];
				if (className == "selltoCoveredCall") {
					symbol = true;
				}
				var orderTicket = {
					optionNumber: selectedItem.optionNumber,
					optionCode: selectedItem.optionCode,
					stockBiz: getStockBiz(className),
					isCovered: symbol,
					orderPrice: selectedItem.bid
				};
				events.trigger(events.OrderEntry.PREFILL_ORDER, orderTicket);
			}
		};

		this.dblChoose = function (item) {
			
			var orderTicket = {
				optionNumber: item.optionNumber,
				optionCode: item.optionCode,
				stockBiz: '404',
				isCovered: true,
				orderPrice: item.bid
			};
			events.trigger(events.OrderEntry.PREFILL_ORDER, orderTicket);
		};

		this.attached = function () {
			$("#generatePremium input").keydown(function (e) {
				// Allow: backspace, delete, tab, escape, enter and .
				if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
					// Allow: Ctrl+A
					(e.keyCode == 65 && e.ctrlKey === true) ||
					// Allow: home, end, left, right
					(e.keyCode >= 35 && e.keyCode <= 39)) {
					// let it happen, don't do anything
					return;
				}
				// Ensure that it is a number and stop the keypress
				if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
					e.preventDefault();
				}
			});
			if (self.itemsList().length > 0) {
				setTimeout(function () {
					self.popPl(self.itemsList()[Math.floor(self.itemsList().length / 2)]);
				}, 100);
			}
		};
	}
	return ViewModel;

});