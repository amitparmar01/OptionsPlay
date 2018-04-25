define([
	'knockout',
	'jquery',
	'kendo'
],
function (ko, $) {

	var HELP_MARKER_CLASS = 'help-marker';


	var Tooltip = function (selector, title, content) {
		var that = this;
		var delay = (Math.floor((Math.random() * 10) + 1) * 20).toFixed(0) + 'ms';

		this.selector = selector;
		this.title = title;
		this.content = content;
		this.instance = $('<div>')
				.addClass(HELP_MARKER_CLASS)
				.append($('<img src="~/../Content/images/helpFlag.png">'))
				.click(function () {
					return false;
				})
				.css('-o-animation-delay', delay)
				.css('-webkit-animation-delay', delay)
				.css('-moz-animation-delay', delay)
				.css('animation-delay', delay)
               
				.kendoTooltip({
					html: true,
					position: 'top',
					width: 180,
					content: that.content,
                    
				
				});
		this.append = function () {
			var placeholder = $(selector);
			var helpMarker = $(selector + ' .' + HELP_MARKER_CLASS);
			if (placeholder.length && (helpMarker.length === 0 || !helpMarker.is(':visible'))) {
				placeholder.css('position', 'relative').append(that.instance);
				if (selector.match(/support-anchor/i)) {
					placeholder.css('position', 'absolute');
				}
				return true;
			} else {
				return false;
			}
		};
		this.detach = function () {
			that.instance.detach();
		};
	};

	var Help = function (data) {
		var that = this;
		var tooltipsVisible = false;

		this.tooltips = ko.observableArray();

		this.currentTooltip = ko.observable(null);

		this.bindEvents = function (item) {
			item.instance.on('show.bs.popover', function () {
				var currentTooltip = that.currentTooltip();

				if (currentTooltip && currentTooltip !== item.instance) {
					currentTooltip.trigger('click');
				}

				that.currentTooltip(item.instance);
			});

			item.instance.on('hide.bs.popover', function () {
				var currentTooltip = that.currentTooltip();

				if (currentTooltip && currentTooltip === item.instance) {
					that.currentTooltip(null);
				}
			});
		};

		this.toggleMarkers = function () {
			$('#applicationHost').toggleClass('help-active');

			tooltipsVisible = !tooltipsVisible;

			if (tooltipsVisible) {
				ensureAllTolltipsAreVisible();
			} else {
				removeAllTooltips();
			}

			var current = that.currentTooltip();
			if (current) {
				current.trigger('click');
			}
		};
		
		this.addHelpTooltip = function (selector, title, content) {
			var tooltip = new Tooltip(selector, title, content);
			that.bindEvents(tooltip);
			that.tooltips.push(tooltip);
		};

		this.updateViewModel = function (newData) {
			ko.utils.arrayForEach(newData, function (item) {
				that.addHelpTooltip(item.selector, item.title, item.content);
			});
		};

		if (data) {
			this.updateViewModel(data);
		}

		function ensureAllTolltipsAreVisible() {
			ko.utils.arrayForEach(that.tooltips(), function (item) {
				item.append();
			});
		}

		function removeAllTooltips() {
			ko.utils.arrayForEach(that.tooltips(), function (item) {
				item.detach();
			});
		}

		function handleDomInserted(event) {
			var $target = $(event.target);
			if (tooltipsVisible && $target.is('div') && !$target.hasClass(HELP_MARKER_CLASS)) {
				ensureAllTolltipsAreVisible();
			}
		};
		
		// to fix bugs of tooltip pin not showing when html is dynamically generated
		document.addEventListener("animationstart", handleDomInserted, true); // standard + firefox
		document.addEventListener("MSAnimationStart", handleDomInserted, true); // IE
		document.addEventListener("webkitAnimationStart", handleDomInserted, true); // Chrome + Safari
	}; 

	var helpConfig = [

          //{
        //    selector: '#',
        //    title: '',
        //    content: ''
        //},

          {
            selector: '.flagLocationCarousel2',
            title: '',
            content: '输入您愿意承担风险的金额，OptionsPlay会调整每个策略的股数与合同数'
        },

        {
            selector: '.flagLocationCarousel1',
            title: '',
            content: '输入您想要投资的金额，OptionsPlay将会调整您能买到的股数和匹配相对应的策略'
        },
        {
            selector: '.flagLocation-strategiesSentences',
            title: '',
            content: '这里用于解释您使用的策略类型，所要承受的风险，和可能获得的收益'
        },

       


        {
            selector: '#whatifDetailsPane',
            title: '',
            content: '这里用于显示，当股票价格按照预期进行增长或是下跌，所带来的盈亏情况，并图示您的实际收益情况如何随着股票价格浮动'
        },


        {
            selector: '.optionsplay-score-round',
            title: '',
            content: 'OptionsPlay的评分是我们专业化指标，用以评估和权衡您使用的策略所要承受的风险和可能的收益。评分超过100说明潜在的风险太大，调整交易幅度或可调节评分'
        },


        {
            selector: '.modify-btn-help ',
            title: '',
            content: '点击这里改变您的股票和合同数量，行权价和到期日，让您能够个性化设计自己专属的策略'
        },


        {
            selector: '.trade-btn-help',
            title: '',
            content: '点击这里引导您进入股票交易界面'
        },

        {
            selector: '#sentimentBtnGroup',
            title: '',
            content: 'OptionsPlay会根据预期进行策略推荐,您可以自行选择查看相应的策略'
        },

        //{
        //    selector: '#supportAndResistance',
        //    title: '',
        //    content: '支撑线是当买入需求足够强烈,可以阻止价格进一步下跌时,股票的价格水平；压力线是当卖出需求足够强烈,可以阻止价格进一步上涨时,股票的价格水平。当股票交易在支撑线附近，同时OptionsPlay预期牛市，这将是很好的看涨交易机会'
        //},

        {
            selector: '#monthControl',
            title: '',
            content: '您可以选择1,3,6个月股票历史数据，可以放大缩小，也可以扩大图表进行查看'
        },

        {
            selector: '#techScore',
            title: '',
            content: '技术得分是数字化指标，用于短期、中期、长期，股票风险评估。分为10个等级，10级安全系数最高，1级最弱。1-3：弱，总体熊市；4-6：缺少活力，有趋弱的势头；7-10：强，总体牛市'
        },

            {
                selector: '#symbolInput',
                title: '',
                content: '输入任何一个上市公司的股票代码或者指数基金，OptionsPlay建议您选择基于我们分析后的安全策略。'
            },

           {
               selector: '#sentiment',
               title: '',
               content: '这是OptionsPlay对股票的展望，绿色箭头代表熊市，红色箭头代表牛市'
           },

          {
              selector: '#technicalRank',
              title: '',
              content: '技术得分是数字化指标，用于短期、中期、长期，股票风险评估。分为10个等级，10级安全系数最高，1级最弱。1-3：弱，总体熊市；4-6：缺少活力，有趋弱的势头；7-10：强，总体牛市'
          },
        {
            selector: '#companyName',
            title: '',
            content: '以下所有代号都是由OptionsPlay一个或多个扫描触发，产生不同的交易方式。竖线条代表着六个月的趋势，绿色代表熊市，红色代表牛市，黄色代表整盘'
        },
        {
            selector: '#sectorsDropdown',
            title: '',
            content: '所有可交易的特色行业都被罗列在以下列表，请选择过滤'
        },

    {
        selector: '#sentimentFilterButtons',
        title: '',
        content: '市场关闭后，OptionsPlay会运用专业的后台技术，扫描成千上万的股票和指数基金，分析出处于上升和下降趋势的股票'
    },
    {
        selector: '#marketCapFilterButtons',
        title: '',
        content: '交易方式可以通过市值的大小进行过滤。'
    },
	{
		selector: '#lookup',
		title: '',
		content: '输入您想查看得股票代码'
	}, {
		selector: '.chains-toolbox-strategy',
		title: '',
		content: '选择您想查看得交易策略，我们将自动为您呈现所有可能的该策略组合，您可以通过右边的参数调整组合。'
	}, {
		selector: '.chains-toolbox-option',
		title: 'dksal;kdl;sakd;s',
		content: '显示最接近标的物价格的实（虚）值期权或组合。'
	}];

	var help = new Help(helpConfig);

	return help;
});