define(['jquery',
	'modules/formatting'
], function ($, formatting) {

	var BULLISH_COLOR = 'rgb(215, 108, 126)';
	var BEARISH_COLOR = 'rgb(159, 208, 114)';
	var SUPPORT_AND_RESISTANCE_LINE_WIDTH = 1;

	if (window.STXChart == null) {
		console.log("ChartIQData library hasn't been loaded");
		return null;
	}

	//init STXChart prepend/append functions.
	function prependDoDisplayCrosshairs() {
		var floatDate = $('#floatDate')[0];
		if (!floatDate) {
			return;
		}
		if ((this.layout.crosshair || STXChart.vectorType != '') && this.panels['chart']) {
			if (this.panels['chart'].bottom) {
				floatDate.style.left = (this.backOutX(STXChart.crosshairX) - (floatDate.offsetWidth / 2)) + 'px';
				floatDate.style.bottom = (this.chart.canvasHeight - this.panels['chart'].bottom) + 'px';
				floatDate.style.display = 'block';
			} else {
				floatDate.style.display = 'none';
			}
		} else {
			floatDate.style.display = 'none';
		}
	}

	function prependUndisplayCrosshairs() {
		if (this.chart.crossX != null && this.chart.crossX.style.display == '' && $('#floatDate')[0]) {
			$('#floatDate')[0].style.display = 'none';
		}
	}

	STXChart.prototype.prepend('doDisplayCrosshairs', prependDoDisplayCrosshairs);
	STXChart.prototype.prepend('undisplayCrosshairs', prependUndisplayCrosshairs);

	function prependHeadsUpHR() {
		var tick = this.tickFromPixel(STXChart.crosshairX - this.chart.left);
		if (!this.chart.dataSet.length || $('#floatDate').length === 9) {
			return;
		}
		if (this.layout.interval != 'minute') tick /= this.layout.periodicity;
		var quoteUnderCursor = this.chart.dataSet[tick];

		if (!quoteUnderCursor) {
			var endDate = this.chart.dataSet[this.chart.dataSet.length - 1]['Date'];
			var newDate;
			endDate = strToDateTime(endDate);
			if (this.layout.interval == 1) {
				var offset = tick - this.chart.dataSet.length;
				var endTime = endDate.setMinutes(endDate.getMinutes() + offset);
				newDate = new Date(endTime);
				$('#floatDate')[0]&&($('#floatDate')[0].innerHTML = formatting.formatDate(newDate, 'MM-dd hh:mm'));
			} else if (this.layout.interval == 'day') {
				var days = tick - this.chart.dataSet.length;
				var endDay = endDate.getDay() + days;
				for (var i = endDate.getDay() ; i <= endDay; i++) {
					if ((i % 5) == 1) {
						days += 2;
					}
				}
				newDate = new Date(endDate.setDate(endDate.getDate() + days));
				$('#floatDate')[0] && ($('#floatDate')[0].innerHTML = formatting.formatDate(newDate, 'MM-dd-yyyy'));
			}
		}
		if (quoteUnderCursor != null && quoteUnderCursor.Date) {
			$('#floatDate')[0] && ($('#floatDate')[0].innerHTML = mmddhhmm(quoteUnderCursor.Date));
		}
	}

	STXChart.prototype.prepend('headsUpHR', prependHeadsUpHR);

	function appendDraw() {
		var homeBtn = $('#home')[0];
		if (!homeBtn) {
			return;
		}

		homeBtn.style.display = this.chart.scroll > this.chart.maxTicks ? 'block' : 'none';
	}

	STXChart.prototype.append('draw', appendDraw);

	var result = function (element, viewModel, chartType) {
		var MAX_TICKS = 350;
		var self = this;

		var stxx = new STXChart(element);
		//stxx.canvasStyle('stx_candle_up').color = BULLISH_COLOR;
		//stxx.canvasStyle('stx_candle_down').color = BEARISH_COLOR;
		stxx.manageTouchAndMouse = true;

		stxx.prepend('adjustPanelPositions', function () {
			if (stxx.displayInitialized) {
				stxx.chart.scroll = Math.min(stxx.chart.maxTicks, stxx.chart.dataSet.length);
				stxx.calculateYAxisMargins(stxx.chart.panel.yAxis);
			}
		});

		stxx.prepend('drawVectors', drawHighlightSR);

		// TODO: pass real data
		stxx.chart.beginHour = 9;
		stxx.chart.beginMinute = 30;
		stxx.chart.endHour = 16;
		stxx.chart.endMinute = 0;
		stxx.chart.minutesInSession = 390;

		this.stxx = stxx;
		this.id = element.id;
		this.symbol = viewModel && viewModel.symbol;
		this.chartType = chartType || 'Daily';

		this.showSupportAndResistance = false;
		this.supportAndResistanceDrawings = [];
		this.setSupportAndResistance = function (supportAndResistance) {
			if (supportAndResistance) {
				self.support = supportAndResistance.support.slice(0, 2);
				self.resistance = supportAndResistance.resistance.slice(0, 2);
			} else {
				self.support = [];
				self.resistance = [];
			}
			clearSupportAndResistance();
			drawSupportAndResistance();
		};

		function clearSupportAndResistance() {
			if (stxx) {
				stxx.clearDrawings(self.supportAndResistanceDrawings);
				self.supportAndResistanceDrawings = [];
			}
		}

		function drawSupportAndResistance() {
			var i, value, date;
			var vectors = self.supportAndResistanceDrawings;
			var drawing;
			var nextDayAfterLatest = new Date(Date.now() + 24 * 3600 * 1000);
			nextDayAfterLatest = formatting.formatDate(nextDayAfterLatest, 'yyyy-MM-dd');

			function drawHorizontalLineToTheLatestDate(dt, val, color) {
				drawing = stxx.createDrawing('ray', {
					pnl: 'chart',
					d0: dt,
					d1: nextDayAfterLatest,
					v0: val,
					v1: val,
					col: color,
					lw: SUPPORT_AND_RESISTANCE_LINE_WIDTH
				});
				vectors.push(drawing);
			}

			for (i = 0; i < self.support.length && self.support[i]; i++) {
				value = self.support[i].value;
				date = self.support[i].date.substr(0, 10);
				drawHorizontalLineToTheLatestDate(date, value, BULLISH_COLOR);
			}
			for (i = 0; i < self.resistance.length && self.resistance[i]; i++) {
				value = self.resistance[i].value;
				date = self.resistance[i].date.substr(0, 10);
				drawHorizontalLineToTheLatestDate(date, value, BEARISH_COLOR);
			}
		}

		this.setSupportAndResistance(viewModel && viewModel.supportAndResistance);

		function drawHighlightSR() {
			$.each(self.supportAndResistanceDrawings, function (k, drawing) {
				var isHighlighted = drawing.highlighted;
				if (isHighlighted) {
					stxx.canvasStyle("stx_highlight_vector").color = drawing.color;
					drawing.lineWidth = SUPPORT_AND_RESISTANCE_LINE_WIDTH + 2;
				} else {
					drawing.lineWidth = SUPPORT_AND_RESISTANCE_LINE_WIDTH;
				}
			});
		}

		this.highlightedSR = undefined;
		this.highlightedColor = undefined;
		this.highlightSR = function (value) {
			$.each(self.supportAndResistanceDrawings, function (k, drawing) {
				drawing.highlighted = drawing.v0 == value;
			});
			stxx.draw();
		};

		this.disableSR = function () {
			self.highlightedSR = undefined;
			stxx.draw();
		};

		this.loadChart = function (symbol, quotes) {
			clearSupportAndResistance();
			stxx.undisplayCrosshairs();
			stxx.setMasterData(quotes || []);
			stxx.createDataSet();
			stxx.initializeChart($$(self.id + '-chartContainer'));
			self.home();
		};

		this.updateLastData = function (quote) {
			stxx.appendMasterData([quote]);
		};

		this.zoomIn = function () {
			stxx.zoomIn();
			self.home();
		};

		function setDisplayPeriodInMonths(months) {
			var orgMax = stxx.chart.maxTicks;
			var curMax = 21 * months;
			stxx.chart.maxTicks = curMax;
			stxx.chart.scroll = curMax;
			stxx.layout.candleWidth = stxx.layout.candleWidth * orgMax / curMax;
			stxx.draw();
			stxx.changeOccurred('layout');
		}

		this.click1m = function () {
			setDisplayPeriodInMonths(1);
		};

		this.click3m = function () {
			setDisplayPeriodInMonths(3);
		};

		this.click6m = function () {
			setDisplayPeriodInMonths(6);
		};

		this.zoomOut = function () {
			if (stxx.chart.maxTicks > MAX_TICKS) {
				return;
			}
			stxx.zoomOut();
			self.home();
		};

		this.home = function () {
			stxx.home();
			stxx.draw();
		};

		this.toggleCrosshairs = function () {
			stxx.layout.crosshair = !stxx.layout.crosshair;
			stxx.draw();
			stxx.changeOccurred('layout');
			stxx.doDisplayCrosshairs();
		};

		this.createStudy = function (node, stx) {
			STXStudies.go(node, stx);
		};

		this.createVolumePanel = function () {
			if (stxx.panelExists('vchart')) return;
			stxx.createPanel('Volume', 'vchart', stxx.chart.height / 3);
			stxx.draw();
		};

		this.toggleVolumeUnderlay = function () {
			stxx.setVolumeUnderlay(!stxx.layout.volumeUnderlay);
		};

		this.modalBegin = function () {
			stxx.openDialog = 'modal';
			stxx.undisplayCrosshairs();
		};

		this.modalEnd = function () {
			stxx.cancelTouchSingleClick = true;
			stxx.openDialog = '';
			stxx.doDisplayCrosshairs();
		};

		this.dismissDialog = function (node) {
			stxx.openDialog = '';
			node.style.display = 'none';
			if (STXStudies.colorPickerDiv != null) STXStudies.colorPickerDiv.style.display = 'none';
		};

		this.studyDialog = function (obj, study) {
			stxx.openDialog = 'study';
			stxx.chart.container.parentNode.parentNode.querySelectorAll('#studyDialog')[0].querySelectorAll('.title')[0].innerHTML = obj.innerHTML;
			STXStudies.studyDialog(stxx, study, stxx.chart.container.parentNode.parentNode.querySelectorAll('#studyDialog')[0]);
		};

		this.toggleMenu = function (menu) {
			if ($$(menu).style.display == 'none') {
				$('.menuSelect').css('display', 'none');
				$$(menu).style.display = 'block';
				stxx.openDialog = 'menu';
			} else {
				$$(menu).style.display = 'none';
				stxx.openDialog = '';
			}
		};

		this.oldwidth = $('#' + self.id).width();

		this.bindEvents = function () {
			$(stxx.chart.container.parentNode.parentNode.querySelectorAll('#dismissDialog')[0]).click(function () {
				self.dismissDialog(stxx.chart.container.parentNode.parentNode.querySelectorAll('#studyDialog')[0]);
			});
			$(stxx.chart.container.parentNode.parentNode.querySelectorAll('#createStudy')[0]).click(function () {
				self.createStudy(this.parentNode, stxx);
				self.dismissDialog(stxx.chart.container.parentNode.parentNode.querySelectorAll('#studyDialog')[0]);
			});

			var toggleCrosshairsElement = $('#' + self.id + '-toggleCrosshairs');
			if (toggleCrosshairsElement.length) {
				toggleCrosshairsElement.on('click', self.toggleCrosshairs);
			}

			$('#' + self.id + '-toggle_studies').click(function () {
				self.toggleMenu(self.id + '-studies');
			});
			$('#' + self.id + ' div.study-item').click(function () {
				self.toggleMenu(self.id + '-studies');
				self.studyDialog(this, this.firstChild.innerHTML);
			});
			$('#' + self.id + '-createVolumePanel').click(function () {
				self.toggleMenu(self.id + '-studies');
				self.createVolumePanel();
			});
			$('#' + self.id + '-toggleVolumeUnderlay').click(function () {
				self.toggleMenu(self.id + '-studies');
				self.toggleVolumeUnderlay();
			});

			var homeBtn = stxx.chart.container.querySelectorAll('#home')[0];
			var zoomInBtn = $$('zoomIn');
			var zoomOutBtn = $$('zoomOut');

			//todo: bind from knockout (not jquery). 
			var btn1M = $$(self.id + '-1m');
			var btn3M = $$(self.id + '-3m');
			var btn6M = $$(self.id + '-6m');

			zoomOutBtn.onmouseover = self.modalBegin;
			zoomOutBtn.onmouseout = self.modalEnd;
			zoomInBtn.onmouseover = self.modalBegin;
			zoomInBtn.onmouseout = self.modalEnd;

			if (!STX.touchDevice) {
				homeBtn.onclick = self.home;
				zoomInBtn.onclick = self.zoomIn;
				zoomOutBtn.onclick = self.zoomOut;
				if (btn1M != undefined) {
					btn1M.onclick = self.click1m;
					btn3M.onclick = self.click3m;
					btn6M.onclick = self.click6m;
				}
			} else {
				if (STX.isSurface) {
					document.body.addEventListener('MSPointerDown', (function (stxChart) {
						return function (e) {
							return stxChart.startProxy(e);
						};
					})(stxx), false);
					document.body.addEventListener('MSGestureStart', (function () {
						return function () {
							STX.gestureInEffect = true;
						};
					})(stxx), false);
					document.body.addEventListener('MSGestureChange', (function (stxChart) {
						return function (e) {
							return stxChart.touchmove(e);
						};
					})(stxx), false);
					document.body.addEventListener('MSGestureEnd', (function (stxChart) {
						return function (e) {
							STX.gestureInEffect = false;
							return stxChart.touchend(e);
						};
					})(stxx), false);
					document.onmspointermove = (function (stxChart) {
						return function (e) {
							stxChart.moveProxy(e);
						};
					})(stxx);
					document.onmspointerup = (function (stxChart) {
						return function (e) {
							return stxChart.endProxy(e);
						};
					})(stxx);
					homeBtn.onmspointerup = self.home;
					zoomInBtn.onmspointerup = self.zoomIn;
					zoomOutBtn.onmspointerup = self.zoomOut;
					if (btn1M != undefined) {
						btn1M.onmspointerup = self.click1m;
						btn3M.onmspointerup = self.click3m;
						btn6M.onmspointerup = self.click6m;
					}

				} else {
					homeBtn.ontouchend = self.home;
					zoomInBtn.ontouchend = self.zoomIn;
					zoomOutBtn.ontouchend = self.zoomOut;
					if (btn1M != undefined) {
						btn1M.ontouchend = self.click1m;
						btn3M.ontouchend = self.click3m;
						btn6M.ontouchend = self.click6m;
						btn1M.removeAttribute('onMouseOut');
						btn3M.removeAttribute('onMouseOut');
						btn6M.removeAttribute('onMouseOut');
					}

					zoomInBtn.removeAttribute('onMouseOver');
					zoomOutBtn.removeAttribute('onMouseOver');
					zoomInBtn.removeAttribute('onMouseOut');
					zoomOutBtn.removeAttribute('onMouseOut');
				}
			}
		};

		this.readQuotes = function (data) {
			return data;
		};

		this.main = function (symbol, quotes) {
			self.bindEvents();

			self.readQuotes(quotes);
			self.preLoadChart(symbol, quotes);
			self.loadChart(symbol, quotes);
			self.aftLoadChart(symbol, quotes);

			stxx.undisplayCrosshairs();
		};

	};

	return result;
});