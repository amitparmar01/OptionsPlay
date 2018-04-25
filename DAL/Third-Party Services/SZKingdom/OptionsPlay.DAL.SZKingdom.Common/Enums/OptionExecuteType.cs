using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class OptionExecuteType : BaseTypeSafeEnum<string, OptionExecuteType>
	{
		public static readonly OptionExecuteType American = new OptionExecuteType("A");
		public static readonly OptionExecuteType European = new OptionExecuteType("E");

		private OptionExecuteType(string internalCode)
			: base(internalCode)
		{
		}
	}
}