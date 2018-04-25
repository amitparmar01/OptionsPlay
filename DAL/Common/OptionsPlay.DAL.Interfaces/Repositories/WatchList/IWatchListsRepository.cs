using System.Collections.Generic;
using System.Linq;
using OptionsPlay.Model;
using OptionsPlay.Model.WatchList;

namespace OptionsPlay.DAL.Interfaces.Repositories
{
	public interface IWatchListsRepository : IRepository<WatchList>
	{
		IQueryable<WatchList> GetAllByUser(List<long> userIds);

		IQueryable<WatchList> GetAllByUser(int pageNumber, out int totalCount, User user);

		IQueryable<WatchList> GetAll(int pageNumber, out int totalCount);

		WatchList GetById(long id, User user);

		bool Delete(long id, User user);
	}
}