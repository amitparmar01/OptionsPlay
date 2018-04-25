using System.Collections.Generic;
using OptionsPlay.MarketData.Common;
using OptionsPlay.MarketData.Indicators.Helpers;
using OptionsPlay.Model;
using TicTacTec.TA.Library;

namespace OptionsPlay.MarketData.Indicators
{
	public class Cci : PeriodIndicator
	{
		public Cci(int avgPeriod)
			: base(avgPeriod)
		{
		}

		protected override List<Signal> GetSignalsBase(HistoricalData historicalData, List<Signal> dependencySignals = null)
		{
			List<Signal> signals = new List<Signal>();

			int endIdx = historicalData.Count - 1;
			int outBegIdx;
			int outNbElement;

			double[] outCci = new double[historicalData.Count];

			Core.RetCode retCode = Core.Cci(StartIdx, endIdx, historicalData.High, historicalData.Low, historicalData.Close, AvgPeriod, out outBegIdx, out outNbElement, outCci);
			if (retCode != Core.RetCode.Success)
			{
				LogError(retCode);
			}
			else
			{
				signals = GetSignals(historicalData.SecurityCode, outCci, historicalData.Date, outBegIdx, outNbElement);
			}

			return signals;
		}

		protected override SignalInterpretation MakeInterpretation(List<Signal> signals, StockQuoteInfo quote = null)
		{
			SignalInterpretation result = null;

			if (signals != null)
			{
				Signal cci = signals.LatestForIndicator(this);

				if (cci != null)
				{
					double cciD = cci.Value;

					result = new SignalInterpretation(this);

					if (cciD <= -200)
					{
						result.Interpretation = SignalInterpretationValue.Overbought;
					}
					else if (cciD > -200 && cciD <= -100)
					{
						result.Interpretation = SignalInterpretationValue.Bearish;
					}
					else if (cciD > -100 && cciD < -0)
					{
						result.Interpretation = SignalInterpretationValue.MildlyBearish;
					}
					else if (cciD >= 0 && cciD < 100)
					{
						result.Interpretation = SignalInterpretationValue.MildlyBullish;
					}
					else if (cciD >= 100 && cciD < 200)
					{
						result.Interpretation = SignalInterpretationValue.Bullish;
					}
					else
					{
						result.Interpretation = SignalInterpretationValue.Oversold;
					}
				}
			}

			return result;
		}
	}
}