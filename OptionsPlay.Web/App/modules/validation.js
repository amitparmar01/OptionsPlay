define(['knockout', 'modules/localizer', 'knockout-validation'], function (ko, localizer) {
	'use strict';
	// this configuration can be overriden on per-module basis. Use validationOptions binding for that.
	// see https://github.com/Knockout-Contrib/Knockout-Validation for details
	ko.validation.configure({
		registerExtenders: true,
		messagesOnModified: true,
		messageTemplate: 'defaultValidationMessageTemplate', // defined in Index.cshtml. WARN: to work properly, you must wrap you validation input into relatively positioned div.
		insertMessages: true,           // automatically inserts validation messages as <span></span>
		parseInputAttributes: false,    // parses the HTML5 validation attribute from a form element and adds that to the object
		writeInputAttributes: false,    // adds HTML5 input validation attributes to form elements that ko observable's are bound to
		errorClass: null,               // single class for error message and element
		errorElementClass: 'validationElement',  // class to decorate error element
		errorMessageClass: 'validationMessage',  // class to decorate error message
		grouping: {
			deep: false,        //by default grouping is shallow. 
			observable: true    //and using observables
		}
	});

	// You can define custom validation rules here.
	// see https://github.com/Knockout-Contrib/Knockout-Validation/wiki/User-Contributed-Rules

	// Library holds it's own message formatting engine. That's why it would be difficult to use i18n bindings.
	// But you can use our own templates if message is simple and does not depend on validation options.
	// Placeholders in validation messages are replaced by the following function
	//	function (message, params) {
	//		return message.replace(/\{0\}/gi, params);
	//	},

	var validationLocalization = {};
	validationLocalization['en-US'] = {
		required: 'This field is required.',
		min: 'Please enter a value greater than or equal to {0}.',
		max: 'Please enter a value less than or equal to {0}.',
		minLength: 'Please enter at least {0} characters.',
		maxLength: 'Please enter no more than {0} characters.',
		pattern: 'Please check this value.',
		step: 'The value must increment by {0}',
		email: 'This is not a proper email address',
		date: 'Please enter a proper date',
		dateISO: 'Please enter a proper date',
		number: 'Please enter a number',
		digit: 'Please enter a digit',
		phoneUS: 'Please specify a valid phone number',
		equal: 'Values must equal',
		notEqual: 'Please choose another value.',
		unique: 'Please make sure the value is unique.'
	};
	validationLocalization['zh-CN'] = {
		required: '必填字段',
		min: '输入值必须大于等于 {0}',
		max: '输入值必须小于等于 {0}',
		minLength: '至少输入 {0} 个字符',
		maxLength: '输入的字符数不能超过 {0} 个',
		pattern: '请检查此值',
		step: '每次步进值是 {0}',
		email: 'email地址格式不正确',
		date: '日期格式不正确',
		dateISO: '日期格式不正确',
		number: '请输入一个数字',
		digit: '请输入一个数字',
		phoneUS: '请输入一个合法的手机号(US)',
		equal: '输入值不一样',
		notEqual: '请选择另一个值',
		unique: '此值应该是唯一的'
	};

	localizer.activeLocale.subscribe(function (locale) {
		if (validationLocalization[locale] !== undefined) {
			ko.validation.localize(validationLocalization[locale]);
		}
	});
});