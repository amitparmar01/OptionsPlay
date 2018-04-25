using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class OptionCoveredFlag : BaseTypeSafeEnum<string, OptionCoveredFlag>
	{
		public static readonly OptionCoveredFlag Covered = new OptionCoveredFlag("0");
		public static readonly OptionCoveredFlag Uncovered = new OptionCoveredFlag("1");

		private OptionCoveredFlag(string internalCode)
			: base(internalCode)
		{
		}
	}
}