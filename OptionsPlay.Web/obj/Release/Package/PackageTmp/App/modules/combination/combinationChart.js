define(['knockout',
		'modules/formatting',
		'modules/combinationHelpers',
		'modules/combinationViewModel',
		'modules/localizer',
		'modules/enums',
		'modules/disposableViewModel',
		'highstock'],
function (ko, formatting, combinationHelpers, Combination, localizer, enums, DisposableViewModel) {

	var profitColor = 'red';
	var lossColor = 'green';
	var maxYAxis  = 0;

	var Quadrant = function (name, area) {
		this.filledArea = 0;
		this.name = name;
		this.area = area;
		this.isSuitable = true;
	}

	var CombinationChart = function (combination, noOfPoints) {
		var self = this;
		DisposableViewModel.call(this);
		this.combination = combination;
		this.stockPriceLowerBound = combination.stockPriceLowerBound;
		this.stockPriceHigherBound = combination.stockPriceHigherBound;
		this.stockLastPrice = combination.stockLastPrice;
		this.chartPriceRange = ko.observableArray([combination.stockPriceLowerBound(), combination.stockPriceHigherBound()]);
		this.chartPriceRangeReady = combination.chartPriceRangeReady;

		this.whatIfDateTime = ko.observable(new Date());
		this.whatIfVolatility = ko.observable(null);

		this.noOfPoints = ko.observable(noOfPoints || 200);
		this.terminalPayoffPoints = ko.observableArray([]);
		this.whatIfPayoffPoints = ko.observableArray([]);

	function evaluateTerminalPayoffPoints(whatIfDate) {
        //var interval = (self.stockPriceHigherBound() - self.stockPriceLowerBound()) / self.noOfPoints();
        var strikes = self.combination.strikes().slice(0);
        var midStrike = strikes[0];
        var highBound = self.stockPriceHigherBound();
        var lowBound = self.stockPriceLowerBound();

        var terminalPayoffPoints = [];
        var whatIfPayoffPoints = [];
        var expiryDate = self.combination.expiry();


        if(midStrike === undefined){
            var lowPayoff = self.combination.payoff(lowBound, expiryDate);
            var highPayoff = self.combination.payoff(highBound, expiryDate);
            var linearRate = (highPayoff - lowPayoff) / (highBound - lowBound);
            midStrike = lowBound - lowPayoff  / linearRate;
            var length = highBound - lowBound;
            if(Math.abs(midStrike-lowBound) > Math.abs(midStrike-highBound)){
            	highBound = midStrike + 0.5 * length;
            }else{
            	lowBound = midStrike - 0.5 * length;
            }
        }else{
            if(midStrike < lowBound){
            	lowBound = midStrike - (highBound - midStrike) * 0.6;
            	highBound = highBound + (highBound - midStrike) * 0.6;
            }else if(midStrike > highBound){
            	lowBound = lowBound - (midStrike - lowBound) * 0.6;
            	highBound = midStrike + (midStrike - lowBound) * 0.6;
            }
        }

        if(lowBound < 0){
        	lowBound = 0;
        }
        strikes.push(lowBound);
        strikes.push(highBound);
        
        strikes.sort(function (a, b) { return a - b; });
		
		var ypoints = [];

		for (var i = 1; i < strikes.length; i++) {
            var highSpot = strikes[i];
            var lowSpot = strikes[i - 1] || 0;
            var interval = (highSpot - lowSpot) / self.noOfPoints();
            var lowPayoff = self.combination.payoff(lowSpot, expiryDate);
            var highPayoff = self.combination.payoff(highSpot, expiryDate);
            var k = interval * (highPayoff - lowPayoff) / (highSpot - lowSpot);
            var j = 0, x;
            while ((x = lowSpot + interval * j) < highSpot) {
                            var y = lowPayoff + k * j++;
                            terminalPayoffPoints.push([x, y]);
                            whatIfPayoffPoints.push([x, self.combination.payoff(x, self.whatIfDateTime(), self.whatIfVolatility())]);
            }

            ypoints.push(self.combination.payoff(highSpot, self.whatIfDateTime(), self.whatIfVolatility()));

            terminalPayoffPoints.push([highSpot, highPayoff]);
            whatIfPayoffPoints.push([highSpot, self.combination.payoff(highSpot, self.whatIfDateTime(), self.whatIfVolatility())]);
        }

        ypoints.sort(function (a, b) { return Math.abs(a) - Math.abs(b); });
        // If the maxYaxis is 0 set default to 100
		maxYAxis = Math.abs(ypoints[ypoints.length-1]) * 1.5 || 100;

        if (self.combination.expiries().length > 1) {
            terminalPayoffPoints = whatIfPayoffPoints;
            whatIfPayoffPoints = [];
        }
        self.terminalPayoffPoints(terminalPayoffPoints);
        self.whatIfPayoffPoints(whatIfPayoffPoints);
	}


		function getFreeQuadrants() {
			var SUITABLE_PERCENTAGE_HEIGHT = 0.3;

			var chart = self.chart;
			if (!chart || !chart.series || !chart.series[0]) {
				return null;
			}

			var yAxisPosition = self.stockLastPrice.peek();

			var xAxis = chart.axes[0];
			var yAxis = chart.axes[1];
			var xLeftQuadrantLength = yAxisPosition - xAxis.min;
			var xRightQuadrantLength = xAxis.max - yAxisPosition;

			var topLeftQuadrantArea = Math.abs(xLeftQuadrantLength * yAxis.max);
			var topRightQuadrantArea = Math.abs(xRightQuadrantLength * yAxis.max);
			var bottomRightQuadrantArea = Math.abs(xRightQuadrantLength * yAxis.min);
			var bottomLeftQuadrantArea = Math.abs(xLeftQuadrantLength * yAxis.min);

			var quadrants = [
				new Quadrant(enums.Quadrant.TOP_LEFT, topLeftQuadrantArea), new Quadrant(enums.Quadrant.TOP_RIGHT, topRightQuadrantArea),
				new Quadrant(enums.Quadrant.BOTTOM_LEFT, bottomLeftQuadrantArea), new Quadrant(enums.Quadrant.BOTTOM_RIGHT, bottomRightQuadrantArea)
			];

			var plPoints = chart.series[0].points;
			if (plPoints.length < 1) {
				return null;
			}

			function getQuadrantByPoint(point) {
				if (point.y > 0) {
					return point.x < yAxisPosition ? quadrants[0] : quadrants[1];
				} else {
					return point.x < yAxisPosition ? quadrants[2] : quadrants[3];
				}
			}

			// calculate filled areas of all quadrants
			for (var i = 0; i < plPoints.length - 1; i++) {
				var currPoint = plPoints[i];
				var nextPoint = plPoints[i + 1];

				var width = Math.abs(nextPoint.x - currPoint.x);
				var middleY = (currPoint.y + nextPoint.y) / 2;
				var height = Math.abs(middleY);
				var ds = width * height;

				var quadrant = getQuadrantByPoint(currPoint);
				quadrant.filledArea += ds;
			}

			var totalYAxisLength = Math.abs(yAxis.max - yAxis.min);
			var percentageYTop = Math.abs(yAxis.max / totalYAxisLength);

			// check if top and bottom areas has enough space
			if (percentageYTop < SUITABLE_PERCENTAGE_HEIGHT) {
				quadrants[0].isSuitable = quadrants[1].isSuitable = false;
			} else if (percentageYTop > 1 - SUITABLE_PERCENTAGE_HEIGHT) {
				quadrants[2].isSuitable = quadrants[3].isSuitable = false;
			}

			function checkLeftRightQuadrantsPoint(point, quadrantTopIndex, quadrantBottomIndex) {
				var pointPercent = Math.abs((yAxis.max - point.y) / totalYAxisLength);
				if (pointPercent < SUITABLE_PERCENTAGE_HEIGHT) {
					quadrants[quadrantTopIndex].isSuitable = false;
				}
				if (1 - pointPercent < SUITABLE_PERCENTAGE_HEIGHT) {
					quadrants[quadrantBottomIndex].isSuitable = false;
				}
			}

			// check if first point obscures top left or bottom left area
			checkLeftRightQuadrantsPoint(plPoints[0], 0, 2);
			// check if last point obscures top right or bottom right area
			checkLeftRightQuadrantsPoint(plPoints[plPoints.length - 1], 1, 3);

			var suitableQuadrants = quadrants.filter(function (q) {
				return q.isSuitable;
			});
			return suitableQuadrants;
		}

		this.freeQuadrants = ko.observableArray();
		var suitableQuadrantName = ko.observable();
		this.freeChosenQuadrandName = this.computed({
			read: function () {
				var suitable = suitableQuadrantName() || getSuitableQuadrant();
				return suitable;
			},
			write: function (value) {
				var isSuitable = self.freeQuadrants().some(function (q) {
					return q.name === value;
				});
				if (isSuitable) {
					suitableQuadrantName(value);
				} else {
					suitableQuadrantName(getSuitableQuadrant());
				}
			}
		});

		function getSuitableQuadrant() {
			var suitableQuadrants = self.freeQuadrants();

			// select quadrants with minimal filled area
			var minArea = Math.min.apply(Math, suitableQuadrants.map(function (q) {
				return q.filledArea;
			}));
			var minAreaElements = suitableQuadrants.filter(function (q) {
				return q.filledArea === minArea;
			});

			// select quadrant with minimal filled area and maximal total area;
			var chosen = minAreaElements[0];
			for (var i = 1; i < minAreaElements.length; i++) {
				if (minAreaElements[i].area > chosen.area) {
					chosen = minAreaElements[i];
				}
			}
			return chosen && chosen.name;
		}

		this.chartOptions = ko.computed(function () {
			var terminalPLs = self.terminalPayoffPoints();
			var whatIfPLs = self.whatIfPayoffPoints();
			var underlyingLast = self.combination.stockLastPrice();
			var lowest = self.stockPriceLowerBound();
			var highest = self.stockPriceHigherBound();
			var lower = self.chartPriceRange()[0];
			var higher = self.chartPriceRange()[1];
			var width = highest - lowest,
				lowerStop = lower - lowest,
				higherStop = higher - lowest;
			// var profitFillColor = {
			// 	linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
			// 	stops: [
			// 		[0, 'rgba(200, 200, 200, 0)'],
			// 		[lowerStop, 'rgba(200, 200, 200, 50)'],
			// 		[lowerStop, profitColor],
			// 		[higherStop, profitColor],
			// 		[higherStop, 'rgba(200, 200, 200, 50)'],
			// 		[1, 'rgba(200, 200, 200, 0)']
			// 	]
			// };
			// var lossFillColor = {
			// 	linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
			// 	stops: [
			// 		[0, 'rgba(200, 200, 200, 0)'],
			// 		[lowerStop, 'rgba(200, 200, 200, 50)'],
			// 		[lowerStop, lossColor],
			// 		[higherStop, lossColor],
			// 		[higherStop, 'rgba(200, 200, 200, 50)'],
			// 		[1, 'rgba(200, 200, 200, 0)']
			// 	]
			// };

			var profitFillColor = profitColor;
			var lossFillColor = lossColor;

			return {
				chart: {
					alignTicks: false,
					spacingLeft: 5,
					spacingRight: 5,
					spacingTop: 10,
					spacingBottom: 5,
					zoomType: 'x',
					animation: false,
					borderWidth: 0,
					resetZoomButton: {
						relativeTo: 'chart'
					}
				},
				plotOptions: {
					area: {
						marker: {
							enabled: false
						},
						shadow: false,
						states: {
							hover: {
								lineWidth: 2
							}
						},
						threshold: 0
					},
					line: {
						shadow: false
					}
				},
				title: {
					text: ""
				},
				legend: {
					enabled: false
				},
				xAxis: [
					{
						plotLines: [{
							color: self.combination.payoff(underlyingLast) > 0 ? profitColor : lossColor,
							width: 1,
							value: underlyingLast
						}],
						labels: {
							enabled: true
						}
					}
				],
				yAxis: [{
						title: {
							text: null
						},
						labels: {
							align: 'left',
							enabled: false,
							formatter: function () {
								return formatting.toFractionalString(this.value);
							},
							x: 0,
							y: -2
						},
						showFirstLabel: true,
						max: maxYAxis,
						min: -maxYAxis,
						plotLines: [
							{
								color: '#000000',
								width: 2,
								value: 0,
								zIndex: 1
							}
						]
					}
				],
				tooltip: {
					crosshairs: true,
					enabled: true,
					formatter: function () {
						var s = localizer.localize('strategies.underlyingPrice') + ': <b>' + formatting.toFractionalCurrency(this.x) + '</b><br>';
						s += localizer.localize('strategies.terminalPL') + formatting.toFractionalCurrency(this.points[0].y) + "<br>";
						if (this.points[1]) {
							s += localizer.localize('strategies.whatIfPL') + formatting.toFractionalCurrency(this.points[1].y) + "<br>";
						}
						return s;
					},
					shared: true
				},
				series: [{
					type: 'area',
					name: 'Terminal PL',
					data: terminalPLs,
					zIndex: 50,
					marker: {
						enabled: false,
						states: {
							hover: {
								enabled: false
							}
						}
					},
					lineColor: '#0033CC',
					lineWidth: 1,
					showInLegend: false,
					fillColor: profitFillColor,
					negativeFillColor: lossFillColor,
					animation: false
				}, {
					type: 'line',
					name: 'What-If PL',
					data: whatIfPLs,
					zIndex: 95,
					marker: {
						enabled: false
					},
					lineColor: 'rgb(40, 70, 120)',
					lineWidth: 1.5,
					showInLegend: false,
					animation: false
				}],
				credits: {
					enabled: false
				}
			};
		}).extend({ rateLimit: 0 });

		this.destroyChart = function () {
			if (self.chart) {
				if (typeof (self.chart.destroy) === 'function') {
					self.chart.destroy();
				}
				self.chart = null;
			}
		};

		this.destroy = function () {
			self.destroyChart();
			self.chartOptions.dispose();
		};

		var oldDispose = this.dispose;
		this.dispose = function () {
			self.destroy();
			self.chartPriceRange = null;
			oldDispose();
		};

		this.renderChartTo = function (element) {
			evaluateTerminalPayoffPoints();
			var chartOptions = self.chartOptions();
			element = element || self.element;
			chartOptions.chart.renderTo = element;
			self.destroyChart();
			self.chart = new Highcharts.Chart(chartOptions);
			self.element = element;
			self.freeQuadrants(getFreeQuadrants());
		};

		this.updateChart = function () {
			if (self.chart) {
				var t = Date.now();
				evaluateTerminalPayoffPoints();
				//console.log('update data points: ' + (Date.now() - t));
				self.chartOptions().series.forEach(function (seriesOptions, i) {
					self.chart.series[i].update(seriesOptions, false, false, false);
				});
				self.chart.redraw();
				self.freeQuadrants(getFreeQuadrants());
				//console.log('update chart: ' + (Date.now() - t));
			}
		};

	};

	return {
	    createChartViewModel: function(combination, noOfPoints){
	        var chart = new CombinationChart(combination, noOfPoints);
	        return chart;
	    },
	    createChartViewModelExpanded: function (combination, noOfPoints) {
	        var chart = new CombinationChart(combination, noOfPoints);
	        if (combination.chartVM) {
	            chart.chartPriceRange = combination.chartVM.chartPriceRange;
	        }
	        chart.showLabels = true;
	        chart.enableTooltips = true;
	        return chart;
	    }
	};

});