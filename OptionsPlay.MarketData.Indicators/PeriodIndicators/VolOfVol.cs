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
	public class VolOfVol : PeriodIndicator
	{
		public VolOfVol(int avgPeriod)
			: base(avgPeriod)
		{
		}

		protected override SignalInterpretation MakeInterpretation(List<Signal> signals, StockQuoteInfo quote = null)
		{
			return null;
		}

		protected override List<Signal> GetSignalsBase(HistoricalData historicalData, List<Signal> dependencySignals = null)
		{
			int outBegIdx;
			int outNbElement;

			double[] outVolOfVol;

			GetVolOfVol(historicalData.Close, out outBegIdx, out outNbElement, out outVolOfVol);

			List<Signal> signals = GetSignals(historicalData.SecurityCode, outVolOfVol, historicalData.Date, outBegIdx, outNbElement);

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

		private void GetVolOfVol(double[] data, out int outBeginIndex, out int outNumberElement, out double[] outVolOfVol)
		{
			int shiftedDataLength = data.Length - 1;

			if (shiftedDataLength <= AvgPeriod * 2)
			{
				outBeginIndex = -1;
				outNumberElement = 0;
				outVolOfVol = new double[0];
				return;
			}

			outVolOfVol = new double[shiftedDataLength - AvgPeriod * 2];

			double[] dailyReturns = new double[shiftedDataLength];
			double[] sumDailyReturns = new double[shiftedDataLength - AvgPeriod];
			double[] avgDailyReturns = new double[shiftedDataLength - AvgPeriod];
			double[] sumDeviations = new double[shiftedDataLength - AvgPeriod];
			double[] histVols = new double[shiftedDataLength - AvgPeriod];
			double[] cnt = new double[shiftedDataLength - AvgPeriod];

			for (int i = shiftedDataLength - 1; i >= 0; i--)
			{
				dailyReturns[i] = (data[i] - data[i + 1]) / ((data[i] + data[i + 1]) / 2);
			}

			for (int i = 0; i < shiftedDataLength - AvgPeriod; i++)
			{
				for (int j = i; j < i + AvgPeriod + 1; j++)
				{
					sumDailyReturns[i] += dailyReturns[j];
				}
				avgDailyReturns[i] = sumDailyReturns[i] / (AvgPeriod + 1);
				for (int j = i; j < i + AvgPeriod + 1; j++)
				{
					sumDeviations[i] += Math.Pow((avgDailyReturns[i] - dailyReturns[j]), 2);
				}
				histVols[i] = Math.Sqrt(sumDeviations[i] * 252 / (AvgPeriod));
			}

			for (int i = histVols.Length - 1; i >= AvgPeriod; i--)
			{
				for (int j = 0; j < AvgPeriod + 1; j++)
				{
					if (histVols[i] > histVols[i - j])
					{
						cnt[i]++;
					}
				}
				outVolOfVol[i - AvgPeriod] = cnt[i] / (AvgPeriod + 1);
			}

			outBeginIndex = AvgPeriod * 2 + 1;
			outNumberElement = outVolOfVol.Length;
		}
	}
}
