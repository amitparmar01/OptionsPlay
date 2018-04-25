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
	public class RiskScore : PeriodIndicator
	{
		public RiskScore(int avgPeriod) : base(avgPeriod)
		{
		}

		protected override List<Signal> GetSignalsBase(HistoricalData historicalData, List<Signal> dependencySignals = null)
		{
			List<Signal> signals = new List<Signal>();

			int avgPeriod = AvgPeriod;
			int count = historicalData.Count;
			int endIdx = count - 1;

			int outBegIdx;
			int outNbElement;
			if (count <= avgPeriod)
			{
				avgPeriod = count;
			}
			double[] outStdDev = new double[count - avgPeriod + 1];

			double[] inReal = GetInRealArray(historicalData);
			DateTime[] inDates = GetDateArray(historicalData);

			double[] lastPrices = new double[count - avgPeriod + 1];
			DateTime[] dates = new DateTime[count - avgPeriod + 1];

			Array.Copy(inReal, avgPeriod -1, lastPrices, 0, lastPrices.Count());
			Array.Copy(inDates, avgPeriod - 1, dates, 0, dates.Count());

			double[] result = new double[count - avgPeriod + 1];
			Core.RetCode retCode = Core.StdDev(StartIdx, endIdx, inReal, avgPeriod, 1, out outBegIdx, out outNbElement, outStdDev);
			if (retCode != Core.RetCode.Success)
			{
				LogError(retCode);
			}
			retCode = Core.Div(StartIdx, outStdDev.Count() -1, outStdDev, lastPrices, out outBegIdx, out outNbElement, result);
			if (retCode != Core.RetCode.Success)
			{
				LogError(retCode);
			}
			else
			{
				signals = GetSignals(historicalData.SecurityCode, result, dates, outBegIdx, outNbElement);
			}

			return signals;
		}

		protected virtual double[] GetInRealArray(HistoricalData historicalData)
		{
			return historicalData.Close;
		}

		protected virtual DateTime[] GetDateArray(HistoricalData historicalData)
		{
			return historicalData.Date;
		}

		protected override SignalInterpretation MakeInterpretation(List<Signal> signals, StockQuoteInfo quote = null)
		{
			return null;
		}
	}
}
