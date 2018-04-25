using System.Linq;
using OptionsPlay.Model;

namespace OptionsPlay.DAL.Interfaces.Repositories
{
	public interface IStrategyGroupsRepository : IRepository<StrategyGroup, int>
	{
		IQueryable<StrategyGroup> GetAll(int pageNumber, out int totalCount);
	}
}
