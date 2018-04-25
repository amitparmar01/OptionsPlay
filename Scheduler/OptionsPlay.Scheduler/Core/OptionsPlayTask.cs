using System;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.Common.ServiceResponses;
using OptionsPlay.Model.Enums;
using OptionsPlay.Model.Extensions;
using OptionsPlay.Model.Mongo.Scheduler;
using OptionsPlay.Resources;
using Quartz;
using OptionsPlay.Logging;

namespace OptionsPlay.Scheduler.Core
{
	/// <summary>
	/// Base interface for all task which to be executed.
	/// </summary>
	internal abstract class OptionsPlayTask
	{
		protected SchedulerTask SchedulerTask;

		protected ISchedulerCoreService SchedulerCoreService;

		internal DateTime GetCronTime()
		{
			DateTime result;

			if (!string.IsNullOrEmpty(SchedulerTask.CronExpression))
			{
				CronExpression cronExpression = new CronExpression(SchedulerTask.CronExpression) {TimeZone = TimeZoneInfo.Utc};
                DateTimeOffset dto= new DateTimeOffset(DateTime.UtcNow);
				DateTimeOffset? nextValidTimeAfter = cronExpression.GetTimeAfter(new DateTimeOffset(DateTime.UtcNow));
				if (nextValidTimeAfter.HasValue)
				{
                    
                   
                    //Logger.Debug("cronExpression" + cronExpression);
                    //Logger.Debug("timebased" + dto);
                    //Logger.Debug("timetiff" + nextValidTimeAfter);
                   
					result = nextValidTimeAfter.Value.UtcDateTime;
				}
				else
				{
					throw new ApplicationException(string.Format(LogMessages.Error_CronOptionsIncorrect, TaskType));
				}
			}
			else
			{
				result = DateTime.UtcNow;
			}

			return result;
		}

		internal SchedulerTaskType TaskType
		{
			get
			{
				return SchedulerTask.Type;
			}
		}

		abstract internal void Execute();

		protected OptionsPlayTask(ISchedulerCoreService schedulerCoreService, SchedulerTask schedulerTask)
		{
			SchedulerCoreService = schedulerCoreService;
			
			EntityResponse<SchedulerTask> response = SchedulerCoreService.CreateTaskDefinitionIfNotExists(schedulerTask);
			SchedulerTask = response.Entity;
		}

		protected static long GetLockerMaskFor(params SchedulerTaskType[] types)
		{
			long result = 0x0000000000000000;
			foreach (SchedulerTaskType schedulerTaskType in types)
			{
				long lockerMask = schedulerTaskType.GetLockerMask();
				result = result | lockerMask;
			}

			return result;
		}

		internal SchedulerQueue CreateSchedulerQueue()
		{
			SchedulerQueue result = new SchedulerQueue
				{
					PlannedDate = GetCronTime(),
					TaskType = SchedulerTask.Type,
					Dependencies = SchedulerTask.Dependencies,
					LockerMask = SchedulerTask.LockerMask
				};

			return result;
		}
	}
}
