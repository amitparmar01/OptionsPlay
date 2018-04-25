using System;

namespace OptionsPlay.Web.ViewModels.MarketData.Order
{
	public class IntradayOrderViewModel : OptionOrderViewModel
	{
		public string QueryPosition { get; set; }

		public DateTime TradeDate { get; set; }

		public DateTime OrderDate { get; set; }

		public DateTime OrderTime { get; set; }

		public string OrderStatus { get; set; }

		public string OrderValidFlag { get; set; }

		public long InternalOrganization { get; set; }

		public string StockExchange { get; set; }

		public string OwnerType { get; set; }

		public string Currency { get; set; }

		public decimal OrderUnfrozenAmount { get; set; }

		public long OfferQuantity { get; set; }

		public DateTime OfferSTime { get; set; }

		public long WithdrawnQuantity { get; set; }

		public long MatchedQuantity { get; set; }

		public decimal MatchedAmount { get; set; }

		public bool IsWithdraw { get; set; }

		public bool IsWithdrawn { get; set; }

		public string OptionUnderlyingClass { get; set; }

		public long UnderlyingFrozenQuantity { get; set; }

		public long UnderlyingUnfrozenQuantity { get; set; }

		public long UnderlyingWithdrawnQuantity { get; set; } 
		
		public string OfferReturnMessage { get; set; }

		#region Overrides of Object

		protected bool Equals(IntradayOrderViewModel other)
		{
			return OrderId == other.OrderId;
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
			return Equals((IntradayOrderViewModel)obj);
		}

		#endregion
	}
}