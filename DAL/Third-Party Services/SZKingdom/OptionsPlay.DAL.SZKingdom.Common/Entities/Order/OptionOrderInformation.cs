namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
	public class OptionOrderInformation : OptionOrderBasicInformation
	{
		[SZKingdomField("OPT_NUM")]
		public string OptionNumber { get; set; }

		[SZKingdomField("OPT_CODE")]
		public string OptionCode { get; set; }

		[SZKingdomField("OPT_NAME")]
		public string OptionName { get; set; }

		[SZKingdomField("OPT_UNDL_CODE")]
		public string OptionUnderlyingCode { get; set; }

		[SZKingdomField("OPT_UNDL_NAME")]
		public string OptionUnderlyingName { get; set; }
	}
}
