using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class SecurityLevel : BaseTypeSafeEnum<string, SecurityLevel>
	{
		public static readonly SecurityLevel NoSecurity = new SecurityLevel("0");
		public static readonly SecurityLevel TokenAuthentication = new SecurityLevel("1");
		public static readonly SecurityLevel PasswordAuthentication = new SecurityLevel("2");

		private SecurityLevel(string internalCode)
			: base(internalCode)
		{
		}
	}
}
