using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OptionsPlay.Model
{
	public class OptionBasicInformationCache : IBaseEntity<long>
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public long Id { get; set; }

		[Column(TypeName = "char")]
		[MaxLength(1)]
		public string StockExchange { get; set; }

		[Column(TypeName = "char")]
		[MaxLength(2)]
		public string TradeSector { get; set; }

		[MaxLength(16)]
		public string OptionNumber { get; set; }

		[MaxLength(32)]
		public string OptionCode { get; set; }


		public decimal PreviousClosingPrice { get; set; }

		public decimal PreviousSettlementPrice { get; set; }


		[MaxLength(32)]
		public string OptionName { get; set; }

		[Column(TypeName = "char")]
		[MaxLength(1)]
		public string OptionType { get; set; }

		[MaxLength(8)]
		public string OptionUnderlyingCode { get; set; }

		[MaxLength(16)]
		public string OptionUnderlyingName { get; set; }

		[Column(TypeName = "char")]
		[MaxLength(1)]
		public string OptionUnderlyingClass { get; set; }

		[Column(TypeName = "char")]
		[MaxLength(1)]
		public string OptionExecuteType { get; set; }

		public long OptionUnit { get; set; }

		public decimal StrikePrice { get; set; }

		public DateTime TradeStartDate { get; set; }

		public DateTime TradeEndDate { get; set; }

		public DateTime ExerciseDate { get; set; }

		public DateTime ExpireDate { get; set; }

		[Column(TypeName = "char")]
		[MaxLength(1)]
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

		[Column(TypeName = "char")]
		[MaxLength(1)]
		public string OpenPositionFlag { get; set; }

		[Column(TypeName = "char")]
		[MaxLength(1)]
		public string SuspendedFlag { get; set; }

		[Column(TypeName = "char")]
		[MaxLength(1)]
		public string ExpiredFlag { get; set; }

		[Column(TypeName = "char")]
		[MaxLength(1)]
		public string AdjustedFlag { get; set; }

		[Column(TypeName = "char")]
		[MaxLength(1)]
		public string OptionStatus { get; set; }

		public DateTime UpdateDate { get; set; }
	}
}