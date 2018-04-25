define(['modules/strategy'],
function (Strategy) {
	var strategy = new Strategy({
		formCaption: 'Edit Strategy',
		getUrl: function (id) {
			var result = 'api/strategies/edit/' + id;
			return result;
		},
		type: 'PUT'
	});
	return strategy;
});