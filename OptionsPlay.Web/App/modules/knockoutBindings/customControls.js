/** 
* A module with knockout bindings to custom controls (from bootstrap, jQuery etc.)
*/
define(['jquery',
		'knockout',
		'bootstrap',
		'jquery-ui',
		'autoNumeric',
		'perfectScrollbar'],
function ($, ko) {
	'use strict';

	function bindEventsToHandlers(sender, events, parameters) {
		for (var property in events) {
			if (parameters[property]) {
				sender.on(events[property], parameters[property]);
			}
		}
	}

	function updateSliderRange(event, ui) {
		var value = ui.value;
		var $slider = $(event.currentTarget);
		var max = $slider.slider('option', 'max');
		var min = $slider.slider('option', 'min');
		var $rangeBar = $slider.find('.red-green-range');
		var anchorValue = $slider.data('anchorValue');
		$rangeBar.removeClass(value > anchorValue ? 'bg-green': 'bg-red');
		$rangeBar.addClass(value < anchorValue ? 'bg-green' : 'bg-red');
		$rangeBar.css('left', ((Math.min(anchorValue, value) - min) / (max - min) * 100) + '%');
		$rangeBar.css('width', (Math.abs(anchorValue - value) / (max - min) * 100) + '%');
	}

	/**
	* Binding to slider with standard deviation rules, and support and resistance rules.
	* You need to specify standard deviation range and support/resistance (optimal):
	*	data-bind="slider: {standardDeviation: observableSD, supportResistance: observableSR, values: [low, high], slide: myOnSlide}"
	*/
	// TODO: refactor all this mess. init and update are called in sequence. But init is called only once while update is called after each dependend observable is changed. 
	// TODO: Init should contain logic which is need to be executed only once (setting event handlers etc.).
	ko.bindingHandlers.customSlider = {
		init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
			var parameters = valueAccessor();

			var options = {
				step: 0.01
			};

			for (var property in parameters) {
				options[property] = ko.unwrap(parameters[property]);
			}

			var $slider = ($('<div class="ui-slider"></div>').appendTo(element)).slider(options);

			var max = $slider.slider('option', 'max'),
				min = $slider.slider('option', 'min');

			var sliderTicksAccessor = allBindings.get('sliderTicks');


			if (sliderTicksAccessor) {
				$(element).css('position', 'relative');
				var sliderTicks = ko.unwrap(sliderTicksAccessor);
				element.sliderTicks = sliderTicks;
				$.each(sliderTicks, function (i, tickVal) {
					if (tickVal >= min && tickVal <= max) {
						var tickLeft = ((tickVal - min) / (max - min) * 100) + '%';
						var $tick = $('<a class="ui-slider-tick"></a>').appendTo(element);
						$tick.css('left', tickLeft);
						$tick.attr('title', tickVal);
						$tick.on('click', tickVal, function (event) {
							var value = event.data;
							if ($slider.slider('option', 'range') === true) {
								$slider.slider('values', (Math.abs(value - min) <= Math.abs(value - max) ? 0 : 1), value);
							} else {
								$slider.slider('value', value);
							}
						});
					}
				});
				var $ticks = $slider.find('.ui-slider-tick');
				$ticks[0] && $($ticks[0]).css('opacity', 0);
				$ticks.length && $($ticks[$ticks.length - 1]).css('opacity', 0);
			}

			var anchorValueAccessor = allBindings.get('anchor');

			if (anchorValueAccessor) {
				$(element).css('position', 'relative');
				var anchorValue = anchorValueAccessor();
				var $anchorElement = $('<a class="ui-slider-anchor" title="' + anchorValue + '"><i class="fa fa-chevron-up"></i></a>').appendTo(element);
				$('<div class="ui-slider-range red-green-range"></div>').appendTo($slider);
				$slider.data('anchorValue', anchorValue);
				$slider.on("slide", updateSliderRange);
				$slider.on("slidechange", updateSliderRange);
				updateSliderRange({ currentTarget: $slider }, { value: $slider.slider('value') });
				var clickHandler = function () {
					return function () {
						$slider.slider('value', anchorValueAccessor());
					};
				};
				ko.bindingHandlers.click.init($anchorElement[0], clickHandler, allBindings, viewModel, bindingContext);
				$anchorElement.css('left', ((anchorValue - min) / (max - min) * 100) + '%');
				$anchorElement.attr('title', anchorValue);
				if (anchorValue < min && anchorValue > max) {
					$anchorElement.css('display', 'none');
				} else {
					$anchorElement.css('display', 'block');
				}
			}

			ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
				$slider.off("slide");
				$slider.off("slidechange");
				if ($slider.data('ui-slider')) {
					$slider.slider('destroy');
					var $ticks = $slider.find('.ui-slider-tick');
					$ticks.off('click');
				}
			});

		},
		update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
			var parameters = valueAccessor();
			var $slider = $(element).find('.ui-slider');
			var minMaxChanged = false;
			for (var property in parameters) {
				var value = ko.unwrap(parameters[property]);
				if (value !== $slider.slider('option', property)) {
					if (property == 'min' || property == 'max') {
						minMaxChanged = true;
					}
					if (!property == 'value' && !property == 'values') {
						$slider.slider('option', 'slide', null);
						$slider.slider('option', 'change', null);
					}
					if (property != 'values') {
						$slider.slider('option', property, value);
					}
					else {
						var oldValue = $slider.slider('values');
						if (!oldValue[0] || value[0].toFixed(2) != oldValue[0].toFixed(2))
							$slider.slider('values', 0, value[0]);
						if (!oldValue[1] || value[1].toFixed(2) != oldValue[1].toFixed(2))
							$slider.slider('values', 1, value[1]);
					}

					if (!property == 'value' && !property == 'values') {
						$slider.slider('option', 'slide', parameters['slide'] && ko.unwrap(parameters['slide']));
						$slider.slider('option', 'change', parameters['change'] && ko.unwrap(parameters['change']));
					}
				}
			}

			var max = $slider.slider('option', 'max'),
				min = $slider.slider('option', 'min');

			var sliderTicksAccessor = allBindings.get('sliderTicks');
			if (sliderTicksAccessor) {
				var sliderTicks = ko.unwrap(sliderTicksAccessor);
				if (minMaxChanged || sliderTicks !== element.sliderTicks) {
					element.sliderTicks = sliderTicks;
					var $ticks = $(element).find('.ui-slider-tick');
					var tickIndex = 0;
					$.each(sliderTicks, function (i, tickVal) {
						if (tickVal >= min && tickVal <= max) {
							var tickLeft = ((tickVal - min) / (max - min) * 100) + '%';
							var $tick = $ticks[tickIndex] ? $($ticks[tickIndex]) : $('<a class="ui-slider-tick"></a>').appendTo(element);
							tickIndex++;
							$tick.css('left', tickLeft);
							$tick.css('opacity', 1);
							$tick.attr('title', tickVal);
							$tick.off('click');
							$tick.on('click', tickVal, function (event) {
								var value = event.data;
								if ($slider.slider('option', 'range') === true) {
									$slider.slider('values', (Math.abs(value - min) <= Math.abs(value - max) ? 0 : 1), value);
								} else {
									$slider.slider('value', value);
								}
							});
						}
					});
					$ticks[0] && $($ticks[0]).css('opacity', 0);
					$ticks.length && $($ticks[$ticks.length - 1]).css('opacity', 0);
				}
			}

			var anchorValueAccessor = allBindings.get('anchor');

			if (anchorValueAccessor) {
				var anchorValue = anchorValueAccessor();
				updateSliderRange({ currentTarget: $slider }, { value: $slider.slider('value') });
				var anchorValueOld = $slider.data('anchorValue');
				if (minMaxChanged || anchorValue !== anchorValueOld) {
					$slider.data('anchorValue', anchorValue);
					element.anchorValue = anchorValue;
					var $anchor = $(element).find('.ui-slider-anchor');
					$anchor.css('left', ((anchorValue - min) / (max - min) * 100) + '%');
					$anchor.attr('title', anchorValue);
					if (anchorValue < min && anchorValue > max) {
						$anchor.css('display', 'none');
					} else {
						$anchor.css('display', 'block');
					}
				}
			}

			var supResValueAccessor = allBindings.get('supportAndResistance');

			if (supResValueAccessor) {
				$(element).find('.ui-slider-anchor.support-anchor, .ui-slider-anchor.resist-anchor').remove();

				var SRValue = supResValueAccessor();
				var supportValues = SRValue[0];
				var resistValues = SRValue[1];

				for (var i = 0; i < supportValues.length; i++) {
					var supportAnchorElement = $('<a class="ui-slider-anchor support-anchor" title="' + supportValues[i] + '"><i class="fa fa-chevron-up"></i></a>').appendTo(element);
					var supportClickHandler = function () {
						return function (a, b, c) {
							var anchorValue = parseFloat($(b.target).parent().attr('title'));
							$slider.slider('values', 0, anchorValue);
							$(element).find('button').removeClass('btn-active');
						};
					};
					ko.bindingHandlers.click.init(supportAnchorElement[0], supportClickHandler, allBindings, viewModel, bindingContext);
					// adjust the left value here because the anchor and the handler are positioned against different elements
					var percentage = (supportValues[i] - min) / (max - min);
					var leftValue = (1 + percentage * ($(element).width() - 2)) / $(element).width() * 100;
					supportAnchorElement.css('left', leftValue + '%');
					supportAnchorElement.attr('title', supportValues[i]);
					if (supportValues[i] < min || supportValues[i] > max) {
						supportAnchorElement.css('display', 'none');
					} else {
						supportAnchorElement.css('display', 'block');
					}
				}

				for (var i = 0; i < resistValues.length; i++) {
					var resistAnchorElement = $('<a class="ui-slider-anchor resist-anchor" title="' + resistValues[i] + '"><i class="fa fa-chevron-up"></i></a>').appendTo(element);
					var resistClickHandler = function () {
						return function (a, b, c) {
							var anchorValue = parseFloat($(b.target).parent().attr('title'));
							$slider.slider('values', 1, anchorValue);
							$(element).find('button').removeClass('btn-active');
						};
					};
					ko.bindingHandlers.click.init(resistAnchorElement[0], resistClickHandler, allBindings, viewModel, bindingContext);
					// adjust the left value here because the anchor and the handler are positioned against different elements
					var percentage = (resistValues[i] - min) / (max - min);
					var leftValue = (1 + percentage * ($(element).width() - 2)) / $(element).width() * 100;
					resistAnchorElement.css('left', leftValue + '%');
					resistAnchorElement.attr('title', resistValues[i]);
					if (resistValues[i] < min || resistValues[i] > max) {
						resistAnchorElement.css('display', 'none');
					} else {
						resistAnchorElement.css('display', 'block');
					}
				}
			}
		}
	};
	
	/**
	* Two-way binding to formatted NUMERIC input. It blocks any keystroke which doesn't fit the format specified (e.g. alphabetical characters)
	* May be used to write formatted text to the following tags:
	* 'b', 'caption', 'cite', 'code', 'dd', 'del', 'div', 'dfn', 'dt', 'em', 'h*', 'ins', 'kdb', 'label', 'li', 'output', 'p', 'q', 's', 'sample', 'span', 'strong', 'td', 'th', 'u', 'var'
	* Examples: 
	*	two-way binding:
	*		<input data-bind="autoNumeric: numericJSVariableOrObservable, settings: { vMin: 0, mDec: 0 }" />
	*	read-only binding:
	*		<span data-bind="autoNumeric: numericJSVariableOrObservable, settings: { vMin: 0, mDec: 0 }" ></span>
	* Allowed settings are: 
	*	aSep: controls the thousand separator (',' default)
	*	dGroup: controls the digital grouping (3 by default. Produces 333,333,333 from 333333333)
	*	aDec: controls the decimal ('.' default)
	*	aSign - desired currency symbol (examples: ?or EUR). Note: other symbols can be used, such as %, 癈, 癋, km/h & MPH the possibilities are endless.
	*	pSign - controls the placement of the currency symbol. ('p' - prefix default, 's' - suffix )
	*	vMin, vMax - minimum and maximum allowed values. (be careful with them. It is recommended that you set vMin OR vMax to "0" and validate later)
	*	mDec: number of decimal places (2 by default)
	*	and some more. See http://www.decorplanit.com/plugin/ for details about plugin.
	*/
	ko.bindingHandlers.autoNumeric = {
		init: function (element, valueAccessor, bindingsAccessor) {
			var $el = $(element),
				bindings = bindingsAccessor(),
				settings = bindings.settings,
				value = valueAccessor();

			function updateObservable() {
				value(parseFloat($el.autoNumeric('get'), 10));
			}

			function onKeyPress(e) {
				if (e.which == 13) {
					updateObservable();
					$el.autoNumeric('update');
				}
			}

			$el.autoNumeric(settings);
			$el.autoNumeric('set', parseFloat(ko.utils.unwrapObservable(value()), 10));
			if (element.tagName == 'INPUT') {
				$el.change(updateObservable);
				$el.keypress(onKeyPress);
			}

			ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
				$el.off('change');
				$el.off('keypress');
				$el.autoNumeric('destroy');
			});
		},
		update: function (el, valueAccessor, bindingAccessor) {
			var $el = $(el),
				newValue = parseFloat(ko.utils.unwrapObservable(valueAccessor()), 10),
				elementValue = parseFloat($el.autoNumeric('get'), 10),
				settings = bindingAccessor().settings,
				mDec = settings ? (settings.mDec || 2) : 2,
				valueHasChanged = (newValue.toFixed(mDec) != elementValue.toFixed(mDec));

			if ((newValue === 0) && (elementValue !== 0) && (elementValue !== "0")) {
				valueHasChanged = true;
			}

			if (valueHasChanged) {
				$el.autoNumeric('set', newValue);
				setTimeout(function () { $el.change(); });
			}
		}
	};

	/**
	* Two-way binding to formatted CURRENCY input. Shortcut for autoNumeric binding with the following settings by default:
	*	{ vMin: 0, aSign: '$' }.
	* Examples:
	*	two-way binding:
	*		<input data-bind="currency: numericJSVariableOrObservable" />
	*	read-only binding:
	*		<span data-bind="currency: numericJSVariableOrObservable" ></span>
	*/
	ko.bindingHandlers.currency = {
		init: function (element, valueAccessor, bindingsAccessor, viewModel) {
			var defaults = {
				vMin: 0,
				aSign: '￥'
			};

			function newbindingsAccessor() {
				var bindings = bindingsAccessor();
				var settings = bindings.settings || {};
				bindings.settings = $.extend({}, defaults, settings);
				return bindings;
			}

			ko.bindingHandlers.autoNumeric.init.call(this, element, valueAccessor, newbindingsAccessor, viewModel);
		},
		update: ko.bindingHandlers.autoNumeric.update
	};

	/**
	* Binding to perfectScrollbar.
	* You can trigger the scrollbar to scroll to top by toggle the observable that is bound to 'scrollTop'
	* Example:
	*	<div data-bind="perfectScrollbar: {suppressScrollX: true}, scrollTop: scrollTopFlag">
	*		...modal content
	*	</div>
	*	scrollTopFlag would be a observable in the viewmodel. It toggles between true and flase. The toggle will trigger scrollbar to scroll to top
	*/
	ko.bindingHandlers.perfectScrollbar = {
		init: function (element, valueAccessor) {
			var options = valueAccessor();
			$(element).perfectScrollbar(options);
		},

		update: function (element, valueAccessor, allBindings) {
			var scrollTopAccessor = allBindings.get('scrollTop');
			if (scrollTopAccessor) {
				var scrollTopValue = ko.unwrap(scrollTopAccessor);
				$(element).scrollTop(scrollTopValue);
				$(element).perfectScrollbar('update');
			}
		}
	};

	ko.bindingHandlers.relativeLabel = {
		init: function (element, valueAccessor, allBindings) {
			ko.bindingHandlers.relativeLabel.update(element, valueAccessor, allBindings);
		},
		update: function (element, valueAccessor, allBindings) {
			var highBound = ko.unwrap(allBindings().highBound) || 0;
			var lowBound = ko.unwrap(allBindings().lowBound) || 100;
			var stopPos = ko.unwrap(allBindings().stopPosition);
			var value = ko.unwrap(valueAccessor()) || 50;
			var valuePercentage = (value - lowBound) / (highBound - lowBound) * 100;
			valuePercentage = stopPos < 50 ? Math.min(stopPos, valuePercentage) : Math.max(stopPos, valuePercentage);
			$(element).css("left", valuePercentage + '%');
		}
	};

	ko.bindingHandlers.tooltip = {
		init: function (element, valueAccessor, allBindings) {
			var options = allBindings().tooltipOptions;
			options = ko.unwrap(options) || {};
			var title = ko.unwrap(valueAccessor());
			options = $.extend(options, { title: title });
			$(element).tooltip(options);
			ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
				if ($(element).data('bs.tooltip')) {
					$(element).tooltip('destroy');
				}
			});
		},
		update: function (element, valueAccessor, allBindings) {
			var options = allBindings().tooltipOptions;
			options = ko.unwrap(options) || {};
			var title = ko.unwrap(valueAccessor());
			options = $.extend(options, { title: title });
			$(element).tooltip('destroy');
			$(element).tooltip(options);
		}
	};

	ko.bindingHandlers.tagsinput = {
		init: function (element, valueAccessor) {
			var $el = $(element);
			$el.on("change", function () {
				var accessor = valueAccessor();
				var newVals = $el.val();
				accessor(newVals);
			});
			$el.tagsinput();
		}
	};

	ko.bindingHandlers.dropdown = {
		init: function (element) {
			$(element).dropdown();
		}
	};

	return ko;
});