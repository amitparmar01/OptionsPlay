using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.Model.Enums;
using OptionsPlay.Model.Mongo.Scheduler;
using OptionsPlay.Scheduler.Core;

namespace OptionsPlay.Scheduler.Tasks
{
    internal class ErasePerMinuteQuotesPopulatingTask: OptionsPlayTask
    {

        private readonly IMarketDataPopulatorService _marketDataPopulatorService;
        private static readonly SchedulerConfiguration Configuration = SchedulerConfiguration.Instance;

        public ErasePerMinuteQuotesPopulatingTask(ISchedulerCoreService schedulerCoreService, IMarketDataPopulatorService marketDataPopulatorService)
            : base(schedulerCoreService, new SchedulerTask
            {
                CronExpression = Configuration.ErasePerMinuteQuotesPopCronExpression,
                Description = "Erase Per Minute Quotes Populating",
                Name = "Erase Per Minute Quotes Populating",
                Type = SchedulerTaskType.ErasePerMinuteQuotesPopulating
            })
        {
            _marketDataPopulatorService = marketDataPopulatorService;
        }

        #region Implementation of ISyrahTraderJob

        internal override void Execute()
        {
            _marketDataPopulatorService.ErasePerMinutesQuotes();
        }

        #endregion Implementation of ISyrahTraderJob
    }
    
}
