define(['knockout',
		'jquery-validate',
		'jquery-validate-unobtrusive'],
function (ko) {
	// adds dom elements to jQuery validation context
	function addToValidationContext(elements) {
		var form;
		var dataValElementNames = [];
		// validation rules from jquery validation object
		var jqueryRules;
		// validation rules from DOM
		var domRules;

		if (!(elements instanceof Array)) {
			elements = [elements];
		}

		ko.utils.arrayForEach(elements, function (element) {
			// ignore element in array if its nodeType is not ELEMENT_NODE
			if (element.nodeType === 1) {
				var dataValElements = [];
				if ($(element).attr('data-val')) {
					dataValElements.push(element);
				} else {
					dataValElements = $(element).find('[data-val]');
				}
				if (dataValElements.length) {
					if (!form) {
						form = $(dataValElements).closest('form');
					}
					ko.utils.arrayForEach(dataValElements, function (dataValElement) {
						// adds rules to 'domRules'
						$.validator.unobtrusive.parseElement(dataValElement);
						dataValElementNames.push(dataValElement.name);
					});
				}
			}
		});

		if (!form) {
			return;
		}

		jqueryRules = form.validate().settings.rules;
		domRules = form.data('unobtrusiveValidation').options.rules;

		ko.utils.arrayForEach(dataValElementNames, function (name) {
			var jqueryMessages, domMessages;
			if (!jqueryRules[name] && domRules[name]) {
				jqueryRules[name] = domRules[name];
				// add error messages if necessary
				jqueryMessages = form.validate().settings.messages;
				domMessages = form.data('unobtrusiveValidation').options.messages;
				if (!jqueryMessages[name] && domMessages[name]) {
					jqueryMessages[name] = domMessages[name];
				}
			}
		});
	}

	return addToValidationContext;
});