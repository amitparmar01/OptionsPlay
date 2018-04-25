using System;

namespace OptionsPlay.Web.ViewModels.MarketData
{
	public class SecurityQuotationViewModel
	{
		public string StockExchange { get; set; }

		public string TradeSector { get; set; }

		public string SecurityCode { get; set; }

		public string SecurityName { get; set; }

		public string SecurityClass { get; set; }

		public bool HasOptions { get; set; }

		public string SecurityStatus { get; set; }

		public string Currency { get; set; }

		public decimal LimitUpPrice { get; set; }

		public decimal LimitDownPrice { get; set; }

		public long LotSize { get; set; }

		public string LotFlag { get; set; }

		public string SuspendedFlag { get; set; }

		public string SecuritySubClass { get; set; }

		public string UnderlyinSecurityCode { get; set; }

		public string SecurityLevel { get; set; }
		
		public decimal PreviousClose { get; set; }

		public decimal OpenPrice { get; set; }

		public decimal Turnover { get; set; }

		public decimal HighPrice { get; set; }

		public decimal LowPrice { get; set; }

		public decimal LastPrice { get; set; }

		public decimal Change
		{
			get { return LastPrice - PreviousClose; }
		}

		public decimal ChangePercentage
		{
			get
			{
				if (PreviousClose != 0)
				{
					return (LastPrice - PreviousClose) / PreviousClose;
				}
				return 0;
			}
		}

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

		public DateTime TradeDate { get; set; }


		#region Equality members

		protected bool Equals(SecurityQuotationViewModel other)
		{
			return string.Equals(StockExchange, other.StockExchange) 
				&& string.Equals(TradeSector, other.TradeSector) 
				&& string.Equals(SecurityCode, other.SecurityCode) 
				&& string.Equals(SecurityName, other.SecurityName) 
				&& string.Equals(SecurityClass, other.SecurityClass) 
				&& HasOptions.Equals(other.HasOptions) 
				&& string.Equals(SecurityStatus, other.SecurityStatus) 
				&& string.Equals(Currency, other.Currency) 
				&& LimitUpPrice == other.LimitUpPrice 
				&& LimitDownPrice == other.LimitDownPrice
				&& LotSize == other.LotSize 
				&& string.Equals(LotFlag, other.LotFlag) 
				&& string.Equals(SuspendedFlag, other.SuspendedFlag) 
				&& string.Equals(SecuritySubClass, other.SecuritySubClass) 
				&& string.Equals(UnderlyinSecurityCode, other.UnderlyinSecurityCode) 
				&& string.Equals(SecurityLevel, other.SecurityLevel)
				&& PreviousClose == other.PreviousClose
				&& OpenPrice == other.OpenPrice
				&& Turnover == other.Turnover 
				&& HighPrice == other.HighPrice
				&& LowPrice == other.LowPrice
				&& LastPrice == other.LastPrice
				&& CurrentBidPrice == other.CurrentBidPrice
				&& CurrentAskPrice == other.CurrentAskPrice
				&& Volume == other.Volume
				&& PERatio == other.PERatio
				&& BuyVolume1 == other.BuyVolume1 
				&& SellVolume1 == other.SellVolume1 
				&& BuyPrice2 == other.BuyPrice2 
				&& BuyVolume2 == other.BuyVolume2
				&& SellPrice2 == other.SellPrice2
				&& SellVolume2 == other.SellVolume2 
				&& BuyPrice3 == other.BuyPrice3 
				&& BuyVolume3 == other.BuyVolume3 
				&& SellPrice3 == other.SellPrice3 
				&& SellVolume3 == other.SellVolume3 
				&& BuyPrice4 == other.BuyPrice4 
				&& BuyVolume4 == other.BuyVolume4 
				&& SellPrice4 == other.SellPrice4 
				&& SellVolume4 == other.SellVolume4 
				&& BuyPrice5 == other.BuyPrice5 
				&& BuyVolume5 == other.BuyVolume5 
				&& SellPrice5 == other.SellPrice5 
				&& SellVolume5 == other.SellVolume5;
		}

