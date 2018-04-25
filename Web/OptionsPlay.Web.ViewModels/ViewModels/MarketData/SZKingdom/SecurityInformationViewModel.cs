using System.Collections.Generic;

namespace OptionsPlay.Web.ViewModels.MarketData.SZKingdom
{
	public class SecurityInformationViewModel
	{
		public string StockExchange { get; set; }

		public string TradeSector { get; set; }

		public string SecurityCode { get; set; }

		public string SecurityName { get; set; }

		public string SecurityClass { get; set; }

		public string SecurityStatus { get; set; }

		public string Currency { get; set; }

		public decimal LimitUpRatio { get; set; }

		public decimal LimitDownRatio { get; set; }

		public decimal LimitUpPrice { get; set; }

		public decimal LimitDownPrice { get; set; }

		public long LimitUpQuantity { get; set; }

		public long LimitDownQuantity { get; set; }

		public long LotSize { get; set; }

		public string LotFlag { get; set; }

		public long Spread { get; set; }

		public string MarketValueFlag { get; set; }

		public string SuspendedFlag { get; set; }

		public string ISIN { get; set; }

		public string SecuritySubClass { get; set; }

		public string SecurityBusinesses { get; set; }

		public string CustodyMode { get; set; }

		public string UnderlyinSecurityCode { get; set; }

		public int BuyUnit { get; set; }

		public int SellUnit { get; set; }

		public decimal? BondInterest { get; set; }

		public string SecurityLevel { get; set; }

		public int TradeDeadline { get; set; }

		public string RemindMessage { get; set; }
	}
}
