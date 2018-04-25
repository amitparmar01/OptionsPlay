using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class Currency : BaseTypeSafeEnum<string, Currency>
	{
		public static readonly Currency ChineseYuan = new Currency("0");
		public static readonly Currency HongKongDollar = new Currency("1");
		public static readonly Currency UnitedStatesDollar = new Currency("2");

		private Currency(string internalCode)
			: base(internalCode)
		{
		}
	}
}