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
	public class Mfi : PeriodIndicator
	{
		public Mfi(int avgPeriod) : base(avgPeriod)
		{
		}

		protected override List<Signal> GetSignalsBase(HistoricalData historicalData, List<Signal> dependencySignals = null)
		{
			List<Signal> signals = new List<Signal>();

			int endIdx = historicalData.Count - 1;
			int outBegIdx;
			int outNbElement;

			double[] outMfi = new double[historicalData.Count];

			Core.RetCode retCode = Core.Mfi(StartIdx, endIdx, historicalData.High, historicalData.Low, historicalData.Close, historicalData.Volume, AvgPeriod, out outBegIdx, out outNbElement, outMfi);
			if (retCode != Core.RetCode.Success)
			{
				LogError(retCode);
			}
			else
			{
				signals = GetSignals(historicalData.SecurityCode, outMfi, historicalData.Date, outBegIdx, outNbElement);
			}

			return signals;
		}

		protected override SignalInterpretation MakeInterpretation(List<Signal> signals, StockQuoteInfo quote = null)
		{
			SignalInterpretation result = null;

			if (signals != null)
			{
				Signal mfi = signals.LatestForIndicator(this);

				if (mfi != null)
				{
					double mfiD = mfi.Value;

					result = new SignalInterpretation(this);
					if (mfiD <= 10)
					{
						result.Interpretation = SignalInterpretationValue.OversoldUnsustainable;
					}
					else if (mfiD > 10 && mfiD <= 20)
					{
						result.Interpretation = SignalInterpretationValue.Oversold;
					}
					else if (mfiD > 20 && mfiD < 80)
					{
						result.Interpretation = SignalInterpretationValue.Neutral;
					}
					else if (mfiD >= 80 && mfiD < 90)
					{
						result.Interpretation = SignalInterpretationValue.Overbought;
					}
					else
					{
						result.Interpretation = SignalInterpretationValue.OverboughtUnsustainable;
					}
				}
			}

			return result;
		}

	}
}
