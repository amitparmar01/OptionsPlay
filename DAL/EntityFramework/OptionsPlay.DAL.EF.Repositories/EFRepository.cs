using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Expressions;
using OptionsPlay.DAL.Interfaces;
using OptionsPlay.Model;

namespace OptionsPlay.DAL.EF.Repositories
{
	/// <summary>
	/// The EF-dependent, generic repository for data access
	/// </summary>
	/// <typeparam name="TEntity">Type of entity for this Repository.</typeparam>
	/// <typeparam name="TId"></typeparam>
	public class EFRepository<TEntity, TId> : IRepository<TEntity, TId> where TEntity : class, IBaseEntity<TId>
	{
		public EFRepository(DbContext dbContext)
		{
			if (dbContext == null)
			{
				throw new ArgumentNullException("dbContext");
			}
			DbContext = dbContext;
			DbSet = DbContext.Set<TEntity>();
		}

		protected DbContext DbContext { get; set; }

		protected DbSet<TEntity> DbSet { get; set; }

		public virtual IQueryable<TEntity> GetAll()
		{
			return DbSet;
		}

		public virtual TEntity GetById(TId id)
		{
			return DbSet.Find(id);
		}

		public virtual void Update(TEntity entity)
		{
			DbEntityEntry dbEntityEntry = DbContext.Entry(entity);
			dbEntityEntry.State = EntityState.Modified;
		}

		public virtual bool Delete(TId id)
		{
			TEntity entity = GetById(id);
			if (entity != null)
			{
				Delete(entity);
				return true;
			}
			return false;
		}

		public virtual void Delete(TEntity entity)
		{
			DbEntityEntry dbEntityEntry = DbContext.Entry(entity);
			dbEntityEntry.State = EntityState.Deleted;
		}

		public IQueryable<TEntity> FindBy(Expression<Func<TEntity, bool>> predicate)
		{
			IQueryable<TEntity> filtered = GetAll().Where(predicate);
			return filtered;
		}

		public virtual void Add(TEntity entity)
		{
			DbEntityEntry dbEntityEntry = DbContext.Entry(entity);
			dbEntityEntry.State = EntityState.Added;
		}

		protected void RollBackChangesInContext()
		{
			List<DbEntityEntry> changedEntries = DbContext.ChangeTracker.Entries().Where(x => x.State != EntityState.Unchanged).ToList();
			foreach (DbEntityEntry entry in changedEntries.Where(x => x.State == EntityState.Modified))
			{
				entry.CurrentValues.SetValues(entry.OriginalValues);
				entry.State = EntityState.Unchanged;
			}

			foreach (DbEntityEntry entry in changedEntries.Where(x => x.State == EntityState.Added))
			{
				entry.State = EntityState.Detached;
			}

			foreach (DbEntityEntry entry in changedEntries.Where(x => x.State == EntityState.Deleted))
			{
				entry.State = EntityState.Unchanged;
			}
		}
	}

	public class EFRepository<TEntity> : EFRepository<TEntity, long>, IRepository<TEntity> where TEntity : class, IBaseEntity<long>
	{
		public EFRepository(DbContext dbContext) : base(dbContext)
		{
		}

	}
}
