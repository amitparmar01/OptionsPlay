define(['jquery', 'knockout', 'modules/formatting'], function ($, ko, formatting) {

	ko.extenders.customFormat = function (target, options) {
		var positive = options.positive || false;
		var writable = options.writable || false;
		var elementBound = options.element || undefined;

		var result = ko.computed({
			read: function () {
				return formatting.customFormat(target(), options);
			},
			// todo: not sure if we need writing ability. 
			write: (writable ? function (newVal) {
				var current = target(),
					currentResult = result();
				var num = isNaN(newVal) && isFinite(newVal)
					? parseFloat(newVal.replace(/[^0-9.-–]/g, ''))
					: newVal;
				if (isNaN(num)) {
					num = current;
				} else if (num < 0 && positive) {
					num = 0;
				}
				if (num !== current) {
					target(num);
				} else if (newVal !== currentResult) {
					target.notifySubscribers();
					result.notifySubscribers();
				}
			} : null),
			disposeWhenNodeIsRemoved: elementBound
		});
		return result;
	};

	ko.extenders.characterCase = function (target, charCase) {
		//create a writable computed observable to intercept writes to our observable
		var result = ko.computed({
			read: target,  //always return the original observables value
			write: function (newValue) {
				var current = target();

				var valueToWrite = null;
				if (newValue) {
					newValue = newValue.trim();
					switch (charCase) {
						case 'upper':
							valueToWrite = newValue.toUpperCase();
							break;
						case 'lower':
							valueToWrite = newValue.toLowerCase();
							break;
						default:
							throw "invalid characters' case specified";
					}
				}

				//only write if it changed
				if (valueToWrite !== current) {
					target(valueToWrite);
				} else {
					//if the uppercase value is the same, but a different value was written, force a notification for the current field
					if (newValue !== current) {
						target.notifySubscribers(valueToWrite);
					}
				}
			}
		});
		result(target());
		return result;
	};

	ko.extenders.numberMinMax = function (target, options) {
		var min = options.min, max = options.max;

		//create a writable computed observable to intercept writes to our observable
		var result = ko.computed({
			read: target,  //always return the original observables value
			write: function (newValue) {
				var current = target(),
					newValueAsNum = isNaN(newValue) ? 0 : parseFloat(+newValue);
				var valueToWrite = newValueAsNum;
				if (min && newValueAsNum < min) {
					valueToWrite = min;
				}
				if (max && newValueAsNum > max) {
					valueToWrite = max;
				}
				//only write if it changed
				if (valueToWrite !== current) {
					target(valueToWrite);
				} else {
					//if the uppercase value is the same, but a different value was written, force a notification for the current field
					if (newValue !== current) {
						target.notifySubscribers(valueToWrite);
					}
				}
			}
		});
		result(target());
		return result;
	};

	ko.extenders.numberRounded = function (target, options) {
		var decimals = options;

		var result = ko.computed({
			read: function () {
				return formatting.roundNumber(target(), decimals);
			},
			write: function (newValue) {
				var current = formatting.roundNumber(target(), decimals),
					newValueAsNum = isNaN(newValue) ? 0 : parseFloat(+newValue);

				var valueToWrite = formatting.roundNumber(newValueAsNum, decimals);

				if (valueToWrite !== current) {
					target(valueToWrite);
				}
			}
		});
		result(target());
		return result;
	};

	ko.extenders.nullValue = function (target, nullValue) {
		var result = ko.computed({
			read: target,
			write: function (newValue) {
				var current = target();
				var valueToWrite = !newValue ? nullValue : newValue;
				if (valueToWrite !== current) {
					target(valueToWrite);
				}
			}
		});

		result(target());
		return result;
	};

	ko.extendedComputed = function (evaluatorOrOptions, target, options, extOptions) {
		if (evaluatorOrOptions == null) {
			throw new Error('evaluator function must be specified');
		}
		options = options || {};

		var extensionTarget = typeof evaluatorOrOptions == 'object' ? evaluatorOrOptions : options;
		$.extend(extensionTarget, extOptions);
		return ko.computed(evaluatorOrOptions, target, options);
	}

	ko.deferredComputed = function (evaluatorOrOptions, target, options) {
		return ko.extendedComputed(evaluatorOrOptions, target, options, {
			deferEvaluation: true
		});
	};

});