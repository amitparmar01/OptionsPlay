using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
	public abstract class OptionCommonInformation
	{
		[SZKingdomField("STKEX")]
		public StockExchange StockExchange { get; set; }

		[SZKingdomField("STKBD")]
		public StockBoard TradeSector { get; set; }

		[SZKingdomField("OPT_NUM")]
		public string OptionNumber { get; set; }

		[SZKingdomField("OPT_CODE")]
		public string OptionCode { get; set; }

		[SZKingdomField("PRE_CLOSE_PX")]
		public decimal PreviousClosingPrice { get; set; }

		[SZKingdomField("PRE_SETT_PRICE")]
		public decimal PreviousSettlementPrice { get; set; }
	}
}