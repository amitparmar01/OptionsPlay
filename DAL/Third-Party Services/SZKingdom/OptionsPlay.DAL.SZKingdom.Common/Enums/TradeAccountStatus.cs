using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class TradeAccountStatus : BaseTypeSafeEnum<string, TradeAccountStatus>
	{
		public static readonly TradeAccountStatus Normal = new TradeAccountStatus("0");
		public static readonly TradeAccountStatus Loss = new TradeAccountStatus("1");
		public static readonly TradeAccountStatus Frozen = new TradeAccountStatus("2");
		public static readonly TradeAccountStatus LegallyFrozen = new TradeAccountStatus("3");
		public static readonly TradeAccountStatus Suspended = new TradeAccountStatus("4");
		public static readonly TradeAccountStatus Closed = new TradeAccountStatus("9");

		private TradeAccountStatus(string internalCode)
			: base(internalCode)
		{
		}
	}
}