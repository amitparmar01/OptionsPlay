// ensures that strategy has only one leg with 'Security' leg type
define(['jquery-validate-unobtrusive'],
function () {
	$.validator.addMethod('onlyOneSecurityLeg', function (value) {
		if (value !== 'Security') {
			return true;
		}
		var securityLegsCount = 0;
		var legTypes = $('.strategy-leg select[name*=LegType]');
		var i;
		for (i = 0; i < legTypes.length; i++) {
			if (legTypes[i].value === 'Security') {
				if (securityLegsCount === 1) {
					return false;
				}
				securityLegsCount++;
			}
		}
		return true;
	});

	$.validator.unobtrusive.adapters.add('onlyOneSecurityLeg', function (options) {
		options.messages['onlyOneSecurityLeg'] = options.message;
		options.rules['onlyOneSecurityLeg'] = options.params;
	});
});