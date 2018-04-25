// ensures that one field is not equal to another one
define(['jquery-validate-unobtrusive'],
function () {
	$.validator.addMethod('notequalto', function (value, element, param) {
		if (!value) {
			return true;
		}

		var anotherValue = $('#' + param).val();
		if (!anotherValue) {
			return true;
		}

		var result = value !== anotherValue;
		return result;
	});

	$.validator.unobtrusive.adapters.add('notequalto', ['another'], function (options) {
		options.rules['notequalto'] = options.params.another;
		options.messages['notequalto'] = options.message;
	});
});