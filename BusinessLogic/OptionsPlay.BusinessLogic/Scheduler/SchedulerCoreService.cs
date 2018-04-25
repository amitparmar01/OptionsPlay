using System;
using System.Collections.Generic;
using System.Linq;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.BusinessLogic.Common.Entities;
using OptionsPlay.Common.Options;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.DAL.Interfaces;
using OptionsPlay.Model.Enums;
using OptionsPlay.Model.Extensions;
using OptionsPlay.Model.Mongo.Scheduler;

namespace OptionsPlay.BusinessLogic.Scheduler
{
	public class SchedulerCoreService : BaseService, ISchedulerCoreService
	{
		private static readonly object Locker = new object();

		//Implementation for correct obfuscation
		readonly Lazy<string> _schedulerDestination = new Lazy<string>(() => AppConfigManager.Environment.ToLower()); 

		private string SchedulerDestination
		{
			get
			{
				return _schedulerDestination.Value;
			}
		}

		public SchedulerCoreService(IOptionsPlayUow uow)
			: base(uow)
		{
		}

		/// <summary>
		/// Create Task(if not exists) in Queue
		/// </summary>
		public BaseResponse CreateQueueTask(SchedulerQueue schedulerQueue,  bool terminatePrevious = false)
		{
			SchedulerQueue existsSchedulerQueue = Uow.SchedulerQueues.GetLastByType(schedulerQueue.TaskType, SchedulerDestination);

			if (existsSchedulerQueue == null || existsSchedulerQueue.Status != SchedulerExecutionStatus.InQueue)
			{
				if (terminatePrevious)
				{
					Uow.SchedulerQueues
						.ChangeStatus(schedulerQueue.TaskType, 
							SchedulerExecutionStatus.Pending,
							SchedulerExecutionStatus.Terminated, 
							SchedulerDestination, 
							true);
					existsSchedulerQueue = null;
				}

				if (existsSchedulerQueue == null)
				{
					existsSchedulerQueue = new SchedulerQueue
					{
						Status = SchedulerExecutionStatus.Pending,
						TaskType = schedulerQueue.TaskType,
						PlannedDate = schedulerQueue.PlannedDate,
						Destination = SchedulerDestination,
						LockerMask = schedulerQueue.LockerMask,
						Dependencies = schedulerQueue.Dependencies
					};

					Uow.SchedulerQueues.Add(existsSchedulerQueue);

					return BaseResponse.Success();
				}
			}

			return BaseResponse.Error(ErrorCode.SchedulerQueueItemAlreadyExists);
		}

		/// <summary>
		/// Set task as executing
		/// </summary>
		public BaseResponse LogStartTaskExecution(SchedulerTaskType type)
		{
			SchedulerQueue schedulerQueue = Uow.SchedulerQueues.GetLastByType(type, SchedulerDestination);

			if (schedulerQueue != null)
			{
				Uow.SchedulerQueues.StartAndChangeStatus(schedulerQueue, SchedulerExecutionStatus.Executing);

				return BaseResponse.Success();
			}

			return BaseResponse.Error(ErrorCode.SchedulerQueueItemNotFound);
		}

		/// <summary>
		/// Set task as completed
		/// </summary>
		public BaseResponse LogEndTaskExecution(SchedulerTaskType type)
		{
			SchedulerQueue schedulerQueue = Uow.SchedulerQueues.GetLastByType(type, SchedulerDestination);

			if (schedulerQueue != null)
			{
				Uow.SchedulerQueues.FinishAndChangeStatus(schedulerQueue, SchedulerExecutionStatus.Success);

				if (schedulerQueue.Dependencies != null)
				{
					foreach (SchedulerTaskType schedulerTaskType in schedulerQueue.Dependencies)
					{
						SchedulerQueue item = Uow.SchedulerQueues.GetLastByType(schedulerTaskType, SchedulerDestination);
						if (item != null)
						{
							long changedLockerMask = item.LockerMask & (~schedulerQueue.TaskType.GetLockerMask());
							Uow.SchedulerQueues.ChangeLockerMask(item, changedLockerMask);
						}
					}
				}

				return BaseResponse.Success();
			}

			return BaseResponse.Error(ErrorCode.SchedulerQueueItemNotFound);
		}

