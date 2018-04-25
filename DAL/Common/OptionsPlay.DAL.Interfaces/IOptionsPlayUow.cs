using System;
using OptionsPlay.DAL.Interfaces.Repositories;
using OptionsPlay.Model;
using OptionsPlay.DAL.Interfaces.Repositories.MarketData;

namespace OptionsPlay.DAL.Interfaces
{
	public interface IOptionsPlayUow : IDisposable
	{
		IRolesRepository Roles { get; }

		IUsersRepository Users { get; }

		IConfigDirectoriesRepository ConfigDirectories { get; }

		IRepository<ConfigValue> ConfigValues { get; }

		IStrategiesRepository Strategies { get; }

		IStrategyGroupsRepository StrategyGroups { get; }

		ICacheStatusesRepository CacheStatusesRepository { get; }

		ISchedulerQueueRepository SchedulerQueues { get; }

		ISchedulerTaskRepository SchedulerTasks { get; }

		IHistoricalQuoteRepository HistoricalQuotes { get; }

		IOptionQuotesInfoRepository OptionQuotesInfo { get; }

		IStockQuotesInfoRepository StockQuotesInfo { get; }

		ITradeIdeasRepository TradeIdeasRepository { get; }

        IStockQuotePerMinuteRepository StockQuotePerMinuteRepository { get; }

        IOptionQuotePerMinuteRepository OptionQuotePerMinuteRepository { get; }

        //IStockMarketIndexPerMinuteRepository StockMarketIndexPerMinuteRepository { get; }
		T GetRepository<T>() where T : class;

		void Commit();
	}
}
