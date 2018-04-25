define(['knockout',
		'modules/combinationHelpers',
		'modules/strategyHelpers',
		'modules/formatting',
		'modules/enums',
		'modules/disposableViewModel'],
function (ko, combinationHelpers, strategyHelpers, formatting, enums, DisposableViewModel) {
	var TypeEnum = enums.LegType;
	var CombinationEditorVM = function (combination) {

		var self = this;
		DisposableViewModel.call(this);

		this.combination = combination;

		var chain = combination.chain;
		var quote = combination.quote;
		this.template = [];
		this.bindReady = ko.observable(false);

		this.hasSecurityLeg = ko.observable(false);

		this.convertStrikeList = function (thePosition) {
			var strikeInt = 0;
			var strikeDecimal = 0;
			var bidInt = 0;
			var bidDecimal = 0;
			var askInt = 0;
			var askDecimal = 0;

			var checkFormat = function (strike, bid, ask) {
				var sint = strike.toFixed().length;
				var sdec = strike.toString().length - sint;
				var bint = bid.toFixed().length;
				var bdec = bid.toString().length - bint;
				var aint = ask.toFixed().length;
				var adec = ask.toString().length - aint;
				if (sint > strikeInt) strikeInt = sint;
				if (sdec > strikeDecimal) strikeDecimal = sdec;
				if (bint > bidInt) bidInt = bint;
				if (bdec > bidDecimal) bidDecimal = bdec;
				if (aint > askInt) askInt = aint;
				if (adec > askDecimal) askDecimal = adec;
			}

			var printFormat = function (num, int, decimal) {
				var ret = "";
				var intNum = Math.floor(num);
				var decNum = num - intNum;
				for (var i = 0; i < int - intNum.toString().length; i++) {
					ret += "&nbsp;&nbsp;";
				}
				ret += intNum.toString();
				if (decNum != 0) {
					ret += decNum.toFixed(decimal - 1).substring(1);
					for (var i = 0; i < decimal - decNum.toString().length + 1; i++) {
						ret += "&nbsp;&nbsp;";
					}
				}
				else {
					for (var i = 0; i < decimal; i++) {
						if (i == 0)
							ret += ".";
						else {
							ret += "0";
						}
					}
				}
				return ret;
			}

			if (thePosition.strikeList() && thePosition.strikeList() != []) {
				var detailList = [];
				for (var k = 0; k < thePosition.strikeList().length; k++) {
					var theRow = thePosition.chain.findRow(thePosition.strikeList()[k], thePosition.expiry(), thePosition.optionType);
					if (thePosition.callOrPut()) {
						detailList.push({ strike: thePosition.strikeList()[k], bid: theRow.callOption.bid(), ask: theRow.callOption.ask() });
						checkFormat(thePosition.strikeList()[k], theRow.callOption.bid(), theRow.callOption.ask());
					} else {
						detailList.push({ strike: thePosition.strikeList()[k], bid: theRow.putOption.bid(), ask: theRow.putOption.ask() });
						checkFormat(thePosition.strikeList()[k], theRow.putOption.bid(), theRow.putOption.ask());
					}
				}
				var formattedList = [];
				var stdDevs = self.combination.stdDev.getStdDevsByExpiry(self.combination.expiration());
				if (stdDevs) {
					var lastPrice = stdDevs[3];
					var leftBound = stdDevs[2];
					var leftFlag = false;
					var rightBound = stdDevs[4];
					var rightFlag = false;
				}
				for (var k = 0; k < detailList.length; k++) {
					var strike = detailList[k].strike;
					var _bid = detailList[k].bid;
					var _ask = detailList[k].ask;
					var str = printFormat(strike, strikeInt, strikeDecimal) + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$' + (thePosition.buySellFlag() ? printFormat(_ask, askInt, askDecimal) : printFormat(_bid, bidInt, bidDecimal));
					var strikeEntry = { strike: strike, strikeStr: str, strikeClass: 'strike-below-last' };

					if (stdDevs) {
						if (lastPrice < strike) {
							strikeEntry.strikeClass = 'strike-over-last';
						}
						if (leftBound <= strike && !leftFlag) {
							formattedList.push({ strike: strike, strikeStr: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-1SD', strikeClass: 'strike-of-sd' });
							leftFlag = true;
						}
						if (rightBound < strike && !rightFlag) {
							formattedList.push({ strike: strike, strikeStr: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+1SD', strikeClass: 'strike-of-sd' });
							rightFlag = true;
						}
					}

					formattedList.push(strikeEntry);
				}
				return formattedList;
			} else {
				return null;
			}
		}

		$.each(combination.positions(), function (i, pos) {
			self.template.push({ legType: pos.type(), buyOrSell: pos.buyOrSell(), expiry: pos.expiry(), strike: pos.strike(), quantity: pos.quantity() });
			if (pos.type() == TypeEnum.SECURITY) {
				self.hasSecurityLeg(true);
			}
		});

		this.expiryList = [];
		if (chain) {
			this.expiryList = chain.expirySelectOptions;
		}
		this.expiryList.findIndex = function (date) {
			for (var i = 0; i < self.expiryList.length; i++) {
				var d = self.expiryList[i].date;
				if (formatting.sameDate(date, d))
					return i;
			}
			return -1;
		};

		this.expiryList.findIndexByExpiryStr = function (expiryStr) {
		    for (var i = 0; i < self.expiryList.length; i++) {
		        var e = self.expiryList[i].expiryStr;
		        if (expiryStr == e) {
		            return i;
		        }
		    }
		    return -1;
		};

		function initPositionsForEditor() {
			var positions = self.combination.positions();
			for (var i = 0; i < positions.length; i++) {
				var pos = positions[i];

				pos.detailStrikeList = self.computed(function () {
					return self.convertStrikeList(this);
				}, pos);

				pos.removePos = function (position) {
					if (self.combination.positions().length <= 1) {
						return;
					}
					self.combination.removePosition(position);
					if (position.type() == TypeEnum.SECURITY) {
						self.hasSecurityLeg(false);
					}
				};
			}
		}

		initPositionsForEditor();

		// #region functions for combination

		this.expiryChange = function (isIncremment) {
			ko.utils.arrayForEach(combination.positions(), function (pos) {
				var idx = self.expiryList.findIndex(pos.expiry()) + (isIncremment ? 1 : -1);
				if (idx >= 0 && idx <= self.expiryList.length - 1) {
					pos.expiry(self.expiryList[idx].date);
			    }
			    //var idx = self.expiryList.findIndexByExpiryStr(pos.expiryStr()) + (isIncremment ? 1 : -1);
			    //if (idx >= 0 && idx <= self.expiryList.length - 1) {
			    //	pos.expiry(self.expiryList[idx].date);
			    //}
			});
		};

		this.strikeChange = function (isIncremment) {
			ko.utils.arrayForEach(combination.positions(), function (pos) {
				var idx = pos.strikeList().indexOf(pos.strike()) + (isIncremment ? 1 : -1);
				if (idx >= 0 && idx <= pos.strikeList().length - 1) {
					pos.strike(pos.strikeList()[idx]);
				}
			});
		};

		this.quantityChange = function (isIncremment) {
			var dif = isIncremment ? 1 : -1;
			combination.absQuantity(combination.absQuantity() + dif);
		};

		this.flipBS = function flipBS() {
			for (var i = 0; i < combination.positions().length; i++) {
				var pos = combination.positions()[i];
				pos.buySellFlag(!pos.buySellFlag());
			}
		};
		this.reset = function () {
			self.bindReady(false);
			self.combination.initPositions(self.combination.originalLegs);
			initPositionsForEditor();
			self.bindReady(true);
		};

		this.addNewLeg = function (legType) {
			var positions = combination.positions(), noOfLegs = 0;
			for (var i = 0; i < positions.length; i++) {
				if (!positions[i].isOwned()) {
					noOfLegs++;
				}
			}
			if (noOfLegs >= 4) {
				return null;
			}
			legType = legType || TypeEnum.CALL;
			if (legType == TypeEnum.SECURITY) {
				for (var i = 0; i < positions.length; i++) {
					if (positions[i].type() == TypeEnum.SECURITY && !positions[i].isOwned()) {
						return null;
					}
				}
			}
			var expiry = combination.expiration();
			var strike = chain.findStrike(quote.last(), expiry, 0, combination.optionType);
			var qty = 1;
			if (legType == TypeEnum.SECURITY) {
				qty = combination.multiplier();
			}
			var pos = combination.addPosition('BUY', qty, legType, expiry, strike);
			if (pos == null) {
				return null;
			}

			if (legType == TypeEnum.SECURITY) {
				self.hasSecurityLeg(true);
			}
			return pos;
		};

		this.subscribe(combination.positions, function (positions) {
			for (var i = 0; i < positions.length; i++) {
				var pos = positions[i];
				pos.detailStrikeList = pos.detailStrikeList || self.computed(function () {
					return self.convertStrikeList(pos);
				});
				pos.removePos = pos.removePos || function (position) {
					if (combination.positions().length <= 1) {
						return;
					}
					combination.removePosition(position);
					if (position.type() == TypeEnum.SECURITY) {
						self.hasSecurityLeg(false);
					}
				};
			}
		});

		this.lessAggressive = function () { };
		this.moreAggressive = function () { };

		// #endregion functions for combination

		this.qtySpinUp = function (position, event) {
			position.absQuantity(position.absQuantity() + 1);
			event.preventDefault();
			event.stopPropagation();
		};
		this.qtySpinDown = function (position, event) {
			position.absQuantity(position.absQuantity() == 1 ? 1 : position.absQuantity() - 1);
			event.preventDefault();
			event.stopPropagation();
		};
		this.buySellEvent = function (pos) {
			pos.buyOrSell(pos.buyOrSell() == 'BUY' ? 'SELL' : 'BUY');
		};
		this.callPutType = function (position) {
			position.type(position.type() == 'CALL' ? 'PUT' : 'CALL');
		};

		this.flipCP = function flipCP(position) {
			var current = position.type().toUpperCase();
			if (current === TypeEnum.CALL) {
				position.type(TypeEnum.PUT);
			} else if (current === TypeEnum.PUT) {
				position.type(TypeEnum.CALL);
			}
		};

		this.typeSpinUp = function (position) {
			var current = position.type().toUpperCase();
			if (current === TypeEnum.CALL) {
				position.type(TypeEnum.SECURITY);
			} else if (current === TypeEnum.PUT) {
				position.type(TypeEnum.CALL);
			} else if (current === TypeEnum.SECURITY) {
				position.type(TypeEnum.Put);
			}
		};
		this.typeSpinDown = function (position) {
			var current = position.type().toUpperCase();
			if (current === TypeEnum.CALL) {
				position.type(TypeEnum.PUT);
			} else if (current === TypeEnum.PUT) {
				position.type(TypeEnum.SECURITY);
			} else if (current === TypeEnum.SECURITY) {
				position.type(TypeEnum.CALL);
			}
		};
		this.selectExpiry = function (position, expiry, event) {
			position.expiry(expiry.date);
			$(event.target).parent().parent().scrollLeft($(event.target).position().left - 170);
		};
		this.selectStrike = function (position, strike, event) {
			position.strike(strike);
			$(event.target).parent().parent().scrollLeft($(event.target).position().left - 170);
		};

		this.shrinkWidth = function () {
			strategyHelpers.changeWidth(self.combination, false);
		}

		this.expandWidth = function () {
			strategyHelpers.changeWidth(self.combination, true);
		}

		this.shrinkWingspan = function () {
			strategyHelpers.changeWingspan(self.combination, false);
		}

		this.expandWingspan = function () {
			strategyHelpers.changeWingspan(self.combination, true);
		}

		this.detached = function () {
			self.dispose();
		};

		this.bindReady(true);
	};
	return CombinationEditorVM;
});