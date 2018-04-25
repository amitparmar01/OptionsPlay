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
	public class WillR : PeriodIndicator
	{
		public WillR(int avgPeriod) : base(avgPeriod)
		{
		}

		protected override List<Signal> GetSignalsBase(HistoricalData historicalData, List<Signal> dependencySignals = null)
		{
			List<Signal> signals = new List<Signal>();

			int count = historicalData.Count;
			int endIdx = count - 1;
			int outBegIdx;
			int outNbElement;

			double[] outWillR = new double[count];

			Core.RetCode retCode = Core.WillR(StartIdx, endIdx, historicalData.High, historicalData.Low, historicalData.Close, AvgPeriod, out outBegIdx, out outNbElement, outWillR);
			if (retCode != Core.RetCode.Success)
			{
				LogError(retCode);
			}
			else
			{
				signals = GetSignals(historicalData.SecurityCode, outWillR, historicalData.Date, outBegIdx, outNbElement);
			}
			return signals;
		}

		protected override SignalInterpretation MakeInterpretation(List<Signal> signals, StockQuoteInfo quote = null)
		{
			if (signals == null)
			{
				return null;
			}

			Signal signal = signals.FirstOrDefault(x => x.Name == Name);
			if (signal == null)
			{
				return null;
			}

			SignalInterpretation result = new SignalInterpretation(this);

			double willrValue = signal.Value;
			if (willrValue >= -20)
			{
				result.Interpretation = SignalInterpretationValue.Overbought;
			}
			else if (willrValue > -80 && willrValue < -20)
			{
				result.Interpretation = SignalInterpretationValue.Neutral;
			}
			else
			{
				result.Interpretation = SignalInterpretationValue.Oversold;
			}

			return result;
		}
	}
}
