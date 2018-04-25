using System;
using System.Collections.Generic;
using System.Linq;
using OptionsPlay.MarketData.Common;
using OptionsPlay.MarketData.Indicators;
using OptionsPlay.MarketData.Indicators.Helpers;
using OptionsPlay.Model;
using OptionsPlay.Model.Enums;
using OptionsPlay.Model.Extensions;

namespace OptionsPlay.Web.ViewModels.Providers.Helpers
{
	//todo:  could be merged with signalsProxyService.
	public class SignalHelpers
	{
		private readonly ISignalsProxyService _signalsProxyService;

		public SignalHelpers(ISignalsProxyService signalsProxyService)
		{
			_signalsProxyService = signalsProxyService;
		}

		public TradeIdeasSentiment GetSentiment(TradeIdeaRule ruleMatch, HistoricalData historicalData)
		{
			TradeIdeasSentiment tradeIdeasSentiment = TradeIdeasSentiment.Bullish;
			if (ruleMatch != TradeIdeaRule.None)
			{
				tradeIdeasSentiment = ruleMatch.GetSentiment();
				return tradeIdeasSentiment;
			}

			if (historicalData == null)
			{
				return tradeIdeasSentiment;
			}

			Tuple<int?, int?> sentimentValues = _signalsProxyService.GetSyrahSentimentTermValues(historicalData);
			Tuple<SignalInterpretation, SignalInterpretation> sentimentInterpretations =
				_signalsProxyService.MakeInterpretationOfSyrahSentiments(sentimentValues);
			SignalInterpretation shortTermInterpretation = sentimentInterpretations.Item1;
			SignalInterpretation longTermInterpretation = sentimentInterpretations.Item2;

			if (shortTermInterpretation == null || longTermInterpretation == null)
			{
				return tradeIdeasSentiment;
			}

			SentimentInterpretationValue shortTermSentimentInterpretationValue = (SentimentInterpretationValue)shortTermInterpretation.Interpretation;
			SentimentInterpretationValue longTermSentimentInterpretationValue = (SentimentInterpretationValue)longTermInterpretation.Interpretation;

			if (longTermSentimentInterpretationValue == SentimentInterpretationValue.Neutral)
			{
				switch (shortTermSentimentInterpretationValue)
				{
					case SentimentInterpretationValue.Bullish:
					case SentimentInterpretationValue.MildlyBullish:
					case SentimentInterpretationValue.Neutral:
						return TradeIdeasSentiment.Bullish;
					case SentimentInterpretationValue.Bearish:
					case SentimentInterpretationValue.MildlyBearish:
						return TradeIdeasSentiment.Bearish;
					default:
						throw new ArgumentOutOfRangeException();
				}
			}
			switch (longTermSentimentInterpretationValue)
			{
				case SentimentInterpretationValue.Bullish:
				case SentimentInterpretationValue.MildlyBullish:
					return TradeIdeasSentiment.Bullish;
				case SentimentInterpretationValue.Bearish:
				case SentimentInterpretationValue.MildlyBearish:
					return TradeIdeasSentiment.Bearish;
				default:
					throw new ArgumentOutOfRangeException();
			}
		}

		/// <summary>
		/// Be careful. Request to DB.
		/// </summary>
		public int? GetTechnicalRank(HistoricalData historicalData1Year)
		{
            //Signal technicalRankSignal = _signalsProxyService.GetLatestSignal(historicalData1Year, new TechnicalRank() );
            Signal technicalRankSignal = _signalsProxyService.GetLatestSignal(historicalData1Year, new TechnicalRankScore());
			int? technicalRank = technicalRankSignal != null ? (int?)technicalRankSignal.Value : null;
			return technicalRank;
		}

		/// <summary>
		/// Gets syrah term signals (short and long)
		/// </summary>
		/// <returns>Item1 - syrah short term signals, Item2 - syrah long term signals</returns>
		public Tuple<List<Signal>, List<Signal>> GetSentiments(List<HistoricalQuote> historicalQuotes2Years)
		{
			IIndicator syrahSentimentShortTerm = new SyrahSentiment(SyrahSentiment.TermValue.ShortTerm);
			IIndicator syrahSentimenLongTerm = new SyrahSentiment(SyrahSentiment.TermValue.LongTerm);
			HistoricalData historicalData2Years = new HistoricalData(historicalQuotes2Years);

			List<Signal> signals = _signalsProxyService.GetSignals(historicalData2Years,
				new List<IIndicator>
				{
					syrahSentimentShortTerm, syrahSentimenLongTerm
				}, null);
			List<Signal> syrahShortTermSignals = signals.ForIndicator(syrahSentimentShortTerm).OrderBy(signal => signal.Date).ToList();
			List<Signal> syrahLongTermSignals = signals.ForIndicator(syrahSentimenLongTerm).OrderBy(signal => signal.Date).ToList();

			Tuple<List<Signal>, List<Signal>> result = new Tuple<List<Signal>, List<Signal>>(syrahShortTermSignals, syrahLongTermSignals);
			return result;
		}

		/// <summary>
		/// Gets sentiment term values (short and long)
		/// </summary>
		/// <returns>Item1 - sentiment short term value, Item2 - sentiment long term value</returns>
		public Tuple<int?, int?> GetSentimentTermValues(List<Signal> syrahShortTermSignals, List<Signal> syrahLongTermSignals)
		{
			int? sentimentShortTermValue = syrahShortTermSignals.Count > 0
				? (int?)syrahShortTermSignals[syrahShortTermSignals.Count - 1].Value
				: null;
			int? sentimentLongTermValue = syrahLongTermSignals.Count > 0
				? (int?)syrahLongTermSignals[syrahLongTermSignals.Count - 1].Value
				: null;

			Tuple<int?, int?> sentimentTermValues = new Tuple<int?, int?>(sentimentShortTermValue, sentimentLongTermValue);
			return sentimentTermValues;
		}

		public SyrahSentimentsViewModel CalculateSentimentValues(string symbol, List<HistoricalQuote> historicalQuotes)
		{
			SyrahSentimentsViewModel indices = new SyrahSentimentsViewModel();

			Tuple<List<Signal>, List<Signal>> signals = GetSentiments(historicalQuotes);
			List<Signal> syrahShortTermSignals = signals.Item1;
			List<Signal> syrahLongTermSignals = signals.Item2;

			Tuple<int?, int?> sentimentValues = GetSentimentTermValues(syrahShortTermSignals, syrahLongTermSignals);
			indices.SyrahShortSentiment = sentimentValues.Item1;
			indices.SyrahLongSentiment = sentimentValues.Item2;
			indices.Symbol = symbol;

			return indices;
		}

	}
}