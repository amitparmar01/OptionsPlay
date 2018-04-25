using OptionsPlay.Common.Utilities;
namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public class FundStatus : BaseTypeSafeEnum<string, FundStatus>
	{
		public static readonly FundStatus Active = new FundStatus("0");
		public static readonly FundStatus Closed = new FundStatus("9");

		private FundStatus(string internalCode)
			: base(internalCode)
		{
		}
	}
}