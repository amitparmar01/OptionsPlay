using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class PasswordUseScope : BaseTypeSafeEnum<string, PasswordUseScope>
	{
		public static readonly PasswordUseScope EquityTrade = new PasswordUseScope("0");
		public static readonly PasswordUseScope EquityFund = new PasswordUseScope("1");
		public static readonly PasswordUseScope CreditTrade = new PasswordUseScope("2");
		public static readonly PasswordUseScope CreditFund = new PasswordUseScope("3");
		public static readonly PasswordUseScope OptionTrade = new PasswordUseScope("4");
		public static readonly PasswordUseScope OptionFund = new PasswordUseScope("5");

		private PasswordUseScope(string internalCode)
			: base(internalCode)
		{
		}
	}
}