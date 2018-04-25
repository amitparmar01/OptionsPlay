using System;

namespace OptionsPlay.Web.ViewModels.MarketData.Order
{
	public class HistoricalTradeViewModel : OptionOrderViewModel
	{

		public long RecordNumber { get; set; }

		public DateTime TradeDate { get; set; }

		public DateTime MatchedTime { get; set; }

		public DateTime OrderDate { get; set; }

		public long OrderSerialNo { get; set; }
		
		public string Currency { get; set; }

		public string OptionUnderlyingClass { get; set; }

		public long MatchedQuantity { get; set; }

		public decimal MatchedPrice { get; set; }

		public decimal MatchedAmount { get; set; }

	}
}