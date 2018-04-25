define(function () {
	var enums = Object.freeze({
		BuyStockBizes: { '400': true, '403': true, '405': true },
		SellStockBizes: { '401': true, '402': true, '404': true },
		ExerciseStockBizes: { '406': true, '407': true },
		OpenStockBizes: { '400': true, '402': true, '404': true },
		CloseStockBizes: { '401': true, '403': true, '405': true, '406': true, '407': true },
		CoveredStockBizes: { '404': true, '405': true },
		OrderStatuses: {
			'0': 'trade.orderStatus.notOffered',
			'1': 'trade.orderStatus.offering',
			'2': 'trade.orderStatus.offered',
			'3': 'trade.orderStatus.toWithdraw',
			'4': 'trade.orderStatus.mathedToWithdraw',
			'5': 'trade.orderStatus.partialyToWithdraw',
			'6': 'trade.orderStatus.withdrawn',
			'7': 'trade.orderStatus.partialyWithdrawn',
			'8': 'trade.orderStatus.matched',
			'9': 'trade.orderStatus.discardedOrder',
			'A': 'trade.orderStatus.toOffer'
		},
		WithdrawableOrderStatuses: {
			'0': true,
			'1': true,
			'2': true,
			'A': true
		},
		StockBusinessDic: {
			'400': 'stockBizOptions.buyToOpen',
			'401': 'stockBizOptions.sellToClose',
			'402': 'stockBizOptions.sellToOpen',
			'403': 'stockBizOptions.buyToClose',
			'404': 'stockBizOptions.openCoveredCall',
			'405': 'stockBizOptions.closeCoveredCall',
			'406': 'stockBizOptions.exerciseCall',
			'407': 'stockBizOptions.exercisePut',
			'408': 'stockBizOptions.lockSecurity',
			'409': 'stockBizOptions.unlockSecurity'
		},
		OrderTypeDic: {
			'130': 'orderTypeOptions.limitGFD',
			'131': 'orderTypeOptions.limitFOK',
			'132': 'orderTypeOptions.marketToLimitGFD',
			'133': 'orderTypeOptions.marketFOK',
			'134': 'orderTypeOptions.marketIOC',
			'100': 'orderTypeOptions.submitOrder',
			'101': 'orderTypeOptions.withdraw'
		},
		OrderTypes: {
			SUBMIT_ORDER: '100',
			LIMIT_GFD: '130',
			LIMIT_FOK: '131',
			MARKET_LEFT_LIMIT: '132',
			MARKET_FOK: '133',
			MARKET_IOC: '134',
			CANCEL_ORDER: '101'
		},
		StockBusinesses: {
			EXERCISE_CALL: '406',
			EXERCISE_PUT: '407'
		}
	});
	return enums;
});