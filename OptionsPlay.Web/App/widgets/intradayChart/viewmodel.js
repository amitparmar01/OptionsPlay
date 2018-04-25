define([
	'knockout',
	'dataContext',
	'modules/context',
	'highstock'
], function (ko, dataContext, context) {

    Highcharts.setOptions({
        global: {
            timezoneOffset: 8,
            useUTC: false
        },
        lang: {
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            loading: '加载中...',
            noData: '没有数据',
            resetZoom: '重置放大',
            resetZoomTitle: '1:1',
            shortMonths: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        }
    });

    /*
    ** 分时图使用了Highstock.js来绘制，分为上下两张Charts（价格、成交量）。
    ** X轴的显示范围应该是两个区间[9:30 - 11:30]和[13:00 - 15:00],但是Highchart无法连续显示2个不连续的区间，
    ** 所以我们需要对priceData、volumeData中处于[13:00 - 15:00]区间的数据进行人为的处理，具体处理过程如下：
    ** 1) 分时数据的X轴数据减去1.5个小时，保证了图形的连续
    ** 2) 将Chart中坐标轴[11:30 - 13:30]的标签值恢复到[13:00 - 15:00]
    ** 3) 同item2，将tooltip中显示的时间值进行恢复。
    */
    var IntradayChartVM = function () {
        var self = this;

        var today = new Date();
        self.startTimeOfMorning = new Date(Highcharts.dateFormat('%Y-%m-%d', today) + " 09:30").valueOf();
        self.closeTimeOfMorning = new Date(Highcharts.dateFormat('%Y-%m-%d', today) + " 11:30").valueOf();
        self.startTimeOfAfternoon = new Date(Highcharts.dateFormat('%Y-%m-%d', today) + " 13:01").valueOf();
        self.closeTimeOfAfternoon = new Date(Highcharts.dateFormat('%Y-%m-%d', today) + " 15:00").valueOf();

        self.priceData = [];
        self.volumeData = [];

        self.currentTime = null;

        self.oneAndHalfHour = 5400 * 1000;

        // 判断输入时间是否为股市时间
        self.isValidMarketTime = function (time) {
            return (self.isMarketTimeOfMorning(time) || self.isMarketTimeOfAfternoon(time));
        }

        // 判断输入时间是否为股市上午时间
        self.isMarketTimeOfMorning = function (time) {
            return (time >= self.startTimeOfMorning && time <= self.closeTimeOfMorning);
        }

        // 判断输入时间是否为股市下午时间
        self.isMarketTimeOfAfternoon = function (time) {
            return (time >= self.startTimeOfAfternoon && time <= self.closeTimeOfAfternoon);
        }

        self.adjustXAxisValue = function (time) {
            return time - self.oneAndHalfHour;
        };

        this.activate = function (settings) {
            self.stockCode = settings.stockCode;
            self.loadData();
        };

        this.loadData = function () {
            if (self.isValidMarketTime(new Date().valueOf()) || self.priceData.length <=0 ) {
                dataContext.stockQuotePerMin.get(ko.unwrap(self.stockCode)).done(function (datum) {
                    var data, time, i;
                    self.priceData = [];
                    self.volumeData = [];
                    for (i = 0; i < datum.length; i++) {
                        data = datum[i];
                        time = new Date(data.tradeDate).valueOf();
                        if (self.isValidMarketTime(time)) {
                            if (self.isMarketTimeOfAfternoon(time)) {
                                time = self.adjustXAxisValue(time);
                            }
                            self.priceData.push([time, data.lastPrice]);
                            self.volumeData.push([time, data.currentVolume]);
                        }
                    }

                    console.log("draw intradayChart");

                    self.closePriceData = [];
                    var previousClose;
                    if (typeof (data) !== 'undefined') {
                        previousClose = data.previousClose;
                    }
                    else
                    {
                        previousClose = 0;
                    }
                    self.closePriceData.push([self.startTimeOfMorning, previousClose]);
                    self.closePriceData.push([self.adjustXAxisValue(self.closeTimeOfAfternoon), previousClose]);

                    self.chart && self.chart.series[0].update({
                        data: self.priceData
                    });
                    self.chart && self.chart.series[1].update({
                        data: self.volumeData
                    });

                    self.chart && self.chart.series[2].update({
                        data: self.closePriceData
                    });
                })
            }
        };
        


        this.attached = function (element) {

            self.chart = new Highcharts.Chart({
                chart: {
                    renderTo: element,
                    events: {
                        load: function () {
                            self.loadData();
                            self.dataLoadInterval = setInterval(self.loadData, 60000);
                        }
                    }
                },

                title: {
                    text: ''
                },

                tooltip: {

                    formatter: function () {

                        var s = "";
                        
                        if ( typeof this.points != 'undefined' && this.points.length == 1) {
                            s = "昨日收盘价：" + this.y;
                        }
                        else
                        {
                            var newValue = this.x;
                            if (newValue > self.closeTimeOfMorning)
                                newValue += self.oneAndHalfHour;
                            s += '<b>' + Highcharts.dateFormat('%H:%M', newValue) + '</b>';
                            if (this.points[0])
                                s += '<br/> 价格：' + this.points[0].y;
                            if (this.points[1])
                                s += '<br/> 成交量：' + this.points[1].y;
                        }

                        return s;
                    },

                    shared: true
                },

                xAxis: [{
                    type: 'datetime',
                    min: self.startTimeOfMorning,
                    max: self.closeTimeOfAfternoon - self.oneAndHalfHour,
                    labels: {
                        formatter: function () {

                            var newValue = this.value;
                            if (newValue > self.closeTimeOfMorning)
                                newValue += self.oneAndHalfHour;

                            return Highcharts.dateFormat('%H:%M', newValue)
                        }
                    }
                }],

                yAxis: [{
                    labels: {
                        align: 'right',
                        x: -3
                    },
                    title: {
                        text: '价格'
                    },
                    height: '70%',
                    lineWidth: 1
                }, {
                    labels: {
                        align: 'right',
                        x: -3
                    },
                    title: {
                        text: '成交量'
                    },
                    top: '75%',
                    height: '25%',
                    offset: 0,
                    lineWidth: 1
                }],

                plotOptions: {
                    series: {
                        marker: {
                            enabled: false,
                            lineWidth: 1,
                            lineColor: null
                        }
                    },
                    line: {
                        lineWidth: 1
                    },
                    column: {
                        borderWidth: 1,
                        color: '#7CB5ED'
                    }
                },
                legend: {
                    enabled: false,

                },
                series: [{
                    name: '价格',
                    data: self.priceData,
                }, {
                    type: 'column',
                    name: '成交量',
                    data: self.volumeData,
                    yAxis: 1
                }, {
                    name: 'preivousClosePrice',
                    data: self.closePriceData,
                    color: '#7CB5ED',
                    lineWidth: 1,
                    dashStyle: 'dash'
                }],

                credits: {
                    enabled: false
                }
            });
        };

        this.detach = function () {
            clearInterval(self.dataLoadInterval);
        };
    }

    return IntradayChartVM;
});