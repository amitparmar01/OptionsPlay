using System;
using System.Linq;
using System.Linq.Expressions;
using OptionsPlay.Model;

namespace OptionsPlay.DAL.Interfaces
{
	public interface IRepository<TEntity, in TId> where TEntity : class
	{
		IQueryable<TEntity> GetAll();

		TEntity GetById(TId id);

		void Add(TEntity entity);

		void Update(TEntity entity);

		bool Delete(TId id);

		void Delete(TEntity entity);

		IQueryable<TEntity> FindBy(Expression<Func<TEntity, bool>> predicate);

       
	}

	public interface IRepository<T> : IRepository<T, long> where T : class, IBaseEntity<long>
	{
	}
}
