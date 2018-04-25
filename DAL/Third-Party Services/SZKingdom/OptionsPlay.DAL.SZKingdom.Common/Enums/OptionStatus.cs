using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class OptionStatus : BaseTypeSafeEnum<string, OptionStatus>
	{
		public static readonly OptionStatus NewListedContract = new OptionStatus("A");
		public static readonly OptionStatus NewDelistedContract = new OptionStatus("D");
		public static readonly OptionStatus RemainingContract = new OptionStatus("E");

		private OptionStatus(string internalCode)
			: base(internalCode)
		{
		}
	}
}