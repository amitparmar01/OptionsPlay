using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class OrderStatus : BaseTypeSafeEnum<string, OrderStatus>
	{
		public static readonly OrderStatus NotOffered = new OrderStatus("0");
		public static readonly OrderStatus Offering = new OrderStatus("1");
		public static readonly OrderStatus Offered = new OrderStatus("2");
		public static readonly OrderStatus OfferedToWithdraw = new OrderStatus("3");
		public static readonly OrderStatus PartialyMatchedToWithdraw = new OrderStatus("4");
		public static readonly OrderStatus PartialyWithdrawn = new OrderStatus("5");
		public static readonly OrderStatus Withdrawn = new OrderStatus("6");
		public static readonly OrderStatus PartialyMathcedAndWithdrawn = new OrderStatus("7");
		public static readonly OrderStatus Matched = new OrderStatus("8");
		public static readonly OrderStatus Discarded = new OrderStatus("9");
		public static readonly OrderStatus ToOffer = new OrderStatus("A");
		private OrderStatus(string internalCode)
			: base(internalCode)
		{
		}
	}

}