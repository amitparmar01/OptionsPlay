using System;
using System.Collections.Generic;
using System.Linq;
using OptionsPlay.Logging;
using OptionsPlay.MarketData.Common;
using OptionsPlay.MarketData.Indicators.Factories;
using OptionsPlay.MarketData.Indicators.Helpers;
using OptionsPlay.Model;
using OptionsPlay.Model.Enums;

namespace OptionsPlay.MarketData.Indicators
{
	public class SyrahSentimentFactory : BaseIndicatorFactory<SyrahSentiment>
	{
		public override List<IIndicator> Create(Dictionary<string, string> properties = null)
		{
			//TODO: add properties parsing.
			List<IIndicator> indicators = new List<IIndicator>
			{
				new SyrahSentiment(SyrahSentiment.TermValue.LongTerm),
				new SyrahSentiment(SyrahSentiment.TermValue.ShortTerm)
			};
			return indicators;
		}
	}

	public class SyrahSentiment : CalculatedIndicator
	{
		private readonly TermValue _term;
		private readonly Dictionary<TermAndSignals, IIndicator> _dependencyNames = new Dictionary<TermAndSignals, IIndicator>();
		private readonly DependencyScope _calculationDependencies;
		private readonly string _name;

		public enum TermValue
		{
			ShortTerm = TermAndSignals.ShortTerm, // 1M trend
			LongTerm = TermAndSignals.LongTerm, // 6M trend
		}

		[Flags]
		private enum TermAndSignals
		{
			ShortTerm = 1 << 10,
			LongTerm = 1 << 11,

			ShortSma = 0,
			LongSma = 1 << 0,
			LongWma = 1 << 1,
			BBupper = 1 << 2,
			BBlower = 1 << 3,
		}

		public SyrahSentiment(TermValue term)
		{
			_term = term;
			Sma sma20 = new Sma(20);
			Sma sma50 = new Sma(50);
			Sma sma200 = new Sma(200);
			Wma wma50 = new Wma(50);
			Wma wma200 = new Wma(200);
			BBands bb20Upper = new BBands(20, BBands.BandType.Upper);
			BBands bb20Lower = new BBands(20, BBands.BandType.Lower);
			BBands bb50Upper = new BBands(50, BBands.BandType.Upper);

			List<IIndicator> deps;
			switch (term)
			{
				case TermValue.ShortTerm:
					deps = new List<IIndicator>
					{
						sma20,
						sma50,
						wma50,
						bb20Upper,
						bb20Lower
					};

					_dependencyNames.Add(TermAndSignals.ShortTerm | TermAndSignals.ShortSma, sma20);
					_dependencyNames.Add(TermAndSignals.ShortTerm | TermAndSignals.LongSma, sma50);
					_dependencyNames.Add(TermAndSignals.ShortTerm | TermAndSignals.LongWma, wma50);
					_dependencyNames.Add(TermAndSignals.ShortTerm | TermAndSignals.BBupper, bb20Upper);
					_dependencyNames.Add(TermAndSignals.ShortTerm | TermAndSignals.BBlower, bb20Lower);

					break;
				case TermValue.LongTerm:
					deps = new List<IIndicator>
					{
						sma50,
						sma200,
						wma200,
						bb20Lower,
						bb50Upper
					};

					_dependencyNames.Add(TermAndSignals.LongTerm | TermAndSignals.ShortSma, sma50);
					_dependencyNames.Add(TermAndSignals.LongTerm | TermAndSignals.LongSma, sma200);
					_dependencyNames.Add(TermAndSignals.LongTerm | TermAndSignals.LongWma, wma200);
					_dependencyNames.Add(TermAndSignals.LongTerm | TermAndSignals.BBupper, bb50Upper);
					_dependencyNames.Add(TermAndSignals.LongTerm | TermAndSignals.BBlower, bb20Lower);
					break;
				default:
					throw new ArgumentOutOfRangeException("term");
			}

			_calculationDependencies = new DependencyScope(new Dictionary<int, List<IIndicator>>
			{
				{ 0, deps }
			});
			_name = string.Format("{0}{1}", GetType().Name, term);
		}

		public override string Name
		{
			get
			{
				return _name;
			}
		}

		public override string InterpretationName
		{
			get
			{
				return Name;
			}
		}

		public TermValue Term
		{
			get
			{
				return _term;
			}
		}

