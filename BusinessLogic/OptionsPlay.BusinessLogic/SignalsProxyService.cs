using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.BusinessLogic.MarketDataProcessing;
using OptionsPlay.Common.Helpers;
using OptionsPlay.Common.Options;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.Common.Utilities;
using OptionsPlay.MarketData.Common;
using OptionsPlay.MarketData.Indicators.Helpers;
using OptionsPlay.Model;
using OptionsPlay.Model.Enums;
using StructureMap;

namespace OptionsPlay.MarketData.Indicators
{
	// TODO: this class is a kind of orchestrator. It actually doesn't contain major logic except of redirecting queries to proper services.
	public class SignalsProxyService : ISignalsProxyService
	{
		#region Private Properties

		private readonly Lazy<ISignalsService> _signalsService;
		//private readonly Lazy<IAlgoService> _algoService;
		private readonly Lazy<IIndicatorsBuilder> _indicatorsFactory;
		//private readonly Lazy<ISentenceGenerator> _sentenceGenerator;
		private readonly Lazy<IMarketDataService> _marketDataService;
		private readonly Lazy<ISignalsCalculator> _signalsCalculator;
		//private readonly Lazy<ILookupService> _lookupService;

		private ISignalsService SignalsService
		{
			get { return _signalsService.Value; }
		}

		private IMarketDataService MarketDataService
		{
			get { return _marketDataService.Value; }
		}

		//private IAlgoService AlgoService
		//{
		//	get { return _algoService.Value; }
		//}

		private IIndicatorsBuilder IndicatorsBuilder
		{
			get { return _indicatorsFactory.Value; }
		}

		//private ISentenceGenerator SentenceGenerator
		//{
		//	get { return _sentenceGenerator.Value; }
		//}

		private ISignalsCalculator SignalsCalculator
		{
			get { return _signalsCalculator.Value; }
		}

		//private ILookupService LookupService
		//{
		//	get { return _lookupService.Value; }
		//}

		#endregion Private Properties

		public SignalsProxyService(IContainer container)
		{
			_signalsService = new Lazy<ISignalsService>(container.GetInstance<ISignalsService>);
			_marketDataService = new Lazy<IMarketDataService>(container.GetInstance<IMarketDataService>);
			//_algoService = new Lazy<IAlgoService>(container.GetInstance<IAlgoService>);
			_indicatorsFactory = new Lazy<IIndicatorsBuilder>(container.GetInstance<IIndicatorsBuilder>);
			//_sentenceGenerator = new Lazy<ISentenceGenerator>(container.GetInstance<ISentenceGenerator>);
			_signalsCalculator = new Lazy<ISignalsCalculator>(container.GetInstance<ISignalsCalculator>);
			//_lookupService = new Lazy<ILookupService>(container.GetInstance<ILookupService>);
		}

		public async Task<List<Signal>> GetSignalsAsync(string symbol, string indicatorsString, int? last, string timeframe)
		{
			List<IIndicator> indicators = IndicatorsBuilder.Build(indicatorsString);
			List<Signal> signals = await GetSignalsAsync(symbol, indicators, last, timeframe);
			return signals;
		}

		public async Task<List<Signal>> GetSignalsAsync(string symbol, List<IIndicator> indicators, int? last, string timeframe)
		{
			ApiTimeFrameHelper.ValidateTimeFrame(timeframe);

			List<Signal> result = await GetSignalsWrapper(symbol, indicators, last, timeframe);
			return result;
		}

		public List<Signal> GetLatestSignals(HistoricalData data, List<IIndicator> indicators)
		{
			List<Signal> result = GetSignalsFromDbAndViaCalculation(data, indicators, 1);
			return result;
		}

		public Signal GetLatestSignal(HistoricalData data, IIndicator indicator)
		{
			Signal result = GetSignalsFromDbAndViaCalculation(data, new List<IIndicator> { indicator }, 1).FirstOrDefault();
			return result;
		}

		public List<Signal> GetSignals(HistoricalData data, List<IIndicator> indicators, int? last)
		{
			List<Signal> result = GetSignalsFromDbAndViaCalculation(data, indicators, last);
			return result;
		}

		public async Task<List<SignalInterpretation>> GetSignalsInterpretation(string symbol, string indicators = null, DateTime? forDate = null)
		{
			List<IIndicator> defaultIndicators = IndicatorsBuilder.Build(indicators);

			List<SignalInterpretation> signalsInterpretation = await GetSignalsInterpretation(symbol, defaultIndicators, forDate);
			return signalsInterpretation;
		}

		/// <summary>
		/// Gets signals interpretation based on symbol, list of indicators and timeframe
		/// </summary>
		public async Task<List<SignalInterpretation>> GetSignalsInterpretation(string symbol, List<IIndicator> indicators, DateTime? forDate = null)
		{
			// todo: calculate timeFrame based on forDate parameter
			List<HistoricalQuote> historicalQuotes = MarketDataService.GetHistoricalQuotes(symbol);
			if (historicalQuotes.IsNullOrEmpty())
			{
				return null;
			}

			HistoricalData historicalData = new HistoricalData(historicalQuotes);

			DependencyScope dependencyScope = indicators.GetDependencies();

			StockQuoteInfo quote = null;
			if (dependencyScope.IsQuoteNeeded)
			{
				quote = MarketDataService.GetStockQuote(historicalData.SecurityCode).Entity;
			}

			List<SignalInterpretation> interpretations = GetSignalsInterpretation(historicalData, indicators, quote, forDate);
			return interpretations;
		}

