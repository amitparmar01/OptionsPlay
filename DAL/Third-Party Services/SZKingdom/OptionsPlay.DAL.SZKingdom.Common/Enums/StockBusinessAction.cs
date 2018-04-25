using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class StockBusinessAction : BaseTypeSafeEnum<string, StockBusinessAction>
	{
		public static readonly StockBusinessAction OrderDeclaration = new StockBusinessAction("100");
		public static readonly StockBusinessAction WithdrawDeclaration = new StockBusinessAction("101");
		public static readonly StockBusinessAction StocOptionDeclarationLimitPriceGFD = new StockBusinessAction("130");
		public static readonly StockBusinessAction StocOptionDeclarationLimitPriceFOK = new StockBusinessAction("131");
		public static readonly StockBusinessAction StocOptionDeclarationMarketPriceGFD = new StockBusinessAction("132");
		public static readonly StockBusinessAction StocOptionDeclarationMarketPriceFOK = new StockBusinessAction("133");
		public static readonly StockBusinessAction StocOptionDeclarationMarketPriceIOC = new StockBusinessAction("134");

		public static readonly StockBusinessAction StocOptionDeclarationSZFiveLevelIOC = new StockBusinessAction("121");
		public static readonly StockBusinessAction StocOptionDeclarationSZMarketFOK = new StockBusinessAction("122");
		public static readonly StockBusinessAction StocOptionDeclarationSZOptimalOwnSide = new StockBusinessAction("123");
		public static readonly StockBusinessAction StocOptionDeclarationSZOptimalOtherSide = new StockBusinessAction("124");
		public static readonly StockBusinessAction StocOptionDeclarationSZMarketIOC = new StockBusinessAction("125");

		public static readonly StockBusinessAction BuyCallToOpen = new StockBusinessAction("200");
		public static readonly StockBusinessAction SellCallToClose = new StockBusinessAction("201");
		public static readonly StockBusinessAction BuyPutToOpen = new StockBusinessAction("202");
		public static readonly StockBusinessAction SellPutToClose = new StockBusinessAction("203");
		public static readonly StockBusinessAction SellCallToOpen = new StockBusinessAction("204");
		public static readonly StockBusinessAction BuyCallToClose = new StockBusinessAction("205");
		public static readonly StockBusinessAction SellPutToOpen = new StockBusinessAction("206");
		public static readonly StockBusinessAction BuyPutToClose = new StockBusinessAction("207");
		public static readonly StockBusinessAction CoveredCallOpen = new StockBusinessAction("208");
		public static readonly StockBusinessAction CoveredCallClose = new StockBusinessAction("209");
		public static readonly StockBusinessAction CallExercise = new StockBusinessAction("210");
		public static readonly StockBusinessAction CallAssign = new StockBusinessAction("211");
		public static readonly StockBusinessAction PutExercise = new StockBusinessAction("212");
		public static readonly StockBusinessAction PutAssign = new StockBusinessAction("213");
		public static readonly StockBusinessAction UncoveredHedge = new StockBusinessAction("218");
		public static readonly StockBusinessAction CoveredHedge = new StockBusinessAction("219");
		private StockBusinessAction(string internalCode)
			: base(internalCode)
		{
		}
	}
}