define(['knockout', 'jquery'],
function (ko, $) {
	'use strict';

	/**
	 * Just a shorthand for data-bind="attr: {'href': value}"
	 */
	ko.bindingHandlers.href = {
		update: function (element, valueAccessor) {
			ko.bindingHandlers.attr.update(element, function () {
				return {
					href: valueAccessor()
				};
			});
		}
	};

	/**
	 * Toggles (inverts) the value of boolean observable by left mouse click.
	 */
	ko.bindingHandlers.toggle = {
		init: function (element, valueAccessor) {
			var value = valueAccessor();
			ko.applyBindingsToNode(element, {
				click: function () {
					value(!value());
				}
			});
		}
	};

	ko.bindingHandlers.grouping = {
		init: function (element, valueAccessor) {
			var value = valueAccessor();
			var separator = value.separator || '-';

			$(element).keyup(function () {
				$(this).val(function (i, v) {
					v = v.replace(/[^\d]/g, '').match(/.{1,4}/g);
					return v ? v.join(separator) : '';
				});
			});
		}
	};

	ko.bindingHandlers.hoverTargetId = {
		init: function (element, valueAccessor) {

			function showOrHideElement(method) {
				$(element)[method]('slide', { direction: 'up' }, 100);
			}

			var hideElement = showOrHideElement.bind(null, 'hide');
			var showElement = showOrHideElement.bind(null, 'show');
			var $hoverTarget = $('#' + ko.utils.unwrapObservable(valueAccessor()));
			ko.utils.registerEventHandler($hoverTarget, 'mouseover', showElement);
			ko.utils.registerEventHandler($hoverTarget, 'mouseleave', hideElement);
			hideElement();
		}
	};

	/**
	 * Fixes issue with knockout value binding if SELECT options are generated dynamically
	 */
	ko.bindingHandlers.foreachOptions = {
		init: function (element, valueAccessor, allBindings) {
			var value = valueAccessor();
			var valueBinding = allBindings().value;
			function afterForeach() {
				window.setTimeout(function () {
					valueBinding.valueHasMutated();
				});
			}
			if (value.subscribe && valueBinding && valueBinding.valueHasMutated) {
				var subscription = value.subscribe(afterForeach);
				ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
					subscription.dispose();
				});
			} else {
				afterForeach();
			}
			return ko.bindingHandlers.foreach.init.apply(this, arguments);
		},
		update: function () {
			return ko.bindingHandlers.foreach.update.apply(this, arguments);
		}
	};
});
