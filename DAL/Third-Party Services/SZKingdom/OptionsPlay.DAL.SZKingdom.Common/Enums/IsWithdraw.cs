using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class IsWithdraw : BaseTypeSafeEnum<string, IsWithdraw>
	{
		public static readonly IsWithdraw Withdraw = new IsWithdraw("T");
		public static readonly IsWithdraw NotWithdraw = new IsWithdraw("F");

		private IsWithdraw(string internalCode)
			: base(internalCode)
		{
		}
	}
}