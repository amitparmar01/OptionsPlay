using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class TradeRegStatus : BaseTypeSafeEnum<string, TradeRegStatus>
	{
		public static readonly TradeRegStatus NotSpecified = new TradeRegStatus("0");
		public static readonly TradeRegStatus FirstDaySpecify = new TradeRegStatus("1");
		public static readonly TradeRegStatus Specified = new TradeRegStatus("2");

		private TradeRegStatus(string internalCode)
			: base(internalCode)
		{
		}
	}
}