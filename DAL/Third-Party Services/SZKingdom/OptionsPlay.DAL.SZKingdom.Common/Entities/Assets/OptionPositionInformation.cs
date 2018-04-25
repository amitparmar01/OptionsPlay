using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
	public class OptionPositionInformation : AssetsCommonInformation
	{
		[SZKingdomField("QRY_POS")]
		public string QueryPosition { get; set; }

		[SZKingdomField("STKEX")]
		public StockExchange StockExchange { get; set; }

		[SZKingdomField("STKBD")]
		public StockBoard StokBoard { get; set; }

		[SZKingdomField("STKPBU")]
		public string TradeUnit { get; set; }

		[SZKingdomField("OPT_NUM")]
		public string OptionNumber { get; set; }

		[SZKingdomField("OPT_CODE")]
		public string OptionCode { get; set; }

		[SZKingdomField("OPT_NAME")]
		public string OptionName { get; set; }

		[SZKingdomField("OPT_TYPE")]
		public OptionType OptionType { get; set; }

		[SZKingdomField("OPT_SIDE")]
		public OptionSide OptionSide { get; set; }

		[SZKingdomField("OPT_CVD_FLAG")]
		public OptionCoveredFlag OptionCoveredFlag { get; set; }

		[SZKingdomField("OPT_PREBLN")]
		public long OptionPreviousBalance { get; set; }

		[SZKingdomField("OPT_BLN")]
		public long OptionBalance { get; set; }

		[SZKingdomField("OPT_AVL")]
		public long OptionAvailableQuantity { get; set; }

		[SZKingdomField("OPT_FRZ")]
		public long OptionFrozenQuantity { get; set; }

		[SZKingdomField("OPT_UFZ")]
		public long OptionUnfrozenQuantity { get; set; }

		[SZKingdomField("OPT_TRD_FRZ")]
		public long OptionTradeFrozenQuantity { get; set; }

		[SZKingdomField("OPT_TRD_UFZ")]
		public long OptionTradeUnfrozenQuantity { get; set; }

		[SZKingdomField("OPT_TRD_OTD")]
		public long OptionTradeOTDQuantity { get; set; }

		[SZKingdomField("OPT_TRD_BLN")]
		public long OptionTradeNettingQuantity { get; set; }

		[SZKingdomField("OPT_CLR_FRZ")]
		public long OptionClearanceFronzenQuantity { get; set; }

		[SZKingdomField("OPT_CLR_UFZ")]
		public long OptionClearanceUnfronzenQuantity { get; set; }

		[SZKingdomField("OPT_CLR_OTD")]
		public long OptionClearanceOTDQuantity { get; set; }

		[SZKingdomField("OPT_BCOST")]
		public decimal OptionCostBasis { get; set; }

		[SZKingdomField("OPT_BCOST_RLT")]
		public decimal OptionRealtimeCostBasis { get; set; }

		[SZKingdomField("OPT_PLAMT")]
		public decimal OptionUnrealizedPL { get; set; }

		[SZKingdomField("OPT_PLAMT_RLT")]
		public decimal OptionRealtimeUnrealizedPL { get; set; }

		[SZKingdomField("OPT_MKT_VAL")]
		public decimal OptionMarketValue { get; set; }

		[SZKingdomField("OPT_PREMIUM")]
		public decimal OptionPremium { get; set; }

		[SZKingdomField("OPT_MARGIN")]
		public decimal OptionMargin { get; set; }

		[SZKingdomField("OPT_CVD_ASSET")]
		public decimal OptionCoveredSecurityQuantity { get; set; }

		[SZKingdomField("OPT_CLS_PROFIT")]
		public decimal OptionClosePL { get; set; }

		[SZKingdomField("OPT_FLOAT_PROFIT")]
		public decimal OptionFloatingPL { get; set; }
	}
}