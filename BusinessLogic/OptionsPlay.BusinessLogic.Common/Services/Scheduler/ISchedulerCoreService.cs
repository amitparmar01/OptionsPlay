using System;
using System.Collections.Generic;
using OptionsPlay.BusinessLogic.Common.Entities;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.Model.Enums;
using OptionsPlay.Model.Mongo.Scheduler;

namespace OptionsPlay.BusinessLogic.Common
{
	public interface ISchedulerCoreService
	{
		/// <summary>
		/// Create Task(if not exists) in Queue
		/// </summary>
		BaseResponse CreateQueueTask(SchedulerQueue schedulerQueue, bool terminatePrevious = false);

		/// <summary>
		/// Set task as executing
		/// </summary>
		BaseResponse LogStartTaskExecution(SchedulerTaskType type);

		/// <summary>
		/// Set task as completed
		/// </summary>
		BaseResponse LogEndTaskExecution(SchedulerTaskType type);

		/// <summary>
		/// Set task as completed with exception
		/// </summary>
		BaseResponse LogTaskException(SchedulerTaskType type, Exception exception);

		/// <summary>
		/// Get all Pending tasks before current date and change their status to InQueue
		/// Method is thread safe
		/// </summary>
		EntityResponse<List<SchedulerQueue>> GetPendingTasks();

		/// <summary>
		/// Create (if not exists) new Scheduler Task
		/// </summary>
		EntityResponse<SchedulerTask> CreateTaskDefinitionIfNotExists(SchedulerTask type);

		/// <summary>
		/// Get information about scheduler task and their last 2 queue.
		/// </summary>
		EntityResponse<List<SchedulerTaskInfo>> GetSchedulerTasksInfo();

		/// <summary>
		/// Pass scheduler task with id <param name="taskId">task id to scheduler queue</param>
		/// </summary>
		BaseResponse ExecuteTask(string taskId);
	}
}
