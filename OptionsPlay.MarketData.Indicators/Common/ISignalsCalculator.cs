using System.Collections.Generic;
using OptionsPlay.Model;

namespace OptionsPlay.MarketData.Common
{
	public interface ISignalsCalculator
	{
		/// <summary>
		/// Calculate <paramref name="indicators"/> last values based on provided historical quotes. 
		/// Count per each indicator is <paramref name="last"/>
		/// </summary>
		IEnumerable<Signal> CalculateSignals(HistoricalData data, List<IIndicator> indicators, int? last);

		/// <summary>
		/// Calculate the latest <paramref name="indicator"/> value based on provided historical quotes
		/// </summary>
        //Signal CalculateLatestSignal(HistoricalData data, IIndicator indicator);
	}
}