		public override int GetHashCode()
		{
			unchecked
			{
				int hashCode = (StockExchange != null
					? StockExchange.GetHashCode()
					: 0);
				hashCode = (hashCode * 397) ^ (TradeSector != null
					? TradeSector.GetHashCode()
					: 0);
				hashCode = (hashCode * 397) ^ (SecurityCode != null
					? SecurityCode.GetHashCode()
					: 0);
				hashCode = (hashCode * 397) ^ (SecurityName != null
					? SecurityName.GetHashCode()
					: 0);
				hashCode = (hashCode * 397) ^ (SecurityClass != null
					? SecurityClass.GetHashCode()
					: 0);
				hashCode = (hashCode * 397) ^ HasOptions.GetHashCode();
				hashCode = (hashCode * 397) ^ (SecurityStatus != null
					? SecurityStatus.GetHashCode()
					: 0);
				hashCode = (hashCode * 397) ^ (Currency != null
					? Currency.GetHashCode()
					: 0);
				hashCode = (hashCode * 397) ^ LimitUpPrice.GetHashCode();
				hashCode = (hashCode * 397) ^ LimitDownPrice.GetHashCode();
				hashCode = (hashCode * 397) ^ LotSize.GetHashCode();
				hashCode = (hashCode * 397) ^ (LotFlag != null
					? LotFlag.GetHashCode()
					: 0);
				hashCode = (hashCode * 397) ^ (SuspendedFlag != null
					? SuspendedFlag.GetHashCode()
					: 0);
				hashCode = (hashCode * 397) ^ (SecuritySubClass != null
					? SecuritySubClass.GetHashCode()
					: 0);
				hashCode = (hashCode * 397) ^ (UnderlyinSecurityCode != null
					? UnderlyinSecurityCode.GetHashCode()
					: 0);
				hashCode = (hashCode * 397) ^ (SecurityLevel != null
					? SecurityLevel.GetHashCode()
					: 0);
				hashCode = (hashCode * 397) ^ PreviousClose.GetHashCode();
				hashCode = (hashCode * 397) ^ OpenPrice.GetHashCode();
				hashCode = (hashCode * 397) ^ Turnover.GetHashCode();
				hashCode = (hashCode * 397) ^ HighPrice.GetHashCode();
				hashCode = (hashCode * 397) ^ LowPrice.GetHashCode();
				hashCode = (hashCode * 397) ^ LastPrice.GetHashCode();
				hashCode = (hashCode * 397) ^ CurrentBidPrice.GetHashCode();
				hashCode = (hashCode * 397) ^ CurrentAskPrice.GetHashCode();
				hashCode = (hashCode * 397) ^ Volume.GetHashCode();
				hashCode = (hashCode * 397) ^ PERatio.GetHashCode();
				hashCode = (hashCode * 397) ^ BuyVolume1.GetHashCode();
				hashCode = (hashCode * 397) ^ SellVolume1.GetHashCode();
				hashCode = (hashCode * 397) ^ BuyPrice2.GetHashCode();
				hashCode = (hashCode * 397) ^ BuyVolume2.GetHashCode();
				hashCode = (hashCode * 397) ^ SellPrice2.GetHashCode();
				hashCode = (hashCode * 397) ^ SellVolume2.GetHashCode();
				hashCode = (hashCode * 397) ^ BuyPrice3.GetHashCode();
				hashCode = (hashCode * 397) ^ BuyVolume3.GetHashCode();
				hashCode = (hashCode * 397) ^ SellPrice3.GetHashCode();
				hashCode = (hashCode * 397) ^ SellVolume3.GetHashCode();
				hashCode = (hashCode * 397) ^ BuyPrice4.GetHashCode();
				hashCode = (hashCode * 397) ^ BuyVolume4.GetHashCode();
				hashCode = (hashCode * 397) ^ SellPrice4.GetHashCode();
				hashCode = (hashCode * 397) ^ SellVolume4.GetHashCode();
				hashCode = (hashCode * 397) ^ BuyPrice5.GetHashCode();
				hashCode = (hashCode * 397) ^ BuyVolume5.GetHashCode();
				hashCode = (hashCode * 397) ^ SellPrice5.GetHashCode();
				hashCode = (hashCode * 397) ^ SellVolume5.GetHashCode();
				return hashCode;
			}
		}

		#endregion

		#region Overrides of Object

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
			return Equals((SecurityQuotationViewModel)obj);
		}

		#endregion
	}
}