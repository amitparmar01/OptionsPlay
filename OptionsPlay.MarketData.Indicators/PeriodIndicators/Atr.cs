using System.Collections.Generic;
using OptionsPlay.MarketData.Common;
using OptionsPlay.Model;
using TicTacTec.TA.Library;

namespace OptionsPlay.MarketData.Indicators
{
	public class Atr : PeriodIndicator
	{
		public Atr(int avgPeriod)
			: base(avgPeriod)
		{
		}

		protected override SignalInterpretation MakeInterpretation(List<Signal> signals, StockQuoteInfo quote = null)
		{
			throw new System.NotImplementedException();
		}

		protected override List<Signal> GetSignalsBase(HistoricalData historicalData, List<Signal> dependencySignals = null)
		{
			List<Signal> signals = new List<Signal>();

			int endIdx = historicalData.Count - 1;
			int outBegIdx;
			int outNbElement;

			double[] outAtr = new double[historicalData.Count];

			Core.RetCode retCode = Core.Atr(StartIdx, endIdx, historicalData.High, historicalData.Low, historicalData.Close, AvgPeriod, out outBegIdx, out outNbElement, outAtr);
			if (retCode != Core.RetCode.Success)
			{
				LogError(retCode);
			}
			else
			{
				signals = GetSignals(historicalData.SecurityCode, outAtr, historicalData.Date, outBegIdx, outNbElement);
			}

			return signals;
		}

	}
}