define(['knockout',
		'modules/localizer'],
function (ko, localizer) {
	var self = {};

	function Language(title, locale, imgSrc) {
		this.title = title;
		this.locale = locale;
		this.imgSrc = imgSrc;
	}

	var chinese = new Language('cn', 'zh-CN', 'Content/images/flags/china.gif');
	var english = new Language('en', 'en-US', 'Content/images/flags/greatBritain.gif');
	self.languages = [chinese, english];
	var active = $.grep(self.languages, function (l) {
		return l.locale === localizer.activeLocale();
	});

	self.selectedLanguage = ko.observable(active[0]);

	self.setLanguage = function (language) {
		localizer.setLocale(language.locale).done(function () {
			self.selectedLanguage(language);
		});
	};

	return self;
});