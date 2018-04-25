using System;

namespace OptionsPlay.Web.ViewModels.MarketData.SZKingdom
{
	public class OptionBasicInformationViewModel: OptionCommonInformationViewModel
	{

		public string OptionName { get; set; }

		public string OptionType { get; set; }

		public string OptionUnderlyingCode { get; set; }

		public string OptionUnderlyingName { get; set; }

		public string OptionUnderlyingClass { get; set; }

		public string OptionExecuteType { get; set; }

		public long OptionUnit { get; set; }

		public decimal StrikePrice { get; set; }

		public DateTime TradeStartDate { get; set; }

		public DateTime TradeEndDate { get; set; }

		public DateTime ExerciseDate { get; set; }

		public DateTime ExpireDate { get; set; }

		public string OptionContractVersion { get; set; }

		public long UncoveredPositionQuantity { get; set; }

		public decimal UnderlyingClosingPrice { get; set; }

		public string PriceChangeLimitType { get; set; }

		public decimal LimitUpPrice { get; set; }

		public decimal LimitDownPrice { get; set; }

		public decimal MarginUnit { get; set; }

		public decimal MarginRatioParameter1 { get; set; }

		public decimal MarginRatioParameter2 { get; set; }

		public long BoardLotSize { get; set; }

		public long UpperLimitQtyForLimitPrice { get; set; }

		public long LowerLimitQtyForLimitPrice { get; set; }

		public long UpperLimitQtyForMarketPrice { get; set; }

		public long LowerLimitQtyForMarketPrice { get; set; }

		public string OpenPositionFlag { get; set; }

		public string SuspendedFlag { get; set; }

		public string ExpiredFlag { get; set; }

		public string AdjustedFlag { get; set; }

		public string OptionStatus { get; set; }

		public string UpdateDate { get; set; }
	}
}