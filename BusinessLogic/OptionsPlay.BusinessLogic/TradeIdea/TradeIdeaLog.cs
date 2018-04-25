using OptionsPlay.Model.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OptionsPlay.BusinessLogic
{
    public class TradeIdeaLog
    {
        public string Symbol { get; set; }

        public DateTime Date { get; set; }

        public List<Tuple<string, object>> Parameters { get; set; }

        public List<string> AdditionalInformation { get; set; }

        public List<TradeIdeaRule> Results { get; set; }

        public TradeIdeaLog(string symbol, TradeIdeasGeneratorArgument argument, DateTime date)
        {
            Symbol = symbol;
            Date = date;
            Results = new List<TradeIdeaRule>();
            AdditionalInformation = new List<string>();
            Parameters = new List<Tuple<string, object>>
				{
					new Tuple<string, object>("LastPrice", argument.LastPrice),
					new Tuple<string, object>("SmaVol(20)", argument.SmaVol20),
					new Tuple<string, object>("Sma(50)", argument.Sma50),
					new Tuple<string, object>("Rsi(14)", argument.Rsi14),
					new Tuple<string, object>("YesterdayRsi(14)", argument.YesterdayRsi14),
					new Tuple<string, object>("Cci(14)", argument.Cci14),
					new Tuple<string, object>("YesterdayCci(14)", argument.YesterdayCci14),
					new Tuple<string, object>("Stoch(14,14,3)", argument.Stoch14),
					new Tuple<string, object>("YesterdayStoch(14,14,3)", argument.YesterdayStoch14),
					new Tuple<string, object>("WillR(14)", argument.WillR14),
					new Tuple<string, object>("YesterdayWillR(14)", argument.YesterdayWillR14),
					new Tuple<string, object>("Mfi(14)", argument.Mfi14),
					new Tuple<string, object>("YesterdayMfi(14)", argument.YesterdayMfi14),
					new Tuple<string, object>("Adx(20)", argument.Adx20),
					new Tuple<string, object>("Atr(20)", argument.Atr20),
					new Tuple<string, object>("RangeStdDev", argument.RangeStdDev),
					new Tuple<string, object>("NearestSupport", argument.NearestSupport),
					new Tuple<string, object>("LtRsi(50)", argument.LtRsi50),
					new Tuple<string, object>("StRsi(5)", argument.StRsi5),
					new Tuple<string, object>("YesterdayStRsi(5)", argument.YesterdayStRsi5),
					new Tuple<string, object>("LtCci(50)", argument.LtCci50),
					new Tuple<string, object>("StCci(5)", argument.StCci5),
					new Tuple<string, object>("YesterdayStCci(5)", argument.YesterdayStCci5),
					new Tuple<string, object>("YesterdayHigh", argument.YesterdayHigh),
					new Tuple<string, object>("YesterdayLow", argument.YesterdayLow),
					new Tuple<string, object>("LongTerm Sentiment", argument.LongTermSentiment),
					new Tuple<string, object>("ShortTerm Sentiment", argument.ShortTermSentiment),
					new Tuple<string, object>("HasOption", argument.HasOption),
				};
        }
    }
}
