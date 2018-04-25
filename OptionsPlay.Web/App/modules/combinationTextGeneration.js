define(['modules/formatting'], function (formatting) {
    var self = {};

    self.generateTradeTicketTitle = function (combination) {
        var title = combination.fullName();
        if (!combination.hasOnlyStx()) {
            title = title.replace('Sell', 'Sell to Open').replace('Buy', 'Buy to Open');
        }
        else {
            if (combination.symbol) {
                title = title.replace(combination.symbol, '');
                title += ' of ' + combination.symbol;
            }
        }
        var cost = combination.costWithoutOwned();
        //title += ' @ ' + formatting.toFractionalCurrency(Math.abs(cost)) + ' ' + (cost >= 0 ? 'Debit' : 'Credit');
        title += ' @ ' + formatting.toFractionalCurrency(Math.abs(cost)) + ' ' + (cost >= 0 ? '借方' : '贷方');
        return title;
    }

    var sharingMessageTemplate = '{0} ${1} Trade: {2}';

    self.generateSharingMessage = function (combination) {
        var sentiment = combination.sentiments()[0] ? formatting.capitaliseFirstLetter(combination.sentiments()[0]) : '';
        var absTradeCost = formatting.toFractionalCurrency(Math.abs(combination.costWithoutOwned()));
        var debitOrCredit = formatting.capitaliseFirstLetter(combination.debitOrCredit());
        var message = formatting.format(sharingMessageTemplate,
			sentiment, //0
			combination.symbol, //1
			self.generateTradeTicketTitle(combination)); //2

        if (message.length > 100) {
            if (sentiment != '') {
                message = message.replace(' ' + sentiment, '');
            }
            message = message.replace(' Trade', '');
        }

        if (message.length > 100) {
            message = message.replace(absTradeCost, '');
            message = message.replace(' ' + debitOrCredit, '');
        }

        return message;
    };

    return self;
});