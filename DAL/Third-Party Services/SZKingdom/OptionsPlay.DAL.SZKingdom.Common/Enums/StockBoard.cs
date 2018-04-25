using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class StockBoard : BaseTypeSafeEnum<string, StockBoard>
	{
		public static readonly StockBoard SZAShares = new StockBoard("00");
		public static readonly StockBoard SZBShares = new StockBoard("01");
		public static readonly StockBoard ThirsMarket = new StockBoard("02");
		public static readonly StockBoard SZStockOptions = new StockBoard("05");
		public static readonly StockBoard SHAShares = new StockBoard("10");
		public static readonly StockBoard SHBShares = new StockBoard("11");
		public static readonly StockBoard SHStockOptions = new StockBoard("15");

		private StockBoard(string internalCode)
			: base(internalCode)
		{
		}
	}
}