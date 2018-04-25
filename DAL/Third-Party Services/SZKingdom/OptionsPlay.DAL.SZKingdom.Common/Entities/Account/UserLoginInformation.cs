using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
	public class UserLoginInformation : AccountCommonInformation
	{
		[SZKingdomField("STKEX")]
		public StockExchange StockExchange { get; set; }

		[SZKingdomField("STKBD")]
		public StockBoard StockBoard { get; set; }

		[SZKingdomField("TRDACCT")]
		public string TradeAccount { get; set; }

		[SZKingdomField("SUBACCT_CODE")]
		public string SubAccountCode { get; set; }

		[SZKingdomField("OPT_TRDACCT")]
		public string OptionTradeAccount { get; set; }
		
		[SZKingdomField("TRDACCT_STATUS")]
		public TradeAccountStatus TradeAccountStatus { get; set; }

		[SZKingdomField("STKPBU")]
		public string TradeUnit { get; set; }

		[SZKingdomField("ACCT_TYPE")]
		public LoginAccountType LoginAccountType { get; set; }

		[SZKingdomField("ACCT_ID")]
		public string AccountId { get; set; }

		[SZKingdomField("TRDACCT_NAME")]
		public string TradeAccountName { get; set; }

		[SZKingdomField("SESSION_ID")]
		public string SessionId { get; set; }
	}
}