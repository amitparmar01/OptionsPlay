using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class StockBusiness : BaseTypeSafeEnum<string, StockBusiness>
	{
		public static readonly StockBusiness BuyToOpen = new StockBusiness("400");
		public static readonly StockBusiness SellToClose = new StockBusiness("401");
		public static readonly StockBusiness SellToOpen = new StockBusiness("402");
		public static readonly StockBusiness BuyToClose = new StockBusiness("403");
		public static readonly StockBusiness CoveredCall = new StockBusiness("404");
		public static readonly StockBusiness CloseCoveredCall = new StockBusiness("405");
		public static readonly StockBusiness ExerciseCallOption = new StockBusiness("406");
		public static readonly StockBusiness ExercisePutOption = new StockBusiness("407");
		public static readonly StockBusiness LockSecurities = new StockBusiness("408");
		public static readonly StockBusiness UnlockSecurities = new StockBusiness("409");
		public static readonly StockBusiness Filled = new StockBusiness("410");

		private StockBusiness(string internalCode)
			: base(internalCode)
		{
		}

	}
}