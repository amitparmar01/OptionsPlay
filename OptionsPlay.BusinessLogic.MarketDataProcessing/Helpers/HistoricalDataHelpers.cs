using System;
using System.Collections.Generic;
using System.Linq;
using MathNet.Numerics.Statistics;
using OptionsPlay.Common.Utilities;
using OptionsPlay.MarketData.Common;

namespace OptionsPlay.BusinessLogic.MarketDataProcessing.Helpers
{
	// TODO: consider to move these methods inside HistoricalData. In this case results can be cached.
	public static class HistoricalDataHelpers
	{
		/// <summary>
		/// Populate 6 month standard deviation
		/// </summary>
		public static double GetPriceRangeStdDevFor6Months(this HistoricalData data)
		{
			DateTime last6Months = DateTime.UtcNow.AddMonths(-6).Date;
			int index = ((IReadOnlyList<DateTime>)data.Date).FirstAndIndex(item => item >= last6Months).Item1;
			List<double> highPrices = data.High.Skip(index).ToList();
			List<double> lowPrices = data.Low.Skip(index).ToList();
			double rangeStdDev = ArrayStatistics.StandardDeviation(highPrices.Select((item, i) => item - lowPrices[i]).ToArray());
			return rangeStdDev;
		}

		/// <summary>
		/// Populate 6 month standard deviation
		/// </summary>
		public static double GetPriceRangeStdDev(this HistoricalData data)
		{
			double[] priceRange = data.High.Select((d, i) => d - data.Low[i]).ToArray();
			double stdDev = ArrayStatistics.StandardDeviation(priceRange);
			return stdDev;
		}

		public static double GetLastClosePrice(this HistoricalData data)
		{
			return data.Close.Last();
		}

		public static void FindGaps(this HistoricalData data, out List<int> gapUp, out List<int> gapDown)
		{
			double stdDev = data.GetPriceRangeStdDev();

			gapUp = new List<int>();
			gapDown = new List<int>();

			for (int j = 1; j < data.Count; j++)
			{
				if (data.Low[j] - data.High[j - 1] >= stdDev)
				{
					gapUp.Add(j);
				}

				if (data.Low[j - 1] - data.High[j] >= stdDev)
				{
					gapDown.Add(j);
				}
			}
		}
	}
}