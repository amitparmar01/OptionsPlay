define(['knockout',
		'jquery'],
function (ko, $) {

	window.ko = ko;

	var PrimitiveTypes = { 'boolean': true, 'number': true, 'string': true, 'function': true, 'undefined': true };

	// alter knockout built-in equalityComparer to adapter more complex object comparasion.
	ko.observable.fn.equalityComparer = function (a, b) {
		if (typeof a in PrimitiveTypes || typeof b in PrimitiveTypes || a === null || b == null) {
			return a === b;
		} else if ($.isArray(a) && $.isArray(b)) {
			if (a.length != b.length) {
				return false;
			} else {
				return a.every(function (x, i) {
					return x === b[i];
				});
			}
		} else if (a.valueOf && b.valueOf) {
			return a.valueOf() === b.valueOf();
		} else {
			return false;
		}
	};

	/**
	* Extender to validate input. Only allowed value will be written.
	* Examples: 
	*	ko.observable().extend({allows: testFunc});
	*	ko.observable().extend({allows: [option1, option2, ...]});
	* Acceptable options:
	*	testFunc: function to test the input and returns valid or not.
	*	optionsArray: allowed options list.
	*/
	ko.extenders.allows = function (target, testFuncOrOptions) {
		var result = ko.computed({
			read: target,
			write: function (newValue) {
				var allowed = true;
				if (typeof(testFuncOrOptions) === 'function') {
					allowed = testFuncOrOptions(newValue);
				} else if ($.isArray(testFuncOrOptions)) {
					allowed = testFuncOrOptions.some(function (item) {
						return item === newValue;
					});
				}

				var current = target();

				if (allowed && newValue !== current) {
					target(newValue);
				} else if (newValue !== current) {
					target.notifySubscribers(current);
				}
			}
		}).extend({ notify: 'always' });;

		result(target());

		return result;
	};

	ko.extenders.shouldTrim = function (target) {
		var result = ko.computed({
			read: target,
			write: function (newValue) {

				var current = target(),
					valueToWrite = newValue.trim();

				if (valueToWrite !== current) {
					target(valueToWrite);
				}
			}
		});

		result(target());

		return result;
	};

});