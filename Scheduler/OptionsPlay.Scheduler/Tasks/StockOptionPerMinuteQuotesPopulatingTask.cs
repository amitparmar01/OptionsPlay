using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.Model.Enums;
using OptionsPlay.Model.Mongo.Scheduler;
using OptionsPlay.Scheduler.Core;

namespace OptionsPlay.Scheduler.Tasks
{
    internal class StockOptionPerMinuteQuotesPopulatingTask : OptionsPlayTask
    {
        private readonly IMarketDataPopulatorService _marketDataPopulatorService;
        private static readonly SchedulerConfiguration Configuration = SchedulerConfiguration.Instance;
        private static readonly StockConfiguration stockConfiguration = StockConfiguration.Instance;

        public StockOptionPerMinuteQuotesPopulatingTask(ISchedulerCoreService schedulerCoreService, IMarketDataPopulatorService marketDataPopulatorService)
            : base(schedulerCoreService, new SchedulerTask
            {
                CronExpression = Configuration.StockOptionQuotesPopCronExpression,
                Description = "Stock Option Per Minute Quotes Populating",
                Name = "Stock Option Per Minute Quotes Populating",
                Type = SchedulerTaskType.StockOptionPerMinuteQuotesPopulating
            })
        {
            _marketDataPopulatorService = marketDataPopulatorService;
        }

        #region Implementation of ISyrahTraderJob

        internal override void Execute()
        {
            //foreach (var i in stockConfiguration)
            //{

            //    _marketDataPopulatorService.PopulateStockOptionQuotes(((System.Configuration.ConfigurationProperty)i).DefaultValue.ToString());
            //}
            _marketDataPopulatorService.PopulateStockOptionQuotes();
        }

        #endregion Implementation of ISyrahTraderJob
    }
}
