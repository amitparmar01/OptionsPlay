using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OptionsPlay.BusinessLogic.Common.Cache;
using OptionsPlay.DAL.Interfaces;
using OptionsPlay.DAL.Interfaces.Repositories;
using OptionsPlay.Model;
using OptionsPlay.Model.Enums;
using StructureMap;

namespace OptionsPlay.BusinessLogic.Cache
{
	public class DatabaseCacheService: BaseService, IDatabaseCacheService
	{
		// todo: move into configuration
		private static readonly Dictionary<CacheEntity, TimeSpan> ExpirationMap = new Dictionary<CacheEntity, TimeSpan>
		{
			{ CacheEntity.OptionBasicInformation, TimeSpan.FromMinutes(60) },
			{ CacheEntity.SecurityInformation, TimeSpan.FromHours(12) }
		};

		public DatabaseCacheService(IOptionsPlayUow uow) : base(uow)
		{
		}

		public IQueryable<TDbEntity> Get<TDbEntity>(out DBCacheStatus status)
		{
			CacheEntity type = CacheEntityMap.GetEntityTypeForDBEntity<TDbEntity>();
			CacheStatus cacheStatus = Uow.CacheStatusesRepository.GetCacheStatus(type);

			ICachedEntitiesRepository<TDbEntity> entityRepository = Uow.GetRepository<ICachedEntitiesRepository<TDbEntity>>();
			if (cacheStatus.Status == CacheEntryStatus.Empty || cacheStatus.Status == CacheEntryStatus.UpdateInProgress)
			{
				status = DBCacheStatus.Empty;
				return null;
			}

			TimeSpan expiration = GetExpirationForEntity(type);
			if (!cacheStatus.LastUpdated.HasValue || cacheStatus.LastUpdated.Value.Add(expiration) <= DateTime.UtcNow)
			{
				status = DBCacheStatus.Expired;
				return entityRepository.GetAll();
			}

			status = DBCacheStatus.Ok;
			return entityRepository.GetAll();
		}

		public void UpdateCache<TDbEntity>(List<TDbEntity> entities)
		{
            try
            {
                CacheEntity type = CacheEntityMap.GetEntityTypeForDBEntity<TDbEntity>();
                CacheStatus cacheStatus = Uow.CacheStatusesRepository.GetCacheStatus(type);
                cacheStatus.Status = CacheEntryStatus.UpdateInProgress;
                cacheStatus.LastUpdated = DateTime.UtcNow;
                // try to get DB lock;
                if (Uow.CacheStatusesRepository.TryUpdate(cacheStatus))
                {
                    ICachedEntitiesRepository<TDbEntity> entityRepository = Uow.GetRepository<ICachedEntitiesRepository<TDbEntity>>();
                    Task task = entityRepository.UpdateCacheAsync(entities);
                    task.ContinueWith(task1 =>
                    {
                        using (IOptionsPlayUow uow = ObjectFactory.GetInstance<IOptionsPlayUow>())
                        {
                            cacheStatus = uow.CacheStatusesRepository.GetCacheStatus(type);
                            cacheStatus.Status = CacheEntryStatus.Active;
                            cacheStatus.LastUpdated = DateTime.UtcNow;
                            uow.CacheStatusesRepository.Update(cacheStatus);
                            uow.Commit();
                        }
                    });
                }
            }
            catch (Exception ex)
            {
                Logging.Logger.Debug("thread ID:" + System.Threading.Thread.CurrentThread.ManagedThreadId.ToString() + ", UpdateCache Exception is:" + ex.StackTrace.ToString() + ", class is DatabaseCacheService");
            }
           
		}

		private static TimeSpan GetExpirationForEntity(CacheEntity entityType)
		{
			if (!ExpirationMap.ContainsKey(entityType))
			{
				throw new InvalidOperationException(string.Format("Expiration is not found for type {0}", entityType));
			}
			return ExpirationMap[entityType];
		}
	}
}
