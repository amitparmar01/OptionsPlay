define([
	'knockout',
	'dataContext',
	'modules/context'
],
function (ko, dataContext, context) {
	function ChartIQ() {
		var self = this;
		var stxx = false;
		this.securityCode = context.ulCode;
		this.securityName = ko.observable();
		this.logToggled = ko.observable(false);

		this.studiesDialog = function (study, vm, event) {
			if (!stxx || stxx.chart.dataSet.length == 0) return;
			$$("studyDialog").querySelectorAll(".title")[0].innerHTML = event.target.innerHTML;
			STXStudies.studyDialog(stxx, study, $$("studyDialog"));
			STXDialogManager.displayDialog("studyDialog");
			$('#studyMenu').click();
		};

		this.createStudy = function () {
			STXStudies.go($$("studyDialog"), stxx);
			STXDialogManager.dismissDialog();
		};

		this.setChartType = function (study) {
			stxx.setChartType(study);
		};
		STXMenuManager.useOverlays(false);

		/*
			* Dummy data for streaming example. Erase this after you implement streaming charts.
			*/
		var streamingData = [
			{ Date: null, Open: 155.43, High: 155.44, Low: 155.39, Close: 155.4, Volume: 466380 },
			{ Date: null, Open: 155.41, High: 155.48, Low: 155.4, Close: 155.46, Volume: 466480 },
			{ Date: null, Open: 155.45, High: 155.55, Low: 155.43, Close: 155.5, Volume: 466580 },
			{ Date: null, Open: 155.49, High: 155.51, Low: 155.41, Close: 155.41, Volume: 466680 },
			{ Date: null, Open: 155.41, High: 155.49, Low: 155.38, Close: 155.47, Volume: 466780 },
			{ Date: null, Open: 155.47, High: 155.5, Low: 155.44, Close: 155.45, Volume: 466880 },
			{ Date: null, Open: 155.45, High: 155.47, Low: 155.43, Close: 155.46, Volume: 500 },
			{ Date: null, Open: 155.47, High: 155.5, Low: 155.44, Close: 155.48, Volume: 1000 },
			{ Date: null, Open: 155.49, High: 155.49, Low: 155.46, Close: 155.47, Volume: 30000 },
			{ Date: null, Open: 155.47, High: 155.53, Low: 155.46, Close: 155.51, Volume: 100000 },
			{ Date: null, Open: 155.51, High: 155.52, Low: 155.45, Close: 155.47, Volume: 3000 },
			{ Date: null, Open: 155.46, High: 155.47, Low: 155.37, Close: 155.41, Volume: 50000 },
			{ Date: null, Open: 155.41, High: 155.42, Low: 155.38, Close: 155.41, Volume: 100000 },
			{ Date: null, Open: 155.41, High: 155.46, Low: 155.4, Close: 155.45, Volume: 400000 },
			{ Date: null, Open: 155.32, High: 155.48, Low: 155.3, Close: 155.41, Volume: 500000 }
		];
		var streamCounter = 0;
		var startTick = strToDateTime("2013-03-20 13:40");
		var currentTick = startTick;
		var streamStartTime = new Date().getTime();

		/*
			* Modify or replace this entire function to get an updated tick if you plan to support streaming charts
			*/
		function fetchRealTimeTick(symbol, interval, cb) {

			var newTick = clone(streamingData[streamCounter++]);
			if (streamCounter == streamingData.length) streamCounter = 0;
			var nextTickTime = STXMarket.nextPeriod(currentTick, stxx.layout.interval, 1, stxx);
			var now = new Date(startTick.getTime() + (new Date().getTime() - streamStartTime));
			if (now.getTime() >= nextTickTime.getTime()) {
				newTick.Date = yyyymmddhhmm(nextTickTime);
				currentTick = nextTickTime;
			} else {
				newTick.Date = yyyymmddhhmm(currentTick);
			}
			cb(newTick);
		}

		/*
		 * A very simple loop for updating the chart with streaming data
		 */
		var enableStreaming = false;

		function updateChartLoop() {
			fetchRealTimeTick(stxx.symbol, stxx.layout.interval, function (tick) {
				if (!enableStreaming) return;
				stxx.appendMasterData([tick]);
				setTimeout(updateChartLoop, 250);
			});
		}

		/*
			 * Modify or replace this function to fetch your market data!
			 */

		function fetchMyData(symbol, interval, cb) {
			var myData = null;
			if (interval == "day" || interval == "week" || interval == "month") {
				myData = sampleData;
			} else if (interval == 5) {
				myData = sample5min;
			} else if (interval == 30) {
				myData = sample30min;
			}
			cb(myData);
		}

		// There is a distinction between end of day intervals (day, week, month) and intraday intervals.
		// Your periodicity function may be more complex and should load the appropriate time series data
		// based on the user's selection. Note that weekly and monthly data are calculated automatically from daily
		// data if enough of it is supplied with a query. Add any additional intervals that you support to the displayMap
		this.changePeriodicity = function (newInterval) {
			stxx.setPeriodicityV2(1, newInterval);
			//$('#periodBtn').click();
		};
		
		this.crossHairOnOff = function (onOff) {
			STXDrawingToolbar.setVectorType(stxx, '');
			STXDrawingToolbar.crosshairs(stxx, onOff);
			$('.drawBtn').click();
		};

		this.setVectorType = function (type) {
			if (!type) {
				stxx.clearDrawings();
			} else {
				STXDrawingToolbar.setVectorType(stxx, type);
			}
			$('.drawBtn').click();
		};

		this.toggleLog = function () {
			stxx.layout.semiLog = !stxx.layout.semiLog;
			stxx.draw();
			stxx.changeOccurred("layout");
			stxx.doDisplayCrosshairs();
			self.logToggled(!self.logToggled());
		};


		this.createVolumePanel = function () {
			if (stxx.panelExists("vchart")) return;
			stxx.createPanel("Volume", "vchart", 100);
			stxx.draw();
			$('#studyMenu').click();
		};

		this.toggleVolumeUnderlay = function () {
			stxx.setVolumeUnderlay(!stxx.layout.volumeUnderlay);
			$('#studyMenu').click();
		};

		this.attached = function (element) {

			// Declare a STXChart object. This is the main object for drawing charts
			stxx = new STXChart($(element).find("#chartContainer")[0]);
			// The charting widget defaults to 24 hours of display for intraday charting.
			// Changing the market times is only necessary if you are displaying charts from an exchange with opening and closing periods 
			//stxx.chart.beginHour=9;
			//stxx.chart.beginMinute=30;
			//stxx.chart.endHour=16;
			//stxx.chart.endMinute=0;
			//stxx.translationCallback=STXI18N.translate;
			//STXI18N.setLocale(stxx, "zh");							// Optionally set locale in order to localize dates and numbers.

			// This is a sample to demonstrate how the results of the open Yahoo Finance API can be used
			// to generate chart data. Be sure to use the Yahoo Finance symbol format (symbology) in the input box
			function convertYahooResults(quotes) {
				if (quotes && quotes.length == 0) return;
				for (var i = 0; i < quotes.length; i++) {
					quotes[i].Open = parseFloat(quotes[i].Open);
					quotes[i].Close = parseFloat(quotes[i].Close);
					quotes[i].High = parseFloat(quotes[i].High);
					quotes[i].Low = parseFloat(quotes[i].Low);
					quotes[i].Volume = parseFloat(quotes[i].Volume);
					quotes[i].Adj_Close = parseFloat(quotes[i].Adj_Close);
				}
				if (quotes.length > 1) { // Weird Yahoo thing where they give duped bars after hours
					if (quotes[quotes.length - 1].Date == quotes[quotes.length - 2].Date) {
						quotes.pop();
					}
				}
			}

			// Callback function for Yahoo API
			function cbfunc(yqlResult) {
				var count = yqlResult.query.count;
				if (count > 0) {
					enableStreaming = false;
					var quotes = yqlResult.query.results.quote;
					quotes.reverse();
					convertYahooResults(quotes);
					stxx.newChart($$("symbol").value, quotes);
				}
			}

			// Example of how to retrieve data from Yahoo API. This utilizes so called JSONP concept. Note that Yahoo API is not
			// always available. This code does not error check and so a user may simply experience nothing if the Yahoo API
			// is down. Do not use in production without adding code to detect "unavailable" responses from Yahoo.
			var seq = 0; // Use a sequential counter to prevent IE from caching Yahoo script
			function getYahooQuotes(symbol) {
				var today = new Date();
				var curr_date = today.getDate();
				if (curr_date < 10) curr_date = "0" + curr_date;
				var curr_month = today.getMonth() + 1;
				if (curr_month < 10) curr_month = "0" + curr_month;
				var curr_year = today.getFullYear();

				var yyyymmdd = curr_year + "-" + curr_month + "-" + curr_date;
				var yyyymmdd2 = (curr_year - 1) + "-" + curr_month + "-" + curr_date;
				var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%3D'" + symbol + "'%20and%20startDate%3D'" + yyyymmdd2 + "'%20and%20endDate%3D'" + yyyymmdd + "'&format=json&diagnostics=true&env=http%3A%2F%2Fdatatables.org%2Falltables.env&callback=cbfunc" + "&seq=" + seq++;
				var newScript = document.createElement("script");
				$$("loading").style.display = "block";
				newScript.src = url;
				newScript.onload = function () {
					$$("loading").style.display = "none";
				};
				newScript.onerror = function () {
					$$("loading").style.display = "none";
				};
				document.body.appendChild(newScript);
			}


			/*
			 * Modify the components in this function to establish the behavior of your UI.
			 */
			function initialize() {
				STXThemeManager.builtInThemes = {
					"Light": "Content/custom/stx-demo-theme-1.css",
					"Dark": "Content/custom/stx-demo-theme-2.css"
				};
				// Set up menu manager
				STXMenuManager.makeMenus();
				STXMenuManager.registerChart(stxx);
				STXThemeManager.setThemes({enabledTheme: 'Light'}, stxx);

				STXDrawingToolbar.initialize();
				STXDrawingToolbar.setVectorType(stxx, null);

				STXTimeZoneWidget.initialize(STXStorageManager.get("timezone"), STXStorageManager.callbacker("timezone"));


				function textCallback(that, txt, filter, clicked) {
					if (clicked) {
						$$$("#symbol").value = "";
					} // Set up lookup result widget using dummy data you will need to build your own lookup function that returns data in this format!
					var sampleResults = [
						{ symbol: "S", description: "Sprint Corporation", exchange: "NYSE" },
						{ symbol: "SPY", description: "SPDR S&amp;P 500 ETF", exchange: "NYSE" },
						{ symbol: "^GSPC", description: "SPDR S&amp;P 500", exchange: "" },
						{ symbol: "CSCO", description: "Cisco Systems, Inc.", exchange: "NASDAQ" },
						{ symbol: "SWKS", description: "Skyworks Solutions Inc.", exchange: "NASDAQ" },
						{ symbol: "GLD", description: "SPDR Gold Shares", exchange: "NYSE" },
						{ symbol: "WMT", description: "Wal-Mart Stores Inc.", exchange: "NYSE" },
						{ symbol: "SLV", description: "iShares Silver Trust", exchange: "NYSE" },
						{ symbol: "DDD", description: "3D Systems Corp.", exchange: "NYSE" },
						{ symbol: "GS", description: "The Goldman Sachs Group, Inc.", exchange: "NYSE" },
						{ symbol: "USDAUD", description: "US Dollar Australian Dollar", exchange: "FX" },
						{ symbol: "USDBRL", description: "US Dollar Brazilian Real", exchange: "FX" }
					];
					that.displayResults(sampleResults); // Display the results in the drop down

					/*
					// this is sample code for enabling suggestive search using an ajax query
					// have your server return a JSON object in the format of sampleResults above
					function processSearchResults(that){
						return function(status, results){
							if(status==200){
								that.displayResults(JSON.parse(results));
							}
						};
					}
					var url="http://yourdomain.com?search=" + txt + "&filter" = filter;
					postAjax(url, null, processSearchResults(that));
					*/
				}

				function selectCallback(that, symbol, filter) {
					getYahooQuotes(symbol); // Instead of getting quotes from yahoo, replace this with a function to get quotes from your data source.
				}

				var config = {
					input: $$$("#symbol"),
					textCallback: textCallback, // If you don't have a symbol lookup then just leave this blank
					selectCallback: selectCallback,
					filters: ["ALL", "STOCKS", "FOREX", "INDEXES"] // Change these filters to the security types that you support
				};
				//stxLookupWidget = new STXLookupWidget(config);
				//stxLookupWidget.init();


			}

			
			

			function prependHeadsUpHR() {
				if ($$("huOpen")) {
					var tick = Math.floor((STXChart.crosshairX - this.chart.left) / this.layout.candleWidth);
					var prices = this.chart.xaxis[tick];
					$$("huOpen").innerHTML = "";
					$$("huClose").innerHTML = "";
					$$("huHigh").innerHTML = "";
					$$("huLow").innerHTML = "";
					$$("huVolume").innerHTML = "";
					if (prices != null) {
						if (prices.data) {
							$$("huOpen").innerHTML = this.formatPrice(prices.data.Open);
							$$("huClose").innerHTML = this.formatPrice(prices.data.Close);
							$$("huHigh").innerHTML = this.formatPrice(prices.data.High);
							$$("huLow").innerHTML = this.formatPrice(prices.data.Low);
							$$("huVolume").innerHTML = condenseInt(prices.data.Volume);
						}
					}
				}
			}

			STXChart.prototype.prepend("headsUpHR", prependHeadsUpHR);


			function resizeContainers() {
				if (STX.ipad && STX.isIOS7) {
					// IOS7 bug in landscape mode doesn't report the pageHeight correctly. The fix is to fix the height
					// in css and then adjust the body height to the new size
					STX.appendClassName($$$("html"), "ipad ios7");
					$$$("body").style.height = pageHeight() + "px";
				}

				var chartContainer = $$("chartContainer");
				var chartArea = $$$(".stx-chartArea");
				var sidePanel = $$$(".stx-panel-side");
				var panelWidth = 0;
				if (sidePanel && sidePanel.offsetLeft) {
					panelWidth = chartArea.clientWidth - sidePanel.offsetLeft;
				}

				chartContainer.style.width = (chartArea.clientWidth - panelWidth) + "px";

				var bottomMargin = 0;
				if ($$$(".stx-footer")) bottomMargin = $$$(".stx-footer").clientHeight;

				chartContainer.style.height = (pageHeight() - getPos(chartContainer).y - bottomMargin) + "px";
				chartArea.style.height = (pageHeight() - getPos(chartArea).y - bottomMargin) + "px";

				if (stxx && stxx.chart.canvas != null) {
					stxx.resizeChart();
				}
			}

			function toggleFullScreenMode() {
				var wrapper = $$$(".stx-wrapper");
				if (window.fullScreenMode) {
					var rightSide = stxx.chart.maxTicks - stxx.chart.scroll;
					wrapper.style.position = null;
					wrapper.style.left = null;
					wrapper.style.top = null;
					wrapper.style.width = null;
					var chartContainer = $$("chartContainer");
					var chartArea = $$$(".stx-chartArea");
					chartContainer.style.height = null;
					chartContainer.style.width = null;
					chartArea.style.height = null;
					stxx.resizeChart();
					stxx.chart.scroll = stxx.chart.maxTicks - rightSide;
					stxx.draw();
				} else {
					// stx-wrapper must be at the body level of the page for full screen to work
					// and it must have a z-index greater than anything else on the page
					wrapper.style.position = "absolute";
					wrapper.style.left = "0px";
					wrapper.style.top = "0px";
					wrapper.style.width = "100%";
					resizeContainers();
					stxx.resizeChart();
					stxx.draw();
				}
				window.fullScreenMode = !window.fullScreenMode;
			}

			function resizeScreen() {
				if (stxx && stxx.chart.canvas != null) {
					if (window.fullScreenMode) {
						resizeContainers();
					} else {
						stxx.resizeChart();
					}
				}
			}

			function toggleCrosshairs() {
				stxx.layout.crosshair = true;
				stxx.changeOccurred('layout');
				stxx.doDisplayCrosshairs();
				stxx.draw();
				//may cause problem here
				//setTimeout(function () {
				//	stxx.resizeChart();
				//}, 100);
			}

			function displayChart() {
				var symbol = "SPY1";
				fetchMyData(symbol, "day", function (data) {
					stxx.newChart(symbol, data);
					stxx.setPeriodicityV2(1, "day");
					updateChartLoop();
				});

			}

			function updateHistoricalQuotes(securityCode, period) {
				dataContext.historicalQuotes.get(securityCode, {
					period: period
				}).done(function (result) {
					var quotes = result();
					var res = [];
					//quotes.forEach(function (quote, index) {
					//    var datum = {};
					//	datum['Adj_Close'] = index < quotes.length - 1 ? quotes[index + 1]['lastClosePrice'] : quote['closePrice'];
					//	datum['Close'] = quote['closePrice'];
					//	datum['Date'] = quote['tradeDate'].substring(0,10);
					//	datum['High'] = quote['highPrice'];
					//	datum['Low'] = quote['lowPrice'];
					//	datum['Open'] = quote['openPrice'] == 0 ? quote['closePrice'] : quote['openPrice'];
					//	datum['Volume'] = quote['matchSum'];
					//	res.push(datum);
					//});

					for (var i = 0; i < quotes.length; i++) {
					    var datum = {};
					    datum['Adj_Close'] = quotes[i]['closePrice']; i < quotes.length - 1 ? quotes[i + 1]['lastClosePrice'] : quotes[i]['closePrice']
					    datum['Close'] = quotes[i]['closePrice'];
					    datum['Date'] = quotes[i]['tradeDate'].substring(0, 10);
					    datum['High'] = quotes[i]['highPrice'];
					    datum['Low'] = quotes[i]['lowPrice'];
					    datum['Open'] = quotes[i]['openPrice'] == 0 ? quotes[i]['closePrice'] : quotes[i]['openPrice'];
					    datum['Volume'] = quotes[i]['Volume'] || quotes[i]['matchQuantity'];
					    res.push(datum);
					}

					stxx.newChart(self.securityName(), res);
					// redraw when transition completed.
					setTimeout(function () {
						stxx.resizeChart();
						stxx.draw();
					}, 1000);
				});
			}

			function updateQuote(code) {
				dataContext.quotation.get(code).done(function (quote) {
					self.securityName(quote.securityName);
					updateHistoricalQuotes(code, '5y');
				});
			}

			window.onresize = resizeScreen;
			
			initialize();

			
			updateQuote(this.securityCode());

			this.securityCode.subscribe(function (code) {
				stxx.newChart('', []);
				updateQuote(code);
			});

			//displayChart();
			toggleCrosshairs();
		};

	}

	return ChartIQ;
})