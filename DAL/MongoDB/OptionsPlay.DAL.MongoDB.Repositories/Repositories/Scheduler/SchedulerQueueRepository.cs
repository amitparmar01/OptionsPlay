using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver.Builders;
using OptionsPlay.DAL.Interfaces.Repositories;
using OptionsPlay.Model.Enums;
using OptionsPlay.Model.Mongo.Scheduler;

namespace OptionsPlay.DAL.MongoDB.Repositories
{
	public class SchedulerQueueRepository : MongoRepository<SchedulerQueue>, ISchedulerQueueRepository
	{
		public SchedulerQueueRepository(MongoDBContext mongoDBContext)
			: base(mongoDBContext)
		{
		}

		public SchedulerQueue GetLastByType(SchedulerTaskType type, string destination)
		{
			SchedulerQueue schedulerQueue = 
				GetAll()
					.Where(item => item.TaskType == type 
						&& item.Destination == destination
						&& item.StopDate == null)
					.OrderByDescending(item => item.PlannedDate)
					.FirstOrDefault();
			return schedulerQueue;
		}

		public List<SchedulerQueue> GetLastsByType(SchedulerTaskType type, string destination, int count)
		{
			List<SchedulerQueue> schedulerQueues =
				GetAll()
					.Where(item => item.TaskType == type 
						&& item.Destination == destination 
						&& item.Status != SchedulerExecutionStatus.Terminated)
					.OrderByDescending(item => item.PlannedDate)
					.Take(count)
					.ToList();
			return schedulerQueues;
		}

		public IQueryable<SchedulerQueue> GetAllByStatus(SchedulerExecutionStatus status)
		{
			IOrderedQueryable<SchedulerQueue> result = 
				GetAll().Where(item => item.Status == status).OrderByDescending(item => item.PlannedDate);
			return result;
		}

		public void StartAndChangeStatus(SchedulerQueue schedulerQueue, SchedulerExecutionStatus status)
		{
			Update(Query<SchedulerQueue>.EQ(e => e.Id, schedulerQueue.Id),
				Update<SchedulerQueue>.Set(e => e.Status, status).Set(e => e.StartDate, DateTime.UtcNow));
		}

		public void FinishAndChangeStatus(SchedulerQueue schedulerQueue, SchedulerExecutionStatus status)
		{
			Update(Query<SchedulerQueue>.EQ(e => e.Id, schedulerQueue.Id),
				Update<SchedulerQueue>.Set(e => e.Status, status).Set(e => e.StopDate, DateTime.UtcNow));
		}

		public void ChangeStatus(SchedulerQueue schedulerQueue, SchedulerExecutionStatus status)
		{
			Update(Query<SchedulerQueue>.EQ(e => e.Id, schedulerQueue.Id), Update<SchedulerQueue>.Set(e => e.Status, status));
		}

		public void ChangeStatus(SchedulerTaskType type, SchedulerExecutionStatus fromStatus, SchedulerExecutionStatus toStatus, string destination, bool setStopDate = false)
		{
			if (!setStopDate)
			{
				Update(
					Query.And(
						Query<SchedulerQueue>.EQ(e => e.TaskType, type),
						Query<SchedulerQueue>.EQ(e => e.Status, fromStatus),
						Query<SchedulerQueue>.EQ(e => e.Destination, destination)),
					Update<SchedulerQueue>.Set(e => e.Status, toStatus));
			}
			else
			{
				Update(
					Query.And(
						Query<SchedulerQueue>.EQ(e => e.TaskType, type),
						Query<SchedulerQueue>.EQ(e => e.Status, fromStatus),
						Query<SchedulerQueue>.EQ(e => e.Destination, destination)),
					Update<SchedulerQueue>
						.Set(e => e.Status, toStatus)
						.Set(e => e.StopDate, DateTime.UtcNow));
			}
		}

		public void ChangeLockerMask(SchedulerQueue schedulerQueue, long lockerMask)
		{
			Update(Query<SchedulerQueue>.EQ(e => e.Id, schedulerQueue.Id), Update<SchedulerQueue>.Set(e => e.LockerMask, lockerMask));
		}
	}
}
