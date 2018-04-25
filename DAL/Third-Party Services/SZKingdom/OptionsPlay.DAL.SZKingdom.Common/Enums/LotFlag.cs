using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class LotFlag : BaseTypeSafeEnum<string, LotFlag>
	{
		public static readonly LotFlag ShareOrContractAsUnit = new LotFlag("0");
		public static readonly LotFlag LotAsUnit = new LotFlag("1");

		private LotFlag(string internalCode)
			: base(internalCode)
		{
		}
	}
}