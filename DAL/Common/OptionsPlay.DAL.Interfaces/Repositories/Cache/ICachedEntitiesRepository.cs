using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace OptionsPlay.DAL.Interfaces.Repositories
{
	public interface ICachedEntitiesRepository<T>
	{
		Task UpdateCacheAsync(IEnumerable<T> entities);

		IQueryable<T> GetAll();

		IQueryable<T> FindBy(Expression<Func<T, bool>> predicate);
	}
}