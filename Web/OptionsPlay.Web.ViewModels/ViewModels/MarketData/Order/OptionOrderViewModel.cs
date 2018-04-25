namespace OptionsPlay.Web.ViewModels.MarketData.Order
{
	public class OptionOrderViewModel
	{
		public long OrderBatchSerialNo { get; set; }

		public string OrderId { get; set; }

		public string TradeUnit { get; set; }

		public string StockBoard { get; set; }

		public string StockBusiness { get; set; }

		public string StockBusinessAction { get; set; }

		public decimal OrderPrice { get; set; }

		public long OrderQuantity { get; set; }

		public decimal OrderAmount { get; set; }

		public decimal OrderFrozenAmount { get; set; }

		public string OptionNumber { get; set; }

		public string OptionCode { get; set; }

		public string OptionName { get; set; }

		public string OptionUnderlyingCode { get; set; }

		public string OptionUnderlyingName { get; set; }

		//todo: establish proper mapping for this field
		//public string OfferReturnMessage { get; set; }
	}
}