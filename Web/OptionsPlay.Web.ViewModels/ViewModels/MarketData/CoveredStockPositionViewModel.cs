namespace OptionsPlay.Web.ViewModels.MarketData
{
	public class CoveredStockPositionViewModel
	{
		public string SecurityCode { get; set; }

		public string SecurityName { get; set; }

		public string SecurityClass { get; set; }

		public long PreviousBalance { get; set; }

		public long Balance { get; set; }

		public long AvailableBalance { get; set; }
	}
}