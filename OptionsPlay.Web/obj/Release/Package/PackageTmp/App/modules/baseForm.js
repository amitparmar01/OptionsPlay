define(['knockout'],
function (ko) {
	// 'BaseForm' is used as base class of 'Strategy' and 'StrategyGroup'
	function BaseForm(formCaption) {
		this.formCaption = formCaption;
		this.loading = ko.observable(false);
		this.errorMessages = ko.observableArray([]);
	}

	return BaseForm;
});