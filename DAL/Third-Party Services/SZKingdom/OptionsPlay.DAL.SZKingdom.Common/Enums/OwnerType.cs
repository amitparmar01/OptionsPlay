using OptionsPlay.Common.Utilities;

namespace OptionsPlay.DAL.SZKingdom.Common.Enums
{
	public sealed class OwnerType : BaseTypeSafeEnum<string, OwnerType>
	{
		public static readonly OwnerType IndividualInvestor = new OwnerType("1");
		public static readonly OwnerType Exchange = new OwnerType("101");
		public static readonly OwnerType Member = new OwnerType("102");
		public static readonly OwnerType Institution = new OwnerType("103");
		public static readonly OwnerType InsiderTrading = new OwnerType("104");
		public static readonly OwnerType MarketMaker = new OwnerType("105");
		public static readonly OwnerType Clearance = new OwnerType("106");

		private OwnerType(string internalCode)
			: base(internalCode)
		{
		}
	}
}