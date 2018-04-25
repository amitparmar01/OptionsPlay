using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.IoC;
using OptionsPlay.Logging;
using OptionsPlay.Scheduler.Core;
using Quartz;
using Quartz.Impl;

namespace OptionsPlay.Scheduler
{
	public class SchedulerManager
	{
		private IScheduler _scheduler;

		private static SchedulerManager _instance;

		/// <summary>
		/// Get instance
		/// </summary>
		public static SchedulerManager Instance
		{
			get
			{
				return _instance ?? (_instance = new SchedulerManager());
			}
		}

		public SchedulerManager()
		{
			IocConfigurator.Configure();

			AutoMapperBusinessLogicConfigurator.Configure();
		}

		public void Initialize()
		{
			Logger.Debug("Started Scheduler Initialization");

			ISchedulerFactory schedulerFactory = new StdSchedulerFactory();
			_scheduler = schedulerFactory.GetScheduler();
			_scheduler.JobFactory = new OptionsPlayJobFactory();
			_scheduler.Start();

			JobsConfigurator configurator = new JobsConfigurator();
			configurator.Configurate(_scheduler);

			Logger.Debug("Finished Scheduler Initialization");
		}
	}
}
