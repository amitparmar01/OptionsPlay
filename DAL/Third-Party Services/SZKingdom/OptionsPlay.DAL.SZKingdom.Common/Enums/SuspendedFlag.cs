using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class SuspendedFlag : BaseTypeSafeEnum<string, SuspendedFlag>
	{
		public static readonly SuspendedFlag Normal = new SuspendedFlag("0");
		public static readonly SuspendedFlag TemporarySuspension = new SuspendedFlag("1");
		public static readonly SuspendedFlag ProlongedSuspension = new SuspendedFlag("2");

		private SuspendedFlag(string internalCode)
			: base(internalCode)
		{
		}
	}
}