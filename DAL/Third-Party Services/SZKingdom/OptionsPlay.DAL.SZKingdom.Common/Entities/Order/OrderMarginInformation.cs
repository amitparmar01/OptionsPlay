using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
	public class OrderMarginInformation
	{
		[SZKingdomField("CUST_CODE")]
		public string CustomerCode { get; set; }

		[SZKingdomField("CUACCT_CODE")]
		public string CustomerAccountCode { get; set; }

		[SZKingdomField("CURRENCY")]
		public Currency Currency { get; set; }


		[SZKingdomField("STKBD")]
		public StockBoard StockBoard { get; set; }

		
		[SZKingdomField("TRDACCT")]
		public string TradeAccount { get; set; }
		

		[SZKingdomField("OPT_NUM")]
		public string OptionNumber { get; set; }

		
		[SZKingdomField("ORDER_QTY")]
		public long OrderQuantity { get; set; }
		
		
		[SZKingdomField("SECU_MARGIN")]
		public decimal BrokrageMargin { get; set; }


		[SZKingdomField("STKEX_MARGIN")]
		public decimal ExchangeMargin { get; set; }

	}
}