		public static SignalInterpretation MakeInterpretationBasedOnValue(IIndicator indicator, int value)
		{
			SignalInterpretation result = new SignalInterpretation(indicator);

			SentimentInterpretationValue interpretation = SentimentInterpretationValue.Neutral;
			switch (value)
			{
				case -4:
					interpretation = SentimentInterpretationValue.Bearish;
					result.SecondaryTag = SecondaryTagValue.Overextended;
					break;
				case -3:
					interpretation = SentimentInterpretationValue.Bearish;
					result.SecondaryTag = SecondaryTagValue.Continuation;
					break;
				case -2:
					interpretation = SentimentInterpretationValue.Bearish;
					result.SecondaryTag = SecondaryTagValue.Start;
					break;
				case -1:
					interpretation = SentimentInterpretationValue.Neutral;
					result.SecondaryTag = SecondaryTagValue.BearishTurningNeutral;
					break;
				case 0:
					interpretation = SentimentInterpretationValue.MildlyBearish;
					break;
				case 1:
					interpretation = SentimentInterpretationValue.MildlyBullish;
					break;
				case 2:
					interpretation = SentimentInterpretationValue.Neutral;
					result.SecondaryTag = SecondaryTagValue.BullishTurningNeutral;
					break;
				case 3:
					interpretation = SentimentInterpretationValue.Bullish;
					result.SecondaryTag = SecondaryTagValue.Start;
					break;
				case 4:
					interpretation = SentimentInterpretationValue.Bullish;
					result.SecondaryTag = SecondaryTagValue.Continuation;
					break;
				case 5:
					interpretation = SentimentInterpretationValue.Bullish;
					result.SecondaryTag = SecondaryTagValue.Overextended;
					break;
			}

			result.Interpretation = (SignalInterpretationValue)interpretation;
			return result;
		}

		/// <summary>
		/// Makes interpretation as <seealso cref="Sentiment"/> by one of given signal values.
		/// Long term value has a priority on short term value. Returns null if both provided values are null.
		/// </summary>
		/// <param name="sentimentValues">First item - short term sentiment value, second - long term sentiment value</param>
		/// <returns>Bullish Bearish or Neutral based on signal values.</returns>
		public static Sentiment? MakeInterpretationInTermsOfSentiment(Tuple<int? /*short*/, int? /*long*/> sentimentValues)
		{
			if (sentimentValues == null)
			{
				return null;
			}

			Sentiment? sentiment = MakeInterpretationInTermsOfSentiment(sentimentValues.Item2 ?? sentimentValues.Item1);
			return sentiment;
		}

		/// <summary>
		/// Makes interpretation based on one sentiment value
		/// </summary>
		public static Sentiment? MakeInterpretationInTermsOfSentiment(int? sentimentValue)
		{
			if (!sentimentValue.HasValue)
			{
				return null;
			}
			Sentiment sentiment = MakeInterpretationBySentimentValue(sentimentValue.Value);
			return sentiment;
		}

		public override DependencyScope CalculationDependencies
		{
			get
			{
				return _calculationDependencies;
			}
		}

		protected override List<Signal> GetSignalsBase(HistoricalData historicalData, List<Signal> dependencySignals = null)
		{
			return GetSignals(historicalData, dependencySignals);
		}

		protected override List<Signal> GetSignals(HistoricalData historicalData, List<Signal> signals = null, int? last = null)
		{
			if (signals == null)
			{
				throw new InvalidOperationException("Dependencies should be specified");
			}

			List<Signal> resultSignals = new List<Signal>();

			List<string> signalDependencies = CalculationDependencies.GetIndicators().Select(i => i.Name).ToList();

			signals = signals.Where(s => signalDependencies.Contains(s.Name)).ToList();
			Dictionary<DateTime, List<Signal>> signalsByDates = ConvertToDictionaryByDate(signals);

			int count = 0;
			for (int i = historicalData.Count - 1; i >= 0; i--)
			{
				DateTime date = historicalData.Date[i];

				List<Signal> signalsForCalculation;
				if (signalsByDates.TryGetValue(date, out signalsForCalculation))
				{
					short? outData = Calculate(signalsForCalculation, historicalData.Close[i], (TermAndSignals)_term);
					if (outData.HasValue)
					{
						resultSignals.Add(GetSignal(historicalData.SecurityCode, outData.Value, date));
					}
				}

				if (last.HasValue && ++count >= last.Value)
				{
					break;
				}
			}

			return resultSignals;
		}

