using OptionsPlay.BusinessLogic.Common;
using OptionsPlay.IoC;
using StructureMap;
using OptionsPlay.Scheduler;
namespace OptionsPlay.Scheduler
{
	public static class Point
	{
        private static  StockConfiguration stockConfiguration = StockConfiguration.Instance;
		public static void Main()
		{
			//SchedulerManager.Instance.Initialize();
               
			IocConfigurator.Configure();

			AutoMapperBusinessLogicConfigurator.Configure();
			IMarketDataPopulatorService marketDataPopulatorService = ObjectFactory.GetInstance<IMarketDataPopulatorService>();
            //foreach (var i in stockConfiguration)
            //{

            //    marketDataPopulatorService.PopulateStockOptionQuotes(((System.Configuration.ConfigurationProperty)i).DefaultValue.ToString());
            //}

			//marketDataPopulatorService.PopulateRealTimeQuotes();
            marketDataPopulatorService.PopulateRealTimeQuotes();

            //marketDataPopulatorService.PopulateRealtimeStocksQuotes();
            //marketDataPopulatorService.ErasePerMinutesQuotes();
            //marketDataPopulatorService.PopulateLatestStockQuotesToHistoricalQuotesPerDay();
            //ITradeIdeaService tradeIdeaService = ObjectFactory.GetInstance<ITradeIdeaService>();
            //tradeIdeaService.StoreTradeIdeasInDb();

           
            //MarketDataPopulationService.Instance.Start();
		}
	}
}
