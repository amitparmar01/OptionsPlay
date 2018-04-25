using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class LoginAccountType : BaseTypeSafeEnum<string, LoginAccountType>
	{
		public static readonly LoginAccountType CustomerCode = new LoginAccountType("U");
		public static readonly LoginAccountType CustomerAccountCode = new LoginAccountType("Z");
		public static readonly LoginAccountType TradeAccount = new LoginAccountType("12");
		public static readonly LoginAccountType ShanghaiAShareAccount = new LoginAccountType("05");
		public static readonly LoginAccountType ShenzhenAShareAccount = new LoginAccountType("15");

		private LoginAccountType(string internalCode)
			: base(internalCode)
		{
		}
	}
}