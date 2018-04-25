using System.Linq;
using MongoDB.Bson;
using OptionsPlay.DAL.Interfaces.Repositories;
using OptionsPlay.DAL.MongoDB.Repositories.Extensions;
using OptionsPlay.Model.Enums;
using OptionsPlay.Model.Mongo.Scheduler;

namespace OptionsPlay.DAL.MongoDB.Repositories
{
	public class SchedulerTaskRepository : MongoRepository<SchedulerTask>, ISchedulerTaskRepository
	{
		public SchedulerTaskRepository(MongoDBContext mongoDBContext)
			: base(mongoDBContext)
		{
		}

		public SchedulerTask GetByType(SchedulerTaskType type, string destination)
		{
			SchedulerTask schedulerTask = GetAll().FirstOrDefault(item => item.Type == type && item.Destination == destination);
			return schedulerTask;
		}

		public IQueryable<SchedulerTask> GetAllByDestination(string destination)
		{
			IQueryable<SchedulerTask> schedulerTasks = GetAll().Where(item => item.Destination == destination);
			return schedulerTasks;
		}

		public SchedulerTask GetById(string id, string destination)
		{
			ObjectId objectId = id.ConvertToObjectId();

			SchedulerTask schedulerTask = GetAll().FirstOrDefault(item => item.Id == objectId && item.Destination == destination);
			return schedulerTask;
		}
	}
}
