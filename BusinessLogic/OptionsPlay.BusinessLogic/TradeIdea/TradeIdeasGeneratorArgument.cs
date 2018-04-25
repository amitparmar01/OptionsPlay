using OptionsPlay.MarketData.Common;
using OptionsPlay.MarketData.Indicators;
using OptionsPlay.Model;
using OptionsPlay.Model.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OptionsPlay.MarketData.Indicators.Helpers;
using OptionsPlay.BusinessLogic.MarketDataProcessing.Helpers;

namespace OptionsPlay.BusinessLogic
{
    //todo: move to MarketDataProcessing and remove reference to MarketDataProcessing from BL
    public class TradeIdeasGeneratorArgument
    {
        //lastPrice --> stock's last price
        public double LastPrice { get; set; }
        //averageVolume --> 20 period average volume
        public double SmaVol20 { get; set; }
        //sma50 --> 50 period moving average
        public double Sma50 { get; set; }
        //rsi --> 20 period RSI
        public double Rsi14 { get; set; }
        //yesterdayRsi --> 20 period RSI measure at close yesterday
        public double YesterdayRsi14 { get; set; }
        //cci --> 20 period CCI
        public double Cci14 { get; set; }
        //yesterdayCci --> 20 period CCI measure at close yesterday
        public double YesterdayCci14 { get; set; }
        //stoch --> 20 period Stochastic
        public double Stoch14 { get; set; }
        //yesterdayStoch --> 20 period Stochastic measure at close yesterday
        public double YesterdayStoch14 { get; set; }
        //willr --> 20 period Williams %R
        public double WillR14 { get; set; }
        //yesterdayWillr --> 20 period Williams %R measure at close yesterday
        public double YesterdayWillR14 { get; set; }
        //mfi --> 20 period MFI
        public double Mfi14 { get; set; }
        //yesterdayMfi --> 20 period MFI measure at close yesterday
        public double YesterdayMfi14 { get; set; }
        //adx --> 20 period ADX
        public double Adx20 { get; set; }
        //atr --> 20 period ATR
        public double Atr20 { get; set; }
        //rangeStdDev --> 6-month price range standard deviation
        public double RangeStdDev { get; set; }
        //nearestSupport --> nearest support level to last price 
        public double NearestSupport { get; set; }
        //nearestResistance --> nearest resistance level to last price
        public double NearestResistance { get; set; }
        //ltRsi --> 50 period RSI
        public double LtRsi50 { get; set; }
        //stRsi --> 5 period RSI
        public double StRsi5 { get; set; }
        //yesterdayStRsi --> 5 period RSI measure at close yesterday
        public double YesterdayStRsi5 { get; set; }
        //ltCci --> 50 period CCI
        public double LtCci50 { get; set; }
        //stCci --> 5 period CCI
        public double StCci5 { get; set; }
        //yesterdayStCci --> 5 period CCI measure at close yesterday
        public double YesterdayStCci5 { get; set; }
        //yesterdayHigh --> previous day's high price
        public double YesterdayHigh { get; set; }
        //yesterdayLow --> previous day's low price
        public double YesterdayLow { get; set; }

        public Sentiment? LongTermSentiment { get; set; }

        public Sentiment? ShortTermSentiment { get; set; }

        public bool HasOption { get; set; }

        internal static SyrahSentiment LongTermSentimentForDependencies
        {
            get
            {
                return new SyrahSentiment(SyrahSentiment.TermValue.LongTerm);
            }
        }

