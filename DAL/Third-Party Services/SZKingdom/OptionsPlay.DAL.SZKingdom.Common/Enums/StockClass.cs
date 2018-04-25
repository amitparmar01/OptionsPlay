using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class StockClass : BaseTypeSafeEnum<string, StockClass>
	{
		public static readonly StockClass CommonStock = new StockClass("A");
		public static readonly StockClass ETFFunds = new StockClass("D");
		public static readonly StockClass StockOptions = new StockClass("U");
		public static readonly StockClass Unknown = new StockClass("");

		private StockClass(string internalCode)
			: base(internalCode)
		{
		}
	}
}