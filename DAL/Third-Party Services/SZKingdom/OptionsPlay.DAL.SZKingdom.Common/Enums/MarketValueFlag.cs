using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class MarketValueFlag : BaseTypeSafeEnum<string, MarketValueFlag>
	{
		public static readonly MarketValueFlag NotCalculateMarketValue = new MarketValueFlag("0");
		public static readonly MarketValueFlag CalculateMarketValue = new MarketValueFlag("1");

		private MarketValueFlag(string internalCode)
			: base(internalCode)
		{
		}
	}
}