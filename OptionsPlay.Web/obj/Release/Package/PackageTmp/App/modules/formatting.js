define(['kendo'], function () {
	var notAvailableString = 'N/A';
	var INT_WITH_PLACEHOLDER_FORMAT = '# #';
	var DECIMAL_WITH_PLACEHOLDER_FORMAT = '# #.00';
	var CURRENCY_SIGN = '¥';
	var INT_CURRENCY_FORMAT = CURRENCY_SIGN + INT_WITH_PLACEHOLDER_FORMAT;
	var PERCENTAGE_FORMAT = '#,#.00\\%';
	var PERCENTAGE_SIGNED_FORMAT = '+' + PERCENTAGE_FORMAT + ';-' + PERCENTAGE_FORMAT +';0\\%';
	var DEFAULT_DATE_FORMAT = 'd';
	var DEFAULT_DATE_PARSE_FORMAT = 'yyyy-MM-ddTHH:mm:ss';
	var CHINA_TIME_ZONE = '+08:00';

	var formatFn = kendo.toString;
	
	// converts e.g. 19575.7857 → 1 9575.785,7
	function convertToNumberWithCommas(number) {
		number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return number;
	}

	// converts e.g. 19575.7857 → 1 9576
	function toIntString(num) {
		var number = parseInt(num);
		number = convertToNumberWithCommas(number);
		return number;
	}
	
	// converts e.g. 9575.7857 → 9,576.79
	function toFractionalString(num, numberOfFractionalDigits) {
		if (numberOfFractionalDigits == null) {
			numberOfFractionalDigits = 2;
		}
		var number = roundNumber(num, numberOfFractionalDigits).toFixed(numberOfFractionalDigits);
		number = convertToNumberWithCommas(number);
		return number;
	}

	// converts e.g. 9575.7857 → $9,576
	function toIntCurrency(num) {
		var sign = num < 0
			? '–'
			: '';
		var number = sign + CURRENCY_SIGN + toIntString(Math.abs(num));
		return number;
	}

	// converts e.g. 9575.7857 → $9,575.79
	function toFractionalCurrency(num, decimalPlace) {
		var sign = num < 0
			? '–'
			: '';
		var number = sign + CURRENCY_SIGN + toFractionalString(Math.abs(num), decimalPlace);
		return number;
	}

	function toSignedFractionalString(num, signed, numberOfFractionalDigits) {
		var sign = '';

		if (signed) {
			if (num > 0) {
				sign = '+';
			} else if (num < 0) {
				sign = '–';
			} else {
				sign = '';
			}
		}
		var number = sign + toFractionalString(Math.abs(num), numberOfFractionalDigits);
		return number;
	}
	// converts e.g. 75.7857 → +75.79%
	function toPercentage(num, signed, decimals) {
		var number = toSignedFractionalString(num, signed, decimals) + '%';
		return number;
	}

	function toPercentage100(num, signed, decimals) {
		var res = toPercentage(num * 100, signed, decimals);
		return res;
	}

	function toFormattedVolume(num) {
		var billion = 1000000000;
		var million = 1000000;
		var billionSign = "亿";
		var millionSign = "万";
		var result, doubleValue;

		if (num >= billion) {
			doubleValue = roundNumber(num / billion * 10, 1);
			doubleValue = (doubleValue);
			result = doubleValue + billionSign;
		} else if (num >= million) {
			doubleValue = roundNumber(num / million * 100, 1);
			doubleValue = (doubleValue);
			result = doubleValue + millionSign;
		} else {
			result = (num);
		}
		return result;
	}

	function roundNumber(number, digits) {
		if (digits == null) {
			digits = 2;
		}
		var multiple = Math.pow(10, digits);
		var roundedNum = Math.round(number * multiple) / multiple;
		return roundedNum;
	}

	//Number.prototype.aOrAn =
	function aOrAn(num) {
		num = roundNumber(num, 0);
		while (num > 999) {
			num = roundNumber(num / 1000, 0);
		}

		if (num == 8 || num == 11 || num == 18 || (num >= 80 && num < 90)) {
			return 'an';
		} else {
			return 'a';
		}
	};

	/**
	 * Formats Date object using @param format
	 * @see (@link http://docs.telerik.com/kendo-ui/getting-started/framework/globalization/dateformatting) kendo documentation for date formatting options 
	 * (@link http://docs.telerik.com/kendo-ui/api/framework/kendo)
	 */
	function formatDate(date, format) {
		var dateFormatted = kendo.toString(date, format || DEFAULT_DATE_FORMAT);
		return dateFormatted;
	};
	
	/**
	 * Formats Date object using @param format
	 * @see (@link http://docs.telerik.com/kendo-ui/getting-started/framework/globalization/dateformatting) kendo documentation for date formatting options 
	 * (@link http://docs.telerik.com/kendo-ui/api/framework/kendo)
	 */
	function parseDate(dateString, format) {
		return kendo.parseDate(dateString, format || DEFAULT_DATE_PARSE_FORMAT);
	}

	function getWeekNumber(date) {
		var dayDiff = 5 - date.getDay();
		var shiftedDate = new Date();
		shiftedDate.setDate(date.getDate() + dayDiff);
		var dayOfMonth = shiftedDate.getDate();
		var result = Math.ceil(dayOfMonth / 7);
		return result;
	}

	function formatDateWithWeekNumber(date, dateFormat) {
		var formattedDate = formatDate(date, dateFormat);
		var weekNumber = getWeekNumber(date);
		var weekNumberString = '';
		if ((weekNumber !== 3) && (weekNumber >= 1) && (weekNumber <= 5)) {
			weekNumberString = weekNumber.toString();
		}
		return formattedDate + weekNumberString;

	}

	function getDatePart(date) {
		if (date == null || typeof date.getMonth !== 'function') {
			return null;
		}
		return new Date(date.getFullYear(), date.getMonth(), date.getDate());
	}

	/**
	 * Compares date parts of dateTime objects.
	 * @returns 0 if dates are equal. 1 if first date is greater
	 */
	function compareOnlyDatePartFromDates(date1, date2) {
		var result = getDatePart(date1) - getDatePart(date2);
		return result;
	}

	function areDatesEqual(date1, date2) {
		var areEqual = compareOnlyDatePartFromDates(date1, date2) === 0;
		return areEqual;
	}

	function closeTo(num1, num2, tolerance) {
		var diff = num1 - num2;
		return Math.abs(diff) <= tolerance;
	}

	function capitaliseFirstLetter(string) {
		var result = string.charAt(0).toUpperCase() + string.slice(1);
		return result;
	}

	function customFormat(value, options) {
		var resultStr;
		var type = options.type;
		var signed = options.signed || false;
		var dateFormat = options.dateFormat || 'MMM dd yyyy';
		var decimalPlace = options.decimalPlace;

		if (typeof options === 'string') {
			type = options;
		}

		if (value == null) {
			return notAvailableString;
		}

		switch (type) {
			case 'currency':
				resultStr = toFractionalCurrency(value, decimalPlace);
				break;
			case 'percentage':
				resultStr = toPercentage(value, signed, decimalPlace);
				break;
			case 'percentage100':
				resultStr = toPercentage100(value, signed, decimalPlace);
				break;
			case 'volume':
				resultStr = toFormattedVolume(value);
				break;
			case 'date':
				resultStr = formatDate(value, dateFormat);
				break;
		    case 'fraction':
		        resultStr = toFractionalString(value);
		        break;
			default:
				if (typeof (value) === 'number') {
					if (value.toFixed(19) == 0) {
						value = 0;
					}
				}
				resultStr = formatFn(value, type);
				break;
		}
		return resultStr;
	}

	function daysFromNow(date) {
		// TODO: use centralized way to get current time
		if (!date) {
			return 0;
		}
		var now = new Date().getTime();
		var closeTime = new Date(date.getTime());
		closeTime.setHours(16);
		closeTime.setMinutes(0);
		if (closeTime.getDay() == 6)
			closeTime.setTime(closeTime.getTime() - 3600 * 24 * 1000);
		var diffMili = date.getTime() - now;
		var diff = diffMili / 1000 / 3600 / 24;
		diff = diff > 0 ? Math.ceil(diff) : Math.floor(diff);
		return diff;
	}

	var formatting =
	{
		toIntString: toIntString,
		toFractionalString: toFractionalString,
		toIntCurrency: toIntCurrency,
		toFractionalCurrency: toFractionalCurrency,
		toPercentage: toPercentage,
		toPercentage100: toPercentage100,
		aOrAn: aOrAn,
		toFormattedVolume: toFormattedVolume,
		roundNumber: roundNumber,
		formatDate: formatDate,
		customFormat: customFormat,
		parseDate: parseDate,
		CHINA_TIME_ZONE: CHINA_TIME_ZONE,
		daysFromNow: daysFromNow,
		formatDateWithWeekNumber: formatDateWithWeekNumber,
		sameDate: areDatesEqual,
		compareDates: compareOnlyDatePartFromDates,
		closeTo: closeTo,
		capitaliseFirstLetter: capitaliseFirstLetter,
		toSignedFractionalString: toSignedFractionalString
	};

	return formatting;

});