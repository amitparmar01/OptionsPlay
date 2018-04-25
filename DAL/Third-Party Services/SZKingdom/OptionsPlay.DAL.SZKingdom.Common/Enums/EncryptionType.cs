using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class EncryptionType : BaseTypeSafeEnum<string, EncryptionType>
	{
		public static readonly EncryptionType KBSSEncryption = new EncryptionType("0");
		public static readonly EncryptionType WinEncryption = new EncryptionType("1");
		public static readonly EncryptionType UnixEncryption = new EncryptionType("2");
		public static readonly EncryptionType OutsideEncryption = new EncryptionType("3");

		private EncryptionType(string internalCode)
			: base(internalCode)
		{
		}
	}
}