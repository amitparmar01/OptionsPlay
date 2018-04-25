using System.Collections.Generic;
using OptionsPlay.MarketData.Common;
using OptionsPlay.MarketData.Indicators.Helpers;
using OptionsPlay.Model;
using TicTacTec.TA.Library;

namespace OptionsPlay.MarketData.Indicators
{
	public class Adx : PeriodIndicator
	{
		public Adx(int avgPeriod)
			: base(avgPeriod)
		{
		}

		protected override List<Signal> GetSignalsBase(HistoricalData historicalData, List<Signal> dependencySignals = null)
		{
			List<Signal> signals = new List<Signal>();

			int endIdx = historicalData.Count - 1;
			int outBegIdx;
			int outNbElement;

			double[] outAdx = new double[historicalData.Count];

			Core.RetCode retCode = Core.Adx(StartIdx, endIdx, historicalData.High, historicalData.Low, historicalData.Close, AvgPeriod, out outBegIdx, out outNbElement, outAdx);
			if (retCode != Core.RetCode.Success)
			{
				LogError(retCode);
			}
			else
			{
				signals = GetSignals(historicalData.SecurityCode, outAdx, historicalData.Date, outBegIdx, outNbElement);
			}

			return signals;
		}

		protected override DependencyScope InterpretationDependencies
		{
			get
			{
				Dictionary<int, List<IIndicator>> deps = new Dictionary<int, List<IIndicator>>
				{
					{
						0, new List<IIndicator>
						{
							new Adx(AvgPeriod),
							new PlusDi(AvgPeriod),
							new MinusDi(AvgPeriod),
						}
					},
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
				Signal adxSignal = signals.LatestForIndicator(new Adx(AvgPeriod));
				Signal plusDiSignal = signals.LatestForIndicator(new PlusDi(AvgPeriod));
				Signal minusDiSignal = signals.LatestForIndicator(new MinusDi(AvgPeriod));

				if (adxSignal != null && plusDiSignal != null && minusDiSignal != null)
				{
					double adxD = adxSignal.Value;
					double plusDiD = plusDiSignal.Value;
					double minusDiD = minusDiSignal.Value;

					result = new SignalInterpretation(this);

					if (adxD < 25)
					{
						result.Interpretation = SignalInterpretationValue.Neutral;
					}
					else if (adxD >= 25 && adxD < 35)
					{
						if (plusDiD >= minusDiD)
						{
							result.Interpretation = SignalInterpretationValue.TrendingBullish;
						}
						else if (plusDiD < minusDiD)
						{
							result.Interpretation = SignalInterpretationValue.TrendingBearish;
						}
					}
					else if (adxD >= 35)
					{
						if (plusDiD >= minusDiD)
						{
							result.Interpretation = SignalInterpretationValue.StrongTrendBullish;
						}
						else if (plusDiD < minusDiD)
						{
							result.Interpretation = SignalInterpretationValue.StrongTrendBearish;
						}
					}
				}
			}

			return result;
		}
	}
}