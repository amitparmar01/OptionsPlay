define(['knockout',
		'dataContext',
		'modules/grid',
		'modules/context',
		'modules/formatting',
		'events',
		'jquery',
		'modules/helpers',
		'kendo',
		'knockout-kendo',
		'koBindings/kendoExt',
		'koBindings/changeFlash'],
function (ko, dataContext, grid, context, formatting, events, $, helpers) {

	function ViewModel() {
		var self = this;
		
		this.filterOptions = [
			{ key: 'optionList.delta', value: 'DELTA', path: 'greeks.delta' },
			{ key: 'optionList.gamma', value: 'GAMMA', path: 'greeks.gamma' },
			{ key: 'optionList.theta', value: 'THETA', path: 'greeks.theta' },
			{ key: 'optionList.vega', value: 'VEGA', path: 'greeks.vega' },
			{ key: 'optionList.rho', value: 'RHO', path: 'greeks.rho' },
			{ key: 'optionList.impliedVolatility', value: 'SIGMA', path: 'greeks.sigma' },
			{ key: 'optionList.openInterest', value: 'OPEN_INTEREST', path: 'uncoveredPositionQuantity' },
			{ key: 'optionList.changePercentage', value: 'CHANGE_PERCENTAGE', path: 'changePercentage' },
			{ key: 'optionList.last', value: 'LAST', path: 'latestTradedPrice' },
			{ key: 'optionList.bid', value: 'BID', path: 'bid' },
			{ key: 'optionList.ask', value: 'ASK', path: 'ask' },
			{ key: 'optionList.change', value: 'CHANGE', path: 'change' },
			{ key: 'chains.optionNumber', value: 'OPTION_NUMBER', path: 'optionNumber' },
			{ key: 'chains.optionName', value: 'CHANGE', path: 'name' },
			{ key: 'optionList.volume', value: 'CHANGE', path: 'volume' },
			{ key: 'chains.expiry', value: 'CHANGE', path: 'expiryDate' },
			{ key: 'optionList.strike', value: 'STRIKE', path: 'strikePrice' },
			{ key: 'chains.securityCode', value: 'SECURITY_CODE', path: 'securityCode' },
			{ key: 'chains.securityName', value: 'SECURITY_NAME', path: 'securityName' }];

		this.operators = [
			'<', 
			'>',
			'=',
			'≤',
			'≥', 
			'≠'
		];

		this.sortBy = ko.observable('');

		var Filter = function (enabled, filteredItems) {
			var that = this;
			that.filterName = ko.observable('optionList.default');
			that.filter = ko.observable(null);
			that.operator = ko.observable(self.operators[0]);
			that.value = ko.observable('');
			that.selectFilter = function (filter) {
				that.filterName(filter.key);
				that.filter(filter);
			};
			that.filteredItems = filteredItems;

			that.selectOperator = function (operator) {
				that.operator(operator);
			};

			that.enabled = ko.observable(enabled);

			that.toggleUl = function (data, event) {
				if (that.enabled()) {
					$(event.currentTarget).find('ul').toggle();
				} else {
					$(event.currentTarget).find('ul').toggle(false);
				}
			};

			that.enabled.subscribe(function (newVal) {
				
			});

			that.autoValues = ko.computed(function () {
				if (that.enabled() && that.filter() != null) {
					var tempArray = [];
					self.filteredOptionList().forEach(function (option) {
						var valueInOption = '' + ko.unwrap(helpers.getValue(option, that.filter().path));
						if (tempArray.indexOf(valueInOption) < 0) {
							tempArray.push(valueInOption);
						}
					});
					return tempArray;
				} else {
					return [];
				}
			});

			that.autoCompleteValues = {
				data: that.autoValues,
				suggest: false,
				//autoBind: true,
				minLength: 0,
				enable:that.enabled,
				value: that.value,
			};
		};

		this.filters = [
			new Filter(true),
			new Filter(false),
			new Filter(false)
		];

		var testFilter = function (option) {
			var result = true;
			if (option.greeks == null) {
				return false;
			}
			self.filters.forEach(function (filter) {
				if (filter.enabled() && filter.filter() != null) {
					var valueInOption = ko.unwrap(helpers.getValue(option, filter.filter().path));
					var valueInFilter = filter.value();
					if (valueInFilter.trim() == '') {
						result &= true;
						return;
					}
					if (typeof (valueInOption) === 'number') {
						valueInOption = formatting.roundNumber(valueInOption, 4);
						valueInFilter = parseFloat(valueInFilter);
						valueInFilter = formatting.roundNumber(valueInFilter, 4);
					}
					switch(filter.operator()) {
						case '<':
							result &= valueInOption < valueInFilter;
							break;
						case '>':
							result &= valueInOption > valueInFilter;
							break;
						case '=':
							result &= valueInOption == valueInFilter;
							break;
						case '≤':
							result &= valueInOption <= valueInFilter;
							break;
						case '≥':
							result &= valueInOption >= valueInFilter;
							break;
						case '≠':
							result &= valueInOption != valueInFilter;
							break;
						default:
					}
				}
			});

			return result;
		};

		this.allOptionList = ko.observableArray([]);
		this.gridReady = ko.observable(false);

		function loadList() {
			dataContext.optionChains.get(context.ulCode()).done(function (chains) {
				var list = [];
				chains.rows.forEach(function (row) {
					row.callOption.strikePrice = row.strikePrice;
					row.callOption.expiryDate = row.expiryDate;
					row.callOption.securityName = row.securityName;
					row.putOption.strikePrice = row.strikePrice;
					row.putOption.expiryDate = row.expiryDate;
					row.putOption.securityName = row.securityName;
					list.push(row.callOption);
					list.push(row.putOption);
				});
				self.allOptionList(list);
				self.gridReady(true);
			});
		}

		loadList();
		context.ulCode.subscribe(loadList);

		this.recordNo = ko.observable(0);
		this.recordCountPerPage = ko.observable(20);
		this.sortAsc = ko.observable(true);

		var lastSortByElement = null;

		this.sortResult = function (data, event) {
			self.sortDesc = false;
			var sortKey = event.currentTarget.attributes['data-field'].value;
			if (sortKey == self.sortBy()) {
				self.sortAsc(!self.sortAsc());
			} else {
				self.sortAsc(true);
				self.sortBy(sortKey);
			}
			// todo: refactor to remvoe these temp work around.
			if (lastSortByElement != null) {
				lastSortByElement.textContent = lastSortByElement.textContent.replace('↑', '').replace('↓', '');
			}
			event.currentTarget.textContent = event.currentTarget.textContent + (self.sortAsc() ? '↑' : '↓');
			lastSortByElement = event.currentTarget;
		};

		var sortOption = function (optionList) {
			if (self.sortBy() === '') {
				return optionList;
			}
			return optionList.sort(function (x, y) {
				var path = self.sortBy();
				var res = ko.unwrap(helpers.getValue(x, path)) > ko.unwrap(helpers.getValue(y, path))
					? 1
					: ko.unwrap(helpers.getValue(x, path)) == ko.unwrap(helpers.getValue(y, path)) ? 0 : -1;
				return self.sortAsc() ? res : -res;
			});
		};

		this.filteredOptionList = ko.computed(function () {
			//var results =  self.allOptionList().filter(function (option) {
			//	return testFilter(option);
			//});
			self.recordNo(0);
			return sortOption(self.allOptionList());
		}).extend({ rateLimit: { timeout: 50, method: "notifyWhenChangesStop" } });

		function calGridRowNumber() {
			if ($('#optionListTable').length == 0) {
				return;
			}
			var top = $('#optionListTable').offset().top;
			var bottomTop = $('#footer').offset().top;
			var height = bottomTop - top - 10;
			var headerHeight = $('.optionList-table .k-grid-header').height();
			self.recordCountPerPage(Math.floor((height - headerHeight) / (headerHeight - 2)));
		};

		$(window).on('resize', calGridRowNumber);

		this.displayedOptionList = ko.computed(function () {
			//return self.filteredOptionList().filter(function (option, i) {
			//	return i >= self.recordNo()
			//		&& i - self.recordNo() < self.recordCountPerPage();
		    //});

		    return self.filteredOptionList();
		});

		this.gridOptions = $.extend(grid.baseOptions(), {
			data: self.displayedOptionList,
			rowTemplate: 'optionListRowTemplate',
			resizable: true,
			scrollable: false,
			sortable: false,
			dataBound: function (data) {
				if (self.gridReady()) {
					grid.showLabelIfEmpty(data);
				}
			}
		});
		
		var rowsPerScroll = 5;

		function reCaculateRecNo(caculatedRecNo)
		{
			if (self.filteredOptionList().length - caculatedRecNo <= self.recordCountPerPage()) {
				self.recordNo(self.filteredOptionList().length - self.recordCountPerPage());
			} else {
				caculatedRecNo = Math.min(caculatedRecNo, self.filteredOptionList().length - 1);
				caculatedRecNo = Math.max(0, caculatedRecNo);
				self.recordNo(caculatedRecNo);
			}
		};

		this.onWheelScroll = function (data, event) {
			if (self.filteredOptionList().length <= self.recordCountPerPage()) {
				self.recordNo(0);
				return;
			}
			var e = event.originalEvent;
			var newRecNo = e.deltaY > 0 ? self.recordNo() + rowsPerScroll : self.recordNo() - rowsPerScroll;
			reCaculateRecNo(newRecNo);
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

		function isCovered(symbol) {
			if (symbol == 'buytoCoverdCall' || symbol == 'selltoCoveredCall') {
				return true;
			}
			return false;
		}

		function getOrderPrice(target, className) {
			if (className == 'buytoOpen' || className == 'buytoClose' || className == 'buytoCoverdCall') {
				return target.bid();
			} else {
				return target.ask();
			}			
		}

		this.OptionListContextMenu = {
			currentItem: ko.observable(),
			putFlag: ko.observable(),
			targets: '#optionListTable tbody tr td',
			beforeOpen: function (e) {
			    var optionPair = ko.contextFor(e.target).$data;
				// true: Put  false: Call
			    var callPutFlag =  optionPair.optionCode.toUpperCase().indexOf('C') < 0 ? true : false;
				self.OptionListContextMenu.putFlag(callPutFlag);
				self.OptionListContextMenu.currentItem(optionPair);
			},

			itemSelect: function (e) {
				var selectedOption = self.OptionListContextMenu.currentItem();
				var className = e.item.classList[0];
				var orderTicket = {
					optionNumber: selectedOption.optionNumber,
					optionCode: selectedOption.optionCode,
					stockBiz: getStockBiz(className),
					isCovered: isCovered(className),
					orderPrice: getOrderPrice(selectedOption, className)
				};
				events.trigger(events.OrderEntry.PREFILL_ORDER, orderTicket);
			}
		};

		this.attached = function () {
			// Function : Set the lines of data displayed in table
			// 94: the height of table-head
			//32: the height of each line of the data in table
			self.recordCountPerPage(Math.floor(($('#listGridContainer').height() - 40) / (32)));

			document.onkeyup = function () {
				switch(window.event.keyCode) {
					case 33:
						reCaculateRecNo(self.recordNo() - rowsPerScroll);
						break;
					case 34:
						reCaculateRecNo(self.recordNo() + rowsPerScroll);
						break;
					case 35:
						self.recordNo(self.filteredOptionList().length - self.recordCountPerPage());
						break;
					case 36:
						self.recordNo(0);
						break;
					default: return ;
				}
			};
		}
		this.selectedOption = ko.observable(null);
		this.onDoubleClick = function (row) {
			self.selectedOption(row);
			row && events.trigger(events.Quotes.CHANGE_DETAILS, row);
		}
	}
	return new ViewModel();

});