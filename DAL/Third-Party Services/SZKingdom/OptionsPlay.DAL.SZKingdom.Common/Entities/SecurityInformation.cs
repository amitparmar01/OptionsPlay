using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
	public class SecurityInformation
	{
		[SZKingdomField("STKEX")]
		public StockExchange StockExchange { get; set; }

		[SZKingdomField("STKBD")]
		public StockBoard TradeSector { get; set; }

		[SZKingdomField("STK_CODE")]
		public string SecurityCode { get; set; }

		[SZKingdomField("STK_NAME")]
		public string SecurityName { get; set; }

		[SZKingdomField("STK_CLS")]
		public string/*todo: StockClass*/ SecurityClass { get; set; }

		[SZKingdomField("STK_STATUS")]
		public StockStatus SecurityStatus { get; set; }

		[SZKingdomField("CURRENCY")]
		public Currency Currency { get; set; }


		[SZKingdomField("STK_UPLMT_RATIO")]
		public decimal LimitUpRatio { get; set; }

		[SZKingdomField("STK_LWLMT_RATIO")]
		public decimal LimitDownRatio { get; set; }

		[SZKingdomField("STK_UPLMT_PRICE")]
		public decimal LimitUpPrice { get; set; }

		[SZKingdomField("STK_LWLMT_PRICE")]
		public decimal LimitDownPrice { get; set; }

		[SZKingdomField("STK_UPLMT_QTY")]
		public long LimitUpQuantity { get; set; }

		[SZKingdomField("STK_LWLMT_QTY")]
		public long LimitDownQuantity { get; set; }


		[SZKingdomField("STK_LOT_SIZE")]
		public long LotSize { get; set; }

		[SZKingdomField("STK_LOT_FLAG")]
		public LotFlag LotFlag { get; set; }

		[SZKingdomField("STK_SPREAD")]
		public long Spread { get; set; }

		[SZKingdomField("STK_CAL_MKTVAL")]
		public MarketValueFlag MarketValueFlag { get; set; }

		[SZKingdomField("STK_SUSPENDED")]
		public SuspendedFlag SuspendedFlag { get; set; }

		[SZKingdomField("STK_ISIN")]
		public string ISIN{ get; set; }

		[SZKingdomField("STK_SUB_CLS")]
		public string SecuritySubClass { get; set; }

		[SZKingdomField("STK_BIZES")]
		public string /*List<StockBusinessAction>*/ SecurityBusinesses { get; set; }

		[SZKingdomField("STK_CUSTODY_MODE")]
		public string CustodyMode { get; set; }

		[SZKingdomField("STK_UNDL_CODE")]
		public string UnderlyinSecurityCode { get; set; }

		[SZKingdomField("BUY_UNIT")]
		public int BuyUnit { get; set; }

		[SZKingdomField("SALE_UNIT")]
		public int SellUnit { get; set; }

		[SZKingdomField("BOND_INT")]
		public decimal? BondInterest { get; set; }

		[SZKingdomField("STK_LEVEL")]
		public string SecurityLevel { get; set; }

		[SZKingdomField("STK_DEADLINE")]
		public int TradeDeadline { get; set; }

		[SZKingdomField("REMIND_MESSAGE")]
		public string RemindMessage { get; set; }
	}
}
