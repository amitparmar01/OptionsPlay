namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
	public class OptionOrderCancellationInformation : OptionOrderBasicInformation
	{
		[SZKingdomField("STK_CODE")]
		public string SecurityCode { get; set; }

		[SZKingdomField("STK_NAME")]
		public string SecurityName { get; set; }

		[SZKingdomField("CANCEL_STATUS")]
		public string InternalCancellationFlag { get; set; }
	}
}
