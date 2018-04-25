using OptionsPlay.BusinessLogic.Common.Cache;
using OptionsPlay.BusinessLogic.Common.Services.Cache;
using OptionsPlay.DAL.Interfaces;
using OptionsPlay.DAL.Interfaces.Repositories;
using OptionsPlay.DAL.SZKingdom.Common.Entities;
using OptionsPlay.Model;
using OptionsPlay.Model.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OptionsPlay.BusinessLogic.Cache
{
    public class MemoryCacheService : BaseService, IMemoryCacheService
    {
        public static List<OptionBasicInformationCache> OptionBasicInformationCache { get; set; }

        public static List<SecurityInformationCache> SecurityInformationCache { get; set; }

        public static DateTime? LastUpdated { get; set; }

        // todo: move into configuration
        private static readonly Dictionary<CacheEntity, TimeSpan> ExpirationMap = new Dictionary<CacheEntity, TimeSpan>
		{
			{ CacheEntity.OptionBasicInformation, TimeSpan.FromMinutes(60) },
			{ CacheEntity.SecurityInformation, TimeSpan.FromHours(12) }
		};

        public MemoryCacheService(IOptionsPlayUow uow)
            : base(uow)
        {

        }

        //public static IQueryable<OptionBasicInformation> Get(out DBCacheStatus status)
        //{
        //    if (LastUpdated.Value.Add(TimeSpan.FromMinutes(60)) <= DateTime.UtcNow)
        //    {
        //        status = DBCacheStatus.Ok;
        //    }
        //    else 
        //    {
        //        status = DBCacheStatus.Expired;
        //    }
        //    return OptionBasicInformationCache;
        //}

        public IQueryable<TEntity> Get<TEntity>(out DBCacheStatus status)
        {
            CacheEntity type = CacheEntityMap.GetEntityTypeForDBEntity<TEntity>();
            CacheStatus cacheStatus = Uow.CacheStatusesRepository.GetCacheStatus(type);

            if (cacheStatus.Status == CacheEntryStatus.Empty || cacheStatus.Status == CacheEntryStatus.UpdateInProgress)
            {
                status = DBCacheStatus.Empty;
                return null;
            }

            TimeSpan expiration = GetExpirationForEntity(type);
            ICachedEntitiesRepository<TEntity> entityRepository = Uow.GetRepository<ICachedEntitiesRepository<TEntity>>();
            if (!cacheStatus.LastUpdated.HasValue || cacheStatus.LastUpdated.Value.Add(expiration) <= DateTime.UtcNow)
            {
                status = DBCacheStatus.Expired;
                return entityRepository.GetAll();
            }
            if (type == CacheEntity.OptionBasicInformation)
            {
                if (OptionBasicInformationCache == null)
                {
                    var repository = (IList<OptionBasicInformationCache>)entityRepository.GetAll().ToList();
                    OptionBasicInformationCache = (List<OptionBasicInformationCache>)repository;
                }
            }
            else
            {
                if (SecurityInformationCache == null)
                {
                    var repository = (IList<SecurityInformationCache>)entityRepository.GetAll().ToList();
                    SecurityInformationCache = (List<SecurityInformationCache>)entityRepository.GetAll();
                }
            }
            status = DBCacheStatus.Ok;
            return entityRepository.GetAll();
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
