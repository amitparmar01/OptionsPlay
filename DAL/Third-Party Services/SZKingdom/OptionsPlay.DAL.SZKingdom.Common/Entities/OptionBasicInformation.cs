using System;
using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
	public class OptionBasicInformation : OptionCommonInformation
	{
		[SZKingdomField("OPT_NAME")]
		public string OptionName { get; set; }

		[SZKingdomField("OPT_TYPE")]
		public OptionType OptionType { get; set; }

		[SZKingdomField("OPT_UNDL_CODE")]
		public string OptionUnderlyingCode { get; set; }

		[SZKingdomField("OPT_UNDL_NAME")]
		public string OptionUnderlyingName { get; set; }

		[SZKingdomField("OPT_UNDL_CLS")]
		public StockClass OptionUnderlyingClass { get; set; }

		[SZKingdomField("OPT_EXE_TYPE")]
		public OptionExecuteType OptionExecuteType { get; set; }

		[SZKingdomField("OPT_UNIT")]
		public long OptionUnit { get; set; }

		[SZKingdomField("EXERCISE_PRICE")]
		public decimal StrikePrice { get; set; }

		[SZKingdomField("START_DATE")]
		public DateTime TradeStartDate { get; set; }

		[SZKingdomField("END_DATE")]
		public DateTime TradeEndDate { get; set; }

		[SZKingdomField("EXERCISE_DATE")]
		public DateTime ExerciseDate { get; set; }

		[SZKingdomField("EXPIRE_DATE")]
		public DateTime ExpireDate { get; set; }

		[SZKingdomField("UPD_VERSION")]
		public string OptionContractVersion { get; set; }

		////		Position limit for settlement participants	CLR_POST_LIMIT	BIGINT

		[SZKingdomField("LEAVES_QTY")]
		public long UncoveredPositionQuantity { get; set; }

		[SZKingdomField("UNDL_CLS_PRICE")]
		public decimal UnderlyingClosingPrice { get; set; }

		[SZKingdomField("PRICE_LMT_TYPE")]
		public string PriceChangeLimitType { get; set; }

		[SZKingdomField("OPT_UPLMT_PRICE")]
		public decimal LimitUpPrice { get; set; }

		[SZKingdomField("OPT_LWLMT_PRICE")]
		public decimal LimitDownPrice { get; set; }

		[SZKingdomField("MARGIN_UNIT")]
		public decimal MarginUnit { get; set; }

		////		Margin ratio	MARGIN_RATIO	CRATE

		[SZKingdomField("MARGIN_RATIO1")]
		public decimal MarginRatioParameter1 { get; set; }

		[SZKingdomField("MARGIN_RATIO2")]
		public decimal MarginRatioParameter2 { get; set; }

		[SZKingdomField("OPT_LOT_SIZE")]
		public long BoardLotSize { get; set; }

		/// <summary>
		/// Upper limit of option quantity for limit price
		/// </summary>
		[SZKingdomField("OPT_LUPLMT_QTY")]
		public long UpperLimitQtyForLimitPrice { get; set; }

		/// <summary>
		/// Lower limit of option quantity for limit price
		/// </summary>
		[SZKingdomField("OPT_LLWLMT_QTY")]
		public long LowerLimitQtyForLimitPrice { get; set; }

		/// <summary>
		/// Upper limit of option quantity for market price
		/// </summary>
		[SZKingdomField("OPT_MUPLMT_QTY")]
		public long UpperLimitQtyForMarketPrice { get; set; }

		/// <summary>
		/// Lower limit of option quantity for market price
		/// </summary>
		[SZKingdomField("OPT_MLWLMT_QTY")]
		public long LowerLimitQtyForMarketPrice { get; set; }

		[SZKingdomField("OPEN_FLAG")]
		public string OpenPositionFlag { get; set; }

		[SZKingdomField("SUSPENDED_FLAG")]
		public SuspendedFlag SuspendedFlag { get; set; }

		// todo: maybe bool?
		[SZKingdomField("EXPIRE_FLAG")]
		public string ExpiredFlag { get; set; }

		[SZKingdomField("ADJUST_FLAG")]
		public string AdjustedFlag { get; set; }

		[SZKingdomField("OPT_STATUS")]
		public string OptionStatus { get; set; }

		[SZKingdomField("UPD_DATE")]
		public DateTime UpdateDate { get; set; }
	}
}