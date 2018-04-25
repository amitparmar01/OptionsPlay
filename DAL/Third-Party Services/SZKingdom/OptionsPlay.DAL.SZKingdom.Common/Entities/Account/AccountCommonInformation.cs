namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
	public abstract class AccountCommonInformation
	{
		[SZKingdomField("CUST_CODE")]
		public string CustomerCode { get; set; }

		[SZKingdomField("CUACCT_CODE")]
		public string CustomerAccountCode { get; set; }

		[SZKingdomField("INT_ORG")]
		public long InternalOrganization { get; set; }
	}
}