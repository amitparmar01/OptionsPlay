namespace OptionsPlay.Web.ViewModels.MarketData.SZKingdom
{
	public abstract class OptionCommonInformationViewModel
	{
		public string StockExchange { get; set; }

		public string TradeSector { get; set; }

		public string OptionNumber { get; set; }

		public string OptionCode { get; set; }

		public decimal PreviousClosingPrice { get; set; }

		public decimal PreviousSettlementPrice { get; set; }
	}
}