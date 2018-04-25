define(['knockout',
		'modules/enums',
		'dataContext',
		'jstat'],
function (ko, Enums) {

	function CombinationHelper() {
		this.buildCombinationLegs = function (ulCode, strategyLegs, buyOrSell, ulQuotation, chains, date) {
			var buySellFlag = buyOrSell.toUpperCase() === Enums.BUY;
			var legs = strategyLegs.map(function (legTemplate) {
				var legBuySellFlag = legTemplate.buyOrSell.toUpperCase() === Enums.BUY;
				var expiry = chains.findExpiry(date, legTemplate.expiry, 0).date;
				var strike = chains.findStrike(ulQuotation.lastPrice(), expiry, legTemplate.strike);
				var quantity = legTemplate.quantity;
				if (legTemplate.legType.toUpperCase() == Enums.SECURITY) {
					quantity = quantity / 1000 * chains.defaultMultiplier;
				}
				var leg = {
					buyOrSell: buySellFlag ^ legBuySellFlag ? Enums.SELL : Enums.BUY,
					quantity: quantity,
					legType: legTemplate.legType,
					expiry: expiry,
					strikePrice: strike
				};
				return leg;
			});

			return legs;
		};

		this.cloneCombination = function (combination) {
			var Combination = require('modules/combinationViewModel');
			var extractedPositions = combination.extractedPositions();
			var legs = extractedPositions.map(function (item) {
				return {
					buyOrSell: item.quantity < 0 ? Enums.SELL : Enums.BUY,
					quantity: Math.abs(item.quantity),
					legType: item.type,
					expiry: item.expiry,
					strikePrice: item.strikePrice
				};
			});
			return new Combination(combination.ulCode, legs);
		};

		this.extractPositions = function (combination) {
			var positionsCopy = combination.positions();
			var positions = [];
			var k;
			for (var i = 0; i < positionsCopy.length; i++) {
				var pos = positionsCopy[i], replica = false;
				for (k = 0; k < positions.length; k++) {
					var p = positions[k];
					if (p.type == pos.type()
						&& (pos.type().toUpperCase() == Enums.SECURITY
							|| (pos.expiry() == p.expiry && pos.strikePrice() == p.strikePrice))) {
						p.quantity += pos.quantity();
						p.ownedQuantity += pos.isOwned() ? pos.quantity() : 0;
						replica = true;
						p.repeated = true;
					}
				}
				if (!replica) {
					positions.push({
						code: pos.quotation().code,
						quantity: pos.quantity(),
						expiry: pos.expiry(),
						strikePrice: pos.strikePrice(),
						type: pos.type().toUpperCase(),
						multiplier: pos.quotation().multiplier,
						repeated: false,
						price: pos.price(),
						costBasis: pos.costBasis(),
						ownedQuantity: pos.isOwned() ? pos.quantity() : 0
					});
				}
			}
			positions.sort(function (p1, p2) {
				if (p1.type == Enums.SECURITY) {
					return -1;
				}
				if (p2.type == Enums.SECURITY) {
					return 1;
				}
				var result = p1.strikePrice - p2.strikePrice;
				if (!result) {
					result = p1.expiry.getTime() - p2.expiry.getTime();
				}
				if (!result) {
					result = p1.type == Enums.CALL ? -1 : 1;
				}
				return result;
			});
			return positions;
		};

		this.combinationEigenvalue = function (combination) {
			var positions = combination.extractedPositions();
			var eigenvalue = '';
			var multiplier = combination.multiplier();
			for (var i = 0; i < positions.length; i++) {
				var pos = positions[i], prePos = positions[i - 1], preQty = 1, qty = pos.quantity;
				if (prePos) {
					if (prePos.type == Enums.SECURITY) {
						preQty = prePos.quantity / multiplier;
					} else {
						preQty = prePos.quantity;
					}
				}
				if (pos.type == Enums.SECURITY) {
					qty = pos.quantity / multiplier;
				}
				eigenvalue += ((prePos ? qty / preQty : (qty > 0 ? 1 : -1)) * 100).toFixed(0);
				eigenvalue += ((!prePos || prePos.type == Enums.SECURITY) ? 2 :
								(prePos.expiry.toDateString() == pos.expiry.toDateString() ?
								0
								: (prePos.expiry.getTime() < pos.expiry.getTime() ?
									-1 : 1)));
				eigenvalue += ((!prePos || prePos.type == Enums.SECURITY) ?
								2 : (pos.strikePrice == prePos.strikePrice ? 0 : 1));
				eigenvalue += (pos.type == Enums.SECURITY ? 0 : (pos.type == Enums.CALL ? 1 : 2));
				eigenvalue += '|';
			}
			return eigenvalue;
		};

		this.extractOrderEntries = function (combination) {
			var legs = [];
			combination.extractedPositions().forEach(function (pos) {
				if (pos.type != Enums.SECURITY) {
					var optionNumber = pos.code;
					var orderType = '133'; // Limit order GFD by default
					var orderQuantity = Math.abs(pos.quantity);
					var isCovered = combination.strategyName() == 'Covered Call';
					var stockBiz = isCovered ? '404' : (pos.quantity > 0 ? '400' : '402');
					if (optionNumber.length < 7) {
						// todo: debugger;
					}
					legs.push({
						optionNumber: optionNumber,
						orderType: orderType,
						orderQuantity: orderQuantity,
						orderPrice: pos.price,
						isCovered: isCovered,
						stockBiz: stockBiz
					});
				}
			});
			return legs;
		};

		this.uniqueArray = function (data) {
			data = data || [];
			var a = {}, i,
				len = data.length;
			for (i = 0; i < len; i++) {
				var v = data[i];
				if (typeof (a[v]) === 'undefined') {
					a[v] = v;
				}
			}
			data.length = 0;
			for (i in a) {
				data[data.length] = a[i];
			}
			return data;
		};

	}

	return new CombinationHelper();
});