        internal static SyrahSentiment ShortTermSentimentForDependencies
        {
            get
            {
                return new SyrahSentiment(SyrahSentiment.TermValue.ShortTerm);
            }
        }
        internal static TradeIdeasGeneratorArgument Create(List<Signal> signals, HistoricalData historicalData)
        {
            TradeIdeasGeneratorArgument result = new TradeIdeasGeneratorArgument();

            SmaVol smaVol20 = new SmaVol(20);
            Sma sma50 = new Sma(50);
            Rsi stRsi5 = new Rsi(5);
            Rsi rsi14 = new Rsi(14);
            Rsi ltrsi50 = new Rsi(50);
            Cci stCci5 = new Cci(5);
            Cci cci14 = new Cci(14);
            Cci ltCci50 = new Cci(50);
            Stoch stoch14 = new Stoch(14, 14, 3);
            WillR willr14 = new WillR(14);
            Mfi mfi14 = new Mfi(14);
            Adx adx20 = new Adx(20);
            Atr atr20 = new Atr(20);

            //Assuming that signals are sorted by dates descending and all signals are present. otherwize an exception will be thrown during fetching signals (First())

            #region Indicators

            result.Rsi14 = GetValue(signals.LatestForIndicator(rsi14));
            result.YesterdayRsi14 = GetValue(signals.PreviousForIndicator(rsi14, 1));
            result.StRsi5 = GetValue(signals.LatestForIndicator(stRsi5));
            result.YesterdayStRsi5 = GetValue(signals.PreviousForIndicator(stRsi5, 1));
            result.LtRsi50 = GetValue(signals.LatestForIndicator(ltrsi50));

            result.Cci14 = GetValue(signals.LatestForIndicator(cci14));
            result.YesterdayCci14 = GetValue(signals.PreviousForIndicator(cci14, 1));
            result.StCci5 = GetValue(signals.LatestForIndicator(stCci5));
            result.YesterdayStCci5 = GetValue(signals.PreviousForIndicator(stCci5, 1));
            result.LtCci50 = GetValue(signals.LatestForIndicator(ltCci50));

            result.Stoch14 = GetValue(signals.LatestForIndicator(stoch14));
            result.YesterdayStoch14 = GetValue(signals.PreviousForIndicator(stoch14, 1));

            result.WillR14 = GetValue(signals.LatestForIndicator(willr14));
            result.YesterdayWillR14 = GetValue(signals.PreviousForIndicator(willr14, 1));

            result.Mfi14 = GetValue(signals.LatestForIndicator(mfi14));
            result.YesterdayMfi14 = GetValue(signals.PreviousForIndicator(mfi14, 1));

            result.SmaVol20 = GetValue(signals.LatestForIndicator(smaVol20));
            result.Sma50 = GetValue(signals.LatestForIndicator(sma50));

            result.Adx20 = GetValue(signals.LatestForIndicator(adx20));

            result.Atr20 = GetValue(signals.LatestForIndicator(atr20));

            //Long Term Sentiment(6 months)
            Signal syrahSentiment = signals.LatestForIndicator(LongTermSentimentForDependencies);
            int? sentimentValue = syrahSentiment == null
                ? null
                : (int?)syrahSentiment.Value;
            result.LongTermSentiment = SyrahSentiment.MakeInterpretationInTermsOfSentiment(sentimentValue);

            //Short Term Sentiment(1 month)
            syrahSentiment = signals.LatestForIndicator(ShortTermSentimentForDependencies);
            sentimentValue = syrahSentiment == null
                ? null
                : (int?)syrahSentiment.Value;
            result.ShortTermSentiment = SyrahSentiment.MakeInterpretationInTermsOfSentiment(sentimentValue);

            #endregion

            //if (expandedQuote == null)
            //{
            //    result.LastPrice = historicalData.Close[historicalData.Count - 1];
            //}
            //else
            //{
            //    result.LastPrice = expandedQuote.Last;
            //    result.HasOption = expandedQuote.HasOption;
            //}

            result.RangeStdDev = historicalData.GetPriceRangeStdDevFor6Months();

             //result.NearestSupport = supportAndResistance.GetClosestSupport(expandedQuote.Last);
             //result.NearestResistance = supportAndResistance.GetClosestResistance(expandedQuote.Last);

            //TODO: check
            int yesterdayIndex = historicalData.High.Length - 2;
            result.YesterdayHigh = historicalData.High[yesterdayIndex];
            result.YesterdayLow = historicalData.Low[yesterdayIndex];

            return result;
        }

        internal static DependencyScope GetDependencies(int numberOfBussinessDays = 1)
        {
            DependencyScope deps = new DependencyScope(new Dictionary<int, List<IIndicator>>());

            deps.Dependencies[-numberOfBussinessDays] = new List<IIndicator>
			{
				new SmaVol(20),
				new Sma(50),
				new Rsi(5),
				new Rsi(14),
				new Rsi(50),
				new Cci(5),
				new Cci(14),
				new Cci(50),
				new Stoch(14, 14, 3),
				new WillR(14),
				new Mfi(14),
				new Adx(20),
				new Atr(20),
				LongTermSentimentForDependencies,
				ShortTermSentimentForDependencies
			};

            return deps;
        }

        private static double GetValue(Signal signal)
        {
            double value = Math.Round(signal.Value, 5);
            return value;
        }
    }
}
