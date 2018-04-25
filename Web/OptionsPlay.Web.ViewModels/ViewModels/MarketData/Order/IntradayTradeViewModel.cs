using System;

namespace OptionsPlay.Web.ViewModels.MarketData.Order
{
	public class IntradayTradeViewModel : OptionOrderViewModel
	{
		public string QueryPosition { get; set; }

		public DateTime TradeDate { get; set; }

		public DateTime MatchedTime { get; set; }

		public DateTime OrderDate { get; set; }

		public long OrderSerialNo { get; set; }

		public long InternalOrganization { get; set; }

		public string StockExchange { get; set; }

		public string OwnerType { get; set; }

		public string Currency { get; set; }

		public string OptionUnderlyingClass { get; set; }

		public string MatchedType { get; set; }

		public string MatchedSerialNo { get; set; }

		public long MatchedQuantity { get; set; }

		public decimal MatchedPrice { get; set; }

		public decimal MatchedAmount { get; set; }

		public bool IsWithdraw { get; set; }

		public string OfferReturnMessage { get; set; }

		#region Overrides of Object

		protected bool Equals(IntradayTradeViewModel other)
		{
			return OrderId == other.OrderId && MatchedSerialNo == other.MatchedSerialNo;
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
			return Equals((IntradayTradeViewModel)obj);
		}

		#endregion
	}
}