using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class OptionSide : BaseTypeSafeEnum<string, OptionSide>
	{
		public static readonly OptionSide RightSide = new OptionSide("L");
		public static readonly OptionSide ObligationSide = new OptionSide("S");
		public static readonly OptionSide CoveredSide = new OptionSide("C");

		private OptionSide(string internalCode)
			: base(internalCode)
		{
		}
	}
}