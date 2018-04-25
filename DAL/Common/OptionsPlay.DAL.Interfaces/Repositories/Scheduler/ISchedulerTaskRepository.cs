using System.Linq;
using OptionsPlay.Model.Enums;
using OptionsPlay.Model.Mongo.Scheduler;

namespace OptionsPlay.DAL.Interfaces.Repositories
{
	public interface ISchedulerTaskRepository : IMongoRepository<SchedulerTask>
	{
		SchedulerTask GetByType(SchedulerTaskType type, string destination);

		IQueryable<SchedulerTask> GetAllByDestination(string destination);

		SchedulerTask GetById(string id, string destination);
	}
}
