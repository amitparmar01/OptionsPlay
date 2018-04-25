using System.Collections.Generic;

namespace OptionsPlay.Web.ViewModels.MarketData
{
	public class OptionChainViewModel
	{
		public List<OptionPairViewModel> Chains { get; set; }

		public List<decimal> StrikePrices { get; set; }

		public List<DateAndNumberOfDaysUntilViewModel> ExpirationDates { get; set; }

		public double UnderlyingCurrentPrice { get; set; }
	}
}