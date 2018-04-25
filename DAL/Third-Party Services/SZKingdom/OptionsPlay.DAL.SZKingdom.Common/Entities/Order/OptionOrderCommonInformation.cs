using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
	public class OptionOrderCommonInformation
	{
		[SZKingdomField("ORDER_BSN")]
		public long OrderBatchSerialNo { get; set; }

		[SZKingdomField("ORDER_ID")]
		public string OrderId { get; set; }

		[SZKingdomField("CUACCT_CODE")]
		public string CustomerAccountCode { get; set; }

		[SZKingdomField("STKPBU")]
		public string TradeUnit { get; set; }

		[SZKingdomField("STKBD")]
		public StockBoard StockBoard { get; set; }

		[SZKingdomField("TRDACCT")]
		public string TradeAccount { get; set; }

		[SZKingdomField("STK_BIZ")]
		public StockBusiness StockBusiness { get; set; }

		[SZKingdomField("STK_BIZ_ACTION")]
		public StockBusinessAction StockBusinessAction { get; set; }
	}
}
