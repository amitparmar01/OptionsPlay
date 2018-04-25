define(function () {
	/*2d canvass context helper functions*/

	/**
	* @points is a plain array object with following structure [x0, y0, x1, y1...]
	*/
	function drawFilledSegment(context, points) {
		context.beginPath();
		context.moveTo(points[0], points[1]);
		for (var i = 2; i < points.length; i += 2) {
			context.lineTo(points[i], points[i + 1]);
		}
		context.fill();
		context.closePath();
	}

	function dashedLine(context, x1, y1, x2, y2, dashLen) {
		if (dashLen == undefined) {
			dashLen = 2;
		}

		context.beginPath();
		context.moveTo(x1, y1);

		var dX = x2 - x1;
		var dY = y2 - y1;
		var dashes = Math.floor(Math.sqrt(dX * dX + dY * dY) / dashLen);
		var dashX = dX / dashes;
		var dashY = dY / dashes;

		var q = 0;
		while (q++ < dashes) {
			x1 += dashX;
			y1 += dashY;
			context[q % 2 == 0 ? 'moveTo' : 'lineTo'](x1, y1);
		}
		context[q % 2 == 0 ? 'moveTo' : 'lineTo'](x2, y2);

		context.stroke();
		context.closePath();
	}

	function drawArrow(context, basePointX, basePointY, isUp, unit) {
		unit = (isUp ? 1 : -1) * unit;

		function drawArrowContour() {
			context.moveTo(basePointX, basePointY + unit * 2);
			context.lineTo(basePointX - unit * 2, basePointY + unit * 5);
			context.lineTo(basePointX - unit * 0.6, basePointY + unit * 5);
			context.lineTo(basePointX - unit * 0.6, basePointY + unit * 9);
			context.lineTo(basePointX + unit * 0.6, basePointY + unit * 9);
			context.lineTo(basePointX + unit * 0.6, basePointY + unit * 5);
			context.lineTo(basePointX + unit * 2, basePointY + unit * 5);
			context.lineTo(basePointX, basePointY + unit * 2);
		}

		context.beginPath();
		drawArrowContour();
		context.fill();
		context.closePath();

		context.strokeStyle = 'rgba(0,0,0,0.8)';
		context.lineWidth = 1;
		context.beginPath();
		drawArrowContour();
		context.stroke();
		context.closePath();
	}

	function drawHorisontalLine(context, y, width) {
		context.beginPath();
		context.moveTo(0, y);
		context.lineTo(width, y);
		context.stroke();
		context.closePath();
	}
	/*___________________________________*/

	var result = {
		drawHorisontalLine: drawHorisontalLine,
		drawArrow: drawArrow,
		dashedLine: dashedLine,
		drawFilledSegment: drawFilledSegment,
	};

	return result;
});