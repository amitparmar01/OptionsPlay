using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OptionsPlay.MarketData.Common;
using OptionsPlay.MarketData.Indicators.Helpers;
using OptionsPlay.Model;
using TicTacTec.TA.Library;

namespace OptionsPlay.MarketData.Indicators
{
	public class SmaVol : Sma
	{
		public SmaVol(int avgPeriod) : base(avgPeriod)
		{
		}

		protected override double[] GetInRealArray(HistoricalData historicalData)
		{
			return historicalData.Volume;
		}

		protected override SignalInterpretation MakeInterpretation(System.Collections.Generic.List<Model.Signal> signals, StockQuoteInfo quote = null)
		{
			return null;
		}
	}
}
