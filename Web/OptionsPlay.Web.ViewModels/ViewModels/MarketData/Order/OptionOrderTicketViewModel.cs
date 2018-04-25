namespace OptionsPlay.Web.ViewModels.MarketData.Order
{
	public class OptionOrderTicketViewModel
	{
		public string AccountCode { get; set; }
		public string TradeAccount { get; set; }
		public string OptionNumber { get; set; }
		public string UnderlyingCode { get; set; }
		public string SecurityCode { get; set; }
		public long OrderQuantity { get; set; }
		public string StockBusiness { get; set; }
		public string OrderType { get; set; }
		public string Password { get; set; }
		public decimal? OrderPrice { get; set; }
		public string ClientInfo { get; set; }

        public string InternalOrganization { get; set; }
	}
}