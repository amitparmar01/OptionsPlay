define(['modules/strategy'],
function (Strategy) {
	var strategy = new Strategy({
		formCaption: 'New Strategy',
		getUrl: function () {
			return 'api/strategies/new';
		},
		type: 'POST'
	});
	return strategy;
});