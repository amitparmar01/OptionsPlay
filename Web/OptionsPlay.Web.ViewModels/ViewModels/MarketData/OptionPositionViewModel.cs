using OptionsPlay.BusinessLogic.Common.Entities;

namespace OptionsPlay.Web.ViewModels.MarketData
{
	public class OptionPositionViewModel
	{
		public string OptionNumber { get; set; }

		public string OptionName { get; set; }

		public string OptionType { get; set; }

		public string OptionSide { get; set; }

		public long OptionBalance { get; set; }

		public long OptionAvailableQuantity { get; set; }

		public string OptionCoveredFlag { get; set; }

		public decimal OptionRealtimeCostBasis { get; set; }

		public decimal OptionRealtimeUnrealizedPL { get; set; }

		public decimal OptionMarketValue { get; set; }

		public decimal OptionMargin { get; set; }

		public string OptionCode { get; set; }

		public decimal OptionFloatingPL { get; set; }
		
		public bool IsCovered { get; set; }
		public DateAndNumberOfDaysUntilViewModel Expiry { get; set; }
	}
}
