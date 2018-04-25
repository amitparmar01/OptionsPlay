//STXStudies.calculateSyrahSentiments = function (stx, sd) {
//	STXStudies.passToModulus(stx, sd);
//	for (var i = 0; i < stx.chart.dataSet.length; i++) {
//		var d = stx.chart.dataSet[i].Date;
//		//var sent = ds.getSyrahSentiment(stx.chart.symbol).sentiments;
//		if (sent[d]) {
//			stx.chart.dataSet[i]['SyrahSentimentLongTerm'] = sent[d]['SyrahSentimentLongTerm'];
//			stx.chart.dataSet[i]['SyrahSentimentShortTerm'] = sent[d]['SyrahSentimentShortTerm'];
//		}
//	}
//};

// Centered will center the histogram on the panel, otherwise the histogram is centered on the zero axis
STXStudies.createSyrahSentiments = function (stx, sd, quotes) {
	var panel = stx.panels[sd.name];

	var myWidth = stx.layout.candleWidth - 2;

	if (myWidth < 2) {
		myWidth = 1;
	}

	panel.height = panel.bottom - panel.top;

	var y = panel.top + panel.height / 2;
	
	//Bearish (Overextended) = -4
	//Bearish  = -3
	//Bearish  = -2
	//Neutral  = -1
	//Mildly Bearish = 0
	//Mildly Bullish = 1
	//Neutral  = 2
	//Bullish  =3
	//Bullish  = 4
	//Bearish (Overextended) = 5
	var panelBearish = sd.outputs['Bearish'];
	var panelBullish = sd.outputs['Bullish'];
	var panelNeutral = sd.outputs['Neutral'];
	var bearish = panelBearish.replace('rgb', 'rgba').replace(')', ', 1)');
	var shBearish = panelBearish.replace('rgb', 'rgba').replace(')', ', 0.8)');
	var neutral = panelNeutral.replace('rgb', 'rgba').replace(')', ', 1)');
	var midBearish = panelBearish.replace('rgb', 'rgba').replace(')', ', 0.5)');
	var midBullish = panelBullish.replace('rgb', 'rgba').replace(')', ', 0.5)');
	var shBullish = panelBullish.replace('rgb', 'rgba').replace(')', ', 0.8)');
	var	bullish = panelBullish.replace('rgb', 'rgba').replace(')', ', 1)');

	var colors = [bearish, bearish, shBearish, neutral, midBearish, midBullish, neutral, shBullish, bullish, bearish];

	function drawSentimentBox(x0, y0, x1, y1, fillStyle) {
		stx.chart.context.fillStyle = fillStyle;
		stx.chart.context.fillRect(x0, y0, x1 - x0, y1 - y0);
	}

	function drawSentimentValue(value, yMainOffset, yBorderOffset, x0, x1) {
		var color = colors[value + 4];
		var yForThisValue = value == null ? y : y + yMainOffset;
		drawSentimentBox(x0, y + yBorderOffset, x1, yForThisValue + yBorderOffset, color);
	}

	for (var i = 0; i < quotes.length; i++) {
		if (quotes[i] == null) {
			continue;
		}

		var x0 = stx.computePosition(i, 1);
		var x1 = x0 + myWidth;

		drawSentimentValue(quotes[i].SyrahSentimentShortTerm, -panel.height / 4, 0, x0, x1);
		drawSentimentValue(quotes[i].SyrahSentimentLongTerm, panel.height / 4, 2, x0, x1);
	}

	var font = stx.chart.context.font.split(' ')[1];
	stx.chart.context.font = '11px ' + font;
	stx.chart.context.lineWidth = 0.5;
	stx.chart.context.strokeText('1m', stx.computePosition(quotes.length, 1), y - 5);
	stx.chart.context.strokeText('6m', stx.computePosition(quotes.length, 1), y + 5);
	stx.chart.context.globalAlpha = 1;
};

STXStudies.studyLibrary['Syrah Sentiments'] = {
	calculateFN: STXStudies.calculateSyrahSentiments,
	seriesFN: STXStudies.createSyrahSentiments,
	inputs: {},
	outputs: { "Bullish": "#00A94F", "Bearish": "#C60651", "Neutral": "#0068B3" }
};

STXChart.prototype.append('doDisplayCrosshairs', function () {
	document.body.style.cursor = 'default';
});
