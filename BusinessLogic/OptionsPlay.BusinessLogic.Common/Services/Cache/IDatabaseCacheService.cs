using System.Collections.Generic;
using System.Linq;

namespace OptionsPlay.BusinessLogic.Common.Cache
{
	public interface IDatabaseCacheService
	{
		IQueryable<TDbEntity> Get<TDbEntity>(out DBCacheStatus status);

		void UpdateCache<TDbEntity>(List<TDbEntity> entities);
	}
}
