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
	public class Sma : PeriodIndicator
	{
		public Sma(int avgPeriod) : base(avgPeriod)
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

			double[] outSma = new double[count];
			double[] inReal = GetInRealArray(historicalData);

			Core.RetCode retCode = Core.Sma(StartIdx, endIdx, inReal, AvgPeriod, out outBegIdx, out outNbElement, outSma);
			if (retCode != Core.RetCode.Success)
			{
				LogError(retCode);
			}
			else
			{
				signals = GetSignals(historicalData.SecurityCode, outSma, historicalData.Date, outBegIdx, outNbElement);
			}

			return signals;
		}

		protected virtual double[] GetInRealArray(HistoricalData historicalData)
		{
			return historicalData.Close;
		}

		protected override DependencyScope InterpretationDependencies
		{
			get
			{
				Dictionary<int, List<IIndicator>> deps = new Dictionary<int, List<IIndicator>>
				{
					{ 0, new List<IIndicator> { this } }
				};

				DependencyScope result = new DependencyScope(deps) { IsQuoteNeeded = true };
				return result;
			}
		}

		protected override SignalInterpretation MakeInterpretation(List<Signal> signals, StockQuoteInfo quote = null)
		{
			SignalInterpretation result = null;

			if (quote != null && signals != null)
			{
				Signal sma = signals.LatestForIndicator(this);

				if (sma != null)
				{
					double smaD = sma.Value;

					double lastPrice = (double)quote.LastPrice.Value;

					result = new SignalInterpretation(this)
						{
							Interpretation = lastPrice > smaD ? SignalInterpretationValue.Bullish : SignalInterpretationValue.Bearish
						};
				}
			}

			return result;
		}
	}
}