		protected override SignalInterpretation MakeInterpretation(List<Signal> signals, StockQuoteInfo quote = null)
		{
			if (signals == null)
			{
				return null;
			}

			Signal signal = signals.FirstOrDefault(x => x.Name == Name);
			if (signal == null)
			{
				return null;
			}

			SignalInterpretation result = MakeInterpretationBasedOnValue(this, (int)signal.Value);

			return result;
		}

		#region Private

		private static Sentiment MakeInterpretationBySentimentValue(int sentimentValue)
		{
			if (sentimentValue >= -4 && sentimentValue <= -2 || sentimentValue == 0)
			{
				return Sentiment.Bearish;
			}
			if (sentimentValue == -1 || sentimentValue == 2)
			{
				return Sentiment.Neutral;
			}
			if (sentimentValue == 1 || sentimentValue >= 3 && sentimentValue <= 5)
			{
				return Sentiment.Bullish;
			}

			string errorMessage = string.Format("Error while retrieving sentiment value ({0}). Sentiment value must be between -4 and 5", sentimentValue);
			Logger.Error(errorMessage);
			throw new Exception(errorMessage);
		}

		/// <summary>
		/// Faster version of signals.GroupBy(s => s.Date).ToDictionary(g => g.Key, g => g.ToList());
		/// </summary>
		private static Dictionary<DateTime, List<Signal>> ConvertToDictionaryByDate(IEnumerable<Signal> signals)
		{
			Dictionary<DateTime, List<Signal>> result = new Dictionary<DateTime, List<Signal>>();

			foreach (Signal signal in signals)
			{
				List<Signal> signalsByDate;
				DateTime date = signal.Date;

				if (!result.TryGetValue(date, out signalsByDate))
				{
					signalsByDate = new List<Signal>();
					result.Add(date, signalsByDate);
				}

				signalsByDate.Add(signal);
			}

			return result;
		}

		private short? Calculate(List<Signal> signals, double last, TermAndSignals term)
		{
			Signal shortSma = signals.LatestForIndicator(_dependencyNames[term | TermAndSignals.ShortSma]);
			Signal longSma = signals.LatestForIndicator(_dependencyNames[term | TermAndSignals.LongSma]);
			Signal longWma = signals.LatestForIndicator(_dependencyNames[term | TermAndSignals.LongWma]);
			Signal bbLower = signals.LatestForIndicator(_dependencyNames[term | TermAndSignals.BBlower]);
			Signal bbUpper = signals.LatestForIndicator(_dependencyNames[term | TermAndSignals.BBupper]);

			if (shortSma == null || longSma == null || longWma == null || bbLower == null || bbUpper == null)
			{
				return null;
			}

			// Bearish (Overextended) = -4 
			if (last < longSma.Value && last < longWma.Value && last < shortSma.Value && last < bbLower.Value)
			{
				return -4;
			}

			// Bearish (Continuation) = -3 
			if (last < longSma.Value && last < longWma.Value && last <= shortSma.Value && shortSma.Value < longSma.Value)
			{
				return -3;
			}

			// Bearish (Start) = -2
			if (last < longSma.Value && last < longWma.Value && last < shortSma.Value && shortSma.Value >= longSma.Value)
			{
				return -2;
			}

			// Neutral (Bearish Turning Neutral) = -1
			if (longSma.Value > last && longWma.Value >= last && last > shortSma.Value)
			{
				return -1;
			}

			// Mildly Bearish = 0
			if (shortSma.Value > last && longWma.Value > last && last >= longSma.Value)
			{
				return 0;
			}

			// Mildly Bullish = 1
			if (longSma.Value >= last && last > longWma.Value && last > shortSma.Value ||
				longSma.Value <= last && last <= longWma.Value && last > shortSma.Value)
			{
				return 1;
			}

			// Neutral (Bullish Turning Neutral) = 2
			if (shortSma.Value >= last && last >= longWma.Value && last > longSma.Value)
			{
				return 2;
			}

			// Bullish (Start) = 3
			if (last > longSma.Value && last > longWma.Value && last > shortSma.Value && shortSma.Value <= longSma.Value)
			{
				return 3;
			}

			// Bullish (Continuation) = 4
			if (last > longSma.Value && last > longWma.Value && last > shortSma.Value && shortSma.Value > longSma.Value)
			{
				return 4;
			}

			//	Bearish (Overextended) = 5
			if (last > longSma.Value && last > longWma.Value && last > shortSma.Value && last > bbUpper.Value)
			{
				return 5;
			}

			return 0;
		}

		#endregion Private
	}
}