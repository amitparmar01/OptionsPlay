using System;
using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.BusinessLogic.Common.Entities
{
	public class SecurityQuotation 
	{
		public StockExchange StockExchange { get; set; }

		public StockBoard TradeSector { get; set; }

		public string SecurityCode { get; set; }

		public string SecurityName { get; set; }

		public string SecurityClass { get; set; }

		public StockStatus SecurityStatus { get; set; }

		public Currency Currency { get; set; }


		public decimal LimitUpRatio { get; set; }

		public decimal LimitDownRatio { get; set; }

		public decimal LimitUpPrice { get; set; }

		public decimal LimitDownPrice { get; set; }

		public long LimitUpQuantity { get; set; }

		public long LimitDownQuantity { get; set; }


		public long LotSize { get; set; }

		public LotFlag LotFlag { get; set; }

		public long Spread { get; set; }

		public MarketValueFlag MarketValueFlag { get; set; }

		public SuspendedFlag SuspendedFlag { get; set; }

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

		public DateTime TradeDate { get; set; }

		public bool HasOptions { get; set; }


		#region Quotation Information

		public decimal PreviousClose { get; set; }

		public decimal OpenPrice { get; set; }

		public decimal Turnover { get; set; }

		public decimal HighPrice { get; set; }

		public decimal LowPrice { get; set; }

		public decimal LastPrice { get; set; }

		public decimal CurrentBidPrice { get; set; }

		public decimal CurrentAskPrice { get; set; }

		public decimal Volume { get; set; }

		public decimal PERatio { get; set; }

		public decimal BuyVolume1 { get; set; }

		public decimal SellVolume1 { get; set; }

		public decimal BuyPrice2 { get; set; }

		public decimal BuyVolume2 { get; set; }

		public decimal SellPrice2 { get; set; }

		public decimal SellVolume2 { get; set; }

		public decimal BuyPrice3 { get; set; }

		public decimal BuyVolume3 { get; set; }

		public decimal SellPrice3 { get; set; }

		public decimal SellVolume3 { get; set; }

		public decimal BuyPrice4 { get; set; }

		public decimal BuyVolume4 { get; set; }

		public decimal SellPrice4 { get; set; }

		public decimal SellVolume4 { get; set; }

		public decimal BuyPrice5 { get; set; }

		public decimal BuyVolume5 { get; set; }

		public decimal SellPrice5 { get; set; }

		public decimal SellVolume5 { get; set; }
		
		#endregion Quotation Information

	}
}