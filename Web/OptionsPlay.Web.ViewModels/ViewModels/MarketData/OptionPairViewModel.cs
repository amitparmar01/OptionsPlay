namespace OptionsPlay.Web.ViewModels.MarketData
{
	public class OptionPairViewModel
	{
		public string SecurityCode { get; set; }

		// in Chinese.
		public string SecurityName { get; set; }

		public double StrikePrice { get; set; }

		public long PremiumMultiplier { get; set; }

		public DateAndNumberOfDaysUntilViewModel Expiry { get; set; }

		public OptionViewModel CallOption { get; set; }

		public OptionViewModel PutOption { get; set; }
	}
}
