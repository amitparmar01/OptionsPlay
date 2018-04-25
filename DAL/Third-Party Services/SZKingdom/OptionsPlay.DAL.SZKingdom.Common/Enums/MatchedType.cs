using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class MatchedType : BaseTypeSafeEnum<string, MatchedType>
	{
		public static readonly MatchedType MatchedWithoutWithdraw = new MatchedType("0");
		public static readonly MatchedType InvalidOrderWithdrawn = new MatchedType("1");
		public static readonly MatchedType ExchangeTraded = new MatchedType("2");

		private MatchedType(string internalCode)
			: base(internalCode)
		{
		}
	}
}