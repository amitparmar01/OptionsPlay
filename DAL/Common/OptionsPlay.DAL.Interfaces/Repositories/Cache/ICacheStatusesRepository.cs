using OptionsPlay.Model;
using OptionsPlay.Model.Enums;

namespace OptionsPlay.DAL.Interfaces.Repositories
{
	public interface ICacheStatusesRepository
	{
		CacheStatus GetCacheStatus(CacheEntity entity);

		bool TryUpdate(CacheStatus entity);

		void Update(CacheStatus entity);
	}
}