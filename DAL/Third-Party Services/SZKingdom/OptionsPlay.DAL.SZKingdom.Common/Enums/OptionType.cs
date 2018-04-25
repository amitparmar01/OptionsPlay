using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class OptionType : BaseTypeSafeEnum<string, OptionType>
	{
		public static readonly OptionType Call = new OptionType("C");
		public static readonly OptionType Put = new OptionType("P");
		public static readonly OptionType Security = new OptionType("S");
		public static readonly OptionType CoveredCall = new OptionType("CC");

		private OptionType(string internalCode)
			: base(internalCode)
		{
		}
	}
}