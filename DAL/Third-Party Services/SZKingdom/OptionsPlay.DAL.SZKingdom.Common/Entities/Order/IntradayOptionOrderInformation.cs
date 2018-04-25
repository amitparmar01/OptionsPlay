namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
	public class IntradayOptionOrderInformation : IntradayOptionOrderBasicInformation
	{
		[SZKingdomField("OFFER_RET_MSG")]
		public string OfferReturnMessage { get; set; }

		[SZKingdomField("QRY_POS")]
		public string QueryPosition { get; set; }
	}
}