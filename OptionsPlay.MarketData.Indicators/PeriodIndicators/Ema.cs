using System.Collections.Generic;
using OptionsPlay.MarketData.Common;
using OptionsPlay.Model;
using TicTacTec.TA.Library;

namespace OptionsPlay.MarketData.Indicators
{
	public class Ema : PeriodIndicator
	{
		public Ema(int avgPeriod)
			: base(avgPeriod)
		{
		}

		protected override List<Signal> GetSignalsBase(HistoricalData historicalData, List<Signal> dependencySignals = null)
		{
			List<Signal> signals = new List<Signal>();

			int count = historicalData.Count;
			int endIdx = count - 1;

			int outBegIdx;
			int outNbElement;

			double[] outEma = new double[count];

			Core.RetCode retCode = Core.Ema(StartIdx, endIdx, historicalData.Open, AvgPeriod, out outBegIdx, out outNbElement, outEma);
			if (retCode != Core.RetCode.Success)
			{
				LogError(retCode);
			}
			else
			{
				signals = GetSignals(historicalData.SecurityCode, outEma, historicalData.Date, outBegIdx, outNbElement);
			}

			return signals;
		}

		protected override SignalInterpretation MakeInterpretation(List<Signal> signals, StockQuoteInfo quote = null)
		{
			return null;
		}
	}
}