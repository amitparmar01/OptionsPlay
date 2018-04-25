namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
	public class RiskLevelInformation : AssetsCommonInformation
	{
		[SZKingdomField("FUND_BLN")]
		public decimal FundBalance { get; set; }

		[SZKingdomField("FUND_AVL")]
		public decimal AvailableFund { get; set; }

		[SZKingdomField("MARGIN_USED")]
		public decimal UsedMargin { get; set; }

        //[SZKingdomField("MARGIN_RATE")]
        //public decimal MarginRate { get; set; }
	}
}