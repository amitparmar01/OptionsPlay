using System.Linq;
using OptionsPlay.DAL.SZKingdom.Common;
using OptionsPlay.Model;

namespace OptionsPlay.BusinessLogic.Common
{
	public interface IMarketDataProviderQueryable : IMarketDataProvider
	{
		/// <summary>
		/// NOTE: Cached.
		/// </summary>
		IQueryable<SecurityInformationCache> GetAllSecuritiesInformation();

		/// <summary>
		/// NOTE: Cached.
		/// </summary>
		IQueryable<OptionBasicInformationCache> GetAllOptionBasicInformation();
	}
}