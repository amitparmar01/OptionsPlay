define(['modules/strategyGroup'],
function (StrategyGroup) {
	var strategyGroup = new StrategyGroup({
		formCaption: 'New Strategy Group',
		getUrl: function () {
			return 'api/strategyGroups/new';
		},
		submitMethod: 'create'
	});
	return strategyGroup;
});