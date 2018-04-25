using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
	public class OptionableStockPositionInformation : AssetsCommonInformation
	{
		[SZKingdomField("QRY_POS")]
		public string QueryPosition { get; set; }

		[SZKingdomField("STKBD")]
		public StockBoard StockBoard { get; set; }

		[SZKingdomField("STKPBU")]
		public string TradeUnit { get; set; }

		[SZKingdomField("STK_CODE")]
		public string SecurityCode { get; set; }

		[SZKingdomField("STK_NAME")]
		public string SecurityName { get; set; }

		[SZKingdomField("STK_CLS")]
		public StockClass SecurityClass { get; set; }

		[SZKingdomField("CVD_STK_PREBLN")]
		public long PreviousBalance { get; set; }

		[SZKingdomField("CVD_STK_BLN")]
		public long Balance { get; set; }

		[SZKingdomField("CVD_STK_AVL")]
		public long AvailableBalance { get; set; }
	}
}