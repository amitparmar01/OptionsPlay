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
	public class Roc : PeriodIndicator
	{
		public Roc(int avgPeriod) : base(avgPeriod)
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

			double[] outRoc = new double[count];

			Core.RetCode retCode = Core.Roc(StartIdx, endIdx, historicalData.Close, AvgPeriod, out outBegIdx, out outNbElement, outRoc);
			if (retCode != Core.RetCode.Success)
			{
				LogError(retCode);
			}
			else
			{
				signals = GetSignals(historicalData.SecurityCode, outRoc, historicalData.Date, outBegIdx, outNbElement);
			}

			return signals;
		}

		protected override SignalInterpretation MakeInterpretation(List<Signal> signals, StockQuoteInfo quote = null)
		{
			SignalInterpretation result = null;

			if (signals != null)
			{
				Signal roc = signals.LatestForIndicator(this);
				if (roc == null)
				{
					return null;
				}

				double rocD = roc.Value;
				switch (AvgPeriod)
				{
					case 20:
						result = new SignalInterpretation(this);

						if (rocD < -8)
						{
							result.Interpretation = SignalInterpretationValue.Oversold;
						}
						else if (rocD >= -8 && rocD < 0)
						{
							result.Interpretation = SignalInterpretationValue.Bearish;
						}
						else if (rocD.Equals(0))
						{
							result.Interpretation = SignalInterpretationValue.Neutral;
						}
						else if (rocD > 0 && rocD < 8)
						{
							result.Interpretation = SignalInterpretationValue.Bullish;
						}
						else
						{
							result.Interpretation = SignalInterpretationValue.Overbought;
						}
						break;
					case 125:
						result = new SignalInterpretation(this);

						if (rocD < 0)
						{
							result.Interpretation = SignalInterpretationValue.Bearish;
						}
						else if (rocD.Equals(0))
						{
							result.Interpretation = SignalInterpretationValue.Neutral;
						}
						else
						{
							result.Interpretation = SignalInterpretationValue.Bullish;
						}
						break;
				}
			}

			return result;
		}
	}
}
