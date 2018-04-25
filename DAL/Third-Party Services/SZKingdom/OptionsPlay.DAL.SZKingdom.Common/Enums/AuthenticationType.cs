using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{

	public sealed class AuthenticationType : BaseTypeSafeEnum<string, AuthenticationType>
	{
		public static readonly AuthenticationType Password = new AuthenticationType("0");
		public static readonly AuthenticationType Certificate = new AuthenticationType("1");
		public static readonly AuthenticationType Fingerprint = new AuthenticationType("2");

		private AuthenticationType(string internalCode)
			: base(internalCode)
		{
		}
	}
}