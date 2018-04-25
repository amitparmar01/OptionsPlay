define(['knockout',
		'modules/strategyTemplates',
		'modules/enums',
		'modules/configurations',
		'dataContext',
		'modules/formatting',
		'modules/combinationHelpers',
		'jquery',
		'modules/localizer',
		'modules/disposableViewModel',
		'modules/helpers',
		'koBindings/customExtenders',
		'jstat'],
function (ko, strategyTemplates, enums, configurations, dataContext, formatting, combinationHelpers, $, localizer, DisposableViewModel, helpers) {

    var snd = new NormalDistribution(0, 1);
    var riskFreeRate = configurations.TechnicalAnalysis.riskFreeRate;
    var defaultDivYield = configurations.TechnicalAnalysis.defaultDividendYield();

    var SECURITY = enums.LegType.SECURITY;
    var CALL = enums.LegType.CALL;
    var BUY = enums.BuyOrSell.BUY;
    var SELL = enums.BuyOrSell.SELL;

    var Position = function (ulCode, buyOrSell, quantity, type, expiry, strikePrice, costBasis, chain) {
        var self = this;
        DisposableViewModel.call(this);
        this.ulCode = ulCode;
        this.chain = chain;
        var relativeQuantity = buyOrSell.toUpperCase() == enums.BUY ? quantity : -quantity;

        this.originalLeg = {
            quantity: relativeQuantity,
            type: type,
            expiry: expiry,
            strikePrice: strikePrice,
            strike: strikePrice,
            costBasis: costBasis
        };

        this.buyOrSell = ko.observable(relativeQuantity > 0 ? enums.BuyOrSell.BUY : enums.BuyOrSell.SELL);

        this.buySellFlag = this.computed({
            read: function () {
                return self.buyOrSell() === enums.BuyOrSell.BUY;
            },
            write: function (newVal) {
                self.buyOrSell(newVal ? enums.BuyOrSell.BUY : enums.BuyOrSell.SELL);
            }
        });

        this.absQuantity = ko.observable(Math.abs(quantity)).extend({ numberMinMax: { min: 1, max: 99999 } });

        this.quantity = this.computed({
            read: function () {
                var newValue = self.absQuantity();
                var result = self.buySellFlag() ? newValue : -newValue;
                return result;
            },
            write: function (newVal) {
                if (newVal == 0) {
                    return;
                }
                self.absQuantity(Math.abs(newVal));
                self.buySellFlag(newVal > 0);
            }
        });

        this.type = ko.observable(type.toUpperCase());
        this.expiry = ko.observable(expiry);

        this.expirySub = this.expiry.subscribe(function (newVal) {
            if (typeof (newVal) === 'string') {
                self.expiry(new Date(newVal));
            }
        });

        this.strike = this.strikePrice = ko.observable(strikePrice);
        this.strikePriceSub = this.strikePrice.subscribe(function (newVal) {
            if (typeof (newVal) === 'string') {
                self.strikePrice(parseFloat(newVal));
            }
        });

        this.strikeList = this.computed(function () {
            if (self.type() != SECURITY) {
                var e = self.expiry();
                return self.chain ? self.chain.strikeListExpiry(e, self.optionType) : null;
            }
            return [];
        });

        this.expiryStr = ko.observable(formatting.formatDate(self.expiry(), 'yyyy-MM-dd'));

        this.expiryStr.subscribe(function (newStr) {
            self.expiry(new Date(newStr));
        });

        this.callOrPut = this.callPutFlag = ko.computed({
            read: function () {
                return self.type() === enums.CALL;
            },
            write: function (newVal) {
                if (newVal) {
                    self.type(enums.CALL);
                } else {
                    self.type(enums.PUT);
                }
            }
        }, this);

        this.costBasis = ko.observable(typeof costBasis === 'undefined' ? null : costBasis);

        this.isOwned = ko.observable(costBasis != null);

        var defaultQuotation = {
            code: self.ulCode,
            last: ko.observable(0),
            bid: ko.observable(0),
            ask: ko.observable(0),
            volume: ko.observable(0),
            openInterest: 0,
            impliedVolatility: ko.observable(0),
            multiplier: 1,
            dividendYield: defaultDivYield
        };
        this.quotation = ko.observable(defaultQuotation);
        this.quotationDependency = ko.computed(function () {
            self.type();
            self.expiry();
            self.strikePrice();
            if (self.type() !== enums.SECURITY) {
                dataContext.optionChains.get(self.ulCode).done(function (chain) {
                    var row = chain.findRow(self.strikePrice(), self.expiry());
                    if(typeof row == 'undefined'){
                        var strikePrice1 = chain.strikeListExpiry(self.expiry());
                        self.strike(strikePrice1[0])
                        row = chain.findRow(self.strike(), self.expiry());

                    }
                    var option;
                    if (self.callPutFlag()) {
                        option = row.callOption;
                    } else {
                        option = row.putOption;
                    }
                    var last = option.latestTradedPrice() == 0 ? option.previousSettlementPrice: option.latestTradedPrice;
                    var quotation = {
                        code: option.optionNumber,
                        last: last,
                        bid: option.bid,
                        ask: option.ask,
                        volume: option.volume,
                        openInterest: option.openInterest,
                        impliedVolatility: (option.greeks && option.greeks.sigma) || ko.observable(0),
                        multiplier: row.premiumMultiplier,
                        dividendYield: defaultDivYield
                    };
                    self.quotation(quotation);
                });
            } else {
                dataContext.quotation.get(self.ulCode).done(function (securityQuot) {
                    self.quotation({
                        code: securityQuot.securityCode,
                        last: securityQuot.lastPrice,
                        bid: securityQuot.currentBidPrice,
                        ask: securityQuot.currentAskPrice,
                        volume: defaultQuotation.volume,
                        openInterest: defaultQuotation.openInterest,
                        impliedVolatility: defaultQuotation.impliedVolatility,
                        multiplier: 1,
                        dividendYield: defaultDivYield
                    });
                });
            }
            return null;
        }, this);

        this.price = ko.computed(function () {
            if (self.quotation()) {
                if (self.buySellFlag()) {
                    return self.quotation().ask() || self.quotation().last();
                } else {
                    return self.quotation().bid() || self.quotation().last();
                }
            }
            return null;
        }, this);

        this.sellPrice = ko.computed(function () {
            if (self.quotation()) {
                if (self.buySellFlag()) {
                    return self.quotation().bid() || self.quotation().last();
                } else {
                    return self.quotation().ask() || self.quotation().last();
                }
            }
            return null;
        }, this);
        /**
		 * payoff outlook
		 * @param spotPrice {string} stock spot price to outlook
		 * @param yearToMaturity {numeric} year to maturity, for example: 31.4 / 365
		 * @param vol {numeric} volatility of underlying to outlook
		 */
        this.payoff = function (spotPrice, yearToMaturity, vol) {
            yearToMaturity = typeof yearToMaturity === 'undefined' ? 0 : yearToMaturity;

            var bsPrice = self.bsPrice(spotPrice, yearToMaturity, vol);

            if (self.costBasis() != null) {
                return bsPrice - self.costBasis();
            } else {
                return bsPrice - self.price();
            }
        };

        this.d1 = function (spotPrice, yearToMaturity, vol) {
            vol = vol || self.quotation().impliedVolatility();
            var divYield = self.quotation().dividendYield;
            var d1 = Math.log(spotPrice / self.strikePrice()) + (riskFreeRate() - divYield + vol * vol * 0.5) * yearToMaturity;
            d1 = d1 / (vol * Math.sqrt(yearToMaturity));
            return d1;
        };

        this.d2 = function (spotPrice, yearToMaturity, vol, d1) {
            vol = vol || self.quotation().impliedVolatility();
            var divYield = self.quotation().dividendYield;
            d1 = d1 || self.d1(spotPrice, yearToMaturity, riskFreeRate(), vol, divYield);
            var d2 = d1 - (vol * Math.sqrt(yearToMaturity));
            return d2;
        };

        this.bsPrice = function (spotPrice, yearToMaturity, vol) {
            if (yearToMaturity <= 0 || self.type() === enums.SECURITY) {
                switch (self.type().toUpperCase()) {
                    case enums.CALL:
                        return Math.max(0, spotPrice - self.strikePrice());
                    case enums.PUT:
                        return Math.max(0, self.strikePrice() - spotPrice);
                    case enums.SECURITY:
                    default:
                        return spotPrice;
                }
            }
            var result;
            vol = vol || self.quotation().impliedVolatility();
            var divYield = self.quotation().dividendYield;

            var d1 = self.d1(spotPrice, yearToMaturity, vol);
            var d2 = self.d2(spotPrice, yearToMaturity, vol, d1);

            switch (self.type()) {
                case enums.CALL:
                    result = (spotPrice * Math.exp(-divYield * yearToMaturity) * snd._cdf(d1)) -
							(self.strikePrice() * Math.exp(-riskFreeRate() * yearToMaturity) * snd._cdf(d2));
                    break;
                case enums.PUT:
                    result = self.strikePrice() * Math.exp(-riskFreeRate() * yearToMaturity) * snd._cdf(-d2)
							- spotPrice * Math.exp(-divYield * yearToMaturity) * snd._cdf(-d1);
                    break;
                default:
                    return 0;
            }

            return result;
        };

        this.delta = function (spotPrice, yearToMaturity, vol) {
            if (self.type() === enums.SECURITY) {
                return 1;
            }
            vol = vol || self.quotation().impliedVolatility();
            var divYield = self.quotation().dividendYield;
            var d1 = self.d1(spotPrice, yearToMaturity, vol);
            switch (self.type()) {
                case enums.CALL:
                    return Math.exp(-divYield * yearToMaturity) * snd._cdf(d1);
                case enums.PUT:
                    return Math.exp(-divYield * yearToMaturity) * -snd._cdf(-d1);
                default:
                    return 0;
            }
        };

        this.gamma = function (spotPrice, yearToMaturity, vol) {
            if (self.type() === enums.SECURITY) {
                return 0;
            }
            vol = vol || self.quotation().impliedVolatility();
            var divYield = self.quotation().dividendYield;
            var d1 = self.d1(spotPrice, yearToMaturity, vol);
            return Math.exp(-divYield * yearToMaturity) * snd._pdf(d1)
					/ (spotPrice * vol * Math.sqrt(yearToMaturity));
        };

        this.vega = function (spotPrice, yearToMaturity, vol) {
            if (self.type() === enums.SECURITY) {
                return 0;
            }
            vol = vol || self.quotation().impliedVolatility();
            var divYield = self.quotation().dividendYield;
            var d1 = self.d1(spotPrice, yearToMaturity, vol);
            return spotPrice * Math.exp(-divYield * yearToMaturity) * snd._pdf(d1)
					* Math.sqrt(yearToMaturity) / 100;
        };

        this.theta = function (spotPrice, yearToMaturity, vol) {
            if (self.type() === enums.SECURITY) {
                return 0;
            }
            vol = vol || self.quotation().impliedVolatility();
            var divYield = self.quotation().dividendYield;
            var d1 = self.d1(spotPrice, yearToMaturity, vol);
            var d2 = self.d2(spotPrice, yearToMaturity, vol, d1);
            var result = 0;

            switch (self.type()) {
                case enums.CALL:
                    result -= spotPrice * Math.exp(-divYield * yearToMaturity) * snd._pdf(d1)
								* vol / (2 * Math.sqrt(yearToMaturity));
                    result -= riskFreeRate() * self.strikePrice() * Math.exp(-riskFreeRate() * yearToMaturity) * snd._cdf(d2);
                    result += divYield * spotPrice * Math.exp(-divYield * yearToMaturity) * snd._cdf(d1);
                    break;
                case enums.PUT:
                    result -= spotPrice * Math.exp(-divYield * yearToMaturity) * snd._pdf(d1)
								* vol / (2 * Math.sqrt(yearToMaturity));
                    result += riskFreeRate() * self.strikePrice() * Math.exp(-riskFreeRate() * yearToMaturity) * snd._cdf(-d2);
                    result -= divYield * spotPrice * Math.exp(-divYield * yearToMaturity) * snd._cdf(-d1);
                    break;
                default:
                    return 0;
            }
            return result / 365;
        };

        this.rho = function (spotPrice, yearToMaturity, vol) {
            if (self.type() === enums.SECURITY) {
                return 0;
            }
            vol = vol || self.quotation().impliedVolatility();
            var d1 = self.d1(spotPrice, yearToMaturity, vol);
            var d2 = self.d2(spotPrice, yearToMaturity, vol, d1);
            var result;

            switch (self.type()) {
                case enums.CALL:
                    result = self.strikePrice() * yearToMaturity * Math.exp(-riskFreeRate() * yearToMaturity) * snd._cdf(d2);
                    break;
                case enums.PUT:
                    result = -self.strikePrice() * yearToMaturity * Math.exp(-riskFreeRate() * yearToMaturity) * snd._cdf(-d2);
                    break;
                default:
                    return 0;
            }
            return result;
        };

    };

    /**
	 * Combination includes multi-positions (legs).
	 * @param ulCode {string} underlying security code
	 * @param legs {Array} initial legs information. for example: [{buyOrSell: 'BUY', type: 'CALL', quantity: 1, expiry: new Date(2014, 4, 28), strikePrice: 37.5, costBasis: null}, ...]
	 */
    var Combination = function (ulCode, legs) {
        var self = this;
        DisposableViewModel.call(this);

        self.ready = $.Deferred();

        this.ulCode = ulCode;

        this.stockPriceLowerBound = ko.observable(0);
        this.stockPriceHigherBound = ko.observable(100);
        this.stockLastPrice = ko.observable(50);
        this.chartPriceRangeReady = ko.observable(false);
        this.outlookPriceLowerBound = ko.observable(0);
        this.outlookPriceHigherBound = ko.observable(0);
        this.outlookBoundChangedFlag = ko.observable(false);
        this.outlookBoundChanged = function () {
            self.outlookBoundChangedFlag(!self.outlookBoundChangedFlag());
        }

        this.positions = ko.observableArray();
        this.originalLegs = [];

        //dataContext.quotation.get(self.ulCode).done(function (quote) {
        //    if (typeof (quote.last) === 'undefined')
        //    {
        //        quote.last = quote.lastPrice;
        //    }
        //    self.quote = quote;
        //    self.stockLastPrice = quote.lastPrice;
        //    self.highSpotBound = quote.last() * 10;
        //});
        //dataContext.standardDeviations.get(self.ulCode).done(function (stdDev) {
        //    self.stdDev = stdDev;
        //});
        //dataContext.predictions.get(self.ulCode).done(function (predictions) {
        //    self.predictions = predictions;
        //});

        //dataContext.optionChains.get(this.ulCode).done(function (chain) {
        //    self.chain = chain;
        //});

        self.initCombination = function () {

            self.addPosition = function (buyOrSell, quantity, type, expiry, strikePrice, costBasis) {
                var position = new Position(self.ulCode, buyOrSell, quantity, type, expiry, strikePrice, costBasis, self.chain);
                self.positions.push(position);
                return self;
            };

            self.removePosition = function (position) {
                //if (self.positions().length <= 1) {
                //	return;
                //}
                for (var k in position) {
                    if (position.hasOwnProperty(k) && typeof (position[k].dispose) === 'function') {
                        position[k].dispose();
                    }
                }
                self.positions.remove(position);
            }

            self.initPositions = function (originalLegs, isInitial) {
                if (originalLegs && originalLegs.length) {
                    $.each(originalLegs, function (i, leg) {
                        if (isInitial) {
                            self.originalLegs.push({
                                buyOrSell: leg.buyOrSell,
                                quantity: leg.quantity,
                                legType: leg.legType,
                                expiry: leg.expiry,
                                strikePrice: leg.strikePrice,
                                costBasis: leg.costBasis
                            });
                        }
                        //self.addPosition(leg.buyOrSell, leg.quantity, leg.legType, leg.expiry, leg.strikePrice, leg.costBasis);
                    });
                    var positions = originalLegs.map(function (leg) {
                        return new Position(self.ulCode, leg.buyOrSell, leg.quantity, leg.legType, leg.expiry, leg.strikePrice, leg.costBasis, self.chain);
                    });
                    self.positions(positions);
                    self.updateStockPriceRange();
                }
            }

            self.multiplier = self.computed(function () {
                var multipliers = self.positions().map(function (pos) {
                    return pos.quotation().multiplier;
                });
                // assume the multiplier is identical for options of the underlying. 1 for security.
                var multiplier = Math.max.apply(this, multipliers);
                return multiplier || 1;
            });//.extend({ rateLimit: 0 });

            self.extractedPositions = self.computed(function () {
                return combinationHelpers.extractPositions(self);
            });//.extend({ rateLimit: 0 });

            self.matchedTemplate = self.computed(function () {
                var eiganvalue = combinationHelpers.combinationEigenvalue(self);
                var template = strategyTemplates.templateMap[eiganvalue];
                return template || null;
            });//.extend({ rateLimit: 0 });

            self.buyOrSell = self.computed(function () {
                var specialStrategy = checkSpecialStrategies();
                if (specialStrategy) {
                    return specialStrategy.buyOrSell;
                }
                if (self.matchedTemplate()) {
                    return self.matchedTemplate().buyOrSell;
                } else {
                    return enums.BUY;
                }
            });//.extend({ rateLimit: 0 });

            self.absQuantity = ko.computed({
                read: function () {
                    var quantities = self.extractedPositions().map(function (pos) {
                        return Math.abs(pos.quantity);
                    });
                    var minQuantity = Math.min.apply(self, quantities);
                    if (!isFinite(minQuantity) || isNaN(minQuantity)) {
                        minQuantity = 0;
                    }

                    var lgd = 1;
                    for (var i = 2; i <= minQuantity; i++) {
                        var canBeDivided = true;
                        for (var j = 0; j < quantities.length; j++) {
                            if (quantities[j] % i !== 0) {
                                canBeDivided = false;
                            }
                        };
                        if (canBeDivided) {
                            lgd = i;
                        }
                    }
                    return lgd;
                },
                write: function (newVal) {
                    newVal = parseInt(newVal);
                    if (newVal < 1) {
                        return;
                    }
                    var combinationQty = self.absQuantity();
                    self.positions().forEach(function (item) {
                        var currentQty = item.absQuantity();
                        item.absQuantity(parseInt(currentQty * newVal / combinationQty));
                        //item.absQuantity(combinationQty);
                    });
                }
            }, self).extend({ rateLimit: 0 });

            self.quantityDisplayed = this.computed(function () {
                if (self.absQuantity() === 1
                    && self.extractedPositions().length === 1
                    && self.extractedPositions()[0].legType !== SECURITY) {
                    return '';
                }
                return self.absQuantity();
            });

            this.expiry = ko.observable(null);
            this.expiration = self.computed(function () {
                var expiry = self.expiry();
                if (!expiry) {
                    if (self.chain) {
                        expiry = self.chain.findExpiry(new Date(), 0, Combination.defaultDays || 0).date;
                    }
                }
                return expiry;
            });
            self.expiries = ko.computed(function () {
                self.expiry(null);
                var expires = self.extractedPositions().map(function (pos) {
                    if (pos.type.toUpperCase() === enums.SECURITY) {
                        return null;
                    } else {
                        localizer.activeLocale(); //subscribe active locale.
                        if (!self.expiry() || pos.expiry.getTime() < self.expiry().getTime()) {
                            self.expiry(pos.expiry);
                            self.updateStockPriceRange();
                        }
                        return pos.expiry;//formatting.formatDate(pos.expiry, 'MMM');
                    }
                });
                return combinationHelpers.uniqueArray(
                            expires.filter(function (expiry) {
                                return expiry != null;
                            }));
            }, self);
            self.strikes = ko.computed(function () {
                var strikes = self.extractedPositions().map(function (pos) {
                    if (pos.type.toUpperCase() === enums.SECURITY) {
                        return null;
                    } else {
                        return pos.strikePrice;
                    }
                });
                strikes = combinationHelpers.uniqueArray(
                            strikes.filter(function (strike) {
                                return strike != null;
                            }));
                return strikes.sort(function (a, b) { return a - b; });
            }, self);
            self.strategyName = ko.computed(function () {
                var specialStrategy = checkSpecialStrategies();
                if (specialStrategy) {
                    return specialStrategy.strategyName;
                }
                if (self.matchedTemplate()) {
                    return self.matchedTemplate().template.name.replace('Stock', self.absQuantity() == 1 ? 'Share' : 'Shares');
                } else {
                    return 'Custom Strategy';
                }
            }, self);

            self.expiriesStrikes = this.computed(function () {
                var expiries = self.expiries().map(function (expiry) {
                    var formattedDate = formatting.formatDate(expiry, 'MMM');
                    return formattedDate;
                }).join('/');
                var strikes = self.strikes().join('/');
                return expiries + ' ' + strikes;
            });

            self.summary = ko.computed(function () {
                return JSON.stringify(self.extractedPositions());
            }, self).extend({ rateLimit: 1 });

            self.updateStockPriceRange = function () {
                dataContext.quotation.get(self.ulCode).done(function () {
                    dataContext.standardDeviations.get(self.ulCode).done(function (standardDeviations) {
                        var expiry = self.expiry();
                        var stdDevsItem = standardDeviations.getStdDevsByExpiry(expiry);
                        if (stdDevsItem) {
                            var stdDevPrices = stdDevsItem.stdDevPrices;
                            self.stockPriceLowerBound(stdDevPrices[1]);
                            self.stockPriceHigherBound(stdDevPrices[4]);
                        } else {
                            dataContext.quotation.get(self.ulCode).done(function (quote) {
                                var last = quote.lastPrice();
                                self.stockPriceLowerBound(last * 0.25);
                                self.stockPriceHigherBound(last * 1.25);
                            });
                        }
                        self.chartPriceRangeReady(true);
                    });
                });
            };

            self.initPositions(legs, true);


            /**
             * payoff outlook
             * @param spotPrice {string} stock spot price to outlook
             * @param dateTime {Date} what if datetime
             * @param whatIfVolatility {number} volatility of underlying to outlook
             */
            self.payoff = getCalculatorFor('payoff', true);

            // #region Greeks
            self.delta = getCalculatorFor('delta');
            self.gamma = getCalculatorFor('gamma');
            self.vega = getCalculatorFor('vega');
            self.theta = getCalculatorFor('theta');
            self.rho = getCalculatorFor('rho');

            self.defaultGreeks = {
                delta: self.deferredComputed(function () {
                    return self.delta();
                }),
                gamma: self.deferredComputed(function () {
                    return self.gamma();
                }),
                theta: self.deferredComputed(function () {
                    return self.theta();
                }),
                vega: self.deferredComputed(function () {
                    return self.vega();
                })
            };
            // #endregion Greeks

            self.breakevenDisplayed = ko.observable();
            self.breakeven = this.computed(function () {
                self.extractedPositions();
                var strikes = self.strikes().slice(0);
                strikes.unshift(0.01);
                strikes.push(self.stockLastPrice() * 10);
                var breakeven = [];
                var isPayoffStraightLine = self.expiries().length <= 1;
                var expiry = self.expiry();
                for (var i = 1; i < strikes.length; i++) {
                    var highSpot = strikes[i];
                    var lowSpot = strikes[i - 1] || 0.01;
                    var lowPayoff = self.payoff(lowSpot, expiry);
                    var highPayoff = self.payoff(highSpot, expiry);
                    if (lowPayoff * highPayoff < 0) {
                        var breakevenValue;
                        if (isPayoffStraightLine) {
                            var k = (highPayoff - lowPayoff) / (highSpot - lowSpot);
                            breakevenValue = lowSpot - lowPayoff / k;
                        } else {
                            var currentSpot = (lowSpot + highSpot) / 2;
                            var currentPayoff = self.payoff(currentSpot, expiry);
                            var lowBound = lowSpot;
                            var highBound = highSpot;
                            while (highBound - lowBound > 0.01) {
                                if (currentPayoff * lowPayoff < 0) {
                                    highBound = currentSpot;
                                } else if (currentPayoff * highPayoff < 0) {
                                    lowBound = currentSpot;
                                } else {
                                    break;
                                }

                                currentSpot = (lowBound + highBound) / 2;
                                lowPayoff = self.payoff(lowBound, expiry);
                                highPayoff = self.payoff(highBound, expiry);
                                currentPayoff = self.payoff(currentSpot, expiry);
                            }
                            breakevenValue = currentSpot;
                        }

                        breakeven.push(formatting.roundNumber(breakevenValue));
                    } else if (highPayoff == 0) {
                        breakeven.push(formatting.roundNumber(highSpot));
                    } else if (lowPayoff == 0) {
                        breakeven.push(formatting.roundNumber(lowSpot));
                    }
                }

                var lowest = self.stockPriceLowerBound.peek();
                var highest = self.stockPriceHigherBound.peek();
                breakeven = breakeven.filter(function (value) {
                    return value >= lowest && value <= highest;
                });
                breakeven = helpers.uniqueArray(breakeven);
                var breakevenDisplayed = breakeven.map(function (value) {
                    return formatting.toFractionalCurrency(value);
                }).join(', ');
                self.breakevenDisplayed(breakevenDisplayed);
                return breakeven;
            }, self);

            self.breakevenDesc = ko.observable('');
            self.breakevenLabel = this.computed(function () {
                var breakevens = self.breakeven().length;
                if (breakevens <= 1) {
                    return 'Breakeven: ';
                } else if (breakevens === 2) {
                    return 'Breakevens: ';
                } else {
                    return 'B/E: ';
                }
            }, self);

            self.sentimentProfile = ko.observable('');

            // todo: need standard deviation information to get accurate sentiment.
            self.sentiment = ko.computed(function () {
                var perihelion = self.payoff(0.1);
                //var aphelion = self.payoff(10000);
                var aphelion = self.payoff(self.highSpotBound);
                var focus = self.breakeven().length === 2 ? self.payoff((self.breakeven()[0] + self.breakeven()[1]) / 2) : 0;
                if (perihelion > 1 && aphelion > 1) {
                    return 'sharp-move';
                } else if (perihelion >= 1 && aphelion < 1) {
                    return 'bearish';
                } else if (perihelion < 1 && aphelion >= 1) {
                    return 'bullish';
                } else if (focus >= 1) {
                    return 'neutral';
                }
                return 'unknown';
            }, self);

            self.sentiments = ko.computed(function () {
                var matchedTemplate = self.matchedTemplate();
                if (matchedTemplate) {
                    if (matchedTemplate.buyOrSell == enums.BUY) {
                        return [
                            matchedTemplate.template.buyDetails.firstSentiment,
                            matchedTemplate.template.buyDetails.secondSentiment,
                            matchedTemplate.template.buyDetails.thirdSentiment
                        ];
                    } else {
                        return [
                            matchedTemplate.template.sellDetails.firstSentiment,
                            matchedTemplate.template.sellDetails.secondSentiment,
                            matchedTemplate.template.sellDetails.thirdSentiment
                        ];
                    }
                } else {
                    return [];
                }
            }, self);

            self.sentiments = this.computed(function () {
                var lastPrice = self.stockLastPrice();
                var sentiments = [];
                var perihelion = self.payoff(0.1);
                var aphelion = self.payoff(self.highSpotBound);
                //if (aphelion == 0)
                ///   aphelion = 10;
                var breakeven = self.breakeven();
                var focus = breakeven.length === 2 ? self.payoff((breakeven[0] + breakeven[1]) / 2, self.expiration()) : 0;
                focus = breakeven.length === 4 ? self.payoff((breakeven[1] + breakeven[2]) / 2, self.expiration()) : focus;
                var expiry = self.expiration();
                var sds = self.stdDev.getStdDevsByExpiry(expiry);
                sds = sds && sds.stdDevPrices;
                if (breakeven.length === 2 && perihelion > 1 && aphelion > 1) {
                    sentiments.push('sharp-move');
                    if (Math.min.apply(this, breakeven) >= lastPrice) {
                        self.sentimentProfile('bearish sharp-move');
                    } else if (Math.max.apply(this, breakeven) <= lastPrice) {
                        self.sentimentProfile('bullish sharp-move');
                    } else {
                        self.sentimentProfile('sharp move');
                    }
                    //self.breakevenDesc('below ' + formatting.toFractionalCurrency(breakeven[0])
                    //	+ ' or above ' + formatting.toFractionalCurrency(breakeven[1]));
                    self.breakevenDesc('低于' + formatting.toFractionalCurrency(breakeven[0])
                        + '或高于' + formatting.toFractionalCurrency(breakeven[1]));
                } else if (perihelion >= 1 && aphelion < 1) {
                    sentiments.push('bearish');
                    if (!sds)
                        self.sentimentProfile('bearish');
                    else {
                        if ((lastPrice - breakeven[0]) <= (lastPrice - sds[2]) * 0.75) {
                            self.sentimentProfile('bearish');
                        } else {
                            self.sentimentProfile('very bearish');
                        }
                    }
                    //self.breakevenDesc('below ' + formatting.toFractionalCurrency(breakeven[0]));
                    self.breakevenDesc('低于' + formatting.toFractionalCurrency(breakeven[0]));
                } else if (perihelion < 1 && aphelion >= 1) {
                    sentiments.push('bullish');
                    if (!sds)
                        self.sentimentProfile('bullish');
                    else {
                        if ((breakeven[0] - lastPrice) <= (sds[3] - lastPrice) * 0.75) {
                            self.sentimentProfile('bullish');
                        } else {
                            self.sentimentProfile('very bullish');
                        }
                    }
                    //self.breakevenDesc('above ' + formatting.toFractionalCurrency(breakeven[0]));
                    self.breakevenDesc('高于' + formatting.toFractionalCurrency(breakeven[0]));
                } else if (focus >= 1) {
                    sentiments.push('neutral');
                    if (Math.min.apply(this, breakeven) >= lastPrice) {
                        self.sentimentProfile('bullish neutral');
                    } else if (Math.max.apply(this, breakeven) <= lastPrice) {
                        self.sentimentProfile('bearish neutral');
                    } else {
                        self.sentimentProfile('neutral');
                    }
                    //self.breakevenDesc('between ' + formatting.toFractionalCurrency(breakeven[0])
                    //	+ ' and ' + formatting.toFractionalCurrency(breakeven[1]));
                    self.breakevenDesc('介于' + formatting.toFractionalCurrency(breakeven[0])
                        + '到' + formatting.toFractionalCurrency(breakeven[1]) + '之间');
                }
                self.sentimentProfile(localizer.localize('strategies.' + self.sentimentProfile()));
                return sentiments;
            }, self);

            self.riskProfile = ko.observable();
            self.rewardProfile = ko.observable();
            self.riskDesc = ko.observable();
            self.rewardDesc = ko.observable();
            self.maxRisk = self.computed(function () {
                var lowPayoff = self.payoff(0.1);
                var lowPayoff2 = self.payoff(0.2);
                var highPayoff = self.payoff(self.highSpotBound);
                var highPayoff2 = self.payoff(self.highSpotBound + 0.1);
                if (highPayoff2 - highPayoff < -0.5 && highPayoff2 < 0.01) {
                    //self.riskProfile('unlimited');
                    self.riskProfile('无限');
                    //self.riskDesc('unlimited risk');
                    self.riskDesc('无限损失');
                    return 'Unlimited';
                } else if (lowPayoff - lowPayoff2 < -0.01 && lowPayoff < -0.01) {
                    //self.riskProfile('substantial');
                    self.riskProfile('实质');
                    var substantialRisk = self.payoff(0);
                    //self.riskDesc('substantial risk of ' + formatting.toIntCurrency(Math.abs(substantialRisk)));
                    self.riskDesc('实质损失' + formatting.toIntCurrency(Math.abs(substantialRisk)));
                    return substantialRisk;
                } else {
                    //self.riskProfile('limited');
                    self.riskProfile('有限');
                    var strikes = self.strikes().slice(0);
                    strikes.push(0);
                    strikes.push(self.highSpotBound);
                    var payoffes = strikes.map(function (k) { return self.payoff(k); });
                    payoffes.push(0);
                    var limit = Math.abs(Math.min.apply(this, payoffes));
                    //self.riskDesc('limited risk of ' + formatting.toIntCurrency(Math.abs(limit)));
                    self.riskDesc('有限损失' + formatting.toIntCurrency(Math.abs(limit)));
                    return limit;
                }
            });
            self.maxReward = self.computed(function () {
                var lowPayoff = self.payoff(0.1);
                var lowPayoff2 = self.payoff(0.2);
                var highPayoff = self.payoff(self.highSpotBound);
                var highPayoff2 = self.payoff(self.highSpotBound + 0.1);
                if (highPayoff2 - highPayoff > 0.5 && highPayoff2 > 0.01) {
                    //self.rewardProfile('unlimited');
                    self.rewardProfile('无限');
                    //self.rewardDesc('unlimited profit potential');
                    self.rewardDesc('无限收益');
                    return 'Unlimited';
                } else if (lowPayoff - lowPayoff2 > 0.01 && lowPayoff > 0.01) {
                    //self.rewardProfile('substantial');
                    self.rewardProfile('实质');
                    var substantialReward = self.payoff(0);
                    //self.rewardDesc('substantial potential reward of ' + formatting.toIntCurrency(substantialReward));
                    self.rewardDesc('实质收益' + formatting.toIntCurrency(substantialReward));
                    return substantialReward;
                } else {
                    //self.rewardProfile('limited');
                    self.rewardProfile('有限');
                    var strikes = self.strikes().slice(0);
                    strikes.push(0);
                    strikes.push(self.highSpotBound);
                    var payoffes = strikes.map(function (k) { return self.payoff(k); });
                    payoffes.push(0);
                    var limit = Math.max.apply(this, payoffes);
                    //self.rewardDesc('limited potential reward of ' + formatting.toIntCurrency(limit));
                    self.rewardDesc('有限收益' + formatting.toIntCurrency(limit));
                    return limit;
                }
            });


            self.maxRewardDisplayed = self.computed(riskRewardFormatting(this.maxReward));
            self.maxRiskDisplayed = self.computed(riskRewardFormatting(this.maxRisk));

            self.rr = ko.computed(function () {
                //if (self.riskProfile() == 'unlimited' || self.rewardProfile() == 'unlimited') {
                if (self.riskProfile() == '无限' || self.rewardProfile() == '无限') {
                    return 'N/A';
                } else {
                    return formatting.toFractionalString(Math.abs(self.maxReward() / self.maxRisk()));
                }
            }, self).extend({ rateLimit: 0 });

            self.ask = ko.computed(function () {
                var result = 0;
                self.positions().forEach(function (pos) {
                    result += pos.price() * pos.quantity();
                });
                return result / self.absQuantity();
            }, self).extend({ rateLimit: 0 });

            this.bid = ko.computed(function () {
                var result = 0;
                self.positions().forEach(function (pos) {
                    result += pos.sellPrice() * pos.quantity();
                });
                return result / self.absQuantity();
            }, self).extend({ rateLimit: 0 });

            self.currentPrice = ko.computed(function () {
                var result = 0;
                self.positions().forEach(function (pos) {
                    result += pos.price() * pos.quantity() * pos.quotation().multiplier;
                });
                return result;
            }, self).extend({ rateLimit: 0 });

            self.askPrice = self.computed(function () {
                var askPrice = Math.max(Math.abs(self.ask()), Math.abs(self.bid()));
                return askPrice;
            });
            self.bidPrice = self.computed(function () {
                var bidPrice = Math.min(Math.abs(self.bid()), Math.abs(self.ask()));
                return bidPrice;
            });
            self.midPrice = self.computed(function () {
                var midPrice = (self.askPrice() + self.bidPrice()) / 2;
                return midPrice;
            });

            self.cost = ko.computed(function () {
                var result = 0;
                self.positions().forEach(function (pos) {
                    var costBasisi = pos.costBasis() || pos.price();
                    result += costBasisi * pos.quantity() * pos.quotation().multiplier;
                });
                return result;
            }, self).extend({ rateLimit: 0 });

            self.debitOrCredit = ko.computed(function () {
                return self.currentPrice() > 0 ? 'debit' : 'credit';
            }, this).extend({ rateLimit: 0 });

            self.costWithoutOwned = self.computed(function () {
                var result = 0;
                self.extractedPositions().forEach(function (pos) {
                    result += pos.price * (pos.quantity - pos.ownedQuantity) * pos.multiplier;
                });
                return result;
            });

            self.whatifValatility = ko.observable();

            self.fullName = self.computed(function () {
                var fullName = localizer.localize('trade.' + self.buyOrSell()) + ' ' + self.absQuantity() + ' ' + self.ulCode + ' '
                                + self.expiriesStrikes() + ' ' + localizer.localize('strategies.' + self.strategyName());
                return fullName.replace(/[ ]+/g, ' ').trim();
            });

            self.longName = self.computed(function () {
                return self.fullName().replace('Buy ', '').replace('Sell ', '');
            });

            self.profitProbVal = self.computed(function () {
                var bes = self.breakeven().slice(0);
                var expiry = self.expiration();
                var daysToMaturity = formatting.daysFromNow(expiry);
                var prob = self.predictions.getProb(daysToMaturity);
                if (prob) {
                    bes.push(0);
                    bes.push(prob.prices[prob.prices.length - 1] * 3);
                    bes.sort(function (a, b) {
                        return a - b;
                    });
                    var profitProb = 0;
                    for (var i = 0; i < bes.length - 1; i++) {
                        var midPrice = (bes[i] + bes[i + 1]) / 2;
                        var midPayout = self.payoff(midPrice, expiry);
                        if (midPayout > 0) {
                            profitProb += prob.probBetween(bes[i], bes[i + 1]);
                        }
                    }

                    return profitProb;
                }
                return null;
            });

            self.profitProb = self.computed(function () {
                var probability = self.profitProbVal();
                if (typeof probability !== "number")
                    return '--';
                probability *= 100;
                return probability.toFixed(2) + '%';
            });

            self.isCalendar = self.computed(function () {
                return self.expiries().length > 1;
            });

            self.daysToExpire = self.computed(function () {
                var expiry = self.expiry();
                if (self.positions().length < 1 || (self.positions().length == 1 && self.positions()[0].type() == SECURITY) || !expiry) {
                    return 'N/A';
                }
                var days = formatting.daysFromNow(expiry);
                return days;
            });

            self.openInt = self.computed(function () {
                var openInt = 0;
                self.positions().forEach(function (pos) {
                    if (pos.type() !== enums.LegType.SECURITY) {
                        openInt += pos.quotation().openInterest;
                    }
                });
                return openInt;
            });
            self.volume = self.computed(function () {
                var volume = 0;
                self.positions().forEach(function (pos) {
                    if (pos.type() !== enums.LegType.SECURITY) {
                        volume += pos.quotation().volume();
                    }
                });
                return volume;
            });

            self.hasStock = ko.observable(false);
            self.hasStxAndOpt = self.computed(function () {
                var hasStock = false;
                var hasOption = false;
                $.each(self.positions(), function (i, pos) {
                    if (pos.type() === enums.LegType.CALL || pos.type() === enums.LegType.PUT) {
                        hasOption = true;
                    }
                    else if (pos.type() === enums.LegType.SECURITY) {
                        hasStock = true;
                    }
                });
                self.hasStock(hasStock);
                return hasStock && hasOption;
            });
            self.hasOnlyStx = self.computed(function () {
                var result = true;
                $.each(self.positions(), function (i, pos) {
                    if (pos.type() !== enums.LegType.SECURITY) {
                        result = false;
                    }
                });
                return result;
            });

            self.spread = self.computed(function () {
                var ask = self.askPrice(), bid = self.bidPrice();
                return ask - bid;
            });
            self.spreadPercent = self.computed(function () {
                return (self.spread() / self.askPrice() * 100).toFixed(2) + '%';
            });

            self.deltaDetails = self.computed(function () {
                var deltaDetails = {};

                if (self.positions().length > 0) {
                    var delta = self.defaultGreeks.delta();
                    var theta = self.defaultGreeks.theta();
                    deltaDetails.sentiment = self.sentiments().length > 0 ? formatting.capitaliseFirstLetter(self.sentiments()[0]) : 'Unknown Sentiment';
                    //deltaDetails.riskProfile = formatting.capitaliseFirstLetter(self.riskProfile()) + '风险';
                    deltaDetails.riskProfile = self.riskProfile() + '风险';
                    deltaDetails.symbol = self.ulCode;
                    deltaDetails.stockDirection = delta >= 0 ? '涨' : '跌';
                    delta = Math.abs(delta);
                    deltaDetails.deltaAOrAn = formatting.aOrAn(delta);
                    deltaDetails.formattedDelta = formatting.toFractionalCurrency(Math.abs(delta));
                    deltaDetails.dotOrComma = self.matchedTemplate() && self.matchedTemplate().template.name == 'Stock';
                    //deltaDetails.andOrBut = theta < 0 ? 'but' : 'and';
                    deltaDetails.andOrBut = theta < 0 ? '但是' : '并且';
                    //deltaDetails.lossOrGain = theta < 0 ? 'lose' : 'gain';
                    deltaDetails.lossOrGain = theta < 0 ? '损失' : '获利';
                    deltaDetails.formattedTheta = formatting.toFractionalCurrency(Math.abs(theta));
                    deltaDetails.breakeventDesc = self.breakevenDesc();
                    return deltaDetails;
                } else {
                    return null;
                }
            });


            //#region OpScore

            self.opScore = self.deferredComputed(function () {
                self.outlookBoundChangedFlag();
                var lowSpot = self.outlookPriceLowerBound();
                var highSpot = self.outlookPriceHigherBound();
                if (!self.chain) {
                    return 100;
                }
                if (self.outlookLowPercent && self.outlookLowPercent()) {
                    var daysToMaturity = formatting.daysFromNow(self.expiration());
                    var prob = self.predictions.getProb(daysToMaturity);
                    lowSpot = prob.price(self.outlookLowPercent());
                    highSpot = prob.getSymmetricPrice(lowSpot);
                }
                var spots = self.strikes().filter(function (strike) {
                    return strike >= lowSpot && strike <= highSpot;
                });
                spots.push(lowSpot);
                spots.push(highSpot);
                var spotPayoffs = spots.map(function (spot) {
                    return self.payoff(spot, self.expiration());
                });
                var maxRisk = Math.min.apply(self, spotPayoffs);
                maxRisk = maxRisk > 0 ? 0 : Math.abs(maxRisk);
                var maxReward = Math.max.apply(self, spotPayoffs);
                maxReward = maxReward < 0 ? 0 : maxReward;
                var opScore = maxReward != 0 && maxRisk != 0 ? (1 + maxReward / maxRisk) * self.profitProbVal() * 100 : maxReward == 0 ? 0 : 100;
                return opScore > 200 ? 200 : opScore;
            }).extend({ rateLimit: 100 });

            self.opScoreCssClass = self.deferredComputed(function () {
                var opScore = Math.round(self.opScore());
                // opScore >= 100
                if (opScore >= 100) {
                    return 'good';
                }
                // 80 <= opScore < 100
                if (opScore >= 80) {
                    return 'not-bad';
                }
                // opScore < 80
                return 'poor';
            });

            self.opScoreFormatted = self.deferredComputed(function () {
                var opScore = self.opScore().toFixed(0);
                return opScore;
            });

            self.opScoreExplanation = self.deferredComputed(function () {
                var opScore = Math.round(self.opScore());
                // opScore >= 100
                if (opScore >= 100) {
                    return 'Good';
                }
                // 80 <= opScore < 100
                if (opScore >= 80) {
                    return 'Not Bad';
                }
                // opScore < 80
                return 'Poor';
            });

            //#endregion OpScore

            self.extransicValue = self.computed(function () {
                var extrinsic = 0;
                if (self.strategyName().match(/put/i)) {
                    extrinsic = self.extractedPositions()[0].price;
                } else if (self.strategyName().match(/covered call/i) && self.extractedPositions().length == 2) {
                    extrinsic = self.extractedPositions()[1].price;
                }
                return extrinsic;
            });

            self.rawReturn = self.computed(function () {
                var extrinsic = self.extransicValue();
                if (extrinsic > 0) {
                    var re = (extrinsic / self.quote.last());
                    re = re * 100;
                    if (!isNaN(re))
                        return re;
                }
                return 0;
            });

            self.annualizedReturn = self.computed(function () {
                var extrinsic = self.extransicValue();
                //avoid divide by zero
                var selflast = self.quote.last() ? self.quote.last() : 1;
                if (extrinsic > 0) {


                    var re = (extrinsic / selflast);
                    re = re / (self.daysToExpire() / 365) * 100;

                    if (!isNaN(re))
                        return re;
                }
                return 0;
            });

            self.worthlessProb = self.computed(function () {
                if (self.strategyName().match(/covered call/i)) {
                    var daysToMaturity = formatting.daysFromNow(self.expiration());
                    var prob = self.predictions.getProb(daysToMaturity);
                    return prob.prob(self.strikes()[0]);
                }
                if (self.strategyName().toUpperCase() === 'PUT' && self.buyOrSell().toUpperCase() === 'SELL') {
                    daysToMaturity = formatting.daysFromNow(self.expiration());
                    prob = self.predictions.getProb(daysToMaturity);
                    return 1 - prob.prob(self.strikes()[0]);
                }
                return 0;
            });

            self.returnSentence = self.computed(function () {
                var ar = self.annualizedReturn(), sentence = '';
                var returnDetails = null;
                ar = ar.toFixed(2) + '%';
                var positions = self.extractedPositions(), i = 0, pos = null;
                for (; i < positions.length; i++) {
                    if (positions[i].legType != SECURITY && positions[i].quantity < 0) {
                        pos = positions[i];
                        break;
                    }
                }
                if (pos) {
                    var premium = Math.abs(pos.price * pos.quantity * pos.multiplier);
                    returnDetails = {};
                    returnDetails.expiry = pos.expiry;
                    returnDetails.strike = pos.strikePrice;
                    returnDetails.type = pos.legType + (Math.abs(pos.quantity) > 1 ? 'S' : '');
                    returnDetails.premium = premium;
                    returnDetails.quantityDesc = (Math.abs(pos.quantity) > 1 ? '. ' : ' for each contract sold. ');
                    returnDetails.aOrAn = formatting.aOrAn(self.annualizedReturn());
                    returnDetails.annualizedReturn = ar;
                    returnDetails.anOrAnProb = formatting.aOrAn(parseFloat(self.worthlessProb() * 100));
                    returnDetails.pow = formatting.roundNumber((self.worthlessProb() * 100));
                    // todo: move markup into *html files
                    sentence += 'Selling the <b>' + formatting.formatDate(pos.expiry) + ' ' + formatting.toFractionalCurrency(pos.strikePrice) + ' ' + pos.legType + (Math.abs(pos.quantity) > 1 ? 'S' : '') + '</b>';
                    sentence += ' will generate <b>' + formatting.toFractionalCurrency(premium) + '</b> in premium' + (Math.abs(pos.quantity) > 1 ? '. ' : ' for each contract sold. ');
                    sentence += 'They ' + ' produce ' + formatting.aOrAn(self.annualizedReturn()) + ' <b>' + ar + '</b> annualized return and based on historical volatility have ' + formatting.aOrAn(parseFloat(self.worthlessProb() * 100)) + ' ';
                    sentence += '<b>' + (formatting.roundNumber((self.worthlessProb() * 100))) + '%</b> chance of expiring worthless.';
                }
                return sentence;
            });

            self.width = self.computed({
                read: function () {
                    if (!self.expiry()) {
                        return 0;
                    }
                    var left, right;
                    switch (self.strikes().length) {
                        case 2:
                            left = self.strikes()[0];
                            right = self.strikes()[1];
                            break;
                        case 4:
                            left = self.strikes()[1];
                            right = self.strikes()[2];
                            break;
                        default:
                            return 0;
                    }
                    var strikeList = self.chain.strikeListExpiry(self.expiry());
                    var width = 0;
                    strikeList && strikeList.forEach(function (strike) {
                        if (left <= strike && strike < right) {
                            width++;
                        }
                    });
                    return width;
                }
            });

            self.wingspanLeft = self.computed({
                read: function () {
                    if (!self.expiry()) {
                        return 0;
                    }
                    var left, right;
                    switch (self.strikes().length) {
                        case 3:
                        case 4:
                            left = self.strikes()[0];
                            right = self.strikes()[1];
                            break;
                        default:
                            return 0;
                    }
                    var strikeList = self.chain.strikeListExpiry(self.expiry());
                    var width = 0;
                    strikeList && strikeList.forEach(function (strike) {
                        if (left <= strike && strike < right) {
                            width++;
                        }
                    });
                    return width;
                }
            });

            self.wingspanRight = self.computed({
                read: function () {
                    if (!self.expiry()) {
                        return 0;
                    }
                    var left, right;
                    switch (self.strikes().length) {
                        case 3:
                            left = self.strikes()[1];
                            right = self.strikes()[2];
                            break;
                        case 4:
                            left = self.strikes()[2];
                            right = self.strikes()[3];
                            break;
                        default:
                            return 0;
                    }
                    var strikeList = self.chain.strikeListExpiry(self.expiry());
                    var width = 0;
                    strikeList && strikeList.forEach(function (strike) {
                        if (left <= strike && strike < right) {
                            width++;
                        }
                    });
                    return width;
                }
            });

            self.canCustomizeWidth = self.computed(function () {
                var result = self.matchedTemplate() && self.matchedTemplate().template.canCustomizeWidth;
                return result;
            });

            self.canShrinkWidth = self.computed(function () {
                var result = self.matchedTemplate() && self.matchedTemplate().template.canCustomizeWidth;
                return result && self.width() > 1;
            });

            self.canExpandWidth = self.computed(function () {
                var result = self.matchedTemplate() && self.matchedTemplate().template.canCustomizeWidth;
                if (result && self.expiry()) {
                    var strikes = self.strikes();
                    var strikeList = self.chain.strikeListExpiry(self.expiry());
                    if (strikeList.indexOf(strikes[0]) == 0 && strikeList.indexOf(strikes[strikes.length - 1]) == strikeList.length - 1) {
                        return false;
                    }
                    return true;
                }
                return result;
            });

            self.canCustomizeWingspan = self.computed(function () {
                var result = self.matchedTemplate() && self.matchedTemplate().template.canCustomizeWingspan;
                return result;
            });

            self.canShrinkWingspan = self.computed(function () {
                var result = self.canCustomizeWingspan();
                return result && (self.wingspanLeft() > 1 || self.wingspanRight() > 1);
            });

            self.canExpandWingspan = self.computed(function () {
                var result = self.canCustomizeWingspan();
                var extractedPositions = self.extractedPositions();
                if (result && self.expiry()) {
                    extractedPositions.forEach(function (pos) {
                        var expiry = pos.expiry;
                        if (expiry) {
                            var strike = pos.strikePrice;
                            var strikeList = self.chain.strikeListExpiry(expiry);
                            if (strikeList.indexOf(strike) == 0 || strikeList.indexOf(strike) == strikeList.length - 1) {
                                result = false;
                            }
                        }
                    });
                    return result;
                }
                return result;
            });

            var parentDispose = self.dispose;
            self.dispose = function () {
                for (var i = 0; i < self.positions() ; i++) {
                    self.positions()[i].dispose();
                }
                parentDispose();
            };

            self.ready.resolve();
        }

        var quotationDeferred = dataContext.quotation.get(self.ulCode);
        var stdDevDeferred = dataContext.standardDeviations.get(self.ulCode);
        var predictionsDeferred = dataContext.predictions.get(self.ulCode);
        var chainsDeferred = dataContext.optionChains.get(this.ulCode);
        $.when(quotationDeferred, stdDevDeferred, predictionsDeferred, chainsDeferred).done(function (quote, stdDev, predictions, chain) {
            if (typeof (quote.last) === 'undefined') {
                quote.last = quote.lastPrice;
            }
            self.quote = quote;
            self.stockLastPrice = quote.lastPrice;
            self.highSpotBound = quote.last() * 10;

            self.stdDev = stdDev;

            self.predictions = predictions;

            self.chain = chain;

            self.initCombination();
        });

        function checkSpecialStrategies() {
            var result = null;
            var positions = self.extractedPositions();
            //check for Covered Call
            if (positions.length == 2) {
                var secPos = positions.filter(function (pos) {
                    return pos.legType == SECURITY;
                })[0];
                var callPos = positions.filter(function (pos) {
                    return pos.legType == CALL;
                })[0];
                if (secPos && callPos && secPos.quantity > 0 && callPos.quantity < 0) {
                    if (secPos.quantity / self.multiplier() >= -callPos.quantity) {
                        result = {
                            strategyName: 'Covered Call',
                            absQuantity: -callPos.quantity
                        };
                        if (secPos.ownedQuantity / self.multiplier() >= -callPos.quantity) {
                            result.buyOrSell = 'Sell';
                        } else {
                            result.buyOrSell = 'Buy';
                        }
                    }
                }
            }
            return result;
        }



        /**
		 * payoff outlook
		 * @param spotPrice {string} stock spot price to outlook
		 * @param dateTime {Date} what if datetime
		 * @param whatIfVolatility {number} volatility of underlying to outlook
		this.payoff = function (spotPrice, dateTime, whatIfVolatility) {
			var result = 0;
			for (var i = 0;i < self.positions().length; i++) {
				var pos = self.positions()[i];
				var expiry = pos.expiry();
				var yearToMaturity = dateTime && expiry && typeof (dateTime.getTime) === 'function' ?
										(expiry.getTime() - dateTime.getTime()) / (365 * 24 * 3600 * 1000)
										: 0;
				result += pos.payoff(spotPrice, yearToMaturity, whatIfVolatility) * pos.quantity() * pos.quotation().multiplier;
			}
			return result;
		};
		 */

        function getYearToMaturity(dateTime, expiry) {
            if (!dateTime || !expiry || typeof (dateTime.getTime) !== 'function') {
                return 0;
            }
            // if dates are the same, then we can assume that user means expiry.
            if (formatting.compareDates(dateTime, expiry) === 0) {
                return 0;
            }
            var yearToMaturity = (expiry.getTime() - dateTime.getTime()) / (365 * 24 * 3600 * 1000);
            return yearToMaturity;
        }

        function getAggregated(functionName, spotPrice, dateTime, volatility, useExpiryByDefault) {
            spotPrice = spotPrice == null
				? self.stockLastPrice()
				: spotPrice;
            dateTime = dateTime || (useExpiryByDefault ? self.expiration() : new Date());
            var result = 0;
            self.positions().forEach(function (position) {
                var expiry = position.expiry();
                var yearToMaturity = getYearToMaturity(dateTime, expiry);
                result += position[functionName].call(position, spotPrice, yearToMaturity, volatility) * position.quantity() * position.quotation().multiplier;
            });
            return result;
        };

        function getCalculatorFor(functionName, useExpiryByDefault) {
            return function (spotPrice, dateTime, volatility) {
                return getAggregated(functionName, spotPrice, dateTime, volatility, useExpiryByDefault);
            }
        }


        function riskRewardFormatting(observable) {
            return function () {
                var value = observable();
                if (value === 'Unlimited') {
                    //return value;
                    return "无限";
                }

                return formatting.toFractionalCurrency(Math.abs(value));
            };
        }
    };

    return Combination;
});