namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
	public class UnderlyingSecurityLockUnlockInformation : OptionOrderCommonInformation
	{
		[SZKingdomField("ORDER_QTY")]
		public long OrderQuantity { get; set; }

		[SZKingdomField("OPT_UNDL_CODE")]
		public string OptionUnderlyingCode { get; set; }

		[SZKingdomField("OPT_UNDL_NAME")]
		public string OptionUnderlyingName { get; set; }
	}
}
