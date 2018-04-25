using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using OptionsPlay.DAL.Interfaces.Repositories;
using OptionsPlay.Model;
using OptionsPlay.Model.Enums;

namespace OptionsPlay.DAL.EF.Repositories
{
	public class CacheStatusesRepository : EFRepository<CacheStatus>, ICacheStatusesRepository
	{
		public CacheStatusesRepository(DbContext dbContext)
			: base(dbContext)
		{
		}

		public CacheStatus GetCacheStatus(CacheEntity entity)
		{
			CacheStatus result = GetById((int)entity);
			return result;
		}

		public bool TryUpdate(CacheStatus entity)
		{
			try
			{
				Update(entity);
				DbContext.SaveChanges();
				return true;
			}
			catch (DbUpdateConcurrencyException)
			{
				RollBackChangesInContext();
				return false;
			}
		}

		public override void Add(CacheStatus entity)
		{
			throw new NotSupportedException();
		}

		public override void Delete(CacheStatus entity)
		{
			throw new NotSupportedException();
		}
	}
}