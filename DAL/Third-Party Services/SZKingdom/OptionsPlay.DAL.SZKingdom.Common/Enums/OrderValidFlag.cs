using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class OrderValidFlag : BaseTypeSafeEnum<string, OrderValidFlag>
	{
		public static readonly OrderValidFlag Invalid = new OrderValidFlag("0");
		public static readonly OrderValidFlag Valid = new OrderValidFlag("1");

		private OrderValidFlag(string internalCode)
			: base(internalCode)
		{
		}
	}
}