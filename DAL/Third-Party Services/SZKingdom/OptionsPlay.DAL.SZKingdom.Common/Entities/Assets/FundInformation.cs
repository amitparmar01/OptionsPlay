using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
	public class FundInformation : AssetsCommonInformation
	{
		/// <summary>
		/// Total value of fund and holding securities (MTM).
		/// </summary>
		[SZKingdomField("MARKET_VALUE")]
		public decimal TotalAssetsValue { get; set; }

		// Not used now.
		//[SZKingdomField("FUND_VALUE")]
		//public decimal FundValue { get; set; }

		[SZKingdomField("STK_VALUE")]
		public decimal SecuritiesMarketValue { get; set; }

		[SZKingdomField("FUND_PREBLN")]
		public decimal PreviousFundValue { get; set; }

		[SZKingdomField("FUND_BLN")]
		public decimal FundBalance { get; set; }

		[SZKingdomField("FUND_AVL")]
		public decimal AvailableFund { get; set; }

		[SZKingdomField("FUND_FRZ")]
		public decimal FrozenFund { get; set; }

		[SZKingdomField("FUND_UFZ")]
		public decimal UnfrozenFund { get; set; }

		[SZKingdomField("FUND_TRD_FRZ")]
		public decimal FronzenTradeFund { get; set; }

		[SZKingdomField("FUND_TRD_UFZ")]
		public decimal UnfrozenTradeFund { get; set; }

		/// <summary>
		/// Fund in transit.
		/// </summary>
		[SZKingdomField("FUND_TRD_OTD")]
		public decimal OTDTradeFund { get; set; }

		[SZKingdomField("FUND_TRD_BLN")]
		public decimal TradeNettingFund { get; set; }

		[SZKingdomField("FUND_STATUS")]
		public FundStatus FundStatus { get; set; }
	}

}