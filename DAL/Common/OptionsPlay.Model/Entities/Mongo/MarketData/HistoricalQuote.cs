using System;

namespace OptionsPlay.Model
{
	public class HistoricalQuote : QuoteInfo
	{
		public DateTime TradeDate { get; set; }

		public int MarketCode { get; set; }

		public string StockCode { get; set; }

		public string StockName { get; set; }

		public double LastClosePrice { get; set; }

		public double OpenPrice { get; set; }

		public double HighPrice { get; set; }

		public double LowPrice { get; set; }

		public double MatchQuantity { get; set; }

		public double MatchSum { get; set; }

		public double ClosePrice { get; set; }

		public double DealPieces { get; set; }

		public double PriceAscend { get; set; }

		public object SourceType { get; set; }

		public DateTime LastModify { get; set; }
	}
}
