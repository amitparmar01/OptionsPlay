using System;
using OptionsPlay.Model.Attributes;

namespace OptionsPlay.Model
{
	public class StockQuoteInfo : QuoteInfo
	{
		[DbfFileMap("S1")]
		public string SecurityCode { get; set; }

		[DbfFileMap("S2")]
		public string SecurityName { get; set; }

		[DbfFileMap("S3")]
		public decimal? PreviousClose { get; set; }

		[DbfFileMap("S4")]
		public decimal? OpenPrice { get; set; }

		[DbfFileMap("S5")]
		public decimal? Turnover { get; set; }

		[DbfFileMap("S6")]
		public decimal? HighPrice { get; set; }

		[DbfFileMap("S7")]
		public decimal? LowPrice { get; set; }

		[DbfFileMap("S8")]
		public decimal? LastPrice { get; set; }

		[DbfFileMap("S9")]
		public decimal? CurrentBidPrice { get; set; }

		[DbfFileMap("S10")]
		public decimal? CurrentAskPrice { get; set; }

		[DbfFileMap("S11")]
		public decimal? Volume { get; set; }

		[DbfFileMap("S13")]
		public decimal? PERatio { get; set; }

		[DbfFileMap("S15")]
		public decimal? BuyVolume1 { get; set; }

		[DbfFileMap("S21")]
		public decimal? SellVolume1 { get; set; }

		[DbfFileMap("S16")]
		public decimal? BuyPrice2 { get; set; }

		[DbfFileMap("S17")]
		public decimal? BuyVolume2 { get; set; }

		[DbfFileMap("S22")]
		public decimal? SellPrice2 { get; set; }

		[DbfFileMap("S23")]
		public decimal? SellVolume2 { get; set; }

		[DbfFileMap("S18")]
		public decimal? BuyPrice3 { get; set; }

		[DbfFileMap("S19")]
		public decimal? BuyVolume3 { get; set; }

		[DbfFileMap("S24")]
		public decimal? SellPrice3 { get; set; }

		[DbfFileMap("S25")]
		public decimal? SellVolume3 { get; set; }

		[DbfFileMap("S26")]
		public decimal? BuyPrice4 { get; set; }

		[DbfFileMap("S27")]
		public decimal? BuyVolume4 { get; set; }

		[DbfFileMap("S30")]
		public decimal? SellPrice4 { get; set; }

		[DbfFileMap("S31")]
		public decimal? SellVolume4 { get; set; }

		[DbfFileMap("S28")]
		public decimal? BuyPrice5 { get; set; }

		[DbfFileMap("S29")]
		public decimal? BuyVolume5 { get; set; }

		[DbfFileMap("S32")]
		public decimal? SellPrice5 { get; set; }

		[DbfFileMap("S33")]
		public decimal? SellVolume5 { get; set; }

		public DateTime TradeDate { get; set; }
	}
}
