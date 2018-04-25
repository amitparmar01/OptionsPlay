define(['knockout',
		'modules/context',
		'dataContext',
		//'modules/notifications',
		'modules/custom/chartIQSmall',
		'dataServices/models/supportAndResistanceModel'],
function (ko, context, dataContext, ChartIQSmall, SupportAndResistanceModel) {
    var ChartIq = function (currentQuote) {
        var self = this;

        this.quote = ko.observable(currentQuote);

        this.highlightS = function (data) {
            var chart = self.chart;
            chart.highlightSR(data.value, 'green');
        };

        this.highlightR = function (data) {
            var chart = self.chart;
            chart.highlightSR(data.value, 'red');
        };

        this.disableLevel = function () {
            var chart = self.chart;
            chart.disableSR();
        };

        this.selectedTradeIdea = context.selectedTradeIdea;

        this.technicalRank = ko.observable().extend({ nullValue: 'No Rank' });
        function updateTechnicalRank() {
            var currentTradeIdea = self.selectedTradeIdea();
            if (currentTradeIdea) {
                self.technicalRank(currentTradeIdea.technicalRank);
            }
        }
        context.selectedTradeIdea.subscribe(updateTechnicalRank);

        this.sentiment = ko.observable(null);
        // sentiment for chart
        this.sentimentCssClass = ko.computed(function () {
            var sentiment = self.sentiment();
            var result = sentiment
				? sentiment.toLowerCase()
				: '';
            return result;
        });

        securityCode = context.ulCode();

        this.supportAndResistance = new SupportAndResistanceModel();
        this.updateSupportAndResistanc = function (securityCode) {

            dataContext.quotation.get(securityCode).done(function (quote) {
                dataContext.signals.get(securityCode + "/5y").done(function (supportAndResistance) {
                    self.supportAndResistance.update(supportAndResistance, quote);
                });
            });
        }
        this.updateSupportAndResistanc(securityCode);
        context.ulCode.subscribe(this.updateSupportAndResistanc);

        this.chart = null;

        this.attached = function () {
            self.chart = new ChartIQSmall($('#powerhouseProHistoricalChart-chartContainer')[0], self.chartViewModel());
            updateHistoricalQuotes(context.ulCode());
        }

        this.chartViewModel = ko.observable();
        this.chartViewModel.subscribe(function (value) {
            if (self.chart) {
                self.chart.update(value);
            }
        });

        //context.isTradePanelVisible.subscribe(function () {
        //	if (self.chart) {
        //		setTimeout(self.chart.resizeChart, 50);
        //	}
        //});

        this.hasHistoricalData = ko.observable(true);
        this.noHistoricalDataNote = ko.observable('');

        function updateHistoricalQuotes(securityCode) {
            dataContext.historicalQuotes.get(securityCode, {
                period: '5y'
            }).done(function (result) {
                var quotes = result().filter(function (x) {
                    return x.matchQuantity > 0;
                });
                var res = [];
                quotes.forEach(function (quote, index) {
                    var datum = {};
                    datum['Adj_Close'] = index < quotes.length - 1 ? quotes[index + 1]['lastClosePrice'] : quote['closePrice'];
                    datum['Close'] = quote['closePrice'];
                    datum['Date'] = quote['tradeDate'].substring(0, 10);
                    datum['High'] = quote['highPrice'];
                    datum['Low'] = quote['lowPrice'];
                    datum['Open'] = quote['openPrice'] == 0 ? quote['closePrice'] : quote['openPrice'];
                    datum['Volume'] = quote['matchQuantity'];
                    res.push(datum);
                });

                self.chart.update({ historicalQuotes: quotes });
            }).always(function () {
                context.isWhyPanelLoading(false);
            });
        }

        context.ulCode.subscribe(updateHistoricalQuotes);

        this.updateViewModel = function (technicalRank, chartViewModel, newQuote) {
            if (chartViewModel.historicalQuotes == null || chartViewModel.historicalQuotes.length === 0) {
                var notificationText = 'Symbol "' + newQuote.symbol() + '" has no Historical Data';
                //notifications.info(notificationText, 'No Historical Data');

                self.hasHistoricalData(false);
                self.noHistoricalDataNote(notificationText);
            } else {
                self.hasHistoricalData(true);
            }

            self.sentiment(chartViewModel.sentiment);
            self.quote(newQuote);

            self.chartViewModel(chartViewModel);
            context.supportAndResistance(self.supportAndResistance);
            self.supportAndResistance.update(chartViewModel.supportAndResistance, newQuote);

            var selectedTradeIdea = self.selectedTradeIdea();
            if (selectedTradeIdea) {
                self.technicalRank(selectedTradeIdea.technicalRank);
            } else {
                self.technicalRank(technicalRank);
            }
        }

        // for full screen chart
        this.fullChart = ko.observable(false);
        this.fullChart.subscribe(function () {
            self.showStudyMenu(false);
            window.setTimeout(function () {
                self.chart.stxx.resizeChart();
            });
        });

        this.showStudyMenu = ko.observable(false);
        this.showStudyMenu.subscribe(function (newValue) {
            if (newValue) {
                self.showTypeMenu(false);
            }
        });

        this.openStudyDialog = function (obj, study) {
            self.showStudyMenu(false);
            if (study == 'Volume') {
                self.chart.createVolumePanel();
            }
            else if (study == 'Vol Underlay') {
                self.chart.toggleVolumeUnderlay();
            }
            else {
                self.chart.studyDialog(obj, study);
            }
        };

        this.popularStudyCols = [
			{
			    studyItems: [{ name: 'ATR', studyText: '真实波幅' }, { name: 'Bollinger Bands', studyText: '布林极限' }, { name: 'Chaikin MF', studyText: '佳庆资金流量指标' }, { name: 'CCI', studyText: '商品路径指标' }, { name: 'Directional', studyText: '定向运动系统指标' }, { name: 'Hist Vol', studyText: '历史波动指数' }, { name: 'Keltner', studyText: '肯特纳通道' }, { name: 'macd', studyText: '平滑异同平均' }, { name: 'Momentum', studyText: '动量摆动指标' }, { name: 'M Flow', studyText: '资金流量指标' }]
			},
			{
			    studyItems: [{ name: 'ma', studyText: '指数平均数指标' }, { name: 'On Bal Vol', studyText: '累积能量线' }, { name: 'PSAR', studyText: '抛物线指标' }, { name: 'Price ROC', studyText: '价格变动率指标' }, { name: 'rsi', studyText: '相对强弱指标' }, { name: 'stochastics', studyText: '随机动量指标' }, { name: 'TRIX', studyText: '三重指数平均线' }, { name: 'Volume', studyText: '成交量' }, { name: 'Williams %R', studyText: '威廉指标' }, { name: 'W Acc Dist', studyText: '威廉多空力度线' }]
			}
        ];

        this.techStudyCols = [
			{
			    studyItems: [{ name: 'Acc Swing', studyText: '振动升降指标' }, { name: 'Aroon', studyText: '阿隆指标' }, { name: 'Aroon Osc', studyText: '阿隆摆动指标' }, { name: 'COG', studyText: '利用中心法' }, { name: 'Chaikin Vol', studyText: '佳庆指标' }, { name: 'Chande Mtm', studyText: '钱德动量摆动指标' }, { name: 'Coppock', studyText: '估波指标' }, { name: 'EOM', studyText: '简易波动指标' }, { name: 'Ehler Fisher', studyText: '埃勒斯费舍尔变换' }, { name: 'Elder Force', studyText: '劲道指数' }, { name: 'Elder Ray', studyText: '艾达透视' }, { name: 'Fractal Chaos Bands', studyText: '混沌分形指标' }, { name: 'stochastics', studyText: '随机摆动' }]
			},
			{
			    studyItems: [{ name: 'Fractal Chaos', studyText: '混沌分形摆动指标' }, { name: 'High Low', studyText: '高低极限' }, { name: 'High-Low', studyText: '高减低' }, { name: 'HHV', studyText: '最高及高值' }, { name: 'Intraday Mtm', studyText: '日内动量指标' }, { name: 'Lin Fcst', studyText: '线性回归预测指标' }, { name: 'Lin Incpt', studyText: '线性回归插值指标' }, { name: 'Lin R2', studyText: '线性回归R2指标' }, { name: 'LR Slope', studyText: '线性回归预测指标' }, { name: 'LLV', studyText: '最低及低值' }, { name: 'Mass Idx', studyText: '梅斯线' }, { name: 'Med Price', studyText: '中间价格指标' }, { name: 'MA Env', studyText: '移动平均封装线' }]
			},
			{
			    studyItems: [{ name: 'Neg Vol', studyText: '负成交量' }, { name: 'Perf Idx', studyText: '成绩衡量指标' }, { name: 'Pos Vol', studyText: '正成交量' }, { name: 'Price Osc', studyText: '价格摆动指标' }, { name: 'Price Vol', studyText: '价量趋势指标' }, { name: 'Prime Number Bands', studyText: '质数指标' }, { name: 'Prime Number', studyText: '质数摆动指标' }, { name: 'QStick', studyText: 'Q棒指标' }, { name: 'Random Walk', studyText: '随机行走指标' }, { name: 'RAVI', studyText: '趋势横盘分别指标' }, { name: 'Schaff', studyText: '沙夫趋势周期' }, { name: 'STD Dev', studyText: '标准差' }, { name: 'Stch Mtm', studyText: '随机动量指标' }]
			},
			{
			    studyItems: [{ name: 'Swing', studyText: '振动升降指标' }, { name: 'Time Fcst', studyText: '时间序列预测法' }, { name: 'Trade Vol', studyText: '交易量指标' }, { name: 'True Range', studyText: '平均真实波幅' }, { name: 'Typical Price', studyText: '初始价格指标' }, { name: 'Ultimate', studyText: '终极指标' }, { name: 'VT HZ Filter', studyText: '十字过滤线' }, { name: 'Vol Underlay', studyText: '成交量（同界面）' }, { name: 'Vol Osc', studyText: '成交量摆动指标' }, { name: 'Vol ROC', studyText: '成交量摆动' }, { name: 'Weighted Close', studyText: '加权收盘价' }]
			}
        ];

        this.showTypeMenu = ko.observable(false);
        this.showTypeMenu.subscribe(function (newValue) {
            if (newValue) {
                self.showStudyMenu(false);
            }
        });

        this.setChartStyle = function (style) {
            self.showTypeMenu(false);
            self.chart.stxx.setChartType(style);
        };

        this.typeItems = [
			{ typeText: '蜡烛图', typeName: 'candle' },
			{ typeText: '条状图', typeName: 'bar' },
			{ typeText: '彩色条状图', typeName: 'colored_bar' },
			{ typeText: '直线图', typeName: 'line' }
        ];

        this.activeMonthButton = ko.observable(3);

        this.click1m = function () {
            if (self.chart) {
                self.chart.click1m();
            }
            self.activeMonthButton(1);
        };

        this.click3m = function () {
            if (self.chart) {
                self.chart.click3m();
            }
            self.activeMonthButton(3);
        };

        this.click6m = function () {
            if (self.chart) {
                self.chart.click6m();
            }
            self.activeMonthButton(6);
        };

        this.zoomIn = function () {
            if (self.chart) {
                self.chart.zoomIn();
            }
        };

        this.zoomOut = function () {
            if (self.chart) {
                self.chart.zoomOut();
            }
        };
    };

    return ChartIq;
});
