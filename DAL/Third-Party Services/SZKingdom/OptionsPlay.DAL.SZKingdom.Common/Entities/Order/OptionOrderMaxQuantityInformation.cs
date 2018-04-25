using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
	public class OptionOrderMaxQuantityInformation
	{
		[SZKingdomField("STKEX")]
		public StockExchange StockExchange { get; set; }

		[SZKingdomField("STKBD")]
		public StockBoard TradeSector { get; set; }

		[SZKingdomField("TRDACCT")]
		public string TradeAccount { get; set; }

		[SZKingdomField("OPT_NUM")]
		public string OptionNumber { get; set; }

		[SZKingdomField("STK_CODE")]
		public string SecurityCode { get; set; }

		[SZKingdomField("ORDER_QTY")]
		public long OrderQuantity { get; set; }
	}
}
