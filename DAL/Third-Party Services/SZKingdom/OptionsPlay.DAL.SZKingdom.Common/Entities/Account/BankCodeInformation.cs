using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
	public class BankCodeInformation
	{

		[SZKingdomField("CURRENCY")]
		public Currency Currency { get; set; }
		
		[SZKingdomField("EXT_ORG")]
		public long BankCode { get; set; }

		[SZKingdomField("EXT_ORG_NAME")]
		public string BankName { get; set; }

		//public string CustomerAccoundCode { get; set; }
		
	}
}