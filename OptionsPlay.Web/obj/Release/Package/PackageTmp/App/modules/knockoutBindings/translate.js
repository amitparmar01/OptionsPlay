define(['knockout',
		'modules/localizer'],
function (ko, localizer) {
	"use strict";

	/**
	 * Translation binding. Implemented as wrapper around text binding.
	 * You can pass options to i18next.translate specifying 'i18nOptions' in binding. @link http://i18next.com/node/pages/doc_features.html | See documentation for i18next for details
	 * @example: data-bind="t: 'app.title'}"
	 * @example: data-bind="t: 'app.title', i18nOptions { postProcess: 'sprintf', sprintf: ['a'] }"
	 */
	ko.bindingHandlers.translate = ko.bindingHandlers.t = {
		init: function (element) {
			var allArguments = arguments;
			var self = this;
			var subscribtion = localizer.activeLocale.subscribe(function () {
				ko.bindingHandlers.t.update.apply(self, allArguments);
			});

			ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
				subscribtion.dispose();
			});

			ko.bindingHandlers.text.init.apply(this, arguments);
		},
		update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			var resourcePath = ko.utils.unwrapObservable(valueAccessor());
			var options = allBindingsAccessor().i18nOptions || {};

			function customValueAccessor() {
				var translation = localizer.localize(resourcePath, options);
				return translation;
			}
			ko.bindingHandlers.text.update.call(this, element, customValueAccessor, allBindingsAccessor, viewModel);
		}
	};
	ko.virtualElements.allowedBindings.translate = ko.virtualElements.allowedBindings.t = true;

	//Titles localization
	ko.bindingHandlers.translateTitle = ko.bindingHandlers.tt = {
		init: function (element) {
			var allArguments = arguments;
			var self = this;
			var subscribtion = localizer.activeLocale.subscribe(function () {
				ko.bindingHandlers.tt.update.apply(self, allArguments);
			});

			ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
				subscribtion.dispose();
			});
		},
		update: function (element, valueAccessor, allBindingsAccessor) {
			var resourcePath = ko.utils.unwrapObservable(valueAccessor());
			var options = allBindingsAccessor().i18nOptions || {};

			var translation = localizer.localize(resourcePath, options);

			element.title = translation;
		}
	};
});