define(['viewmodels/tradeIdeas/tradeIdeas',
	'viewmodels/tradeIdeas/whyPanel',
	'viewmodels/tradeIdeas/howPanel',
    'modules/context'
],
function (tradeIdeasVM, whyVm, howVm, context) {

    context.isTradeIdPanelLoading(true);

	return {
		what: tradeIdeasVM,
		why: whyVm,
		how: howVm
	};
})