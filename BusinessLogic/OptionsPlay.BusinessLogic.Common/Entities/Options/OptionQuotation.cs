using System;
using OptionsPlay.TechnicalAnalysis.Entities;
using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.BusinessLogic.Common.Entities
{
	/// <summary>
	/// Holds information which updated frequently
	/// </summary>
	public class OptionQuotation: ISecurityItem
	{
		public OptionQuotation(string optionNumber)
		{
			OptionNumber = optionNumber;
		}

		public string SecurityCode { get; set; }

		public string OptionNumber { get; private set; }

		public string OptionName { get; set; }

		public string OptionCode { get; set; }

		public long UncoveredPositionQuantity { get; set; }

		public double Turnover { get; set; }

		public double PreviousSettlementPrice { get; set; }
		
		public double OpeningPrice { get; set; }

		public double AuctionReferencePrice { get; set; }

		public long AuctionReferenceQuantity { get; set; }

		public double HighestPrice { get; set; }

		public double LowestPrice { get; set; }

		public double LatestTradedPrice { get; set; }

		public double Change
		{
			get { return Math.Abs(LatestTradedPrice) < 0.0001 ? 0 : (LatestTradedPrice - PreviousSettlementPrice); }
		}

		public double ChangePercentage
		{
			get { return Change / PreviousSettlementPrice; }
		}

		public double Bid { get; set; }
		public long BidVolume { get; set; }

		public double Ask { get; set; }
		public long AskVolume { get; set; }

		public long Volume { get; set; }
		
		public double Bid2 { get; set; }
		public long BidVolume2 { get; set; }

		public double Ask2 { get; set; }
		public long AskVolume2 { get; set; }

		public double Bid3 { get; set; }
		public long BidVolume3 { get; set; }

		public double Ask3 { get; set; }
		public long AskVolume3 { get; set; }

		public double Bid4 { get; set; }
		public long BidVolume4 { get; set; }

		public double Ask4 { get; set; }
		public long AskVolume4 { get; set; }

		public double Bid5 { get; set; }
		public long BidVolume5 { get; set; }

		public double Ask5 { get; set; }
		public long AskVolume5 { get; set; }

		public Greeks Greeks { get; set; }

        public DateTime TradeDate { get; set; }
	}
}