		/// <summary>
		/// Set task as completed with exception
		/// </summary>
		public BaseResponse LogTaskException(SchedulerTaskType type, Exception exception)
		{
			SchedulerQueue schedulerQueue = Uow.SchedulerQueues.GetLastByType(type, SchedulerDestination);

			if (schedulerQueue != null)
			{
				Uow.SchedulerQueues.FinishAndChangeStatus(schedulerQueue, SchedulerExecutionStatus.Failed);
				schedulerQueue.Description = string.Format("InnerException: {0}; StackTrace: {1}", exception.InnerException, exception.StackTrace);

				return BaseResponse.Success();
			}

			return BaseResponse.Error(ErrorCode.SchedulerQueueItemNotFound);
		}

		/// <summary>
		/// Get all Pending tasks before current date and change their status to InQueue
		/// Method is thread safe
		/// </summary>
		public EntityResponse<List<SchedulerQueue>> GetPendingTasks()
		{
			lock (Locker)
			{
				DateTime currentTime = DateTime.UtcNow;
				List<SchedulerQueue> schedulerQueues =
					Uow.SchedulerQueues.GetAllByStatus(SchedulerExecutionStatus.Pending)
						.Where(item => item.PlannedDate < currentTime && item.Destination == SchedulerDestination && item.LockerMask == 0)
						.ToList();

				foreach (SchedulerQueue schedulerQueue in schedulerQueues)
				{
					Uow.SchedulerQueues.ChangeStatus(schedulerQueue, SchedulerExecutionStatus.InQueue);
				}

				return schedulerQueues;
			}
		}

		/// <summary>
		/// Create (if not exists) new Scheduler Task
		/// </summary>
		public EntityResponse<SchedulerTask> CreateTaskDefinitionIfNotExists(SchedulerTask schedulerTask)
		{
			var entity = Uow.SchedulerTasks.GetByType(schedulerTask.Type, SchedulerDestination);
			if (entity == null)
			{
				schedulerTask.Destination = SchedulerDestination;
				Uow.SchedulerTasks.Add(schedulerTask);
				entity = schedulerTask;
			}

			return entity;
		}

		/// <summary>
		/// Get information about scheduler task and their last 2 queue.
		/// </summary>
		public EntityResponse<List<SchedulerTaskInfo>> GetSchedulerTasksInfo()
		{
			List<SchedulerTaskInfo> schedulerTaskInfos = new List<SchedulerTaskInfo>();

			List<SchedulerTask> schedulerTasks = Uow.SchedulerTasks.GetAllByDestination(SchedulerDestination).ToList();
			foreach (SchedulerTask schedulerTask in schedulerTasks)
			{
				SchedulerTaskInfo addedTaskInfo = new SchedulerTaskInfo();
				addedTaskInfo.SchedulerTask = schedulerTask;
				List<SchedulerQueue> lasts = Uow.SchedulerQueues.GetLastsByType(schedulerTask.Type, SchedulerDestination, 2);
				if (lasts.Count > 0)
				{
					addedTaskInfo.LastSchedulerQueue = lasts[0];
					if (lasts.Count > 1)
					{
						addedTaskInfo.PreviosSchedulerQueue = lasts[1];
					}
				}

				schedulerTaskInfos.Add(addedTaskInfo);
			}

			return schedulerTaskInfos;
		}

		/// <summary>
		/// Pass scheduler task with id <param name="taskId">task id to scheduler queue</param>
		/// </summary>
		public BaseResponse ExecuteTask(string taskId)
		{
			SchedulerTask schedulerTask = Uow.SchedulerTasks.GetById(taskId, SchedulerDestination);
			if (schedulerTask != null)
			{
				SchedulerQueue schedulerQueue = new SchedulerQueue
				{
					TaskType = schedulerTask.Type,
					LockerMask = 0,//schedulerTask.LockerMask,
					Dependencies = schedulerTask.Dependencies,
					Status = SchedulerExecutionStatus.Pending,
					PlannedDate = DateTime.UtcNow.AddMinutes(-1),
				};

				CreateQueueTask(schedulerQueue, true);
			}
			else
			{
				return ErrorCode.SchedulerTaskNotFound;
			}

			return BaseResponse.Success();
		}
	}
}
