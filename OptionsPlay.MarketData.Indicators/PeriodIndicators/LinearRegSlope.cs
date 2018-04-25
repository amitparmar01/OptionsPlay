using System.Collections.Generic;
using OptionsPlay.MarketData.Common;
using OptionsPlay.Model;
using TicTacTec.TA.Library;

namespace OptionsPlay.MarketData.Indicators
{
	public class LinearRegSlope : PeriodIndicator
	{
		public LinearRegSlope(int avgPeriod)
			: base(avgPeriod)
		{
		}

		protected virtual double[] GetInRealArray(HistoricalData historicalData)
		{
			return historicalData.Close;
		}

		protected override List<Signal> GetSignalsBase(HistoricalData historicalData, List<Signal> dependencySignals = null)
		{
			List<Signal> signals = new List<Signal>();

			int count = historicalData.Count;
			int endIdx = count - 1;

			int outBegIdx;
			int outNbElement;

			double[] outLinearRegSlope = new double[count];
			double[] inReal = GetInRealArray(historicalData);

			Core.RetCode retCode = Core.LinearRegSlope(StartIdx, endIdx, inReal, AvgPeriod, out outBegIdx, out outNbElement, outLinearRegSlope);
			if (retCode != Core.RetCode.Success)
			{
				LogError(retCode);
			}
			else
			{
				signals = GetSignals(historicalData.SecurityCode, outLinearRegSlope, historicalData.Date, outBegIdx, outNbElement);
			}

			return signals;
		}

		protected override SignalInterpretation MakeInterpretation(List<Signal> signals, StockQuoteInfo quote = null)
		{
			return null;
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
	}
}