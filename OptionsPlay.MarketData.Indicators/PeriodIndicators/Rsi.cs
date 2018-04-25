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
	public class Rsi : PeriodIndicator
	{
		public Rsi(int avgPeriod) : base(avgPeriod)
		{
		}

		protected override List<Signal> GetSignalsBase(HistoricalData historicalData, List<Signal> dependencySignals = null)
		{
			List<Signal> signals = new List<Signal>();

            if (historicalData == null)
            {
                return signals;
            }

			int count = historicalData.Count;
			int endIdx = count - 1;

			int outBegIdx;
			int outNbElement;

			double[] outRsi = new double[count];

			Core.RetCode retCode = Core.Rsi(StartIdx, endIdx, historicalData.Close, AvgPeriod, out outBegIdx, out outNbElement, outRsi);
			if (retCode != Core.RetCode.Success)
			{
				LogError(retCode);
			}
			else
			{
				signals = GetSignals(historicalData.SecurityCode, outRsi, historicalData.Date, outBegIdx, outNbElement);
			}

			return signals;
		}

		protected override SignalInterpretation MakeInterpretation(List<Signal> signals, StockQuoteInfo quote = null)
		{
			SignalInterpretation result = null;

			if (signals != null && AvgPeriod == 20)
			{
				Signal signal = signals.LatestForIndicator(this);

				if (signal != null)
				{
					result = new SignalInterpretation(this);

					double rsiD = signal.Value;
					if (rsiD <= 30)
					{
						result.Interpretation = SignalInterpretationValue.Oversold;
					}
					else if (rsiD > 30 && rsiD <= 40)
					{
						result.Interpretation = SignalInterpretationValue.Bearish;
					}
					else if (rsiD > 40 && rsiD < 50)
					{
						result.Interpretation = SignalInterpretationValue.MildlyBearish;
					}
					else if (rsiD >= 50 && rsiD < 60)
					{
						result.Interpretation = SignalInterpretationValue.MildlyBullish;
					}
					else if (rsiD >= 60 && rsiD < 70)
					{
						result.Interpretation = SignalInterpretationValue.Bullish;
					}
					else if (rsiD >= 70)
					{
						result.Interpretation = SignalInterpretationValue.Overbought;
					}
				}
			}

			return result;
		}
	}
}
