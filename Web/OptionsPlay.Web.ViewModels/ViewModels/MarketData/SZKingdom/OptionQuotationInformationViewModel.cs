using System;

namespace OptionsPlay.Web.ViewModels.MarketData.SZKingdom
{
	public class OptionQuotationInformationViewModel : OptionCommonInformationViewModel
	{
		public DateTime TradeDate { get; set; }

		public decimal TotalAmount { get; set; }

		public long TradeQuantity { get; set; }

		public decimal OpeningPrice { get; set; }

		public decimal CurrentPrice { get; set; }

		public decimal HighestPrice { get; set; }

		public decimal LowestPrice { get; set; }

		public decimal LatestTradedPrice { get; set; }

		public decimal AuctionReferencePrice { get; set; }

		public long AuctionReferenceQuantity { get; set; }

		public decimal SettlementPrice { get; set; }


		public decimal BuyPrice1 { get; set; }
		public long BuyQuantity1 { get; set; }

		public decimal BuyPrice2 { get; set; }
		public long BuyQuantity2 { get; set; }

		public decimal BuyPrice3 { get; set; }
		public long BuyQuantity3 { get; set; }

		public decimal BuyPrice4 { get; set; }
		public long BuyQuantity4 { get; set; }

		public decimal BuyPrice5 { get; set; }
		public long BuyQuantity5 { get; set; }

		public decimal SellPrice1 { get; set; }
		public long SellQuantity1 { get; set; }

		public decimal SellPrice2 { get; set; }
		public long SellQuantity2 { get; set; }

		public decimal SellPrice3 { get; set; }
		public long SellQuantity3 { get; set; }

		public decimal SellPrice4 { get; set; }
		public long SellQuantity4 { get; set; }

		public decimal SellPrice5 { get; set; }
		public long SellQuantity5 { get; set; }
	}
}