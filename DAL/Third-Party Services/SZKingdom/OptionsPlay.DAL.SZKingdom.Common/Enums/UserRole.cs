using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class UserRole: BaseTypeSafeEnum<string, UserRole>
	{
		public static readonly UserRole Customer = new UserRole("1");
		public static readonly UserRole Teller = new UserRole("2");

		private UserRole(string internalCode) 
			: base(internalCode)
		{
		}
	}
}
