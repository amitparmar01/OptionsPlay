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
	public class PlusDi : PeriodIndicator
	{
		public PlusDi(int avgPeriod) : base(avgPeriod)
		{
		}

		protected override SignalInterpretation MakeInterpretation(List<Signal> signals, StockQuoteInfo quote = null)
		{
			return null;
		}

		protected override List<Signal> GetSignalsBase(HistoricalData historicalData, List<Signal> dependencySignals = null)
		{
			List<Signal> signals = new List<Signal>();

			int endIdx = historicalData.Count - 1;
			int outBegIdx;
			int outNbElement;

			double[] outPlusDi = new double[historicalData.Count];

			Core.RetCode retCode = Core.PlusDI(StartIdx, endIdx, historicalData.High, historicalData.Low, historicalData.Close, AvgPeriod, out outBegIdx, out outNbElement, outPlusDi);
			if (retCode != Core.RetCode.Success)
			{
				LogError(retCode);
			}
			else
			{
				signals = GetSignals(historicalData.SecurityCode, outPlusDi, historicalData.Date, outBegIdx, outNbElement);
			}

			return signals;
		}
	}
}
