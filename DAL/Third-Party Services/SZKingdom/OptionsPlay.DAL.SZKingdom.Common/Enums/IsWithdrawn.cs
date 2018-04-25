using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class IsWithdrawn : BaseTypeSafeEnum<string, IsWithdrawn>
	{
		public static readonly IsWithdrawn Withdrawn = new IsWithdrawn("1");
		public static readonly IsWithdrawn NotWithdrawn = new IsWithdrawn("0");

		private IsWithdrawn(string internalCode)
			: base(internalCode)
		{
		}
	}
}