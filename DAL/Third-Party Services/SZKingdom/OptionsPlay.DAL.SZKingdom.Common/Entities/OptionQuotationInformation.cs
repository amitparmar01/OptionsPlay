using System;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
	internal class OptionQuotationInformation : OptionCommonInformation
	{
		[SZKingdomField("TRD_DATE")]
		public DateTime TradeDate { get; set; }

		[SZKingdomField("TOTAL_AMT")]
		public decimal TotalAmount { get; set; }

		[SZKingdomField("TOTAL_VOLUME")]
		public long TradeQuantity { get; set; }

		[SZKingdomField("OPT_OPEN_PRICE")]
		public decimal OpeningPrice { get; set; }

		[SZKingdomField("OPT_CURR_PRICE")]
		public decimal CurrentPrice { get; set; }

		[SZKingdomField("OPT_HIGH_PRICE")]
		public decimal HighestPrice { get; set; }

		[SZKingdomField("OPT_LOW_PRICE")]
		public decimal LowestPrice { get; set; }

		[SZKingdomField("OPT_TRD_PRICE")]
		public decimal LatestTradedPrice { get; set; }

		[SZKingdomField("OPT_AUCT_PRICE")]
		public decimal AuctionReferencePrice { get; set; }

		[SZKingdomField("OPT_AUCT_QTY")]
		public long AuctionReferenceQuantity { get; set; }

		[SZKingdomField("OPT_SETT_PRICE")]
		public decimal SettlementPrice { get; set; }


		[SZKingdomField("BUY_PRICE1")]
		public decimal BuyPrice1 { get; set; }

		[SZKingdomField("BUY_VOLUME1")]
		public long BuyQuantity1 { get; set; }


		[SZKingdomField("BUY_PRICE2")]
		public decimal BuyPrice2 { get; set; }

		[SZKingdomField("BUY_VOLUME2")]
		public long BuyQuantity2 { get; set; }


		[SZKingdomField("BUY_PRICE3")]
		public decimal BuyPrice3 { get; set; }

		[SZKingdomField("BUY_VOLUME3")]
		public long BuyQuantity3 { get; set; }


		[SZKingdomField("BUY_PRICE4")]
		public decimal BuyPrice4 { get; set; }

		[SZKingdomField("BUY_VOLUME4")]
		public long BuyQuantity4 { get; set; }


		[SZKingdomField("BUY_PRICE5")]
		public decimal BuyPrice5 { get; set; }

		[SZKingdomField("BUY_VOLUME5")]
		public long BuyQuantity5 { get; set; }


		[SZKingdomField("SELL_PRICE1")]
		public decimal SellPrice1 { get; set; }

		[SZKingdomField("SELL_VOLUME1")]
		public long SellQuantity1 { get; set; }


		[SZKingdomField("SELL_PRICE2")]
		public decimal SellPrice2 { get; set; }

		[SZKingdomField("SELL_VOLUME2")]
		public long SellQuantity2 { get; set; }


		[SZKingdomField("SELL_PRICE3")]
		public decimal SellPrice3 { get; set; }

		[SZKingdomField("SELL_VOLUME3")]
		public long SellQuantity3 { get; set; }


		[SZKingdomField("SELL_PRICE4")]
		public decimal SellPrice4 { get; set; }

		[SZKingdomField("SELL_VOLUME4")]
		public long SellQuantity4 { get; set; }


		[SZKingdomField("SELL_PRICE5")]
		public decimal SellPrice5 { get; set; }

		[SZKingdomField("SELL_VOLUME5")]
		public long SellQuantity5 { get; set; }
	}
}