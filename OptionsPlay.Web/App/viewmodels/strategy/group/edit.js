define(['modules/strategyGroup'],
function (StrategyGroup) {
	var strategyGroup = new StrategyGroup({
		formCaption: 'Edit Strategy Group',
		getUrl: function (id) {
			var url = 'api/strategyGroups/edit/' + id;
			return url;
		},
		submitMethod: 'update'
	});
	return strategyGroup;
});