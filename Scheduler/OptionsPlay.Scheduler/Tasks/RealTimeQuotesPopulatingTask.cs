using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.Model.Enums;
using OptionsPlay.Model.Mongo.Scheduler;
using OptionsPlay.Scheduler.Core;
//using OptionsPlay.Logging;
namespace OptionsPlay.Scheduler.Tasks
{
	internal class RealTimeQuotesPopulatingTask : OptionsPlayTask
	{
		private readonly IMarketDataPopulatorService _marketDataPopulatorService;
		private static readonly SchedulerConfiguration Configuration = SchedulerConfiguration.Instance;

		public RealTimeQuotesPopulatingTask(ISchedulerCoreService schedulerCoreService, IMarketDataPopulatorService marketDataPopulatorService)
			: base(schedulerCoreService, new SchedulerTask
			{
				CronExpression = Configuration.RealTimeQuotesPopCronExpression,
         
				Description = "Real Time Quotes Populating",
				Name = "Real Time Quotes Populating",
				Type = SchedulerTaskType.RealTimeQuotesPopulating
			})
		{
            //Logger.Debug("Real Time Quotes " + Configuration.RealTimeQuotesPopCronExpression);
			_marketDataPopulatorService = marketDataPopulatorService;
		}

		#region Implementation of ISyrahTraderJob

		internal override void Execute()
		{
			_marketDataPopulatorService.PopulateRealTimeQuotes();
		}

		#endregion Implementation of ISyrahTraderJob
	}
}
