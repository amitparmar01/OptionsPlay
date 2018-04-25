using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
	public class AccountInformation : AccountCommonInformation
	{
		[SZKingdomField("QRY_POS")]
		public string QueryPosition { get; set; }
		
		[SZKingdomField("STKEX")]
		public StockExchange StockExchange { get; set; }
		
		[SZKingdomField("STKBD")]
		public StockBoard StockBoard { get; set; }
		
		[SZKingdomField("TRDACCT")]
		public string TradeAccount { get; set; }
		
		[SZKingdomField("TRDACCT_SN")]
		public string TradeAccountSN { get; set; }
		
		[SZKingdomField("TRDACCT_EXID")]
		public string TradeAccountEXId { get; set; }
		
		[SZKingdomField("TRDACCT_STATUS")]
		public TradeAccountStatus TradeAccountStatus { get; set; }
		
		[SZKingdomField("TREG_STATUS")]
		public TradeRegStatus TradeRegStatus { get; set; }
		
		[SZKingdomField("STKPBU")]
		public string TradeUnit { get; set; }
		
		[SZKingdomField("ID_TYPE")]
		public IdType IdType { get; set; }
		
		[SZKingdomField("ID_CODE")]
		public string IdCode { get; set; }

		[SZKingdomField("CUST_NAME")]
		public string CustomerName { get; set; }
	}
}