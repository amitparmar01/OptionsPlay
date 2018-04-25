define([
		'knockout',
		'modules/enums',
		'dataContext',
		'modules/combinationViewModel',
		'modules/formatting',
		'modules/strategyTemplates',
		'jstat'
], function (ko, Enums, dataConext, Combination, formatting, strategyTemplates) {
	
	var SECURITY = Enums.LegType.SECURITY;
	var BUY = Enums.BuyOrSell.BUY;
	var SELL = Enums.BuyOrSell.SELL;
	var StrategyHelpers = function () {

		function assembleCombination(tradingStrategy, optionType, quote, chain, stdDev, predictions) {
			var legs = tradingStrategy.legs.map(function (l) {
				return {
					buyOrSell: l.buyOrSell.toUpperCase(),
					legType: l.legType.toUpperCase(),
					expiry: l.expirationDate ? new Date(l.expirationDate.futureDate) : null,
					strikePrice: l.strikePrice,
					quantity: l.quantity
				}
			});

			var comb = new Combination(quote.symbol, legs, optionType, quote, chain, stdDev, predictions);
			comb.tradingStrategy = tradingStrategy;

			return comb;
		}

		function assembleIncomeCombination(incomeStrategy, optionType, quote, chain, stdDev, predictions, positionInfo) {
			var shares = 0, costBasis = null;
			if (positionInfo) {
				shares = positionInfo.shares;
				costBasis = positionInfo.costBasis;
			}
			shares = shares || 100;

			var optionQty = Math.floor(shares / 100) || 1;
			var tradingStrategy = {
				"strategyName": incomeStrategy.legType,
				"fullStrategyName": "Sell " + incomeStrategy.legType,
				"buyOrSell": incomeStrategy.legType.match(/call/i) ? "Buy" : "Sell",
				"legs": [
					{
						"legType": incomeStrategy.legType,
						"buyOrSell": "Sell",
						"strikePrice": incomeStrategy.strike,
						"quantity": optionQty,
						"expirationDate": {
							"expiration": incomeStrategy.expiry
						}
					}
				]
			};
			if (incomeStrategy.legType == 'Call') {
				tradingStrategy.legs.push({
					"legType": 'Security',
					"buyOrSell": "Buy",
					"strikePrice": null,
					"quantity": shares,
					"expirationDate": null
				});
				tradingStrategy.strategyName = 'Covered Call';
				tradingStrategy.fullStrategyName = 'Buy Covered Call';
			}
			var comb = assembleCombination(tradingStrategy, optionType, quote, chain, stdDev, predictions);
			if (costBasis !== null && incomeStrategy.legType == 'Call') {
				var position = comb.positions()[1];
				position.costBasis(costBasis);
				position.isOwned(true);
			}

			comb.incomeStrategy = incomeStrategy;
			comb.originalShares = positionInfo.shares;
			return comb;
		}

		function getRecommendedPrice(combination) {
			var spreadPercent = parseFloat(combination.spreadPercent());
			if (spreadPercent < 10) {
				return 'mid-price';
			} else {
				return combination.buyOrSell().match(/buy/i) ? 'bid-price' : 'ask-price';
			}
		}

		function checkCombination(combination) {
			var list = [];
			return list;
			// check stock trend and market tone are available
			if (!context.trend() || !context.marketTone || !combination) {
				return list;
			}
			var isIncomeStrategy = false;
			var matchedTemplate = combination.matchedTemplate();
			if (matchedTemplate) {
				if ((matchedTemplate.buyOrSell == 'Sell' && matchedTemplate.template.name == 'Put')
					|| matchedTemplate.template.name.match(/Covered Call/i)) {
					//check list - POW
					var powItem = {
						displayForIncome: true,
						title: 'Probability of Worthless'
					};
					var pow = combination.worthlessProb();

					if (pow >= 0.75) {
						powItem.className = 'green fa fa-check-square';
						powItem.sentence = 'The strategy you have selected to sell has '
							+ formatting.aOrAn(pow * 100) + ' ' + formatting.roundNumber(pow * 100)
							+ '% chance of expirying worthless which is very good.';
					} else if (pow >= 0.55) {
						powItem.className = 'yellow fa fa-exclamation-triangle';
						powItem.sentence = 'The strategy you have selected to sell has '
							+ formatting.aOrAn(pow * 100) + ' ' + formatting.roundNumber(pow * 100)
							+ '% chance of expirying worthless which is lower than optimal.';
					} else {
						powItem.className = 'red fa fa-times-circle';
						powItem.sentence = 'The strategy you have selected to sell only has '
							+ formatting.aOrAn(pow * 100) + ' ' + formatting.roundNumber(pow * 100)
							+ '% chance of expirying worthless which is extremely low and there is a high possibility of it being exercised.';
					}

					list.push(powItem);

					//check list - annualized return
					var returnItem = {
						displayForIncome: true,
						title: 'Annualized Return'
					};
					var aRetrun = combination.annualizedReturn();

					if (aRetrun >= 5) {
						returnItem.className = 'green fa fa-check-square';
						returnItem.sentence = 'The strategy you have selected to sell has '
							+ formatting.aOrAn(aRetrun) + ' ' + formatting.roundNumber(aRetrun)
							+ '% annualized return which is very good.';
					} else if (aRetrun >= 2) {
						returnItem.className = 'yellow fa fa-exclamation-triangle';
						returnItem.sentence = 'The strategy you have selected to sell has '
							+ formatting.aOrAn(aRetrun) + ' ' + formatting.roundNumber(aRetrun)
							+ '% annualized return which is average.';
					} else {
						returnItem.className = 'red fa fa-times-circle';
						returnItem.sentence = 'The strategy you have selected to sell only has '
							+ formatting.aOrAn(aRetrun) + ' ' + formatting.roundNumber(aRetrun)
							+ '% annualized return which is very low.';
					}

					list.push(returnItem);
					isIncomeStrategy = true;
				}
			}

			if (!isIncomeStrategy && combination.quote.isTradable()) {
				// Checklist - Stock Trend
				var stockTrendItem = {
					displayForIncome: false,
					title: 'Stock Trend'
				};
				var months;
				var stockTrend;
				var tradeSentiment = combination.sentiment() || 'non-profitable';
				if (combination.daysToExpire() < 60) {
					months = '1m';
					stockTrend = context.trend().syrahSentimentShortTerm.name();
				} else {
					months = '6m';
					stockTrend = context.trend().syrahSentimentLongTerm.name();
				}

				if ((tradeSentiment.match(/bearish/i) && stockTrend.match(/bearish/i)) || (tradeSentiment.match(/bullish/i) && stockTrend.match(/bullish/i)) || (tradeSentiment.match(/neutral/i) && stockTrend.match(/neutral/i))) {
					stockTrendItem.className = 'green fa fa-check-square';
					stockTrendItem.sentence = 'The strategy you have chosen is ' + tradeSentiment.toLowerCase() + ' and ' + context.symbol() + "'s " + months + ' trend is ' + stockTrend.toLowerCase() + '.';
				} else if ((tradeSentiment.match(/bearish/i) && stockTrend.match(/bullish/i)) || (tradeSentiment.match(/bullish/i) && stockTrend.match(/bearish/i))) {
					stockTrendItem.className = 'red fa fa-times-circle';
					stockTrendItem.sentence = 'The strategy you have chosen is ' + tradeSentiment.toLowerCase() + ', however, ' + context.symbol() + "'s " + months + ' trend is ' + stockTrend.toLowerCase() + '. You are trading against the current trend of the stock.';
				} else {
					stockTrendItem.className = 'yellow fa fa-check-square';
					stockTrendItem.sentence = 'The strategy you have chosen is ' + tradeSentiment.toLowerCase() + ' and ' + context.symbol() + "'s " + months + ' trend is ' + stockTrend.toLowerCase() + '.';
				}
				list.push(stockTrendItem);

				// Checklist - Market Trend
				var marketTrendItem = {
					displayForIncome: false,
					title: 'Market Trend'
				};
				var marketTrend = months == '1m' ? context.marketTone.syrahSentimentShortTerm.name() : context.marketTone.syrahSentimentLongTerm.name();
				if ((tradeSentiment.match(/bearish/i) && marketTrend.match(/bearish/i)) || (tradeSentiment.match(/bullish/i) && marketTrend.match(/bullish/i)) || (tradeSentiment.match(/neutral/i) && marketTrend.match(/neutral/i))) {
					marketTrendItem.className = 'green fa fa-check-square';
					marketTrendItem.sentence = 'The strategy you have chosen is ' + tradeSentiment.toLowerCase() + " and currently the S&P 500's " + months + ' trend is ' + marketTrend.toLowerCase() + '.';
				} else if ((tradeSentiment.match(/bearish/i) && marketTrend.match(/bullish/i)) || (tradeSentiment.match(/bullish/i) && marketTrend.match(/bearish/i))) {
					marketTrendItem.className = 'red fa fa-times-circle';
					marketTrendItem.sentence = 'The strategy you have chosen is ' + tradeSentiment.toLowerCase() + ", however, the S&P 500's " + months + ' trend is ' + marketTrend.toLowerCase() + '. You are trading against the current trend of the market.';
				} else {
					marketTrendItem.className = 'yellow fa fa-check-square';
					marketTrendItem.sentence = 'The strategy you have chosen is ' + tradeSentiment.toLowerCase() + " and currently the S&P 500's " + months + ' trend is ' + marketTrend.toLowerCase() + '.';
				}
				list.push(marketTrendItem);

				// Checklist - OP Score
				var opScoreItem = {
					displayForIncome: false,
					title: 'OptionsPlay Score'
				};
				var opScore = combination.opScore().toFixed ? parseInt(combination.opScore().toFixed(0)) : 0;
				if (opScore < 80) {
					opScoreItem.className = 'red fa fa-times-circle';
					opScoreItem.sentence = 'The OptionsPlay Score of ' + opScore.toFixed(0) + ' is low, you may be taking on an excessive amount of risk with this strategy.';
				} else if (opScore < 100) {
					opScoreItem.className = 'yellow fa fa-exclamation-triangle';
					opScoreItem.sentence = 'The OptionsPlay Score of ' + opScore.toFixed(0) + ' is good.';
				} else {
					opScoreItem.className = 'green fa fa-check-square';
					opScoreItem.sentence = 'The strategy you have chosen has an excellent OptionsPlay Score of ' + opScore.toFixed(0) + '.';
				}
				if (!combination.hasOnlyStx()) {
					list.push(opScoreItem);
				}
			}
			// Checklist - Earnings Date
			var earningsDateItem = {
				displayForIncome: true,
				title: 'Earnings Date'
			};
			var hasEarningsDate = combination.expiry() && context.earningsDate() && context.earningsDate() < combination.expiry();
			if (hasEarningsDate) {
				earningsDateItem.className = 'yellow fa fa-exclamation-triangle';
				earningsDateItem.sentence = 'Be aware that there is an earnings call on ' + formatting.formatDate(context.earningsDate(), 'T dd yyyy') + ' which is prior to the expiration of your trade.';
			} else {
				earningsDateItem.className = 'green fa fa-check-square';
				earningsDateItem.sentence = 'There are no earnings between now and the expiration of your strategy.';
			}
			if (!combination.hasOnlyStx()) {
				list.push(earningsDateItem);
			}

			// Checklist - Spread & Liquidity
			var spreadItem = {
				displayForIncome: true,
				title: 'Spread & Liquidity'
			};
			var spreadPercent = parseFloat(combination.spreadPercent());
			if (spreadPercent < 5) {
				spreadItem.className = 'green fa fa-check-square';
				spreadItem.sentence = 'The <b>bid/ask</b> spread of this trade is low and there is good liquidity for ' + (combination.hasOnlyStx() ? 'the stock' : 'these options.');
			} else if (spreadPercent < 10) {
				spreadItem.className = 'yellow fa fa-exclamation-triangle';
				spreadItem.sentence = 'The <b>bid/ask</b> spread of this trade is sizable, it is recommended that you place a <b>limit order</b> near the <b>MID</b> price.';
			} else {
				spreadItem.className = 'red fa fa-times-circle';
				spreadItem.sentence = '<span class="red-bold">The <b>bid/ask</b> spread of this trade is very large, it is highly recommended that a <b>limit order</b> is placed near the <b>' + (combination.buyOrSell().match(/buy/i) ? 'BID' : 'ASK') + '</> price to minimize the impact of the spread on your strategy.</span>';
			}
			list.push(spreadItem);

			return list;
		}

		function buildInitialLegs(strategyLegs, buyOrSell, date, optionType, quote, chain) {
			var buySellFlag = buyOrSell.toUpperCase() === BUY;
			var legs = [];
			for (var i = 0; i < strategyLegs.length; i++) {
				var legTemplate = strategyLegs[i];

				var expiry = chain.findExpiry(date, legTemplate.expiry, 0, optionType).date;
				var strike = chain.findStrike(quote.last(), expiry, legTemplate.strike, optionType);
				var legBuySellFlag = legTemplate.buyOrSell.toUpperCase() === BUY;

				var quantity = legTemplate.quantity;
				var row = chain.findRow(strike, expiry, optionType);
				if (legTemplate.legType.toUpperCase() == SECURITY) {
					quantity = quantity * row.callPremiumMult / 100;
				}

				var leg = {
					buyOrSell: buySellFlag ^ legBuySellFlag ? SELL : BUY,
					quantity: quantity,
					legType: legTemplate.legType,
					expiry: expiry,
					strikePrice: strike
				};
				legs.push(leg);
			}
			return legs;
		}

		function buildCombinationLegs(strategyLegs, buyOrSell, date, optionType, quote, chain) {
			var legs = buildInitialLegs.apply(this, arguments);

			// make some adjustments if strategy was built incorrect
			for (var i = 1; i < legs.length; i++) {
				var leg = legs[i];
				var prevLeg = legs[i - 1];
				var legTemplate = strategyLegs[i];
				var prevLegTemplate = strategyLegs[i - 1];

				var levelDifference = legTemplate.strike - prevLegTemplate.strike;
				var strikeDifference = leg.strikePrice - prevLeg.strikePrice;
				// if strikes chosen do not match template values (due to difference between available strikes for each expiry)
				// adjust only current strike price to match template definition
				if (Math.sign(levelDifference) != Math.sign(strikeDifference)) {
					leg.strikePrice = chain.findStrike(prevLeg.strikePrice, leg.expiry, levelDifference, optionType);
				}

				// if we should have chosen equal strikes, but they are actually different
				if (levelDifference == 0 && strikeDifference > 0.001) {
					var allStrikesFirst = chain.strikeListExpiry(leg.expiry, optionType);
					var allStrikesSecond = chain.strikeListExpiry(prevLeg.expiry, optionType);
					var intersection = allStrikesFirst.filter(function (n) {
						return allStrikesSecond.indexOf(n) != -1;
					});
					leg.strikePrice = prevLeg.strikePrice = chain.findStrike(prevLeg.strikePrice, null, 0, optionType, intersection);
				}
			}

			return legs;
		}

		function rebuildCombination(currentCombination, newStrategy, optionType, quote, chain, stdDev, predictions) {
			var date = chain.findExpiry(currentCombination.expiration(), -1, 0, optionType).date;
			var legs = buildCombinationLegs(newStrategy.template.legs, newStrategy.buyOrSell, date, optionType, quote, chain, stdDev, predictions);
			var dummyComb = new Combination(quote.symbol, legs, optionType, quote, chain, stdDev, predictions);
			var constructedStrategy = dummyComb.matchedTemplate();
			dummyComb.dispose();
			if (constructedStrategy && constructedStrategy.displayedName == newStrategy.displayedName) {
				currentCombination.initPositions(legs);
				return true;
			} else {
				return false;
			}
		}

		function changeWidth(combination, upOrDown) {
			if (combination.canCustomizeWidth()) {
				var extractedPoses = combination.extractedPositions();
				var changingPoses = [];
				switch (extractedPoses.length) {
				case 2:
					// if one leg is buy while the other is sell
					if (extractedPoses[0].quantity * extractedPoses[1].quantity < 0) {
						if (extractedPoses[0].quantity < 0) {
							changingPoses.push(extractedPoses[0]);
							combination.lastHigherChanged = false;
						} else {
							changingPoses.push(extractedPoses[1]);
							combination.lastHigherChanged = true;
						}
					} else { // if both legs are buy or sell
						if (combination.lastHigherChanged) {
							changingPoses.push(extractedPoses[0]);
							combination.lastHigherChanged = false;
						} else {
							changingPoses.push(extractedPoses[1]);
							combination.lastHigherChanged = true;
						}
					}
					break;
				case 3:
				case 4:
					if (combination.lastHighersChanged) {
						changingPoses.push(extractedPoses[0]);
						changingPoses.push(extractedPoses[1]);
						combination.lastHighersChanged = false;
					} else {
						changingPoses.push(extractedPoses[extractedPoses.length - 2]);
						changingPoses.push(extractedPoses[extractedPoses.length - 1]);
						combination.lastHighersChanged = true;
					}
					break;
				default:
				}
				var diff = 0;
				if (upOrDown) {
					if (combination.canExpandWidth()) {
						if (changingPoses.length == 1) {
							diff = combination.lastHigherChanged ? 1 : -1;
						} else {
							diff = combination.lastHighersChanged ? 1 : -1;
						}
					}
				} else {
					if (combination.canShrinkWidth()) {
						if (changingPoses.length == 1) {
							diff = combination.lastHigherChanged ? -1 : 1;
						} else {
							diff = combination.lastHighersChanged ? -1 : 1;
						}
					}
				}
				if (diff) {
					if (diff > 0) {
						changingPoses.reverse();
					}
					changingPoses.forEach(function (extractedPos) {
						combination.positions().forEach(function (pos) {
							if (pos.expiry() && pos.strike() == extractedPos.strikePrice
								&& formatting.sameDate(pos.expiry(), extractedPos.expiry)) {
								var newStrike = combination.chain.findStrike(extractedPos.strikePrice, extractedPos.expiry, diff, combination.optionType);
								pos.strike(newStrike);
							}
						});
					});
				}
			}
		}

		function changeWingspan(combination, upOrDown) {
			if (((upOrDown && combination.canExpandWingspan()) || (!upOrDown && combination.canShrinkWingspan()))) {
				var strikes = combination.strikes().filter(function (s) { return typeof s === 'number'; });
				var lowestStrike = Math.min.apply(self, strikes);
				var highestStrike = Math.max.apply(self, strikes);
				var changingPoses = combination.extractedPositions().filter(function (extractedPos) {
					return extractedPos.strikePrice == lowestStrike || extractedPos.strikePrice == highestStrike;
				});
				changingPoses.sort(function (a, b) {
					return a.strikePrice - b.strikePrice;
				});
				changingPoses.forEach(function (extractedPos) {
					var diff = 0;
					if (extractedPos.strikePrice == lowestStrike) {
						diff = upOrDown ? -1 : 1;
					}
					if (extractedPos.strikePrice == highestStrike) {
						diff = upOrDown ? 1 : -1;
					}
					combination.positions().forEach(function (pos) {
						if (pos.expiry() && pos.strike() == extractedPos.strikePrice
							&& formatting.toExpiryKey(pos.expiry()) == formatting.toExpiryKey(extractedPos.expiry)) {
							var newStrike = combination.chain.findStrike(extractedPos.strikePrice, extractedPos.expiry, diff, combination.optionType);
							pos.strike(newStrike);
						}
					});
				});
			}
		}

		this.assembleCombination = assembleCombination;
		this.assembleIncomeCombination = assembleIncomeCombination;
		this.getRecommendedPrice = getRecommendedPrice;
		this.checkCombination = checkCombination;
		this.buildCombinationLegs = buildCombinationLegs;
		this.changeWidth = changeWidth;
		this.changeWingspan = changeWingspan;
		this.rebuildCombination = rebuildCombination;
	}

	return new StrategyHelpers();
});