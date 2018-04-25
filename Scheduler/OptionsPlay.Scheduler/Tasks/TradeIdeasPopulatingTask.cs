using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.Model.Enums;
using OptionsPlay.Model.Mongo.Scheduler;
using OptionsPlay.Scheduler.Core;

namespace OptionsPlay.Scheduler.Tasks
{
	internal class TradeIdeasPopulatingTask : OptionsPlayTask
	{
		private readonly ITradeIdeaService _tradeIdeaService;

		public TradeIdeasPopulatingTask(
			ITradeIdeaService tradeIdeaService,
			ISchedulerCoreService schedulerCoreService)
			: base(schedulerCoreService, new SchedulerTask
			{
				CronExpression = "0 0 2 ? * TUE-SAT *",
				Description = "Trade Ideas Populating",
				Name = "Trade Ideas Populating",
				Type = SchedulerTaskType.TradeIdeasPopulating,
				LockerMask = GetLockerMaskFor(SchedulerTaskType.HistoricalQuotesPopulating)
			})
		{
			_tradeIdeaService = tradeIdeaService;
		}

		#region Implementation of ISyrahTraderJob

		internal override void Execute()
		{
			_tradeIdeaService.StoreTradeIdeasInDb();
		}

		#endregion Implementation of ISyrahTraderJob
	}
}