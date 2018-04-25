using OptionsPlay.DAL.SZKingdom.Common.Enums;

namespace OptionsPlay.DAL.SZKingdom.Common.Entities
{
	public abstract class AssetsCommonInformation : AccountCommonInformation
	{
		[SZKingdomField("CURRENCY")]
		public Currency Currency { get; set; }

	}
}