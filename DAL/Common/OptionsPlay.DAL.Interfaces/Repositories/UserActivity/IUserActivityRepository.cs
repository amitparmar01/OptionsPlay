using System.Linq;
using OptionsPlay.Model;

namespace OptionsPlay.DAL.Interfaces.Repositories
{
	public interface IUserActivityRepository : IMongoRepository<UserActivity>
	{
		IQueryable<UserActivity> FilterBySecurityAndUserName(string securityCode, string userName);
	}
}