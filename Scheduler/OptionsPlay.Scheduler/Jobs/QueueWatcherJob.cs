using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.Common.Options;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.Logging;
using OptionsPlay.Model.Enums;
using OptionsPlay.Model.Mongo.Scheduler;
using OptionsPlay.Resources;
using OptionsPlay.Scheduler.Core;
using OptionsPlay.Scheduler.Tasks;
using Quartz;
using StructureMap;

namespace OptionsPlay.Scheduler.Jobs
{
	/// <summary>
	/// Checking scheduler queue for pending jobs.
	/// </summary>
	internal class QueueWatcherJob : IOptionsPlayJob
	{
		private const int MaxDegreeOfParallelism = 2;

		private readonly ISchedulerCoreService _schedulerCoreService;

		private static readonly Dictionary<SchedulerTaskType, Func<OptionsPlayTask>> Tasks = new Dictionary<SchedulerTaskType, Func<OptionsPlayTask>>
		{
			//{SchedulerTaskType.RealTimeQuotesPopulating, ObjectFactory.GetInstance<RealTimeQuotesPopulatingTask>},
            //{SchedulerTaskType.HistoricalQuotesPopulating, ObjectFactory.GetInstance<HistoricalQuotesPopulatingTask>},
            //{SchedulerTaskType.StockOptionPerMinuteQuotesPopulating, ObjectFactory.GetInstance<StockOptionPerMinuteQuotesPopulatingTask>},
            {SchedulerTaskType.ErasePerMinuteQuotesPopulating, ObjectFactory.GetInstance<ErasePerMinuteQuotesPopulatingTask>},
            {SchedulerTaskType.LatestStockQuotesToHistoricalQuotesPerDayPopulating, ObjectFactory.GetInstance<LatestStockQuotesToHistoricalQuotesPerDayPopulatingTask>}
		};

		private List<SchedulerQueue> GetPendingTasks()
		{
			EntityResponse<List<SchedulerQueue>> result = _schedulerCoreService.GetPendingTasks();
			return result.Entity;
		}

		#region Implementation of ISyrahTraderJob

		public QueueWatcherJob(ISchedulerCoreService schedulerCoreService)
		{
			_schedulerCoreService = schedulerCoreService;
		}

		private void ReactivateTask(OptionsPlayTask optionsPlayTask, SchedulerQueue schedulerQueue)
		{
			if (optionsPlayTask != null)
			{
				try
				{
					SchedulerQueue newQueue = optionsPlayTask.CreateSchedulerQueue();
					_schedulerCoreService.CreateQueueTask(newQueue, true);
				}
				catch (Exception newQueueException)
				{
					Logger.FatalError(string.Format(LogMessages.Error_FailedSchedulerJob, AppConfigManager.Environment, schedulerQueue.TaskType), newQueueException);
					_schedulerCoreService.LogTaskException(schedulerQueue.TaskType, newQueueException);
				}
			}
		}

		private void ExecuteTask(SchedulerQueue schedulerQueue)
		{
			OptionsPlayTask optionsPlayTask = null;
			try
			{
				Func<OptionsPlayTask> syrahTraderTaskFunc;
				if (Tasks.TryGetValue(schedulerQueue.TaskType, out syrahTraderTaskFunc))
				{
					Logger.Info(string.Format(LogMessages.Info_StartSchedulerTask, schedulerQueue.TaskType));
					_schedulerCoreService.LogStartTaskExecution(schedulerQueue.TaskType);

					Stopwatch stopwatch = new Stopwatch();
					stopwatch.Start();

					optionsPlayTask = syrahTraderTaskFunc.Invoke();
					optionsPlayTask.Execute();

					stopwatch.Stop();

					_schedulerCoreService.LogEndTaskExecution(schedulerQueue.TaskType);
					Logger.Info(string.Format(LogMessages.Info_StopSchedulerTask, schedulerQueue.TaskType, stopwatch.ElapsedMilliseconds));

					ReactivateTask(optionsPlayTask, schedulerQueue);
				}
			}
			catch (Exception ex)
			{
                Logger.Debug("OptionPlay error beginning");
				Logger.FatalError(string.Format(LogMessages.Error_FailedSchedulerJob, AppConfigManager.Environment, schedulerQueue.TaskType), ex);
				_schedulerCoreService.LogTaskException(schedulerQueue.TaskType, ex);
                Logger.Debug("Reactivate task start:"+optionsPlayTask.TaskType+":"+schedulerQueue.Id+":"+schedulerQueue.PlannedDate);
				//Reactivate failed task
				ReactivateTask(optionsPlayTask, schedulerQueue);
                Logger.Debug("Reactivate task end");
                Logger.Debug("OptionPlay error ending");
			}
		}

		public void Execute(IJobExecutionContext context)
		{
			List<SchedulerQueue> schedulerQueues = GetPendingTasks();

			ParallelOptions parallelOptions = new ParallelOptions
				{
					MaxDegreeOfParallelism = MaxDegreeOfParallelism
				};

			Parallel.ForEach(schedulerQueues, parallelOptions, ExecuteTask);
		}

		#endregion Implementation of ISyrahTraderJob

		public override string ToString()
		{
			return "QueueWatcherJob";
		}
	}
}
