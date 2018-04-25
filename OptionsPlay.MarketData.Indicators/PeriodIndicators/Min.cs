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
	public class Min : PeriodIndicator
	{
		public Min(int avgPeriod) : base(avgPeriod)
		{
		}

		protected override List<Signal> GetSignalsBase(HistoricalData historicalData, List<Signal> dependencySignals = null)
		{
			List<Signal> signals = new List<Signal>();

			int count = historicalData.Count;

			int endIdx = count - 1;
			int outBegIdx;
			int outNbElement;

			double[] outMin = new double[count];

			Core.RetCode retCode = Core.Min(StartIdx, endIdx, historicalData.Low, AvgPeriod, out outBegIdx, out outNbElement, outMin);
			if (retCode != Core.RetCode.Success)
			{
				LogError(retCode);
			}
			else
			{
				signals = GetSignals(historicalData.SecurityCode, outMin, historicalData.Date, outBegIdx, outNbElement);
			}
			return signals;
		}

		protected override DependencyScope InterpretationDependencies
		{
			get
			{
				Dictionary<int, List<IIndicator>> deps = new Dictionary<int, List<IIndicator>>
				{
					{ 0, new List<IIndicator> { this } },
					{ -1, new List<IIndicator> { this } }
				};

				DependencyScope result = new DependencyScope(deps) { IsQuoteNeeded = false };
				return result;
			}
		}

		protected override SignalInterpretation MakeInterpretation(List<Signal> signals, StockQuoteInfo quote = null)
		{
			SignalInterpretation result = null;

			if (signals != null && AvgPeriod == 20)
			{
				List<Signal> mins = signals.ForIndicatorAndOffset(this, new[] { 0, -1 });

				if (mins != null && mins.Count == 2)
				{
					Signal min0 = mins[0];
					Signal min1 = mins[1];

					double min0D = min0.Value;
					double min1D = min1.Value;

					result = new SignalInterpretation(this);

					result.Interpretation = min0D < min1D
												? SignalInterpretationValue.Bearish
												: SignalInterpretationValue.Nothing;
				}
			}

			return result;
		}
	}
}
