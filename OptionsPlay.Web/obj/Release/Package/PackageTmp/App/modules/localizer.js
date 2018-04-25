define(['knockout',
		'i18next',
		'kendo-zh-CN'],
function (ko, i18next) {
	'use strict';

	var LOCALIZATION_FOLDER = 'Content/Localization/';
	var DEFULT_LANGUAGE = 'zh-CN';

	function Localizer() {
		var self = this;

		//var language = i18next.detectLanguage() || window.navigator.userLanguage || window.navigator.language || 'zh-CN';
		var language = 'zh-CN';

		i18next.init({
			detectLngFromHeaders: false,
			lng: language,
			fallbackLng: DEFULT_LANGUAGE,
			resGetPath: LOCALIZATION_FOLDER + '__lng__.json',
			useCookie: true,
			supportedLngs: ['en-US', 'zh-CN'],
			load: 'current'
		});

		var locale = ko.observable(language);

		// Read-only observable. Holds active locale for whole app
		this.activeLocale = ko.computed(function () {
			var activeLocale = locale();
			return activeLocale;
		});

		kendo.culture(language);

		// Use this method to change locale of the app
		this.setLocale = function (name) {
			kendo.culture(name);
			var result = i18next.setLng(name).then(function () {
				locale(name);
			});
			return result;
		};

		this.localize = this.t = i18next.t;

		this.waitForLocaleChange = ko.observable();

		this.activeLocale.subscribe(function () {
			self.waitForLocaleChange.notifySubscribers();
		});
	}

	var localizer = new Localizer();
	return localizer;
});