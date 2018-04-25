define(['knockout', 'komapping', 'modules/formatting'], function (ko, mapping, formatting) {
	'use strict';
	function StandardDeviations(data) {

		var EXPIRY_KEY_FORMAT = 'yyyyMMdd';

		var self = this;

		this.stdDevs = [];
		this.stdDevsMap = {};
		this.updateModel = function (newData) {
			self.stdDevs = newData.map(function (stdDevsExpiry) {
				var date = new Date(stdDevsExpiry.dateAndNumberOfDaysUntil.date + formatting.CHINA_TIME_ZONE);
				stdDevsExpiry.dateAndNumberOfDaysUntil.date = date;
				stdDevsExpiry.dateAndNumberOfDaysUntil.noOfDaysToExpiry =
							Math.floor(stdDevsExpiry.dateAndNumberOfDaysUntil.totalNumberOfDaysUntilExpiry);
				var expiryKey = formatting.formatDate(date, EXPIRY_KEY_FORMAT);
				stdDevsExpiry.dateAndNumberOfDaysUntil.expiryKey = expiryKey;
				self.stdDevsMap[expiryKey] = stdDevsExpiry;
				return stdDevsExpiry;
			});
		};

		this.getStdDevsByExpiry = function (expiryDateOrKey) {
			var key = formatting.formatDate(expiryDateOrKey, EXPIRY_KEY_FORMAT);
			
			return self.stdDevsMap[key];
		};

		this.getStdDevsByNoOfDays = function (noOfDays) {
			noOfDays = parseInt(noOfDays);
			var result = null;
			self.stdDevs.some(function (item) {
				if (Math.abs(item.dateAndNumberOfDaysUntil.totalNumberOfDaysUntilExpiry - noOfDays) <= 2) {
					result = item;
					return true;
				}
				return false;
			});
			return result;
		};

		this.updateModel(data);
	}

	return StandardDeviations;
});
