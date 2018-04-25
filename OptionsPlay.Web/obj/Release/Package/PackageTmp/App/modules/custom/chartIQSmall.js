define(['jquery',
	'modules/custom/chartIQCommon',
	'knockout',
	'modules/custom/canvasHelpers',
	'modules/formatting'],
function ($, ChartIQCommon, ko, canvasHelpers, formatting) {
	var BEARISH_COLOR_ALPHA = 'rgba(215, 108, 126, 0.8)';
	var BULLISH_COLOR_ALPHA = 'rgba(159, 208, 114,0.8)';

	var CHART_PANEL_PERCENT = 0.7;
	var SYRAH_SENTIMENT_PANEL_PERCENT = 0.12;
	var INDICATOR_PANEL_PERCENT = 0.18;

	var SYRAH_SENTIMENTS_PANEL_NAME = 'Syrah Sentiments';
	var CHART_PANEL_NAME = 'chart';

	function TradeIdeaDefinition(ideaPart, indicatorType, indicatorId) {
		this.ideaPart = ideaPart;
		this.indicatorId = indicatorId || indicatorType;
		this.indicatorType = indicatorType;
	}

	var TRADE_IDEA_TO_INDICATOR = [
		new TradeIdeaDefinition('CCI Overbought', 'CCI'),
		new TradeIdeaDefinition('CCI Oversold', 'CCI'),
		new TradeIdeaDefinition('Williams %R', 'Williams %R'),
		new TradeIdeaDefinition('RSI Overbought', 'rsi'),
		new TradeIdeaDefinition('RSI Oversold', 'rsi'),
		new TradeIdeaDefinition('Stochastic', 'stochastics'),
		new TradeIdeaDefinition('RSI', 'rsi', 'drsi'),
		new TradeIdeaDefinition('CCI', 'CCI', 'DCCI')
	];

	var result = function (element, viewModel) {
		var self = this;
		ChartIQCommon.call(this, element, viewModel);

		var studiesCadidate = ['Williams %R', 'CCI', 'stochastics', 'drsi', 'DCCI'];
		var upLevel = {};
		var downLevel = {};
		var lastStudy;

		// todo: these values are configured on the server side thus might be not valid
		upLevel['Williams %R'] = -20;
		downLevel['Williams %R'] = -80;
		upLevel['CCI'] = 100;
		downLevel['CCI'] = -100;
		upLevel['stochastics'] = 80;
		downLevel['stochastics'] = 20;
		upLevel['drsi'] = 70;
		downLevel['drsi'] = 30;
		upLevel['DCCI'] = 100;
		downLevel['DCCI'] = -100;
		var stxx = this.stxx;

		stxx.append('draw', enrichStudy);

		function getUpAndDownLevelCoordinatesForStudy(study) {
			if (!stxx.chart || !stxx.panels) {
				return undefined;
			}
			var panels = stxx.panels;
			if (panels[study] == null) {
				return undefined;
			}

			var panelForCurrentStudy = panels[study];
			var up = upLevel[study];
			var down = downLevel[study];

			var top = panelForCurrentStudy.top;
			var bottom = panelForCurrentStudy.bottom;
			var max = panelForCurrentStudy.max;
			var min = panelForCurrentStudy.min;
			var lowLevelY;
			var upLevelY;
			if (max > min && max > up || max < min && max < up) {
				lowLevelY = top + (bottom - top) / Math.abs(min - max) * Math.abs(up - max);
			} else {
				lowLevelY = top - 100;
			}
			if (max > min && down > min || max < min && down < min) {
				upLevelY = top + (bottom - top) / Math.abs(min - max) * Math.abs(down - max);
			} else {
				upLevelY = bottom + 100;
			}

			return {
				low: lowLevelY,
				up: upLevelY
			};
		}

		function drawLowAndUpLevels(lowLevelY, upLevelY) {
			var width = stxx.chart.width;

			var context = stxx.chart.context;
			context.lineWidth = 1;
			context.strokeStyle = 'rgba(0,0,0,0.8)';
			canvasHelpers.drawHorisontalLine(context, lowLevelY, width);
			canvasHelpers.drawHorisontalLine(context, upLevelY, width);
		}

		var tradeIdea = viewModel && viewModel.tradeIdea;
		function enrichStudy() {
			if (!stxx.chart || !stxx.panels) {
				return;
			}

			for (var studyIndex = 0; studyIndex < studiesCadidate.length; studyIndex++) {
				var study = studiesCadidate[studyIndex];
				var levels = getUpAndDownLevelCoordinatesForStudy(study);
				if (levels === undefined) {
					continue;
				}

				var lowLevelY = levels.low;
				var upLevelY = levels.up;

				drawLowAndUpLevels(lowLevelY, upLevelY);

				var context = stxx.chart.context;

				function fillUpAndLowRegions(x1, y1, x2, y2) {
					if (y1 < lowLevelY && y2 < lowLevelY) { // Bearish filling.
						context.fillStyle = BEARISH_COLOR_ALPHA;
						canvasHelpers.drawFilledSegment(context, [x1, y1, x1, lowLevelY, x2, lowLevelY, x2, y2]);
					} else if (y1 < lowLevelY && y2 > lowLevelY) {
						xForTradeIdeaScanDate = ((x2 - x1) * lowLevelY - x2 * y1 + x1 * y2) / (y2 - y1);
						context.fillStyle = BEARISH_COLOR_ALPHA;
						canvasHelpers.drawFilledSegment(context, [x1, y1, x1, lowLevelY, xForTradeIdeaScanDate, lowLevelY]);
					} else if (y1 > lowLevelY && y2 < lowLevelY) {
						xForTradeIdeaScanDate = ((x2 - x1) * lowLevelY - x2 * y1 + x1 * y2) / (y2 - y1);
						context.fillStyle = BEARISH_COLOR_ALPHA;
						canvasHelpers.drawFilledSegment(context, [x2, y2, x2, lowLevelY, xForTradeIdeaScanDate, lowLevelY]);
					} else if (y1 > upLevelY && y2 > upLevelY) { // Bullish filling.
						context.fillStyle = BULLISH_COLOR_ALPHA;
						canvasHelpers.drawFilledSegment(context, [x1, y1, x1, upLevelY, x2, upLevelY, x2, y2]);
					} else if (y1 > upLevelY && y2 < upLevelY) {
						xForTradeIdeaScanDate = ((x1 - x2) * upLevelY + x2 * y1 - x1 * y2) / (y1 - y2);
						context.fillStyle = BULLISH_COLOR_ALPHA;
						canvasHelpers.drawFilledSegment(context, [x1, y1, x1, upLevelY, xForTradeIdeaScanDate, upLevelY]);
					} else if (y1 < upLevelY && y2 > upLevelY) {
						xForTradeIdeaScanDate = ((x1 - x2) * upLevelY + x2 * y1 - x1 * y2) / (y1 - y2);
						context.fillStyle = BULLISH_COLOR_ALPHA;
						canvasHelpers.drawFilledSegment(context, [x2, y2, x2, upLevelY, xForTradeIdeaScanDate, upLevelY]);
					}
				}

				var panelForCurrentStudy = stxx.panels[study];

				var dataSegment = stxx.chart.dataSegment;
				var studyValueName = (study == 'drsi' ? 'RSI ' : 'Result ') + study;
				for (var i = 0; i < dataSegment.length - 1; i++) {
					if (dataSegment[i] == null) {
						continue;
					}
					var value = dataSegment[i][studyValueName];
					var nextValue = dataSegment[i + 1][studyValueName];
					if (value == null || nextValue == null) {
						continue;
					}

					var x1 = stxx.pixelFromBar(i);
					var y1 = stxx.pixelFromPrice(value, panelForCurrentStudy);
					var x2 = stxx.pixelFromBar(i + 1);
					var y2 = stxx.pixelFromPrice(nextValue, panelForCurrentStudy);
					fillUpAndLowRegions(x1, y1, x2, y2);
				}

				if (!tradeIdea) {
					continue;;
				}

				var scanDate = new Date(tradeIdea.dateOfScan);
				var barIndexForScanDate = null;
				for (i = dataSegment.length - 1; i >= 0; i--) {
					if (dataSegment[i] != null && formatting.compareDates(scanDate, dataSegment[i].DT) >= 0) {
						barIndexForScanDate = i;
						break;
					}
				}

				if (barIndexForScanDate == null) {
					return;
				}

				var xForTradeIdeaScanDate = stxx.pixelFromBar(barIndexForScanDate) + 1;
				var basePoint;
				var isBullish = self.sentiment === 'Bullish';
				if (isBullish) {
					context.strokeStyle = BULLISH_COLOR_ALPHA;
					context.fillStyle = BULLISH_COLOR_ALPHA;
					basePoint = stxx.pixelFromPrice(dataSegment[barIndexForScanDate].Low);
				} else {
					context.strokeStyle = BEARISH_COLOR_ALPHA;
					context.fillStyle = BEARISH_COLOR_ALPHA;
					basePoint = stxx.pixelFromPrice(dataSegment[barIndexForScanDate].High);
				}

				canvasHelpers.dashedLine(context, xForTradeIdeaScanDate, 0, xForTradeIdeaScanDate, stxx.chart.canvas.height, 5);

				var arrowMeasureUnit = panelForCurrentStudy.bottom / 100;
				canvasHelpers.drawArrow(context, xForTradeIdeaScanDate, basePoint, isBullish, arrowMeasureUnit);
			}
		}

		if ($$('techInfoSign')) {
			$('#techInfoSign').tooltip({
				placement: 'bottom'
			});
		}

		var syrahSentimentsStudy = null;
		function showHideSentimentsPanel(show) {
			if (show && !syrahSentimentsStudy) {
				syrahSentimentsStudy = STXStudies.addStudy(stxx, SYRAH_SENTIMENTS_PANEL_NAME,
				{
					display: SYRAH_SENTIMENTS_PANEL_NAME,
					id: SYRAH_SENTIMENTS_PANEL_NAME
				}, {
					Bearish: "rgb(215, 108, 126)",
					Bullish: "rgb(159, 208, 114)",
					Neutral: "rgb(255, 219, 141)"
				});
			}
			if (!show && syrahSentimentsStudy) {
				STXStudies.removeStudy(stxx, syrahSentimentsStudy);
				syrahSentimentsStudy = null;
			}
		};

		function adjustChartPanelsSize() {
			if (!stxx) return;

			for (var panel in stxx.panels) {
				if (!stxx.panels.hasOwnProperty(panel)) {
					continue;
				}

				if (panel === SYRAH_SENTIMENTS_PANEL_NAME) {
					stxx.panels[panel].percent = SYRAH_SENTIMENT_PANEL_PERCENT;
				} else if (panel === CHART_PANEL_NAME) {
					stxx.panels[panel].percent = CHART_PANEL_PERCENT;
				} else {
					stxx.panels[panel].percent = INDICATOR_PANEL_PERCENT;
				}
			}
			stxx.draw();
		}

		function toggleIndicatorFromTradeIdea(ideas) {
			if (lastStudy != undefined && lastStudy.libraryEntry != undefined) {
				STXStudies.removeStudy(stxx, lastStudy);
			}

			if (!ideas) {
				return;
			}

			var rules = ideas.rules;
			var idea = rules[0].reason;
			if (idea.indexOf('Bullish') != -1) {
				self.sentiment = 'Bullish';
			} else {
				self.sentiment = 'Bearish';
			}
			var period = rules[0].period.toString() || '14';
			for (var i = 0; i < TRADE_IDEA_TO_INDICATOR.length; i++) {
				var ideaIndicator = TRADE_IDEA_TO_INDICATOR[i];
				if (idea.indexOf(ideaIndicator.ideaPart) !== -1) {
					var res = ideaIndicator.indicatorType === 'rsi' ? { RSI: "#000000" } : { Result: "#000000" };
					lastStudy = STXStudies.addStudy(stxx, ideaIndicator.indicatorType, { Period: period, id: ideaIndicator.indicatorId }, res);
					break;
				}
			}
		};

		this.readQuotes = function (data, shortTermSentiments, longTermSentiments) {
			var sentiment, currentElement;
			if (data == null || data.length <= 0) {
				return;
			}
			
			for (var i = 0; i < data.length; i++) {
				currentElement = data[i];

				currentElement.Date = currentElement.tradeDate.substring(0, 10);

				currentElement.Open = parseFloat(currentElement.openPrice);
				currentElement.Close = parseFloat(currentElement.closePrice);
				currentElement.High = parseFloat(currentElement.highPrice);
				currentElement.Low = parseFloat(currentElement.lowPrice);
				currentElement.Volume = parseFloat(currentElement.matchQuantity);
				currentElement.Adj_Close = currentElement.Close;

				if (currentElement.Volume == 0) {
					currentElement.Adj_Close = currentElement.Low = currentElement.High = currentElement.Open = currentElement.Close;
				}

				if (shortTermSentiments) {
					sentiment = ko.utils.arrayFirst(shortTermSentiments, function (s) {
						return s.date == currentElement.date;
					});
					currentElement.SyrahSentimentShortTerm = sentiment ? sentiment.value : null;
				}

				if (longTermSentiments) {
					sentiment = ko.utils.arrayFirst(longTermSentiments, function (s) {
						return s.date == currentElement.date;
					});
					currentElement.SyrahSentimentLongTerm = sentiment ? sentiment.value : null;
				}
			}
		};

		this.update = function (newViewModel) {
			if (!newViewModel) {
				return;
			}
			tradeIdea = newViewModel.tradeIdea;

			self.readQuotes(newViewModel.historicalQuotes, newViewModel.syrahSentimentShortTerm, newViewModel.syrahSentimentLongTerm);

			self.loadChart(newViewModel.symbol, newViewModel.historicalQuotes);
			self.setSupportAndResistance(newViewModel.supportAndResistance);

			showHideSentimentsPanel(newViewModel.syrahSentimentShortTerm && newViewModel.syrahSentimentShortTerm.length > 0);
			toggleIndicatorFromTradeIdea(tradeIdea);

			self.symbol = newViewModel.symbol;

			adjustChartPanelsSize();
		};

		this.resizeChart = function () {
			stxx.resizeChart();
		};

		this.studyDialog = function (obj, study) {
			stxx.openDialog = "study";
			$$("studyDialog").querySelectorAll(".title")[0].innerHTML = obj.innerHTML;
			STXStudies.studyDialog(stxx, study, $$("studyDialog"));
		};

		(function () {
			// to fix issue with undefined variable in ChartIq.
			stxx.mousemove({});

			self.bindEvents();
			stxx.chart.symbol = 'Daily';
			self.update(viewModel);

			self.toggleCrosshairs();
			self.toggleVolumeUnderlay();

			stxx.undisplayCrosshairs();
			self.home();
		})();

	};

	return result;
});