		public List<SignalInterpretation> GetSignalsInterpretation(HistoricalData historicalData, List<IIndicator> indicators, StockQuoteInfo quote, DateTime? forDate = null)
		{
			DependencyScope dependencyScope = indicators.GetDependencies();
			DateTime startDate = forDate ?? DateTime.UtcNow.Date;
			List<Signal> signals = GetSignalsByDependencies(historicalData, dependencyScope, startDate);

			List<SignalInterpretation> interpretations = new List<SignalInterpretation>();

			foreach (ICalculatableIndicator indicator in indicators.OfType<ICalculatableIndicator>())
			{
				SignalInterpretation interpretation = indicator.MakeInterpretation(signals, quote);
				if (interpretation != null)
				{
					interpretations.Add(interpretation);
				}
			}

			return interpretations;
		}

		public async Task<string> GetEnglishRepresentationOfSignals(string symbol, string timeFrame = null)
		{
			if (timeFrame == null)
			{
				timeFrame = AppConfigManager.SupportAndResistanceDefaultTimeFrame;
			}

			StockQuoteInfo expandedQuote = MarketDataService.GetStockQuote(symbol);
			List<HistoricalQuote> historicalQuotes = MarketDataService.GetHistoricalQuotes(symbol, timeFrame);

			if (historicalQuotes.IsNullOrEmpty())
			{
				return null;
			}
			string representation = null;//SentenceGenerator.GetSummary(new HistoricalData(historicalQuotes), expandedQuote);
			return representation;
		}

		//todo: not sure if we need entity response here
		public async Task<EntityResponse<SupportAndResistance>> GetSupportAndResistance(string symbol, string timeFrame = null)
		{
			if (timeFrame == null)
			{
				timeFrame = AppConfigManager.SupportAndResistanceDefaultTimeFrame;
			}


			StockQuoteInfo expandedQuote = MarketDataService.GetStockQuote(symbol);
			List<HistoricalQuote> historicalQuotes = MarketDataService.GetHistoricalQuotes(symbol, timeFrame);


			SupportAndResistance supportAndResistance = new SupportAndResistanceMath(new HistoricalData(historicalQuotes)).GetSupportAndResistance();
			return supportAndResistance;
		}

		public SupportAndResistance GetSupportAndResistance(HistoricalData data, double lastPrice)
		{
			SupportAndResistance supportAndResistance = new SupportAndResistanceMath(data).GetSupportAndResistance(lastPrice);
			return supportAndResistance;
		}

		public Tuple<int?, int?> GetSyrahSentimentTermValues(HistoricalData historicalData)
		{
			if (historicalData == null)
			{
				return Tuple.Create((int?)null, (int?)null);
			}

			const int last = 1;

			SyrahSentiment syrahLongTerm = new SyrahSentiment(SyrahSentiment.TermValue.LongTerm);
			SyrahSentiment syrahShortTerm = new SyrahSentiment(SyrahSentiment.TermValue.ShortTerm);
			List<IIndicator> indicators = new List<IIndicator>
			{
				syrahShortTerm,
				syrahLongTerm
			};

			List<Signal> signals = GetSignalsFromDbAndViaCalculation(historicalData, indicators, last);

			int? shortTermValue = GetTermValue(signals, syrahShortTerm);
			int? longTermValue = GetTermValue(signals, syrahLongTerm);

			Tuple<int?, int?> result = new Tuple<int?, int?>(shortTermValue, longTermValue);
			return result;
		}

		public Tuple<SignalInterpretation, SignalInterpretation> MakeInterpretationOfSyrahSentiments(Tuple<int?, int?> sentiments)
		{
			SignalInterpretation longTermInterpretation = null;
			SignalInterpretation shortTermInterpretation = null;

			SyrahSentiment syrahLongTerm = new SyrahSentiment(SyrahSentiment.TermValue.LongTerm);
			SyrahSentiment syrahShortTerm = new SyrahSentiment(SyrahSentiment.TermValue.ShortTerm);

			if (sentiments.Item2.HasValue)
			{
				longTermInterpretation = SyrahSentiment.MakeInterpretationBasedOnValue(syrahLongTerm, sentiments.Item2.Value);
			}

			if (sentiments.Item1.HasValue)
			{
				shortTermInterpretation = SyrahSentiment.MakeInterpretationBasedOnValue(syrahShortTerm, sentiments.Item1.Value);
			}

			return Tuple.Create(shortTermInterpretation, longTermInterpretation);
		}

		public Sentiment? GetSentimentForWidgets(HistoricalData historicalData)
		{
			Tuple<int?, int?> sentimentValues = GetSyrahSentimentTermValues(historicalData);
			Sentiment? sentiment = SyrahSentiment.MakeInterpretationInTermsOfSentiment(sentimentValues);
			return sentiment;
		}

