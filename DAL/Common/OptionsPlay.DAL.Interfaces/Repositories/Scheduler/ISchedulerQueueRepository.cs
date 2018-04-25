using System.Collections.Generic;
using System.Linq;
using OptionsPlay.Model.Enums;
using OptionsPlay.Model.Mongo.Scheduler;

namespace OptionsPlay.DAL.Interfaces.Repositories
{
	public interface ISchedulerQueueRepository : IMongoRepository<SchedulerQueue>
	{
		SchedulerQueue GetLastByType(SchedulerTaskType type, string destination);

		List<SchedulerQueue> GetLastsByType(SchedulerTaskType type, string destination, int count);

		IQueryable<SchedulerQueue> GetAllByStatus(SchedulerExecutionStatus status);

		void StartAndChangeStatus(SchedulerQueue schedulerQueue, SchedulerExecutionStatus status);

		void FinishAndChangeStatus(SchedulerQueue schedulerQueue, SchedulerExecutionStatus status);

		void ChangeStatus(SchedulerQueue schedulerQueue, SchedulerExecutionStatus status);

		void ChangeStatus(SchedulerTaskType type, SchedulerExecutionStatus fromStatus, SchedulerExecutionStatus toStatus, string destination, bool setStopDate = false);

		void ChangeLockerMask(SchedulerQueue schedulerQueue, long lockerMask);
	}
}
