using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class StockExchange : BaseTypeSafeEnum<string, StockExchange>
	{
		public static readonly StockExchange SZExchange = new StockExchange("0");
		public static readonly StockExchange SHExchange = new StockExchange("1");

		private StockExchange(string internalCode)
			: base(internalCode)
		{
		}
	}
}