		// todo: could be replaced by common method
		public List<Signal> GetLatestTechnicalRanks(List<string> symbols)
		{
			List<Signal> technicalRanks = GetSignalsFromDb(symbols, new TechnicalRank());
			return technicalRanks;
		}

		#region Private

		///<summary>
		/// Gets signals
		/// </summary>
		private List<Signal> GetSignalsByDependencies(HistoricalData data, DependencyScope dependencyScope, DateTime date)
		{
			List<DateTime> dateSet = dependencyScope.GetDates(date);
			int days = (DateTime.UtcNow.Date - dateSet.Min()).Days;

			List<Signal> result = GetSignalsFromDbAndViaCalculation(data, dependencyScope.GetIndicators(), days).Where(s => s.Date <= date).ToList();
			return result;
		}

		/// <summary>
		/// Gets signals from DB AND calculates them using <see cref="HistoricalData"/>.
		/// Use this method if indicators collection contains both type of indicators (<see cref="IIndicator.FromDatabase"/>)
		/// </summary>
		private List<Signal> GetSignalsFromDbAndViaCalculation(HistoricalData historicalData, List<IIndicator> indicators, int? last)
		{
			List<Signal> signals = new List<Signal>();

			List<IIndicator> indicatorsFromDb = indicators.Where(indicator => indicator.FromDatabase).ToList();
			List<IIndicator> indicatorsViaCalculation = indicators.Where(indicator => !indicator.FromDatabase).ToList();

			if (indicatorsFromDb.Count > 0)
			{
				int countToTakeLast = last ?? historicalData.Count;
				List<Signal> signalsFromDb = GetSignalsFromDb(historicalData.SecurityCode, indicatorsFromDb, countToTakeLast);
				if (!signalsFromDb.IsNullOrEmpty())
				{
					signals.AddRange(signalsFromDb);
				}
			}

			if (indicatorsViaCalculation.Count > 0)
			{
				IEnumerable<Signal> calculatedSignals = SignalsCalculator.CalculateSignals(historicalData, indicatorsViaCalculation, last);
				signals.AddRange(calculatedSignals);
			}

			signals.SortDescending(s => s.Date);
			return signals;
		}

		/// <summary>
		/// Gets signals from DB only. Please, make sure you call this method only for indicators with <see cref="IIndicator.FromDatabase"/> flag set
		/// </summary>
		private List<Signal> GetSignalsFromDb(string symbol, List<IIndicator> indicatorsFromDb, int last)
		{
			Debug.Assert(indicatorsFromDb.All(i => i.FromDatabase));
			//Debug.Assert(last == 1);

			string[] signalNames = indicatorsFromDb.Select(indicator => indicator.Name).ToArray();
			List<Signal> signalsFromDb = SignalsService.GetSignals(symbol, signalNames);

			signalsFromDb.SortDescending(s => s.Date);
			return signalsFromDb;
		}

		/// <summary>
		/// Gets signals from DB only. Please, make sure you call this method only for indicators with <see cref="IIndicator.FromDatabase"/> flag set
		/// </summary>
		private List<Signal> GetSignalsFromDb(List<string> symbols, IIndicator indicatorFromDb)
		{
			Debug.Assert(indicatorFromDb.FromDatabase);

			string signalName = indicatorFromDb.Name;
			List<Signal> signalsFromDb = SignalsService.GetLatestSignals(symbols, signalName);

			signalsFromDb.SortDescending(s => s.Date);
			return signalsFromDb;
		}

		/// <summary>
		/// Gets signals either from DB or by means of Task Analysis Library
		/// </summary>
		/// <returns>list of signals or list of signals and historical quotes depending on 'historical' parameter</returns>
		private async Task<List<Signal>> GetSignalsWrapper(string symbol, List<IIndicator> indicators, int? last, string timeframe)
		{
			List<Signal> signals;
			// If all indicators are saved in DB - there is no need to request historicalQuotes
			if (indicators.All(i => i.FromDatabase))
			{
				DateTime dateTime = ApiTimeFrameHelper.ConvertTimeframeToDateTimeUsingConfig(timeframe);
				int numOfDays = (int)dateTime.TotalBusinessDaysUntil(DateTime.UtcNow);
				signals = GetSignalsFromDb(symbol, indicators, numOfDays);

				return signals;
			}

			List<HistoricalQuote> historicalQuotes = MarketDataService.GetHistoricalQuotes(symbol, timeframe);
			if (historicalQuotes.IsNullOrEmpty())
			{
				signals = new List<Signal>();
			}
			else
			{
				HistoricalData historicalData = new HistoricalData(historicalQuotes);
				signals = GetSignalsFromDbAndViaCalculation(historicalData, indicators, last);
			}

			return signals;
		}

		private static int? GetTermValue(IEnumerable<Signal> signals, SyrahSentiment syrahSentiment)
		{
			Signal longTermSignal = signals.LatestForIndicator(syrahSentiment);
			int? termValue = longTermSignal != null
				? (int?)longTermSignal.Value
				: null;
			return termValue;
		}

		#endregion Private
	}
}