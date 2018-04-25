using OptionsPlay.TechnicalAnalysis.Entities;
using System;
using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.Web.ViewModels.MarketData
{
	public class OptionViewModel
	{
		public string SecurityCode { get; set; }

		public string OptionNumber { get; set; }

		public string OptionCode { get; set; }

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

		public long OpenInterest { get; set; }

		public double Turnover { get; set; }

		public long UncoveredPositionQuantity { get; set; }

		public double PreviousSettlementPrice { get; set; }

		public double OpeningPrice { get; set; }

		public double AuctionReferencePrice { get; set; }

		public long AuctionReferenceQuantity { get; set; }

		public double HighestPrice { get; set; }

		public double LowestPrice { get; set; }

		public double LatestTradedPrice { get; set; }

		public double Change { get; set; }

		public double ChangePercentage { get; set; }

		public double PreviousClose { get; set; }

        public string OptionName { get; set; }

		// in Chinese.
		public string Name { get; set; }

        public DateTime TradeDate { get; set; }

        //========================================
        public OptionType TypeOfOption { get; set; }
        public decimal LimitDownPrice { get; set; }
        public decimal LimitUpPrice { get; set; }
        public long OptionUnit { get; set; }
        public string OptionUnderlyingCode { get; set; }
        public string OptionUnderlyingName { get; set; }

		#region Equality members

		protected bool Equals(OptionViewModel other)
		{
			return string.Equals(OptionNumber, other.OptionNumber) 
				&& Bid.Equals(other.Bid) 
				&& BidVolume == other.BidVolume 
				&& Ask.Equals(other.Ask) 
				&& AskVolume == other.AskVolume 
				&& Volume == other.Volume 
				&& Bid2.Equals(other.Bid2) 
				&& BidVolume2 == other.BidVolume2 
				&& Ask2.Equals(other.Ask2) 
				&& AskVolume2 == other.AskVolume2 
				&& Bid3.Equals(other.Bid3) 
				&& BidVolume3 == other.BidVolume3 
				&& Ask3.Equals(other.Ask3) 
				&& AskVolume3 == other.AskVolume3 
				&& Bid4.Equals(other.Bid4) 
				&& BidVolume4 == other.BidVolume4 
				&& Ask4.Equals(other.Ask4) 
				&& AskVolume4 == other.AskVolume4 
				&& Bid5.Equals(other.Bid5) 
				&& BidVolume5 == other.BidVolume5 
				&& Ask5.Equals(other.Ask5) 
				&& AskVolume5 == other.AskVolume5 
				&& Equals(Greeks, other.Greeks) 
				&& OpenInterest == other.OpenInterest 
				&& Turnover.Equals(other.Turnover) 
				&& UncoveredPositionQuantity == other.UncoveredPositionQuantity 
				&& PreviousSettlementPrice.Equals(other.PreviousSettlementPrice) 
				&& OpeningPrice.Equals(other.OpeningPrice) 
				&& AuctionReferencePrice.Equals(other.AuctionReferencePrice) 
				&& AuctionReferenceQuantity == other.AuctionReferenceQuantity 
				&& HighestPrice.Equals(other.HighestPrice) 
				&& LowestPrice.Equals(other.LowestPrice) 
				&& LatestTradedPrice.Equals(other.LatestTradedPrice) 
				&& Change.Equals(other.Change) 
				&& ChangePercentage.Equals(other.ChangePercentage) 
				&& PreviousClose.Equals(other.PreviousClose) 
				&& string.Equals(Name, other.Name);
		}

		public override bool Equals(object obj)
		{
			if (ReferenceEquals(null, obj))
			{
				return false;
			}
			if (ReferenceEquals(this, obj))
			{
				return true;
			}
			if (obj.GetType() != this.GetType())
			{
				return false;
			}
			return Equals((OptionViewModel)obj);
		}

		public override int GetHashCode()
		{
			unchecked
			{
				int hashCode = (SecurityCode != null
					? SecurityCode.GetHashCode()
					: 0);
				hashCode = (hashCode * 397) ^ (OptionNumber != null
					? OptionNumber.GetHashCode()
					: 0);
				hashCode = (hashCode * 397) ^ (OptionCode != null
					? OptionCode.GetHashCode()
					: 0);
				hashCode = (hashCode * 397) ^ Bid.GetHashCode();
				hashCode = (hashCode * 397) ^ BidVolume.GetHashCode();
				hashCode = (hashCode * 397) ^ Ask.GetHashCode();
				hashCode = (hashCode * 397) ^ AskVolume.GetHashCode();
				hashCode = (hashCode * 397) ^ Volume.GetHashCode();
				hashCode = (hashCode * 397) ^ Bid2.GetHashCode();
				hashCode = (hashCode * 397) ^ BidVolume2.GetHashCode();
				hashCode = (hashCode * 397) ^ Ask2.GetHashCode();
				hashCode = (hashCode * 397) ^ AskVolume2.GetHashCode();
				hashCode = (hashCode * 397) ^ Bid3.GetHashCode();
				hashCode = (hashCode * 397) ^ BidVolume3.GetHashCode();
				hashCode = (hashCode * 397) ^ Ask3.GetHashCode();
				hashCode = (hashCode * 397) ^ AskVolume3.GetHashCode();
				hashCode = (hashCode * 397) ^ Bid4.GetHashCode();
				hashCode = (hashCode * 397) ^ BidVolume4.GetHashCode();
				hashCode = (hashCode * 397) ^ Ask4.GetHashCode();
				hashCode = (hashCode * 397) ^ AskVolume4.GetHashCode();
				hashCode = (hashCode * 397) ^ Bid5.GetHashCode();
				hashCode = (hashCode * 397) ^ BidVolume5.GetHashCode();
				hashCode = (hashCode * 397) ^ Ask5.GetHashCode();
				hashCode = (hashCode * 397) ^ AskVolume5.GetHashCode();
				hashCode = (hashCode * 397) ^ (Greeks != null
					? Greeks.GetHashCode()
					: 0);
				hashCode = (hashCode * 397) ^ OpenInterest.GetHashCode();
				hashCode = (hashCode * 397) ^ Turnover.GetHashCode();
				hashCode = (hashCode * 397) ^ UncoveredPositionQuantity.GetHashCode();
				hashCode = (hashCode * 397) ^ PreviousSettlementPrice.GetHashCode();
				hashCode = (hashCode * 397) ^ OpeningPrice.GetHashCode();
				hashCode = (hashCode * 397) ^ AuctionReferencePrice.GetHashCode();
				hashCode = (hashCode * 397) ^ AuctionReferenceQuantity.GetHashCode();
				hashCode = (hashCode * 397) ^ HighestPrice.GetHashCode();
				hashCode = (hashCode * 397) ^ LowestPrice.GetHashCode();
				hashCode = (hashCode * 397) ^ LatestTradedPrice.GetHashCode();
				hashCode = (hashCode * 397) ^ Change.GetHashCode();
				hashCode = (hashCode * 397) ^ ChangePercentage.GetHashCode();
				hashCode = (hashCode * 397) ^ PreviousClose.GetHashCode();
				hashCode = (hashCode * 397) ^ (Name != null
					? Name.GetHashCode()
					: 0);
				return hashCode;
			}
		}

		#endregion
	}
}