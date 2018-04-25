using System.Collections.Generic;
using OptionsPlay.MarketData.Common;
using OptionsPlay.Model;

namespace OptionsPlay.MarketData.Indicators
{
	public interface ICalculatableIndicator
	{
		DependencyScope InterpretationDependencies { get; }

		SignalInterpretation MakeInterpretation(List<Signal> signals, StockQuoteInfo quote = null);

		/// <summary>
		/// Gets signals from the historical data object
		/// </summary>
		List<Signal> GetSignals(HistoricalData historicalData, List<Signal> signals = null, int? last = null);
	}
}