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
	public class Max : PeriodIndicator
	{
		public Max(int avgPeriod)
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

			double[] outMax = new double[count];

			Core.RetCode retCode = Core.Max(StartIdx, endIdx, historicalData.High, AvgPeriod, out outBegIdx, out outNbElement, outMax);
			if (retCode != Core.RetCode.Success)
			{
				LogError(retCode);
			}
			else
			{
				signals = GetSignals(historicalData.SecurityCode, outMax, historicalData.Date, outBegIdx, outNbElement);
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
				List<Signal> maxs = signals.ForIndicatorAndOffset(this, new[] { 0, -1 });

				if (maxs != null && maxs.Count == 2)
				{
					Signal max0 = maxs[0];
					Signal max1 = maxs[1];

					double max0D = max0.Value;
					double max1D = max1.Value;

					result = new SignalInterpretation(this);

					result.Interpretation = max0D > max1D
												? SignalInterpretationValue.Bullish
												: SignalInterpretationValue.Nothing;
				}
			}

			return result;
		}
	}
}
