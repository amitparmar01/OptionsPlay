using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.Model;
using OptionsPlay.Model.Enums;

namespace OptionsPlay.MarketData.Common
{
	// todo: refactor. Should depend only on data, or vice versa (only provides data for another level)
	public interface ISignalsProxyService
	{
		///<summary>
		/// Gets (or calculates by historical quotes) signals by list of indicators sorted by dates 
		/// </summary>
		/// <param name="securityCode">securityCode</param>
		/// <param name="indicators">list of indicators</param>
		/// <param name="last">count of signals to take from the end</param>
		/// <param name="timeframe">timeframe to take historical quotes within</param>
		/// <returns>list of signals</returns>
		Task<List<Signal>> GetSignalsAsync(string securityCode, List<IIndicator> indicators, int? last, string timeframe);

		///<summary>
		/// Gets (or calculates by historical quotes) latest values of signals by list of <paramref name="indicators"/>
		/// </summary>
		List<Signal> GetLatestSignals(HistoricalData data, List<IIndicator> indicators);

		///<summary>
		/// Gets (or calculates by historical quotes) latest value of signal by <paramref name="indicator"/>
		/// </summary>
		Signal GetLatestSignal(HistoricalData data, IIndicator indicator);

		///<summary>
		/// Gets (or calculates by historical quotes) signals by list of indicators sorted by dates 
		/// </summary>
		List<Signal> GetSignals(HistoricalData data, List<IIndicator> indicators, int? last);

		///<summary>
		/// Gets (or calculates by historical quotes) signals by list of indicators sorted by dates 
		/// </summary>
		/// <param name="securityCode">securityCode</param>
		/// <param name="indicatorsString">string with information to build indicators. <see cref="IIndicatorsBuilder"/></param>
		/// <param name="last">count of signals to take from the end</param>
		/// <param name="timeframe">timeframe to take historical quotes within</param>
		/// <returns>list of signals</returns>
		Task<List<Signal>> GetSignalsAsync(string securityCode, string indicatorsString, int? last, string timeframe);

		/// <summary>
		/// Calculates support and resistance values for given securityCode and optional time frame (default timeframe is taken from config). 
		/// The calculation is based on historical data for specified timeframe (<see cref="IHistoricalQuotesProvider.GetHistoricalQuotes(string,string,bool)"/>) 
		/// </summary>
		/// <param name="securityCode">Stock securityCode for which support and resistance is calculated</param>
		/// <param name="timeFrame">Time frame for historical data</param>
		/// <returns></returns>
		Task<EntityResponse<SupportAndResistance>> GetSupportAndResistance(string securityCode, string timeFrame = null);

		SupportAndResistance GetSupportAndResistance(HistoricalData data, double lastPrice);

		/// <summary>
		/// Makes interpretations for indicators for specified date
		/// </summary>
		Task<List<SignalInterpretation>> GetSignalsInterpretation(string securityCode, string indicators = null, DateTime? forDate = null);

		Task<List<SignalInterpretation>> GetSignalsInterpretation(string securityCode, List<IIndicator> indicators, DateTime? forDate = null);

		List<SignalInterpretation> GetSignalsInterpretation(HistoricalData historicalData, List<IIndicator> indicators, StockQuoteInfo quote, DateTime? forDate = null);

		Task<string> GetEnglishRepresentationOfSignals(string securityCode, string timeFrame = null);

		/// <summary>
		/// Gets syrah sentiment term values (short and long)
		/// </summary>
		/// <returns>'Item1' is short term value, 'Item2' is long one</returns>
		Tuple<int?, int?> GetSyrahSentimentTermValues(HistoricalData historicalData);

		/// <summary>
		/// Gets sentiment value for MyOptionsPlay
		/// </summary>
		Sentiment? GetSentimentForWidgets(HistoricalData historicalData);

		/// <summary>
		/// Returns latest technical ranks for specified securityCodes from DB
		/// </summary>
		List<Signal> GetLatestTechnicalRanks(List<string> securityCodes);

		/// <summary>
		/// Makes interpretation of sentiment values.
		/// </summary>
		Tuple<SignalInterpretation, SignalInterpretation> MakeInterpretationOfSyrahSentiments(Tuple<int?, int?> sentiments);
	}
}