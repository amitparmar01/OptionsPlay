using System;
using System.Collections.Generic;
using System.Linq;
using OptionsPlay.Common.Utilities;
using OptionsPlay.Model;

namespace OptionsPlay.MarketData.Common
{
	public class HistoricalData
	{
		public HistoricalData(List<HistoricalQuote> quotes)
		{
			if (quotes.IsNullOrEmpty())
			{
				throw new ArgumentNullException("quotes");
			}

			Open = quotes.Select(q => q.OpenPrice).ToArray();
			High = quotes.Select(q => q.HighPrice).ToArray();
			Low = quotes.Select(q => q.LowPrice).ToArray();
			Close = quotes.Select(q => q.ClosePrice).ToArray();
			Volume = quotes.Select(q => q.MatchQuantity).ToArray();
			Date = quotes.Select(q => q.TradeDate).ToArray();

			Count = Close.Length;
			OldestDate = Date.Min();
			LatestDate = Date.Max();

			SecurityCode = quotes[0].StockCode;
		}

		public double[] Open { get; private set; }

		public double[] High { get; private set; }

		public double[] Low { get; private set; }

		public double[] Close { get; private set; }

		public double[] Volume { get; private set; }

		public DateTime[] Date { get; private set; }

		public int Count { get; private set; }

		public DateTime OldestDate { get; private set; }

		public DateTime LatestDate { get; private set; }

		public string SecurityCode { get; private set; }
	}
}