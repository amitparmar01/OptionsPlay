using System;
using System.Collections.Generic;
using System.Linq;
using OptionsPlay.Model;

namespace OptionsPlay.DAL.Interfaces.Repositories
{
	public interface IStrategiesRepository : IRepository<Strategy, int>
	{
		IQueryable<Strategy> GetAll(int pageNumber, out int totalCount);

		IEnumerable<Strategy> Where(Func<Strategy, bool> predicate);

		void AddPairStrategy(Strategy strategy);
	}
}
