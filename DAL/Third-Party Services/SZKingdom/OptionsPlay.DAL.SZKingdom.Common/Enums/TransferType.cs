using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class TransferType : BaseTypeSafeEnum<string, TransferType>
	{
		public static readonly TransferType BankToAccount = new TransferType("1");
		public static readonly TransferType AccountToBank = new TransferType("2");

		private TransferType(string internalCode)
			: base(internalCode)
		{
		}
	}
}