using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.Model.Enums;
using OptionsPlay.Model.Mongo.Scheduler;
using OptionsPlay.Scheduler.Core;

namespace OptionsPlay.Scheduler.Tasks
{
	internal class HistoricalQuotesPopulatingTask : OptionsPlayTask
	{
		private readonly IMarketDataPopulatorService _marketDataPopulatorService;
		private static readonly SchedulerConfiguration Configuration = SchedulerConfiguration.Instance;

		public HistoricalQuotesPopulatingTask(
			ISchedulerCoreService schedulerCoreService, 
			IMarketDataPopulatorService marketDataPopulatorService)
				: base(schedulerCoreService, new SchedulerTask
			{
				CronExpression = Configuration.HistoricalQuotesPopCronExpression,
				Description = "Historical Quotes Populating",
				Name = "Historical Quotes Populating",
				Type = SchedulerTaskType.HistoricalQuotesPopulating
			})
		{
			_marketDataPopulatorService = marketDataPopulatorService;
		}

		#region Implementation of ISyrahTraderJob

		internal override void Execute()
		{
			_marketDataPopulatorService.PopulateHistoricalQuotes();
		}

		#endregion Implementation of ISyrahTraderJob
	}
}
