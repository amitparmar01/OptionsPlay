namespace OptionsPlay.Web.ViewModels.MarketData
{
	public class FundViewModel
	{

		public string Currency { get; set; }

		public decimal TotalAssetsValue { get; set; }

		public decimal SecuritiesMarketValue { get; set; }

		public decimal PreviousFundValue { get; set; }

		public decimal FundBalance { get; set; }

		public decimal AvailableFund { get; set; }

		public decimal FrozenFund { get; set; }

		public decimal UnfrozenFund { get; set; }

		public decimal FronzenTradeFund { get; set; }

		public decimal UnfrozenTradeFund { get; set; }

		public decimal OTDTradeFund { get; set; }

		public decimal TradeNettingFund { get; set; }

		public string FundStatus { get; set; }

		public decimal FloatingPL { get; set; }

		public decimal UsedMargin { get; set; }

		public decimal MarginRate { get; set; }
	}
}