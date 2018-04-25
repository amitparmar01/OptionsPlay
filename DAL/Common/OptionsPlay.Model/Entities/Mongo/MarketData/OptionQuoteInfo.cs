using System;
using OptionsPlay.Model.Attributes;

namespace OptionsPlay.Model
{
	public class OptionQuoteInfo : QuoteInfo
	{
		[TxtFileMap(1)]
		public string OptionNumber { get; set; }

		[TxtFileMap(2)]
		public long UncoveredPositionQuantity { get; set; }

		[TxtFileMap(3)]
		public long TradeQuantity { get; set; }

		[TxtFileMap(4)]
		public decimal Turnover { get; set; }

		[TxtFileMap(5)]
		public decimal PreviousSettlementPrice { get; set; }

		[TxtFileMap(6)]
		public decimal OpeningPrice { get; set; }

		[TxtFileMap(7)]
		public decimal AuctionReferencePrice { get; set; }

		[TxtFileMap(8)]
		public long AuctionReferenceQuantity { get; set; }

		[TxtFileMap(9)]
		public decimal HighestPrice { get; set; }

		[TxtFileMap(10)]
		public decimal LowestPrice { get; set; }

		[TxtFileMap(11)]
		public decimal LatestTradedPrice { get; set; }
		
		[TxtFileMap(12)]
		public decimal BuyPrice1 { get; set; }

		[TxtFileMap(13)]
		public long BuyQuantity1 { get; set; }

		[TxtFileMap(14)]
		public decimal SellPrice1 { get; set; }

		[TxtFileMap(15)]
		public long SellQuantity1 { get; set; }


		[TxtFileMap(16)]
		public decimal BuyPrice2 { get; set; }

		[TxtFileMap(17)]
		public long BuyQuantity2 { get; set; }

		[TxtFileMap(18)]
		public decimal SellPrice2 { get; set; }

		[TxtFileMap(19)]
		public long SellQuantity2 { get; set; }


		[TxtFileMap(20)]
		public decimal BuyPrice3 { get; set; }

		[TxtFileMap(21)]
		public long BuyQuantity3 { get; set; }

		[TxtFileMap(22)]
		public decimal SellPrice3 { get; set; }

		[TxtFileMap(23)]
		public long SellQuantity3 { get; set; }


		[TxtFileMap(24)]
		public decimal BuyPrice4 { get; set; }

		[TxtFileMap(25)]
		public long BuyQuantity4 { get; set; }

		[TxtFileMap(26)]
		public decimal SellPrice4 { get; set; }

		[TxtFileMap(27)]
		public long SellQuantity4 { get; set; }


		[TxtFileMap(28)]
		public decimal BuyPrice5 { get; set; }

		[TxtFileMap(29)]
		public long BuyQuantity5 { get; set; }

		[TxtFileMap(30)]
		public decimal SellPrice5 { get; set; }

		[TxtFileMap(31)]
		public long SellQuantity5 { get; set; }
		
		[TxtFileMap(32)]
		public decimal SettlementPrice { get; set; }

		[TxtFileMap(34)]
		public DateTime TradeDate { get; set; }
	}
}
