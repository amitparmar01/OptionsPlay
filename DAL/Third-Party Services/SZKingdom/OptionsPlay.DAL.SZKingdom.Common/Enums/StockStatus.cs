using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class StockStatus : BaseTypeSafeEnum<string, StockStatus>
	{
		public static readonly StockStatus Normal = new StockStatus("0");
		public static readonly StockStatus IPO = new StockStatus("1");
		public static readonly StockStatus AdditionalIssue = new StockStatus("2");
		public static readonly StockStatus IssueByPricing = new StockStatus("3");
		public static readonly StockStatus IssueByAuction = new StockStatus("4");
		public static readonly StockStatus ListedBondsForDistribution = new StockStatus("5");
		public static readonly StockStatus ExRightDiviedend = new StockStatus("6");
		public static readonly StockStatus ExRight = new StockStatus("7");
		public static readonly StockStatus ExDiviedend = new StockStatus("8");

		private StockStatus(string internalCode)
			: base(internalCode)
		{
		}
	}
}