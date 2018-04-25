define(function () {

	/*Pure JS helper methods should be placed here*/
	'use strict';

	var getValue = function (obj, path) {
		var indexes = path.split('.');
		var parentObj = obj;
		var childObj = undefined;
		for (var i = 0; i < indexes.length; i++) {
			if (parentObj == null) {
				return null;
			}
			childObj = parentObj[indexes[i]];
			parentObj = childObj;
		}
		return childObj;
	}

	var self = {
		getValue: getValue
	};

	self.uniqueArray = function (data) {
		data = data || [];
		var a = {}, i,
			len = data.length;
		for (i = 0; i < len; i++) {
			var v = data[i];
			if (typeof (a[v]) === 'undefined') {
				a[v] = v;
			}
		}
		data.length = 0;
		for (i in a) {
			data[data.length] = a[i];
		}
		return data;
	};

	self.getParameterFromHash = function (parameterName) {
		var regExp = new RegExp('#.*[?&]?' + parameterName + '=([^&]+)(&|$)');
		var match = location.hash.match(regExp);
		var parameterValue = match
			? match[1]
			: null;
		return parameterValue;
	}

	self.partial = function (fn /*, args...*/) {
		var slice = Array.prototype.slice;
		// Convert arguments object to an array, removing the first argument.
		var args = slice.call(arguments, 1);
		return function () {
			// Invoke the originally-specified function, passing in all originally-
			// specified arguments, followed by any just-specified arguments.
			return fn.apply(this, args.concat(slice.call(arguments, 0)));
		};
	}

	self.partialRight = function (fn /*, args...*/) {
		var slice = Array.prototype.slice;
		// Convert arguments object to an array, removing the first argument.
		var args = slice.call(arguments, 1);
		return function () {
			// Invoke the originally-specified function, passing in all originally-
			// specified arguments, followed by any just-specified arguments.
			return fn.apply(this, slice.call(arguments, 0).concat(args));
		};
	}

	self.removeNullOrEmpty = function (data) {
		data = data || [];
		var result = data.map(function (p) {
			return p && p.trim();
		}).filter(function (p) {
			return !!p;
		});
		return result;
	}

	self.extend = function (Child, Parent) {
		Child.prototype = Object.create(Parent.prototype);
		Child.prototype.constructor = Child;
		Child.superclass = Parent.prototype;
	}

	return self;
});