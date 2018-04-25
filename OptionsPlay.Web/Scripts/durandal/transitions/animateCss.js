/**
 * animation can be controlled several ways:
 * 1. Using transitionOptions attribute in composition binding. 
 * e.g. 	<!-- ko compose: { model: currentView, transition: 'animateCss',
 *				transitionOptions: { inAnimation: 'zoomIn', outAnimation: 'fadeOut', isSimultaneous: true } } -->
 *			<!--/ko-->
 * 2. Using data-* attributes on animated view (higher priority than transitionOptions):
 * e.g.		<div id="singleTradeView" data-in-animation="zoomIn" data-out-animation="zoomOut">
 *				...
 *			</div>
 */
define(['durandal/system', 'jquery'], function (system, $) {
	var animateCssTransition = function (context) {
		var options = resolveTransitionOptions(context);
		return doTransition(context, options);
	};

	function resolveTransitionOptions(context) {
		var allAvailableDefaultOptions = {
			inAnimation: 'fadeIn',
			outAnimation: 'fadeOut',
			inDuration: 0.35,
			outDuration: 0.35,
			isSimultaneous: true,
		};

		var options = context.transitionOptions || {};
		var allOptions = system.extend({}, allAvailableDefaultOptions, options);
		var inOptions = getOptionsWithPrefix(allOptions, 'in');
		var outOptions = getOptionsWithPrefix(allOptions, 'out');
		overrideOptionsFromViewAttributes(inOptions, context.child, 'in');
		overrideOptionsFromViewAttributes(outOptions, context.activeView, 'out');
		var result = {
			inOptions: inOptions,
			outOptions: outOptions
		};
		system.extend(result, options);
		return result;
	}

	function doTransition(context, transitionOptions) {
		var activeView = context.activeView;
		var newView = context.child;
		var outAnimationClass = transitionOptions.outOptions.animation;
		var inAnimationClass = transitionOptions.inOptions.animation;
		var $newView = $(newView);

		var startValues = {
			position: 'absolute',
			left: 0,
			right: 0,
			top: 0,
			bottom: 0
		};
		$newView.css(startValues);

		return system.defer(function (dfd) {
			// if there is no active view
			if (!context.activeView) {
				//then we only show a new one
				inTransition();
				return;
			}

			// if we have a new view to activate
			if (newView) {
				// then we hide current one and show the new.
				if (transitionOptions.isSimultaneous) {
					outTransition();
					inTransition();
				} else {
					outTransition(inTransition);
				}
			} else {
				// else we just hide current view
				outTransition(endTransistion);
			}

			function outTransition(callback) {
				var $previousView = $(activeView);
				setAnimationDuration(activeView, transitionOptions.outOptions.duration);
				$previousView.addClass('animated');
				$previousView.addClass(outAnimationClass);

				setTimeout(function () {
					$previousView.removeClass(inAnimationClass + ' ' + outAnimationClass + ' animated');
					$previousView.css('display', 'none');
					if (callback) {
						callback();
					}
				}, transitionOptions.outOptions.duration * 1000);
			}

			function inTransition() {
				$newView.css('display', '');
				context.triggerAttach();
				setAnimationDuration(newView, transitionOptions.inOptions.duration);
				$newView.addClass('animated');
				$newView.addClass(inAnimationClass);

				setTimeout(function () {
					$newView.removeClass(inAnimationClass + ' ' + outAnimationClass + ' animated');
					endTransistion();
				}, transitionOptions.inOptions.duration * 1000);
			}

			function endTransistion() {
				dfd.resolve();
			}
		}).promise();
	}

	function setAnimationDuration(element, durationInSeconds) {
		if (!element) {
			return;
		}
		var properties = ['animation-duration', 'transition-duration'];
		var prefixes = ['-o-', '-moz-', '-webkit-'];
		var styleObj = {};
		var durationValue = durationInSeconds + 's';
		for (var i = 0; i < properties.length; i++) {
			var property = properties[i];
			for (var j = 0; j < prefixes.length; j++) {
				styleObj[prefixes[j] + property] = durationValue;
			}
			styleObj[property] = durationValue;
		}
		$(element).css(styleObj);
	}

	function toDataAttribute(optionName, prefix) {
		var result = 'data-' + prefix + '-' + optionName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
		return result;
	}

	function getOptionsWithPrefix(allOptions, prefix) {
		var extractedOptions = {};
		for (var option in allOptions) {
			if (option.indexOf(prefix) === 0) {
				var newOption = option.substring(prefix.length);
				newOption = newOption.charAt(0).toLowerCase() + newOption.slice(1);
				extractedOptions[newOption] = allOptions[option];
			}
		}
		return extractedOptions;
	}

	function overrideOptionsFromViewAttributes(options, view, prefix) {
		if (!view) {
			return options;
		}
		for (var optionName in options) {
			var attributeName = toDataAttribute(optionName, prefix);
			if (view.hasAttribute(attributeName)) {
				options[optionName] = view.getAttribute(attributeName);
			}
		}
		return options;
	}

	return animateCssTransition;
});