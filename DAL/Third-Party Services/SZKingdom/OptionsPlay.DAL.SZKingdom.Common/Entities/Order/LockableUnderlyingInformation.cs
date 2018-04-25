using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
	public class LockableUnderlyingInformation
	{
		[SZKingdomField("STKEX")]
		public StockExchange StockExchange { get; set; }

		[SZKingdomField("STKBD")]
		public StockBoard StockBoard { get; set; }

		[SZKingdomField("TRDACCT")]
		public string TradeAccount { get; set; }

		[SZKingdomField("STK_CODE")]
		public string SecurityCode { get; set; }

		[SZKingdomField("ORDER_QTY")]
		public long OrderQuantity { get; set; }
	}
}