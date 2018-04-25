using System;
using System.Collections.Generic;
using System.Reflection;
using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.Logging;
using OptionsPlay.Model.Mongo.Scheduler;
using OptionsPlay.Scheduler.Core;
using OptionsPlay.Scheduler.Jobs;
using Quartz;
using StructureMap;

namespace OptionsPlay.Scheduler
{
	/// <summary>
	/// Singleton. Configurate scheduled jobs.
	/// </summary>
	internal class JobsConfigurator
	{
		// See http://www.cronmaker.com/
		//private const string CronString = "0 {1} {0} ? * MON,TUE,WED,THU,FRI *"; // {0} - hours, {1} - minutes 

		private void UpdateTasksQueue()
		{
			ISchedulerCoreService schedulerCoreService = ObjectFactory.GetInstance<ISchedulerCoreService>();

			List<OptionsPlayTask> syrahTraderTasks = new List<OptionsPlayTask>();

			//Get all tasks from current assembly
			Type baseType = typeof(OptionsPlayTask);
			foreach (Type type in Assembly.GetAssembly(baseType).GetTypes())
			{
				if (baseType.IsAssignableFrom(type) && type != baseType)
				{
					try
					{
						if (type != null)
						{
							Logger.Debug(type.ToString());
							OptionsPlayTask instance = (OptionsPlayTask)ObjectFactory.GetInstance(type);
							syrahTraderTasks.Add(instance);
						}
					}
					catch (Exception ex)
					{
						Logger.Error("Error " , ex);
					}
				}
			}

			//Update db for tasks
			foreach (OptionsPlayTask task in syrahTraderTasks)
			{
				Logger.Debug(task.TaskType.ToString());

				SchedulerQueue schedulerQueue = task.CreateSchedulerQueue();
				schedulerCoreService.CreateQueueTask(schedulerQueue, true);

				Logger.Debug(task.TaskType.ToString());
			}
		}

		internal void Configurate(IScheduler scheduler)
		{
			Logger.Debug("Started Configurate Method");
			try
			{
				UpdateTasksQueue();
			}
			catch (Exception ex)
			{
				Logger.Error("Error ", ex);
				throw;
			}

			IJobDetail queueWatcherJobDetails = JobBuilder
				.Create<QueueWatcherJob>()
				.WithIdentity("QueueWatcherJob", "SpecificJobs")
				.Build();
			ITrigger queueWatcherTrigger = TriggerBuilder
					.Create()
					.WithIdentity("QueueWatcherTrigger", "SpecificTriggers")
					.WithSchedule(SimpleScheduleBuilder.RepeatSecondlyForever(2))
					.Build();

			scheduler.ScheduleJob(queueWatcherJobDetails, queueWatcherTrigger);

			Logger.Debug("Finished Configurate Method");
		}
	}
}
