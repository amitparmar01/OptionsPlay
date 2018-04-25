using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.Model.Enums;
using OptionsPlay.Model.Mongo.Scheduler;
using OptionsPlay.Scheduler.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OptionsPlay.Scheduler.Tasks
{
    internal class LatestStockQuotesToHistoricalQuotesPerDayPopulatingTask : OptionsPlayTask
    {
        private readonly IMarketDataPopulatorService _marketDataPopulatorService;
        private static readonly SchedulerConfiguration Configuration = SchedulerConfiguration.Instance;

        public LatestStockQuotesToHistoricalQuotesPerDayPopulatingTask(ISchedulerCoreService schedulerCoreService, 
            IMarketDataPopulatorService marketDataPopulatorService)
            : base(schedulerCoreService, new SchedulerTask
            {
                CronExpression = Configuration.LatestStockQuotesToHistoricalQuotesPerDayPopCronExpression,
                Description = "Latest StockQuotes To HistoricalQuotes Per Day Populating",
                Name = "Latest StockQuotes To HistoricalQuotes Per Day Populating",
                Type = SchedulerTaskType.LatestStockQuotesToHistoricalQuotesPerDayPopulating
            })
        {
            _marketDataPopulatorService = marketDataPopulatorService;
        }

        internal override void Execute()
        {
            _marketDataPopulatorService.PopulateLatestStockQuotesToHistoricalQuotesPerDay();
        }
    }
}
